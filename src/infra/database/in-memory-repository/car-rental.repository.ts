import { AbsCarRentalRepository, ScheduleCarRentalData } from '@/application/repository/car-rental.repository';
import { StockDomain } from '@/domain/stock.domain';
import { Car, CarRental, Stock } from '@prisma-generated/prisma';
import { FindAllAvailableCarsBySeasonIdMapper } from '../mapper/find-all-available-cars-by-season-id.mapper';
import { CarDomain } from '@/domain/car.domain';
import { randomUUID } from 'node:crypto';
import { FindFirstAvailableCarByStockIdAndSeasonIdMapper } from '../mapper/find-first-available-car-by-stock-id-and-season-id.mapper';

export class CarRentalRepositoryInMemory implements AbsCarRentalRepository {
	stocks: Stock[] = [];
	cars: Car[] = [];
	carRentals: CarRental[] = [];

	async findAllAvailableCarsBySeasonId(seasonId: string): Promise<StockDomain[]> {
		await Promise.resolve();

		const rentedCarIds = this.carRentals
			.filter(
				(rental) => rental.seasonId === seasonId && ['CONFIRMED', 'IN_PROGRESS', 'PENDING'].includes(rental.status),
			)
			.map((rental) => rental.carId);

		const availableStocks = this.stocks
			.map((stock) => {
				const availableCars = this.cars.filter(
					(car) => car.stockId === stock.id && car.available && !rentedCarIds.includes(car.id),
				);

				return {
					...stock,
					cars: availableCars,
				};
			})
			.filter((stock) => stock.cars.length > 0);

		return availableStocks.map(FindAllAvailableCarsBySeasonIdMapper.toDomain);
	}

	async findFirstAvailableCarByStockIdAndSeasonId(stockId: string, seasonId: string): Promise<CarDomain> {
		await Promise.resolve();

		const rentedCarIds = this.carRentals
			.filter(
				(rental) => rental.seasonId === seasonId && ['CONFIRMED', 'IN_PROGRESS', 'PENDING'].includes(rental.status),
			)
			.map((rental) => rental.carId);

		const car = this.cars.find((car) => car.stockId === stockId && !rentedCarIds.includes(car.id));

		return FindFirstAvailableCarByStockIdAndSeasonIdMapper.toDomain(car);
	}

	async hasUserRentalInSeason(userId: string, seasonId: string): Promise<boolean> {
		await Promise.resolve();
		return this.carRentals.some((rental) => rental.userId === userId && rental.seasonId === seasonId);
	}

	async scheduleCarRental(data: ScheduleCarRentalData): Promise<void> {
		await Promise.resolve();
		this.carRentals.push({
			carId: data.carId,
			seasonId: data.seasonId,
			userId: data.userId,
			totalAmountInCents: data.totalAmountInCents,
			scheduleCode: data.scheduleCode,
			status: 'PENDING',
			id: randomUUID(),
		});
	}
}
