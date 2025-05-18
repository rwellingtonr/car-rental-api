import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsDateString, IsNumberString, IsNotEmpty } from 'class-validator';

export class RegisterDto {
	@ApiProperty({ type: String, example: 'john_doe@main.com' })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ type: String, example: 'MyP@ssword123' })
	@IsString()
	@MinLength(6)
	password: string;

	@ApiProperty({ type: String, example: '109393' })
	@IsNumberString()
	@IsNotEmpty()
	driveLicense: string;

	@ApiProperty({ type: String, example: '2025-05-14T23:06:02.449Z' })
	@IsDateString()
	@IsNotEmpty()
	driveLicenseExpiry: string;
}
