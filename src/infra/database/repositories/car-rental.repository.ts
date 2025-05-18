import { AbsCarRentalRepository, ScheduleCarRentalData } from '@/application/repository/car-rental.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllAvailableCarsBySeasonIdMapper } from '../mapper/find-all-available-cars-by-season-id.mapper';
import { StockDomain } from '@/domain/stock.domain';
import { CarDomain } from '@/domain/car.domain';
import { FindFirstAvailableCarByStockIdAndSeasonIdMapper } from '../mapper/find-first-available-car-by-stock-id-and-season-id.mapper';

@Injectable()
export class CarRentalRepository implements AbsCarRentalRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async findAllAvailableCarsBySeasonId(seasonId: string): Promise<StockDomain[]> {
		const availableStocks = await this.prismaService.stock.findMany({
			include: {
				cars: {
					where: {
						available: true,
						NOT: {
							carRental: {
								some: {
									seasonId,
									status: { in: ['CONFIRMED', 'IN_PROGRESS', 'PENDING'] },
								},
							},
						},
					},
				},
			},
		});

		return availableStocks.map(FindAllAvailableCarsBySeasonIdMapper.toDomain);
	}

	async hasUserRentalInSeason(userId: string, seasonId: string): Promise<boolean> {
		const existingRental = await this.prismaService.carRental.findFirst({
			where: {
				userId,
				seasonId,
				status: {
					in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS'],
				},
			},
		});

		return !!existingRental;
	}

	async findFirstAvailableCarByStockIdAndSeasonId(stockId: string, seasonId: string): Promise<CarDomain> {
		const result = await this.prismaService.car.findFirst({
			where: {
				stockId,
				available: true,
				NOT: {
					carRental: {
						some: {
							seasonId,
							status: {
								in: ['CONFIRMED', 'IN_PROGRESS', 'PENDING'],
							},
						},
					},
				},
			},
		});

		return FindFirstAvailableCarByStockIdAndSeasonIdMapper.toDomain(result);
	}

	async scheduleCarRental(data: ScheduleCarRentalData): Promise<void> {
		await this.prismaService.carRental.create({
			data: {
				carId: data.carId,
				seasonId: data.seasonId,
				userId: data.userId,
				totalAmountInCents: data.totalAmountInCents,
				scheduleCode: data.scheduleCode,
				status: 'PENDING',
			},
		});
	}
}
