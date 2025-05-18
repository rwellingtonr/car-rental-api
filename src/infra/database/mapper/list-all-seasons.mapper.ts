import { SeasonDomain } from '@/domain/season.domain';
import { Season } from '@prisma-generated/prisma';

export class ListAllSeasonsMapper {
	static toDomain(item: Season): SeasonDomain {
		if (!item) return null;

		return new SeasonDomain({
			id: item.id,
			type: item.type,
			from: item.startDate.toISOString(),
			to: item.endDate.toISOString(),
		});
	}
}
