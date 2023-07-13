import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument, CustomerEvent, CustomerEventDocument } from '@monorepo/type';
import { LoggerService } from '../../logger/logger.service'
import { AdService } from '../ad/ad.service';
import { AccountModelService } from '../account/account-model.service';
import { UserActionService } from '../user-action/user-action.service';

@Injectable()
export class CustomerEventService {
    constructor(
        @InjectModel(CustomerEvent.name) private customerEventModel: Model<CustomerEventDocument>,
        @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
        private readonly adService: AdService,
        private readonly accountService: AccountModelService,
        private readonly userActionService: UserActionService,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext('CustomerEventService');
    }

    async createCustomerEvent(customer: any, eventId: string) {
        try {
            const customerEvent = new this.customerEventModel({
                customerId: customer.id,
                stripeEventId: eventId,
                eventType: 'customer.created',
                eventData: customer,
            });

            await customerEvent.save();
            this.logger.log(`Created customer event for customer: ${customer.id}`);
        } catch (error) {
            this.logger.error(`Failed to create customer event for customer: ${customer.id}`, error.stack);
            throw error;
        }
    }

    async createCheckoutSessionCompletedEvent(session: any, eventId: string) {
        try {

            this.logger.verbose(`Creating checkout.session.completed event for customer: ${session.customer}`);

            const customerEvent = new this.customerEventModel({
                customerId: session.customer,
                stripeEventId: eventId,
                eventType: 'checkout.session.completed',
                eventData: session,
            });

            await customerEvent.save();
            this.logger.log(`Created checkout.session.completed event for customer: ${session.customer}`);

        } catch (error) {
            this.logger.error(`Failed to create checkout.session.completed event for customer: ${session.customer}`, error.stack);
            throw error;
        }
    }

    async getUserIdAndAccountIdByCustomerId(customerId: string): Promise<{userId: string, accountId: string}> {
        try {
            const customer = await this.customerModel.findOne({ stripeCustomerId: customerId });
            if (!customer) {
                this.logger.error(`Customer not found for customer ID: ${customerId}`);
                return null;
            }
            return { userId: customer.userId, accountId: customer.accountId}
        }
        catch (error) {
            this.logger.error(`Failed to get account ID by customer ID: ${customerId}`, error.stack);
            return null;
        }
    }

    async createInvoicePaymentSucceededEvent(invoice: any, eventId: string) {
        try {
            const {userId, accountId} = await this.getUserIdAndAccountIdByCustomerId(invoice.customer);

            const invoiceDescription = invoice.lines.data[0].description;
            let numAdsToDeliver = 0;
            if (invoiceDescription.includes('Practitioner')) numAdsToDeliver = 2;
            else if (invoiceDescription.includes('Team') || invoiceDescription.includes('Clinic')) numAdsToDeliver = 4;

            const deliverySuccess = await this.adService.deliverAdsIfPossible(userId, accountId, numAdsToDeliver);

            if (!deliverySuccess) {
                this.logger.verbose(`Not enough 'approved' ads for an instant delivery upon invoice success for customer: ${invoice.customer} and account: ${accountId}`);
                await this.accountService.updateAdsPaidWithoutDelivery(accountId, numAdsToDeliver)

                this.logger.log(`Updated adsPaidWithoutDelivery to ${numAdsToDeliver} for account: ${accountId}`);
            } else {
                this.logger.log(`Delivered ${numAdsToDeliver} ads for account: ${accountId}`);
            }

            const customerEvent = new this.customerEventModel({
                customerId: invoice.customer,
                stripeEventId: eventId,
                eventType: 'invoice.payment_succeeded',
                eventData: invoice,
                deliverySuccess,
            });

            await customerEvent.save();
            this.logger.log(`Created invoice.payment_succeeded event for customer: ${invoice.customer}`);

            await this.userActionService.createUserAction({
                userId,
                accountId,
                context: 'CustomerEventService',
                dateTime: new Date(),
                action: `invoice-payment-succeeded`,
            })

        } catch (error) {
            this.logger.error(`Failed to create invoice.payment_succeeded event for customer: ${invoice.customer}`, error.stack);
            throw error;
        }
    }

