import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import {
    ChangeSubscriptionDto,
    CreateCheckoutSessionDto,
    DeactivateSubscriptionDto,
    FindCustomerSubscriptionStatusByAccountIdDto,
    FindNextBillingDateByAccountIdDto,
    ReactivateSubscriptionDto,
} from '@monorepo/type';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { CustomerEventService } from '../customer-event/customer-event.service';
import { LoggerService } from '../../logger/logger.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly customerEventService: CustomerEventService,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext('CustomerController');
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('client')
    @Post('create-checkout-session')
    async createCheckoutSession(@Body() createCheckoutSessionDto: CreateCheckoutSessionDto) {
        try {
            const checkoutSession = await this.customerService.createCheckoutSession(createCheckoutSessionDto);
            this.logger.log(`Checkout session created: ${checkoutSession.id}`);
            return checkoutSession
        } catch (error) {
            this.logger.error('Error creating checkout session', error.stack);
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('find-customer-subscription-status-by-account-id')
    findCustomerSubscriptionStatusByAccountId(@Body() findCustomerSubscriptionStatusByAccountIdDto: FindCustomerSubscriptionStatusByAccountIdDto) {
        return this.customerService.findCustomerSubscriptionStatusByAccountId(findCustomerSubscriptionStatusByAccountIdDto.accountId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('client')
    @Post('change-subscription')
    async changeSubscription(@Body() changeSubscriptionDto: ChangeSubscriptionDto) {
        return this.customerService.changeSubscription(changeSubscriptionDto.accountId, changeSubscriptionDto.newPriceId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('client')
    @Post('reactivate-subscription')
    async reactivateSubscription(@Body() reactivateSubscriptionDto: ReactivateSubscriptionDto) {
        try {
            const subscription = await this.customerService.reactivateSubscription(reactivateSubscriptionDto.accountId);
            this.logger.log(`Subscription reactivated: ${subscription.id}`);
            return subscription;
        } catch (error) {
            this.logger.error('Error reactivating subscription', error.stack);
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('client')
    @Post('deactivate-subscription')
    async deactivateSubscription(@Body() deactivateSubscriptionDto: DeactivateSubscriptionDto) {
        try {
            const subscription = await this.customerService.deactivateSubscription(deactivateSubscriptionDto.accountId);
            this.logger.log(`Subscription deactivated: ${subscription.id}`);
            return subscription;
        } catch (error) {
            this.logger.error('Error deactivating subscription', error.stack);
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('find-next-billing-date-by-account-id')
    async findNextBillingDateByAccountId(@Body() findNextBillingDateByAccountIdDto: FindNextBillingDateByAccountIdDto) {
        return this.customerService.findNextBillingDateByAccountId(findNextBillingDateByAccountIdDto);
    }

    @Post('webhook')
    async handleWebhook(@Req() request: Request, @Res() response: Response) {
        this.logger.verbose('Received stripe webhook');

        const clientIP = request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || request.connection.remoteAddress;
        this.logger.verbose(`Received stripe webhook from IP: ${clientIP}`);

        const sig = request.headers['stripe-signature'];

        let event;
        let message = '';
        let status = 200;

        try {
            event = stripe.webhooks.constructEvent(request['rawBody'], sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            this.logger.error(`Error constructing stripe webhook event: ${err.message}`, err.stack);
            return response.status(400).send(`Webhook Error: ${err.message}`);
        }

        switch (event.type) {

            case 'customer.created':
                try {
                    const customer = event.data.object;
                    this.logger.log(`customer.created event: ${customer.id}`);
                    await this.customerEventService.createCustomerEvent(customer, event.id);
                    status = 200;
                    message = 'Customer created';
                }
                catch (error) {
                    this.logger.error('Error handling customer.created event:', error.stack);
                    status = 500;
                    message = 'Error handling customer.created event';
                }
                break;

            case 'checkout.session.completed':
                try {
                    const session = event.data.object;
                    this.logger.log(`checkout.session.completed event: ${session.id}`);

                    const accountId = session.metadata.accountId
                    const customerId = await this.customerService.findCustomerIdByAccountId(accountId);

                    if (session.subscription && customerId) {
                        this.logger.verbose(`Assigning subscription id ${session.subscription} to customer: ${customerId}`);
                        await this.customerService.assignSubscriptionIdToCustomer(customerId, session.subscription);
                    }

                    if (!customerId) {
                        this.logger.warn(`Customer not found for accountId: ${accountId}`);
                        status = 200;
                        message = 'Customer not found';
                        break;
                    }

                    await this.customerEventService.createCheckoutSessionCompletedEvent(session, event.id);
                    status = 200;
                    message = 'Checkout session completed';
                } catch (error) {
                    this.logger.error('Error handling checkout session completed event:', error.stack);
                    status = 500;
                    message = 'Error handling checkout session completed event';
                }
                break;

            case 'invoice.payment_succeeded':
                try {
                    const invoice = event.data.object;
                    await this.customerEventService.createInvoicePaymentSucceededEvent(invoice, event.id);
                    this.logger.log(`Invoice payment succeeded event: ${invoice.id}`);
                    message = 'Invoice payment succeeded';
                } catch (error) {
                    this.logger.error('Error handling invoice payment succeeded event:', error.stack);
                    status = 500;
                    message = 'Error handling invoice payment succeeded event';
                }
                break;

            case 'customer.subscription.created':
                try {
                    const subscription = event.data.object;
                    await this.customerEventService.createSubscriptionCreatedEvent(subscription, event.id);
                    this.logger.log(`Customer subscription created event: ${subscription.id}`);
                    message = 'Customer subscription created';
                } catch (error) {
                    this.logger.error('Error handling subscription created event:', error.stack);
                    status = 500;
                    message = 'Error handling subscription created event';
                }
                break;

            case 'customer.subscription.updated':
                try {
                    const subscription = event.data.object;
                    await this.customerEventService.createSubscriptionUpdatedEvent(subscription, event.id);
                    await this.customerService.updateSubscription(subscription.customer, subscription.id);
                    this.logger.log(`Customer subscription updated event: ${subscription.id}`);
                    message = 'Customer subscription updated';
                } catch (error) {
                    this.logger.error('Error handling subscription updated event:', error.stack);
                    status = 500;
                    message = 'Error handling subscription updated event';
                }
                break;

            case 'customer.subscription.deleted':
                try {
                    const subscription = event.data.object;
                    await this.customerEventService.createSubscriptionDeletedEvent(subscription, event.id);
                    this.logger.log(`Customer subscription deleted event: ${subscription.id}`);
                    message = 'Customer subscription deleted';
                } catch (error) {
                    this.logger.error('Error handling subscription deleted event:', error.stack);
                    status = 500;
                    message = 'Error handling subscription deleted event';
                }
                break;

            default:
                this.logger.warn(`Unhandled event type ${event.type}`);
                status = 400;
                message = `Unhandled event type ${event.type}`;
        }

        return response.status(status).send(message);
    }
}
