import { ApiProperty } from '@nestjs/swagger';

export class HandleGetSeasonsResponseDto {
	@ApiProperty({
		type: String,
		example: '9ue1iojqwd',
		description: 'Id of the season',
	})
	id: string;

	@ApiProperty({
		type: String,
		example: 'Peak Season',
		description: 'Type of the season',
	})
	type: string;

	@ApiProperty({
		type: String,
		example: '2023-06-01T00:00:00Z',
		description: 'Start date of the season',
	})
	from: string;

	@ApiProperty({
		type: String,
		example: '2023-09-01T00:00:00Z',
		description: 'End date of the season',
	})
	to: string;
}