    // createPaymentIntentSucceededEvent

    async createPaymentIntentSucceededEvent(paymentIntent: any, eventId: string) {
        try {
            const {userId, accountId} = await this.getUserIdAndAccountIdByCustomerId(paymentIntent.customer);

            await this.accountService.updateSetupPaymentComplete(accountId)

            const customerEvent = new this.customerEventModel({
                customerId: paymentIntent.customer,
                stripeEventId: eventId,
                eventType: 'payment_intent.succeeded',
                eventData: paymentIntent,
            });

            await customerEvent.save();
            this.logger.log(`Created payment_intent.succeeded event for customer: ${paymentIntent.customer}`);

            await this.userActionService.createUserAction({
                userId,
                accountId,
                context: 'CustomerEventService',
                dateTime: new Date(),
                action: `payment-intent-succeeded`,
            })

        } catch (error) {
            this.logger.error(`Failed to create payment_intent.succeeded event for customer: ${paymentIntent.customer}`, error.stack);
            throw error;
        }
    }

    // async createSubscriptionCreatedEvent(subscription: any, eventId: string) {
    //     try {
    //         const customerEvent = new this.customerEventModel({
    //             customerId: subscription.customer,
    //             stripeEventId: eventId,
    //             eventType: 'customer.subscription.created',
    //             eventData: subscription,
    //         });
    //
    //         await customerEvent.save();
    //         this.logger.log(`Created customer.subscription.created event for customer: ${subscription.customer}`);
    //
    //         const {userId, accountId} = await this.getUserIdAndAccountIdByCustomerId(subscription.customer);
    //         await this.userActionService.createUserAction({
    //             userId,
    //             accountId,
    //             context: 'CustomerEventService',
    //             dateTime: new Date(),
    //             action: `customer-subscription-created`,
    //         })
    //
    //     } catch (error) {
    //         this.logger.error(`Failed to create customer.subscription.created event for customer: ${subscription.customer}`, error.stack);
    //         throw error;
    //     }
    // }
    //
    // async createSubscriptionUpdatedEvent(subscription: any, eventId: string) {
    //     try {
    //         const customerEvent = new this.customerEventModel({
    //             customerId: subscription.customer,
    //             stripeEventId: eventId,
    //             eventType: 'customer.subscription.updated',
    //             eventData: subscription,
    //         });
    //
    //         await customerEvent.save();
    //         this.logger.log(`Created customer.subscription.updated event for customer: ${subscription.customer}`);
    //
    //         const {userId, accountId} = await this.getUserIdAndAccountIdByCustomerId(subscription.customer);
    //
    //         await this.userActionService.createUserAction({
    //             userId,
    //             accountId,
    //             context: 'CustomerEventService',
    //             dateTime: new Date(),
    //             action: `customer-subscription-updated`,
    //         })
    //     } catch (error) {
    //         this.logger.error(`Failed to create customer.subscription.updated event for customer: ${subscription.customer}`, error.stack);
    //         throw error;
    //     }
    // }
    //
    // async createSubscriptionDeletedEvent(subscription: any, eventId: string) {
    //     try {
    //         const customerEvent = new this.customerEventModel({
    //             customerId: subscription.customer,
    //             stripeEventId: eventId,
    //             eventType: 'customer.subscription.deleted',
    //             eventData: subscription,
    //         });
    //
    //         await customerEvent.save();
    //         this.logger.log(`Created customer.subscription.deleted event for customer: ${subscription.customer}`);
    //
    //         const {userId, accountId} = await this.getUserIdAndAccountIdByCustomerId(subscription.customer);
    //
    //         await this.userActionService.createUserAction({
    //             userId,
    //             accountId,
    //             context: 'CustomerEventService',
    //             dateTime: new Date(),
    //             action: `customer-subscription-deleted`,
    //         })
    //     } catch (error) {
    //         this.logger.error(`Failed to create customer.subscription.deleted event for customer: ${subscription.customer}`, error.stack);
    //         throw error;
    //     }
    // }

}
