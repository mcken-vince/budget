import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  findAll(): { message: string } {
    return { message: 'Hello API' };
  }
}
