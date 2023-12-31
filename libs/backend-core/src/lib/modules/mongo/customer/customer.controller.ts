import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCheckoutSessionDto } from '@monorepo/type';
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

                    await this.customerEventService.createCheckoutSessionCompletedEvent(session, event.id);
                    status = 200;
                    message = 'Checkout session completed';
                } catch (error) {
                    this.logger.error('Error handling checkout session completed event:', error.stack);
                    status = 500;
                    message = 'Error handling checkout session completed event';
                }
                break;

            case 'payment_intent.succeeded':
                try {
                    const paymentIntent = event.data.object;
                    await this.customerEventService.createPaymentIntentSucceededEvent(paymentIntent, event.id);
                    this.logger.log(`Payment intent succeeded event: ${paymentIntent.id}`);
                    message = 'Payment intent succeeded';
                } catch (error) {
                    this.logger.error('Error handling payment intent succeeded event:', error.stack);
                    status = 500;
                    message = 'Error handling payment intent succeeded event';
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
