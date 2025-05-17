import { SeasonDomain } from '@/domain/season.domain';

export abstract class AbsSeasonRepository {
	abstract listAllSeasons(): Promise<SeasonDomain[]>;
	abstract findById(id: string): Promise<SeasonDomain>;
}
