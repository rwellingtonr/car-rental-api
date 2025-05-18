import { StockDomain } from '@/domain/stock.domain';
import { Car, Stock } from '@prisma-generated/prisma';

export class FindAllAvailableCarsBySeasonIdMapper {
	static toDomain(item: Stock & { cars: Car[] }): StockDomain {
		if (!item) return null;

		return new StockDomain({
			id: item.id,
			brand: item.brand,
			model: item.model,
			peakSeasonPriceInCents: item.cars[0].peakSeasonPriceInCents,
			midSeasonPriceInCents: item.cars[0].midSeasonPriceInCents,
			offSeasonPriceInCents: item.cars[0].offSeasonPriceInCents,
			availableCount: item.cars.length,
			imageUrl: item.cars[0]?.imageUrl,
		});
	}
}
