import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CarRentalController } from './car-rental/car-rental.controller';
import { AuthController } from './auth/auth.controller';
import { JwtProviderModule } from '@/common/provider/jwt/jwt-provider.module';
import { LoginUseCase } from '@/application/use-cases/auth/login.use-case';
import { RegisterUseCase } from '@/application/use-cases/auth/register.use-case';
import { ListAllSeasonsUseCase } from '@/application/use-cases/season/list-all-seasons.use-case';
import { SeasonController } from './season/season.controller';
import { GetAvailableCarsUseCase } from '@/application/use-cases/car-rental/get-available-cars.use-case';
import { RequestRentUseCase } from '@/application/use-cases/car-rental/request-rent.use-case';

@Module({
	providers: [LoginUseCase, RegisterUseCase, ListAllSeasonsUseCase, GetAvailableCarsUseCase, RequestRentUseCase],
	controllers: [CarRentalController, AuthController, SeasonController],
	imports: [DatabaseModule, JwtProviderModule],
})
export class ControllerModule {}
