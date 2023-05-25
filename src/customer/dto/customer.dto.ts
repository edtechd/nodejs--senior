
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

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsNumber()
  activationCode: number;

}