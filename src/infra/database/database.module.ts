import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { AbsUserRepository } from '@/application/repository/user.repository';
import { AbsSeasonRepository } from '@/application/repository/season.repository';
import { SeasonRepository } from './repositories/season.repository';
import { AbsCarRentalRepository } from '@/application/repository/car-rental.repository';
import { CarRentalRepository } from './repositories/car-rental.repository';

@Module({
	providers: [
		PrismaService,
		{
			provide: AbsUserRepository,
			useClass: UserRepository,
		},
		{
			provide: AbsSeasonRepository,
			useClass: SeasonRepository,
		},
		{
			provide: AbsCarRentalRepository,
			useClass: CarRentalRepository,
		},
	],
	exports: [PrismaService, AbsUserRepository, AbsSeasonRepository, AbsCarRentalRepository],
})
export class DatabaseModule {}
