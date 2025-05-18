import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
	@ApiProperty({ type: String, example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
	accessToken: string;
}
