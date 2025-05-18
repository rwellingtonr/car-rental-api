import { RequestRentUseCase } from './request-rent.use-case';
import { CarRentalRepositoryInMemory } from '@/infra/database/in-memory-repository/car-rental.repository';
import { UserRepositoryInMemory } from '@/infra/database/in-memory-repository/user.repository';
import { SeasonRepositoryInMemory } from '@/infra/database/in-memory-repository/season.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { SeasonType } from '@prisma-generated/prisma';

describe('RequestRentUseCase', () => {
	let sut: RequestRentUseCase;

	let carRentalRepository: CarRentalRepositoryInMemory;
	let userRepository: UserRepositoryInMemory;
	let seasonRepository: SeasonRepositoryInMemory;

	beforeEach(async () => {
		carRentalRepository = new CarRentalRepositoryInMemory();
		userRepository = new UserRepositoryInMemory();
		seasonRepository = new SeasonRepositoryInMemory();

		sut = new RequestRentUseCase(carRentalRepository, userRepository, seasonRepository);

		await userRepository.create({
			driveLicense: faker.string.uuid(),
			driveLicenseExpiry: faker.date.between({ from: '2026-01-01T01:00:00.000Z', to: '2026-12-31T01:00:00.000Z' }),
			email: faker.internet.email(),
			password: faker.internet.password(),
		});

		seasonRepository.season.push({
			createdAt: faker.date.past(),
			endDate: faker.date.between({ from: '2025-01-01T01:00:00.000Z', to: '2025-12-31T01:00:00.000Z' }),
			id: faker.string.uuid(),
			type: faker.helpers.arrayElement([SeasonType.PEAK, SeasonType.MID, SeasonType.OFF]),
			startDate: faker.date.past(),
			updatedAt: faker.date.past(),
		});
	});

	it('should throw error when user not found', async () => {
		await expect(
			sut.execute({ userId: faker.string.uuid(), seasonId: faker.string.uuid(), stockId: faker.string.uuid() }),
		).rejects.toThrowError(NotFoundException);
	});

	it('should throw error when season not found', async () => {
		await expect(
			sut.execute({ userId: userRepository.user[0].id, seasonId: faker.string.uuid(), stockId: faker.string.uuid() }),
		).rejects.toThrowError(NotFoundException);
	});

	it('should throw error when stock not found', async () => {
		await expect(
			sut.execute({
				userId: userRepository.user[0].id,
				seasonId: seasonRepository.season[0].id,
				stockId: faker.string.uuid(),
			}),
		).rejects.toThrowError(BadRequestException);
	});

	it('should throw error when drive license expired', async () => {
		await userRepository.create({
			driveLicense: faker.string.uuid(),
			driveLicenseExpiry: faker.date.past(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		});
		await expect(
			sut.execute({
				userId: userRepository.user[1].id,
				seasonId: seasonRepository.season[0].id,
				stockId: faker.string.uuid(),
			}),
		).rejects.toThrowError(BadRequestException);
	});

	it('should throw error when user already has a rental in this season', async () => {
		await expect(
			sut.execute({
				userId: userRepository.user[0].id,
				seasonId: seasonRepository.season[0].id,
				stockId: faker.string.uuid(),
			}),
		).rejects.toThrowError(BadRequestException);
	});

	it('should schedule car rental', async () => {
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

		const response = await sut.execute({
			userId: userRepository.user[0].id,
			seasonId: seasonRepository.season[0].id,
			stockId: carRentalRepository.stocks[0].id,
		});

		expect(response.scheduleCode).toEqual(expect.any(String));
	});
});
