import { Controller, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FindCustomerSubscriptionStatusByAccountIdDto } from '@monorepo/type';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post('webhook')
    async handleWebhook(@Req() request: Request, @Res() response: Response) {

        console.log(process.env.STRIPE_SECRET_KEY);
        console.log(process.env.STRIPE_WEBHOOK_SECRET);

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
        const customerId = subscription.customer;

        switch (event.type) {
            case 'customer.subscription.updated':

                // This might throw an error if something goes wrong
                try {
                    await this.customerService.updateSubscription(customerId, subscription.id);
                    console.log('Subscription updated:', subscription.id);
                } catch (error) {
                    console.error('Error updating subscription:', error);
                    // you might want to return a specific HTTP status code here
                    return response.status(500).send('Error updating subscription');
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
}
