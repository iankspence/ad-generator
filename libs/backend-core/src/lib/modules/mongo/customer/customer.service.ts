import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCheckoutSessionDto, Customer, CustomerDocument } from '@monorepo/type';
import Stripe from 'stripe';
import { LoggerService } from '../../logger/logger.service';

interface SubscriptionStatus {
    isActive: boolean;
    priceId: string | null;
}

@Injectable()
export class CustomerService {
    private stripe: Stripe;

    constructor(
        @InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>,
        private readonly logger: LoggerService,
    ) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2022-11-15",
        });

        this.logger.setContext('CustomerService'); // Set the context for the logger
    }

    async create(userId, accountId): Promise<CustomerDocument> {
        this.logger.verbose(`Creating customer for accountId: ${accountId}`);
        try {
            const stripeCustomer = await this.stripe.customers.create();

            const createdCustomer = new this.customerModel({
                userId,
                accountId,
                stripeCustomerId: stripeCustomer.id,
            });

            const result = await createdCustomer.save();
            this.logger.verbose(`Created customer for accountId: ${accountId} with id: ${result._id}`);
            return result;
        } catch (error) {
            this.logger.error(`Error creating customer for accountId: ${accountId}`, error.stack);
            throw error;
        }
    }

    async updateSubscription(stripeCustomerId: string, subscriptionId: string): Promise<CustomerDocument> {
        this.logger.verbose(`Updating subscription for stripeCustomerId: ${stripeCustomerId}`);
        try {
            const customer = await this.customerModel.findOne({ stripeCustomerId });
            if (!customer) {
                this.logger.error(`Customer not found for stripeCustomerId (updateSubscription): ${stripeCustomerId}`);
                return null;
            }

            customer.subscriptionId = subscriptionId;
            const savedCustomer = await customer.save();
            this.logger.verbose(`Updated subscription for stripeCustomerId: ${stripeCustomerId}`);
            return savedCustomer;
        } catch (error) {
            this.logger.error(`Error updating subscription for stripeCustomerId: ${stripeCustomerId}`, error.stack);
            throw error;
        }
    }

    async isSubscriptionActive(stripeCustomerId: string): Promise<SubscriptionStatus> {
        try {
            const customer = await this.customerModel.findOne({ stripeCustomerId });
            if (!customer) {
                this.logger.error(`Customer not found for stripeCustomerId (isSubscriptionActive): ${stripeCustomerId}`);
                return { isActive: false, priceId: null };
            }

            if (!customer.subscriptionId) {
                return { isActive: false, priceId: null };
            }

            const subscription = await this.stripe.subscriptions.retrieve(customer.subscriptionId);

            let priceId = null;
            if (subscription.items?.data?.[0]?.price?.id) {
                priceId = subscription.items.data[0].price.id;
            }

            return {
                isActive: subscription.status === 'active',
                priceId,
            };
        } catch (error) {
            this.logger.error(`Error checking subscription status for stripeCustomerId: ${stripeCustomerId}`, error.stack);
            throw error;
        }
    }

    async findCustomerSubscriptionStatusByAccountId(accountId: string): Promise<{ active: boolean }> {
        try {
            return this.customerModel.findOne({ accountId }).then(customer => {
                if (!customer) {
                    return { active: false, priceId: null };
                }

                return this.isSubscriptionActive(customer.stripeCustomerId).then(active => {
                    return { active: active.isActive, priceId: active.priceId };
                });
            });
        } catch (error) {
            this.logger.error(`Error finding customer subscription status for accountId: ${accountId}`, error.stack);
            throw error;
        }
    }

    async createCheckoutSession(createCheckoutSessionDto: CreateCheckoutSessionDto): Promise<Stripe.Checkout.Session> {
        this.logger.verbose(`Creating checkout session for accountId: ${createCheckoutSessionDto.accountId}`);
        const payment_method_types: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = ['card'];
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
            price: createCheckoutSessionDto.priceId,
            quantity: 1
        }];
        const mode = 'subscription';
        const success_url = process.env.FRONTEND_URI + '/account';
        const cancel_url = process.env.FRONTEND_URI + '/account';

        try {
            const customerId = await this.findCustomerIdByAccountId(createCheckoutSessionDto.accountId);

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

            this.logger.verbose(`Checkout session created for accountId: ${createCheckoutSessionDto.accountId}`);
            return session;
        } catch (error) {
            this.logger.error(`Error creating checkout session for accountId: ${createCheckoutSessionDto.accountId}`, error.stack);
            throw error;
        }
    }

    async assignSubscriptionIdToCustomer(customerId: string, subscriptionId: string) {
        this.logger.verbose(`Assigning subscription id to customer: ${customerId}`);
        try {
            const customer = await this.customerModel.findOne({ stripeCustomerId: customerId });
            if (!customer) {
                this.logger.error(`Customer with id ${customerId} not found`);
                return null;
            }

            customer.subscriptionId = subscriptionId;
            await customer.save();
            this.logger.verbose(`Assigned subscription id to customer: ${customerId}`);
        } catch (error) {
            this.logger.error(`Error assigning subscription id to customer: ${customerId}`, error.stack);
            throw error;
        }
    }

    async findCustomerIdByAccountId(accountId: string) {
        this.logger.verbose(`Finding customer id by account id: ${accountId}`);
        try {
            const customer = await this.customerModel.findOne({ accountId });
            if (!customer) {
                this.logger.error(`Customer with account id ${accountId} not found`);
                return null;
            }

            this.logger.verbose(`Found customer id: ${customer.stripeCustomerId} for account id: ${accountId}`);
            return customer.stripeCustomerId;
        } catch (error) {
            this.logger.error(`Error finding customer id by account id: ${accountId}`, error.stack);
            throw error;
        }
    }
}
