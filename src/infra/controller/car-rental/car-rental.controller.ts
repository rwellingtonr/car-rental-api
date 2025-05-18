import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HandleRentCarDto } from './dto/handle-rent-car.dto';
import { HandleListAvailableCarsDto } from './dto/handle-list-available-cars.dto';
import { GetAvailableCarsUseCase } from '@/application/use-cases/car-rental/get-available-cars.use-case';
import { AuthGuard } from '@/application/use-cases/auth/guard.use-case';
import { CurrentUser, type User } from '@/common/decorators/current-user.decorator';
import { RequestRentUseCase } from '@/application/use-cases/car-rental/request-rent.use-case';
import { HandleRentCarResponseDto } from './dto/handle-rent-car-response.dto';

@ApiTags('CAR RENTAL')
@Controller('car-rental')
export class CarRentalController {
	constructor(
		private readonly getAvailableCarsUseCase: GetAvailableCarsUseCase,
		private readonly requestRentUseCase: RequestRentUseCase,
	) {}

	@ApiOperation({ summary: 'List cars to rent' })
	@ApiOkResponse({ type: HandleListAvailableCarsDto, isArray: true })
	@ApiNotFoundResponse()
	@Get('available/:seasonId')
	async handleListCarsToRent(@Param('seasonId') seasonId: string) {
		const result = await this.getAvailableCarsUseCase.execute({ seasonId });
		return result;
	}

	@ApiOperation({ summary: 'Rent a car' })
	@ApiCreatedResponse({ type: HandleRentCarResponseDto })
	@ApiBadRequestResponse()
	@ApiNotFoundResponse()
	@ApiUnauthorizedResponse()
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@Post()
	async handleRentCar(@Body() body: HandleRentCarDto, @CurrentUser() { id }: User) {
		const result = await this.requestRentUseCase.execute({ ...body, userId: id });
		return result;
	}
}
