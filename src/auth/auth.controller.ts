import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { CustomerDTO } from '../customer/dto/customer.dto';
import { CustomerService } from '../customer/customer.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService,
		private readonly customerService: CustomerService
		) { }

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: CustomerDTO) {
		const oldUser = await this.customerService.getCustomerByEmail(dto.email);
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { email, password }: CustomerDTO) {
		const user = await this.authService.validateUser(email, password);
		return this.authService.login(user.email, user.role);
	}
}
