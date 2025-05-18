import { CarDomain } from '@/domain/car.domain';
import { StockDomain } from '@/domain/stock.domain';

export type ScheduleCarRentalData = {
	carId: string;
	seasonId: string;
	userId: string;
	totalAmountInCents: number;
	scheduleCode: string;
};

export abstract class AbsCarRentalRepository {
	abstract findAllAvailableCarsBySeasonId(seasonId: string): Promise<StockDomain[]>;
	abstract hasUserRentalInSeason(userId: string, seasonId: string): Promise<boolean>;
	abstract findFirstAvailableCarByStockIdAndSeasonId(stockId: string, seasonId: string): Promise<CarDomain>;
	abstract scheduleCarRental(data: ScheduleCarRentalData): Promise<void>;
}
