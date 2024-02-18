import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';

type queryGetSessionStatus = {
  sessionId: string;
};

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-checkout-session')
  create() {
    return this.paymentService.createSession();
  }

  @Get('session-status')
  findByUrl(@Query() query: queryGetSessionStatus) {
    return this.paymentService.getSessionStatus(query.sessionId);
  }
}
