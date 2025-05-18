import { AbsCarRentalRepository } from '@/application/repository/car-rental.repository';
import { AbsSeasonRepository } from '@/application/repository/season.repository';
import { distanceInDays } from '@/common/utils/distance-in-days.util';
import { Injectable, NotFoundException } from '@nestjs/common';

type GetAvailableCarsUseCaseProps = {
	seasonId: string;
};

@Injectable()
export class GetAvailableCarsUseCase {
	constructor(
		private readonly seasonRepository: AbsSeasonRepository,
		private readonly carRentalRepository: AbsCarRentalRepository,
	) {}

	async execute({ seasonId }: GetAvailableCarsUseCaseProps) {
		const season = await this.seasonRepository.findById(seasonId);

		if (!season) {
			throw new NotFoundException('Season not found');
		}

		const availableStocks = await this.carRentalRepository.findAllAvailableCarsBySeasonId(seasonId);

		if (!availableStocks?.length) return [];

		const priceField = `${season.type.toLowerCase()}SeasonPriceInCents`;

		const totalDays = distanceInDays(season.from, season.to);

		const stocks = availableStocks.map((stock) => {
			const totalPrice = stock[priceField];
			const averageDailyPrice = Math.round(totalPrice / totalDays);

			return {
				id: stock.id,
				brand: stock.brand,
				model: stock.model,
				imageUrl: stock.imageUrl,
				availableCount: stock.availableCount,
				totalPrice,
				averageDailyPrice,
			};
		});

		return stocks;
	}
}
