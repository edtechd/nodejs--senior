import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaService } from 'src/prisma.service';
import { CustomerResolver } from './customer.resolver';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [],
  controllers: [ CustomerController ],
  providers: [CustomerService, PrismaService, CustomerResolver, JwtStrategy],
  exports: [CustomerService]
})
export class CustomerModule {}
