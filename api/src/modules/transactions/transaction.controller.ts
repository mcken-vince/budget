import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('transactions')
  findAll() {
    return this.transactionService.findAll();
  }
}