import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({ type: String, example: 'john_doe@main.com' })
	email: string;

	@IsString()
	@ApiProperty({ type: String, example: 'MyP@ssword123' })
	@MinLength(6)
	password: string;
}
