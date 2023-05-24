import { IsEmail, IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { Role } from '.prisma/client';

export class CustomerDTO {
  @IsString()
  @IsOptional()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsNumber()
  activationCode: number;

}