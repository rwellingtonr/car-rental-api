import { AbsSeasonRepository } from '@/application/repository/season.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllSeasonsUseCase {
	constructor(private readonly seasonRepository: AbsSeasonRepository) {}
	async execute() {
		const result = await this.seasonRepository.listAllSeasons();
		return result;
	}
}
