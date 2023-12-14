import { IsEmail, Length } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'msgEmail: Email is not valid' })
  email: string;
  @Length(4, 20, {
    message:
      'msgPassword: Password must be at least 4 characters and not more than 20 characters',
  })
  password: string;
}
