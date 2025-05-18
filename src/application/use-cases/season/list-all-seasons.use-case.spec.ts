import { SeasonRepositoryInMemory } from '@/infra/database/in-memory-repository/season.repository';
import { ListAllSeasonsUseCase } from './list-all-seasons.use-case';
import { faker } from '@faker-js/faker';
import { SeasonType } from '@prisma-generated/prisma';

describe('ListAllSeasonsUseCase', () => {
	let sut: ListAllSeasonsUseCase;
	let repository: SeasonRepositoryInMemory;

	beforeEach(() => {
		repository = new SeasonRepositoryInMemory();
		sut = new ListAllSeasonsUseCase(repository);
	});

	it('should list all seasons', async () => {
		for (let index = 0; index < 4; index++) {
			repository.season.push({
				createdAt: faker.date.past(),
				endDate: faker.date.future(),
				id: faker.string.uuid(),
				type: faker.helpers.arrayElement([SeasonType.PEAK, SeasonType.MID, SeasonType.OFF]),
				startDate: faker.date.past(),
				updatedAt: faker.date.past(),
			});
		}

		const result = await sut.execute();
		expect(result).toHaveLength(4);
	});
});
