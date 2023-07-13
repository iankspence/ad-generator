import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    CreateCheckoutSessionDto,
    Customer,
    CustomerDocument,
} from '@monorepo/type';
import Stripe from 'stripe';
import { LoggerService } from '../../logger/logger.service';
import { CityService } from '../city/city.service';

@Injectable()
export class CustomerService {
    private stripe: Stripe;

    constructor(
        @InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>,
        private readonly cityService: CityService,
        private readonly logger: LoggerService,
    ) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2022-11-15",
        });

        this.logger.setContext('CustomerService');
    }

    async create(userId, accountId): Promise<CustomerDocument> {
        try {
            const stripeCustomer = await this.stripe.customers.create();

            const createdCustomer = new this.customerModel({
                userId,
                accountId,
                stripeCustomerId: stripeCustomer.id,
            });

            const result = await createdCustomer.save();
            this.logger.log(`Created customer for accountId: ${accountId} with id: ${result._id}`);
            return result;
        } catch (error) {
            this.logger.error(`Error creating customer for accountId: ${accountId}`, error.stack);
            throw error;
        }
    }

    async createCheckoutSession(createCheckoutSessionDto: CreateCheckoutSessionDto): Promise<Stripe.Checkout.Session> {
        const payment_method_types: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = ['card'];
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
            price: createCheckoutSessionDto.priceId,
            quantity: 1
        }];
        const mode = 'payment';
        const success_url = process.env.FRONTEND_URI + '/purchase-complete';
        const cancel_url = process.env.FRONTEND_URI + '/account';

        try {
            this.logger.verbose(`Creating checkout session for accountId: ${createCheckoutSessionDto.accountId}`);
            const customerId = await this.findCustomerIdByAccountId(createCheckoutSessionDto.accountId);

            this.logger.verbose(`Found customer id: ${customerId} for accountId: ${createCheckoutSessionDto.accountId}`);
            const session = await this.stripe.checkout.sessions.create({
                customer: customerId,
                payment_method_types,
                line_items,
                mode,
                success_url,
                cancel_url,
                metadata: {
                    accountId: createCheckoutSessionDto.accountId
                },
            });

            this.logger.log(`Checkout session created for accountId: ${createCheckoutSessionDto.accountId}`);
            return session;
        } catch (error) {
            this.logger.error(`Error creating checkout session for accountId: ${createCheckoutSessionDto.accountId}`, error.stack);
            throw error;
        }
    }

    async findCustomerIdByAccountId(accountId: string) {
        try {
            const customer = await this.customerModel.findOne({ accountId });
            if (!customer) {
                this.logger.error(`Customer with account id ${accountId} not found`);
                return null;
            }

            return customer.stripeCustomerId;
        } catch (error) {
            this.logger.error(`Error finding customer id by account id: ${accountId}`, error.stack);
            throw error;
        }
    }
}
