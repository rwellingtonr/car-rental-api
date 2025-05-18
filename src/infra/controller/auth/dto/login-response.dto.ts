import { ApiProperty } from '@nestjs/swagger';

class User {
	@ApiProperty({ type: String, example: '2ED969201E2C' })
	id: string;

	@ApiProperty({ type: String, example: 'john_doe@mail.com' })
	email: string;

	@ApiProperty({ type: String, example: '1290387' })
	driveLicense: string;

	@ApiProperty({ type: String, example: '2025-05-17T23:18:22.000Z' })
	driveLicenseExpiry: string;
}

export class LoginResponseDto {
	@ApiProperty({ type: String, example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
	accessToken: string;

	@ApiProperty({ type: User })
	user: User;
}
