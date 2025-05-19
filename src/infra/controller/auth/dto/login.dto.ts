import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
	@IsEmail()
	@IsNotEmpty()
	@Transform(({ value }) => value?.toLowerCase())
	@ApiProperty({ type: String, example: 'john_doe@main.com' })
	email: string;

	@IsString()
	@ApiProperty({ type: String, example: 'MyP@ssword123' })
	@MinLength(6)
	password: string;
}
