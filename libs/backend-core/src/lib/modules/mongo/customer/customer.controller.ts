import { Controller, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCheckoutSessionDto, FindCustomerSubscriptionStatusByAccountIdDto } from '@monorepo/type';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { CustomerEventService } from '../customer-event/customer-event.service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly customerEventService: CustomerEventService,
    ) {}

    @Post('webhook')
    async handleWebhook(@Req() request: Request, @Res() response: Response) {

        const sig = request.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(request['rawBody'], sig, process.env.STRIPE_WEBHOOK_SECRET);
            console.log('Event:', event);
        } catch (err) {
            // On error, log and return the error message
            console.error(`Error message: ${err.message}`);
            return response.status(400).send(`Webhook Error: ${err.message}`);
        }

        const subscription = event.data.object;

        switch (event.type) {

            case 'checkout.session.completed':
                try {
                    const session = event.data.object;
                    console.log('checkout.session.completed event:', session);

                    const accountId = subscription.metadata.accountId
                    const customerId = await this.customerService.findCustomerIdByAccountId(accountId);

                    if (session.subscription) {
                        console.log('Assigning subscription id to customer:', session.subscription);

                        await this.customerService.assignSubscriptionIdToCustomer(customerId, session.subscription);
                    }
                } catch (error) {
                    console.error('Error handling checkout session completed event:', error);
                    return response.status(500).send('Error handling checkout session completed event');
                }
                break;

            case 'invoice.payment_succeeded':
                try {
                    await this.customerEventService.createInvoicePaymentSucceededEvent(subscription, event.id);
                } catch (error) {
                    console.error('Error handling invoice payment succeeded event:', error);
                    return response.status(500).send('Error handling invoice payment succeeded event');
                }
                break;
            case 'customer.subscription.created':
                try {
                    await this.customerEventService.createSubscriptionCreatedEvent(subscription, event.id);
                } catch (error) {
                    console.error('Error handling subscription created event:', error);
                    return response.status(500).send('Error handling subscription created event');
                }
                break;
            case 'customer.subscription.updated':
                try {
                    await this.customerEventService.createSubscriptionUpdatedEvent(subscription, event.id);
                    await this.customerService.updateSubscription(subscription.customer, subscription.id);
                } catch (error) {
                    console.error('Error handling subscription updated event:', error);
                    return response.status(500).send('Error handling subscription updated event');
                }
                break;
            case 'customer.subscription.deleted':
                try {
                    await this.customerEventService.createSubscriptionDeletedEvent(subscription, event.id);
                } catch (error) {
                    console.error('Error handling subscription deleted event:', error);
                    return response.status(500).send('Error handling subscription deleted event');
                }
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        console.log('Success:', event.id);

        // Return a response to acknowledge receipt of the event
        response.json({ received: true });
    }

    @Post('find-customer-subscription-status-by-account-id')
    findCustomerSubscriptionStatusByAccountId(@Body() findCustomerSubscriptionStatusByAccountIdDto: FindCustomerSubscriptionStatusByAccountIdDto) {
        return this.customerService.findCustomerSubscriptionStatusByAccountId(findCustomerSubscriptionStatusByAccountIdDto.accountId);
    }

    @Post('create-checkout-session')
    async createCheckoutSession(@Body() createCheckoutSessionDto: CreateCheckoutSessionDto) {
        console.log('createCheckoutSessionDto:', createCheckoutSessionDto);
        return this.customerService.createCheckoutSession(createCheckoutSessionDto);
    }
}
