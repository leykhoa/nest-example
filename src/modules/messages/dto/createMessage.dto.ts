import { IsNotEmpty, Length } from 'class-validator';

export class CreateMessageDto {
  @Length(500)
  message: string;
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  isSender: boolean;
}
