import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transactions/transaction.module';

@Module({
  imports: [TransactionModule],
  controllers: [AppController],
  providers: [AppService, TransactionModule],
})
export class AppModule {}
