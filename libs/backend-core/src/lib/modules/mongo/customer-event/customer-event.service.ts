import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerEvent, CustomerEventDocument } from '@monorepo/type';
import { LoggerService } from '../../logger/logger.service'

@Injectable()
export class CustomerEventService {
    constructor(
        @InjectModel(CustomerEvent.name)
        private customerEventModel: Model<CustomerEventDocument>,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext('CustomerEventService');
    }

    async createCheckoutSessionCompletedEvent(session: any, eventId: string) {
        try {
            const customerEvent = new this.customerEventModel({
                customerId: session.customer,
                stripeEventId: eventId,
                eventType: 'checkout.session.completed',
                eventData: session,
            });

            await customerEvent.save();
            this.logger.verbose(`Created checkout.session.completed event for customer: ${session.customer}`);

        } catch (error) {
            this.logger.error(`Failed to create checkout.session.completed event for customer: ${session.customer}`, error.stack);
            throw error;
        }
    }

    async createInvoicePaymentSucceededEvent(invoice: any, eventId: string) {
        try {
            const customerEvent = new this.customerEventModel({
                customerId: invoice.customer,
                stripeEventId: eventId,
                eventType: 'invoice.payment_succeeded',
                eventData: invoice,
            });

            await customerEvent.save();
            this.logger.verbose(`Created invoice.payment_succeeded event for customer: ${invoice.customer}`);
        } catch (error) {
            this.logger.error(`Failed to create invoice.payment_succeeded event for customer: ${invoice.customer}`, error.stack);
            throw error;
        }
    }

    async createSubscriptionCreatedEvent(subscription: any, eventId: string) {
        try {
            const customerEvent = new this.customerEventModel({
                customerId: subscription.customer,
                stripeEventId: eventId,
                eventType: 'customer.subscription.created',
                eventData: subscription,
            });

            await customerEvent.save();
            this.logger.verbose(`Created customer.subscription.created event for customer: ${subscription.customer}`);
        } catch (error) {
            this.logger.error(`Failed to create customer.subscription.created event for customer: ${subscription.customer}`, error.stack);
            throw error;
        }
    }

    async createSubscriptionUpdatedEvent(subscription: any, eventId: string) {
        try {
            const customerEvent = new this.customerEventModel({
                customerId: subscription.customer,
                stripeEventId: eventId,
                eventType: 'customer.subscription.updated',
                eventData: subscription,
            });

            await customerEvent.save();
            this.logger.verbose(`Created customer.subscription.updated event for customer: ${subscription.customer}`);
        } catch (error) {
            this.logger.error(`Failed to create customer.subscription.updated event for customer: ${subscription.customer}`, error.stack);
            throw error;
        }
    }

    async createSubscriptionDeletedEvent(subscription: any, eventId: string) {
        try {
            const customerEvent = new this.customerEventModel({
                customerId: subscription.customer,
                stripeEventId: eventId,
                eventType: 'customer.subscription.deleted',
                eventData: subscription,
            });

            await customerEvent.save();
            this.logger.verbose(`Created customer.subscription.deleted event for customer: ${subscription.customer}`);
        } catch (error) {
            this.logger.error(`Failed to create customer.subscription.deleted event for customer: ${subscription.customer}`, error.stack);
            throw error;
        }
    }
}
