import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Match } from 'src/custom-validators/match.decorator';
import { ApiHideProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  /**
   * Name of the user must have at least 3 characters and at most 80
   * @example 'John Doe'
   */
  @IsString()
  @Length(3, 80)
  @IsOptional()
  name?: string;

  @IsOptional()
  @ApiHideProperty()
  isAdmin?: boolean;

  /**
   * Email of the user must be a valid email
   * @example 'mail@example.com'
   */
  @IsOptional()
  @IsEmail()
  email?: string;

  /**
   * Password of the user must have at least 8 characters, at least 1 uppercase, at least 1 lowercase, at least 1 number and at least 1 symbol
   * @example 'Password123!'
   */
  @IsOptional()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password?: string;

  /**
   * Confirm password must match the password
   * @example 'Password123!'
   */
  @IsOptional()
  @Match('password')
  confirmPassword?: string;

  /**
   * Address of the user must have at least 3 characters and at most 80
   * @example '123 Main Street'
   */
  @IsOptional()
  @IsString()
  @Length(3, 80)
  address?: string;

  /**
   * Phone of the user must be a valid phone number
   * @example '123456789'
   */
  @IsOptional()
  @IsNumber()
  phone?: number;

  /**
   * Optional Country of the user must have at least 5 characters and at most 20
   * @example 'United States'
   */
  @IsOptional()
  @IsString()
  @Length(5, 20)
  country?: string;

  /**
   * Optional City of the user must have at least 5 characters and at most 20
   * @example 'New York'
   */
  @IsOptional()
  @IsString()
  @Length(5, 20)
  city?: string;
}
