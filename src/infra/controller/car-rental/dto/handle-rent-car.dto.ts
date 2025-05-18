import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HandleRentCarDto {
	@ApiProperty({
		type: String,
		example: '9ue1iojqwd',
		description: 'Id of the stock to be rented',
	})
	@IsString()
	@IsNotEmpty()
	stockId: string;

	@ApiProperty({
		type: String,
		example: '29ue1iojqwd',
		description: 'Season id of the car to be rented',
	})
	@IsString()
	@IsNotEmpty()
	seasonId: string;
}
