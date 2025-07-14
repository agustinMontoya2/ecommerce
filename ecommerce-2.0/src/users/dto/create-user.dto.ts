import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Length,
} from 'class-validator';
import { Match } from '../../custom-validators/match.decorator';
export class CreateUserDto {
  /**
   * Name of the user must have at least 3 characters and at most 80
   * @example 'John Doe'
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin: boolean;

  /**
   * Email of the user must be a valid email
   * @example 'mail@example.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Password of the user must have at least 8 characters, at least 1 uppercase, at least 1 lowercase, at least 1 number and at least 1 symbol
   * @example 'Password123!'
   */
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  /**
   * Confirm password must match the password
   * @example 'Password123!'
   */
  @Match('password')
  confirmPassword: string;

  /**
   * Phone of the user must be a valid phone number
   * @example '123456789'
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  superAdmin = 'superAdmin',
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
