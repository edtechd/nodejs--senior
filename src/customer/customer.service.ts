import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetCustomerInput } from './dto/customer.input';
import { CustomerDTO } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}
  async findAll(params: GetCustomerInput) {
    const { skip, take, cursor, where } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async getCustomerById(id: string): Promise<CustomerDTO> {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  async getCustomerByEmail(email: string): Promise<CustomerDTO> {
    return this.prisma.customer.findUnique({ where: { email } });
  }

  async createCustomer(email: string, password: string): Promise<CustomerDTO> {
    return this.prisma.customer.create({ data: { email, password } });
  }

  async updateCustomer(
    id: string,
    updatedCustomerDto: CustomerDTO,
  ): Promise<CustomerDTO> {
    return this.prisma.customer.update({
      where: { id },
      data: updatedCustomerDto,
    });
  }

  async deleteCustomer(id: string): Promise<void> {
    await this.prisma.customer.delete({ where: { id } });
  }  
}
