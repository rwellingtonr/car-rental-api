import { AbsSeasonRepository } from '@/application/repository/season.repository';
import { SeasonDomain } from '@/domain/season.domain';
import { Season } from '@prisma-generated/prisma';
import { ListAllSeasonsMapper } from '../mapper/list-all-seasons.mapper';

export class SeasonRepositoryInMemory implements AbsSeasonRepository {
	season: Season[] = [];

	async listAllSeasons(): Promise<SeasonDomain[]> {
		await Promise.resolve();
		return this.season.map(ListAllSeasonsMapper.toDomain);
	}

	async findById(id: string): Promise<SeasonDomain> {
		await Promise.resolve();
		const season = this.season.find((season) => season.id === id);
		return ListAllSeasonsMapper.toDomain(season);
	}
}
