import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCheckoutSessionDto, FindCustomerSubscriptionStatusByAccountIdDto } from '@monorepo/type';
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
            this.logger.verbose(`Checkout session created: ${checkoutSession.id}`);
            return checkoutSession
        } catch (error) {
            this.logger.error('Error creating checkout session', error.stack);
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('client')
    @Post('find-customer-subscription-status-by-account-id')
    findCustomerSubscriptionStatusByAccountId(@Body() findCustomerSubscriptionStatusByAccountIdDto: FindCustomerSubscriptionStatusByAccountIdDto) {
        return this.customerService.findCustomerSubscriptionStatusByAccountId(findCustomerSubscriptionStatusByAccountIdDto.accountId);
    }

    @Post('webhook')
    async handleWebhook(@Req() request: Request, @Res() response: Response) {
        const sig = request.headers['stripe-signature'];

        let event;
        let message = '';
        let status = 200;

        try {
            event = stripe.webhooks.constructEvent(request['rawBody'], sig, process.env.STRIPE_WEBHOOK_SECRET);
            this.logger.verbose(`Stripe webhook event: ${event}`);
        } catch (err) {
            this.logger.error(`Error constructing stripe webhook event: ${err.message}`, err.stack);
            return response.status(400).send(`Webhook Error: ${err.message}`);
        }

        switch (event.type) {

            case 'checkout.session.completed':
                try {
                    const session = event.data.object;
                    this.logger.verbose(`checkout.session.completed event: ${session.id}`);
                    this.logger.debug(`checkout.session.completed event (JSON stringify): ${JSON.stringify(session, null, 2)}`);

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
                    this.logger.verbose(`Invoice payment succeeded event: ${invoice.id}`);
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
                    this.logger.verbose(`Customer subscription created event: ${subscription.id}`);
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
                    this.logger.verbose(`Customer subscription updated event: ${subscription.id}`);
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
                    this.logger.verbose(`Customer subscription deleted event: ${subscription.id}`);
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

        this.logger.verbose(`Success: ${event.id}`);
        return response.status(status).send(message);
    }
}