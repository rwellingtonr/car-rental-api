import { CarRentalRepositoryInMemory } from '@/infra/database/in-memory-repository/car-rental.repository';
import { GetAvailableCarsUseCase } from './get-available-cars.use-case';
import { SeasonRepositoryInMemory } from '@/infra/database/in-memory-repository/season.repository';
import { faker } from '@faker-js/faker';
import { SeasonType } from '@prisma-generated/prisma';
import { NotFoundException } from '@nestjs/common';

describe('GetAvailableCarsUseCase', () => {
	let sut: GetAvailableCarsUseCase;
	let carRentalRepository: CarRentalRepositoryInMemory;
	let seasonRepository: SeasonRepositoryInMemory;

	beforeEach(() => {
		carRentalRepository = new CarRentalRepositoryInMemory();
		seasonRepository = new SeasonRepositoryInMemory();
		sut = new GetAvailableCarsUseCase(seasonRepository, carRentalRepository);

		const season = {
			createdAt: faker.date.past(),
			endDate: faker.date.future(),
			id: faker.string.uuid(),
			type: faker.helpers.arrayElement([SeasonType.PEAK, SeasonType.MID, SeasonType.OFF]),
			startDate: faker.date.past(),
			updatedAt: faker.date.past(),
		};
		seasonRepository.season.push(season);
	});

	it('should throw error when season not found', async () => {
		await expect(sut.execute({ seasonId: faker.string.ulid() })).rejects.toThrowError(NotFoundException);
	});

	it('should return empty array when no available cars', async () => {
		const result = await sut.execute({ seasonId: seasonRepository.season[0].id });
		expect(result).toHaveLength(0);
	});

	it('should return available cars', async () => {
		carRentalRepository.stocks.push({
			brand: 'Toyota',
			createdAt: faker.date.past(),
			updatedAt: faker.date.past(),
			id: faker.string.uuid(),
			model: faker.vehicle.model(),
		});

		carRentalRepository.cars.push({
			available: true,
			createdAt: faker.date.past(),
			updatedAt: faker.date.past(),
			id: faker.string.uuid(),
			stockId: carRentalRepository.stocks[0].id,
			peakSeasonPriceInCents: faker.number.int({ min: 100, max: 1000 }),
			midSeasonPriceInCents: faker.number.int({ min: 100, max: 1000 }),
			offSeasonPriceInCents: faker.number.int({ min: 100, max: 1000 }),
			imageUrl: faker.image.url(),
		});

		const result = await sut.execute({ seasonId: seasonRepository.season[0].id });
		expect(result).toHaveLength(1);
	});
});
