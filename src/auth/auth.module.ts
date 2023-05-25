import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CustomerModule } from '../customer/customer.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	controllers: [AuthController],
	imports: [
		JwtModule.registerAsync(  { useFactory: () => ({
            secret: process.env.JWT_SECRET
          })
        }),
		PassportModule,
        CustomerModule
	],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
