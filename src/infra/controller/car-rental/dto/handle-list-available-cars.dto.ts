import { ApiProperty } from '@nestjs/swagger';

export class HandleListAvailableCarsDto {
	@ApiProperty({ type: String, example: '190uepijqw' })
	id: string;
	@ApiProperty({ type: String, example: 'Toyota' })
	brand: string;
	@ApiProperty({ type: String, example: 'Yaris' })
	model: string;
	@ApiProperty({ type: String, example: 'https://example.com/image.jpg' })
	imageUrl: string;
	@ApiProperty({ type: Number, example: 20 })
	availableCount: number;
	@ApiProperty({ type: Number, example: 800 })
	totalPrice: number;
	@ApiProperty({ type: Number, example: 40 })
	averageDailyPrice: number;
}
