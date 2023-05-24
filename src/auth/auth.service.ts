import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerDTO } from '../customer/dto/customer.dto';
import { Role } from '.prisma/client';
import { genSalt, hash, compare } from 'bcryptjs';
import { WRONG_USER_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService, 
		private readonly customerService: CustomerService
	) { }

	async createUser(dto: CustomerDTO) {
		const salt = await genSalt(10);
		dto.password = await hash(dto.password, salt)
		await this.customerService.createCustomer(dto);
	}

	async validateUser(email: string, password: string): Promise<CustomerDTO> {
		const user = await this.customerService.getCustomerByEmail(email);
		if (!user) {
			throw new UnauthorizedException(WRONG_USER_ERROR);
		}
		const isCorrectPassword = await compare(password, user.password);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_USER_ERROR);
		}
		return user;
	}

	async login(email: string, role: Role) {
		const payload = { email, role };
		return {
			access_token: await this.jwtService.signAsync(payload)
		};
	}
}
