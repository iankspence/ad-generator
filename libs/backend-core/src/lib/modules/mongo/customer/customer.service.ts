import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    CreateCheckoutSessionDto,
    Customer,
    CustomerDocument,
    FindNextBillingDateByAccountIdDto,
} from '@monorepo/type';
import Stripe from 'stripe';
import { LoggerService } from '../../logger/logger.service';
import { CityService } from '../city/city.service';
import geoTz from 'geo-tz';
import { DateTime } from 'luxon';

interface SubscriptionStatus {
    isActive: boolean;
    priceId: string | null;
}

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

    async updateSubscription(stripeCustomerId: string, subscriptionId: string): Promise<CustomerDocument> {
        try {
            const customer = await this.customerModel.findOne({ stripeCustomerId });
            if (!customer) {
                this.logger.error(`Customer not found for stripeCustomerId (updateSubscription): ${stripeCustomerId}`);
                return null;
            }

            customer.subscriptionId = subscriptionId;
            const savedCustomer = await customer.save();
            this.logger.log(`Updated subscription for stripeCustomerId: ${stripeCustomerId}`);
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

    async findCustomerSubscriptionStatusByUserId(userId: string): Promise<{ active: boolean }> {
        try {
            return this.customerModel.findOne({ userId }).then(customer => {
                if (!customer) {
                    return { active: false };
                }

                return this.isSubscriptionActive(customer.stripeCustomerId).then(active => {
                    return { active: active.isActive };
                });
            });
        } catch (error) {
            this.logger.error(`Error finding customer subscription status for userId: ${userId}`, error.stack);
            throw error;
        }
    }

    async createCheckoutSession(createCheckoutSessionDto: CreateCheckoutSessionDto): Promise<Stripe.Checkout.Session> {
        const payment_method_types: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = ['card'];
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
            price: createCheckoutSessionDto.priceId,
            quantity: 1
        }];
        const mode = 'subscription';
        const success_url = process.env.FRONTEND_URI + '/updated-subscription';
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

    async assignSubscriptionIdToCustomer(customerId: string, subscriptionId: string) {
        try {
            const customer = await this.customerModel.findOne({ stripeCustomerId: customerId });
            if (!customer) {
                this.logger.error(`Customer with id ${customerId} not found`);
                return null;
            }

            customer.subscriptionId = subscriptionId;
            await customer.save();
            this.logger.log(`Assigned subscription id to customer: ${customerId}`);
        } catch (error) {
            this.logger.error(`Error assigning subscription id to customer: ${customerId}`, error.stack);
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

    async changeSubscription(accountId: string, newPriceId: string): Promise<Stripe.Subscription> {
        try {
            this.logger.verbose(`Changing subscription for accountId: ${accountId} to priceId: ${newPriceId}`);

            const stripeCustomerId = await this.findCustomerIdByAccountId(accountId);
            const customer = await this.customerModel.findOne({ stripeCustomerId });
            if (!customer) {
                this.logger.error(`Customer not found for stripeCustomerId (changeSubscription): ${stripeCustomerId}`);
                return null;
            }

            if (!customer.subscriptionId) {
                this.logger.error(`Subscription not found for stripeCustomerId (changeSubscription): ${stripeCustomerId}`);
                return null;
            }

            const subscription = await this.stripe.subscriptions.retrieve(customer.subscriptionId);

            const item = subscription.items.data[0];
            const updatedSubscription = await this.stripe.subscriptions.update(
                subscription.id,
                {
                    items: [{
                        id: item.id,
                        price: newPriceId,
                    }],
                }
            );

            this.logger.log(`Subscription for stripeCustomerId: ${stripeCustomerId} updated from priceId: ${item.price.id} to ${newPriceId}.`);
            return updatedSubscription;
        } catch (error) {
            this.logger.error(`Error changing subscription for accountId: ${accountId} to priceId: ${newPriceId}`, error.stack);
            throw error;
        }
    }

    async deactivateSubscription(accountId: string): Promise<Stripe.Subscription> {
        try {
            const customer = await this.customerModel.findOne({ accountId });
            if (!customer) {
                this.logger.error(`Customer not found for accountId: ${accountId}`);
                return null;
            }

            if (!customer.subscriptionId) {
                this.logger.error(`Subscription not found for accountId: ${accountId}`);
                return null;
            }

            const subscription = await this.stripe.subscriptions.update(
                customer.subscriptionId,
                { cancel_at_period_end: true }
            );

            this.logger.log(`Subscription for accountId: ${accountId} set to cancel at period end.`);
            return subscription;
        } catch (error) {
            this.logger.error(`Error cancelling subscription at period end for accountId: ${accountId}`, error.stack);
            throw error;
        }
    }

    async reactivateSubscription(accountId: string): Promise<Stripe.Subscription> {
        try {
            this.logger.verbose(`Reactivating subscription for accountId: ${accountId}`);

            const stripeCustomerId = await this.findCustomerIdByAccountId(accountId);
            const customer = await this.customerModel.findOne({ stripeCustomerId });
            if (!customer) {
                this.logger.error(`Customer not found for stripeCustomerId (reactivateSubscription): ${stripeCustomerId}`);
                return null;
            }

            if (!customer.subscriptionId) {
                this.logger.error(`Subscription not found for stripeCustomerId (reactivateSubscription): ${stripeCustomerId}`);
                return null;
            }

            const subscription = await this.stripe.subscriptions.update(
                customer.subscriptionId,
                { cancel_at_period_end: false }
            );

            this.logger.log(`Subscription for stripeCustomerId: ${stripeCustomerId} reactivated.`);
            return subscription;
        } catch (error) {
            this.logger.error(`Error reactivating subscription for accountId: ${accountId}`, error.stack);
            throw error;
        }
    }


    async findNextBillingDateByAccountId(findNextBillingDateByAccountIdDto: FindNextBillingDateByAccountIdDto): Promise<string | null> {
        const { accountId, city, provinceState } = findNextBillingDateByAccountIdDto;
        try {
            const stripeCustomerId = await this.findCustomerIdByAccountId(accountId);
            const customer = await this.customerModel.findOne({ stripeCustomerId });
            if (!customer) {
                this.logger.error(`Customer not found for stripeCustomerId (findNextBillingDateByAccountId): ${stripeCustomerId}`);
                return null;
            }

            if (!customer.subscriptionId) {
                this.logger.error(`Subscription not found for stripeCustomerId (findNextBillingDateByAccountId): ${stripeCustomerId}`);
                return null;
            }

            const subscription = await this.stripe.subscriptions.retrieve(customer.subscriptionId);

            if (subscription.current_period_end) {

                const { lat, lon } = await this.cityService.findLatLonByCityAndProvinceState(city, provinceState);
                const timezone = geoTz.find(lat, lon)[0];
                const nextBillingDateObject = DateTime.fromMillis(subscription.current_period_end * 1000, { zone: timezone });
                const nextBillingDate = nextBillingDateObject.toLocaleString(DateTime.DATETIME_FULL);
                this.logger.log(`Next billing date for subscriptionId: ${customer.subscriptionId} is ${nextBillingDate}`);

                return nextBillingDate;
            }

            this.logger.error(`Unable to find next billing date for subscriptionId: ${customer.subscriptionId}`);
            return null;
        } catch (error) {
            this.logger.error(`Error finding next billing date for accountId: ${accountId}`, error.stack);
            throw error;
        }
    }
}
