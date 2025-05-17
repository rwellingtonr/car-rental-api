import { ListAllSeasonsUseCase } from '@/application/use-cases/season/list-all-seasons.use-case';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HandleGetSeasonsResponseDto } from './dto/handle-get-seasons-response.dto';

@ApiTags('Seasons')
@Controller('seasons')
export class SeasonController {
	constructor(private readonly listAllSeasonsUseCase: ListAllSeasonsUseCase) {}

	@ApiOkResponse({ type: HandleGetSeasonsResponseDto, isArray: true })
	@ApiOperation({ summary: 'List seasons' })
	@Get()
	handleGetSeasons() {
		return this.listAllSeasonsUseCase.execute();
	}
}
