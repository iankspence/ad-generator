import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '@monorepo/type';
import Stripe from 'stripe';

@Injectable()
export class CustomerService {
    private stripe: Stripe;

    constructor(@InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2022-11-15",
        });
    }

    async create(accountId: string): Promise<CustomerDocument> {
        const stripeCustomer = await this.stripe.customers.create();

        const createdCustomer = new this.customerModel({
            accountId,
            stripeCustomerId: stripeCustomer.id,
        });

        return createdCustomer.save();
    }

    async updateSubscription(stripeCustomerId: string, subscriptionId: string): Promise<CustomerDocument> {
        const customer = await this.customerModel.findOne({ stripeCustomerId });
        if (!customer) {
            throw new Error('Customer not found');
        }

        customer.subscriptionId = subscriptionId;

        return customer.save();
    }

    async isSubscriptionActive(stripeCustomerId: string): Promise<boolean> {
        const customer = await this.customerModel.findOne({ stripeCustomerId });
        if (!customer) {
            throw new Error('Customer not found');
        }

        if (!customer.subscriptionId) {
            return false;
        }

        const subscription = await this.stripe.subscriptions.retrieve(customer.subscriptionId);
        return subscription.status === 'active';
    }

    async findCustomerSubscriptionStatusByAccountId(accountId: string): Promise<{ active: boolean }> {
        return this.customerModel.findOne({ accountId }).then(customer => {
            if (!customer) {
                return { active: false };
            }

            return this.isSubscriptionActive(customer.stripeCustomerId).then(active => {
                return { active };
            });
        });
    }

}
