import { Module } from '@nestjs/common';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { accountProviders } from './account.providers';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [AccountController],
  providers: [AccountService, ...accountProviders, JwtService],
  exports: [AccountService],
})
export class AccountModule {}
