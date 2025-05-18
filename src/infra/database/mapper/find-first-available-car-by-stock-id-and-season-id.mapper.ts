import { CarDomain } from '@/domain/car.domain';
import { Car } from '@prisma-generated/prisma';

export class FindFirstAvailableCarByStockIdAndSeasonIdMapper {
	static toDomain(item: Car): CarDomain {
		if (!item) return null;

		return new CarDomain({
			id: item.id,
			stockId: item.stockId,
			peakSeasonPriceInCents: item.peakSeasonPriceInCents,
			midSeasonPriceInCents: item.midSeasonPriceInCents,
			offSeasonPriceInCents: item.offSeasonPriceInCents,
			available: item.available,
			imageUrl: item.imageUrl,
		});
	}
}
