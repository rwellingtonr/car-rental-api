import { ApiProperty } from '@nestjs/swagger';

export class HandleRentCarResponseDto {
	@ApiProperty({ type: String, example: '2ED969201E2C' })
	scheduleCode: string;
}
