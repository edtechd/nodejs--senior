import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CustomerDTO } from './dto/customer.dto';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/role.decorator';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get(':id')
  async getCustomerById(@Param('id') id: string): Promise<CustomerDTO> {
    return this.customerService.getCustomerById(id);
  }

  @Get('email/:email')
  async getCustomerByEmail(@Param('email') email: string): Promise<CustomerDTO> {
    return this.customerService.getCustomerByEmail(email);
  }

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
    async createCustomer(@Body() customerDto: CustomerDTO): Promise<CustomerDTO> {
    return this.customerService.createCustomer(customerDto.email, customerDto.password);
  }

  @Put(':id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
    async updateCustomer(
    @Param('id') id: string,
    @Body() updatedCustomerDto: CustomerDTO,
  ): Promise<CustomerDTO> {
    return this.customerService.updateCustomer(id, updatedCustomerDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteCustomer(@Param('id') id: string): Promise<void> {
    return this.customerService.deleteCustomer(id);
  }
}
