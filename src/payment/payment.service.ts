import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private readonly apiKey: string;
  private stripe: Stripe;

  constructor() {
    this.apiKey = process.env.STRIPE_API_KEY;
    this.stripe = new Stripe(this.apiKey);
  }

  async createSession() {
    const session = await this.stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `https://www.dicio.com.br/sucesso?success=true`,
    });

    return session.client_secret;
  }

  async getSessionStatus(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);

    return {
      status: session.status,
      customer_email: session.customer_details.email,
    };
  }
}
