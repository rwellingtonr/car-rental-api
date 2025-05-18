import { AbsCarRentalRepository } from '@/application/repository/car-rental.repository';
import { AbsSeasonRepository } from '@/application/repository/season.repository';
import { AbsUserRepository } from '@/application/repository/user.repository';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'node:crypto';

type RequestRentUseCaseProps = {
	userId: string;
	seasonId: string;
	stockId: string;
};

@Injectable()
export class RequestRentUseCase {
	constructor(
		private readonly carRentalRepository: AbsCarRentalRepository,
		private readonly userRepository: AbsUserRepository,
		private readonly seasonRepository: AbsSeasonRepository,
	) {}

	async execute({ userId, seasonId, stockId }: RequestRentUseCaseProps) {
		const [user, season] = await Promise.all([
			this.userRepository.findById(userId),
			this.seasonRepository.findById(seasonId),
		]);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (!season) {
			throw new NotFoundException('Season not found');
		}

		const driveLicenseExpiryDate = new Date(user.driveLicenseExpiry).getTime();
		const seasonEndDate = new Date(season.to).getTime();

		if (driveLicenseExpiryDate < seasonEndDate) {
			throw new BadRequestException('Drive license expired');
		}

		const hasUserRentalInSeason = await this.carRentalRepository.hasUserRentalInSeason(userId, seasonId);

		if (hasUserRentalInSeason) {
			throw new BadRequestException('User already has a rental in this season');
		}

		const availableCar = await this.carRentalRepository.findFirstAvailableCarByStockIdAndSeasonId(stockId, seasonId);

		if (!availableCar) {
			throw new BadRequestException('No available car found');
		}

		const priceField = `${season.type.toLowerCase()}SeasonPriceInCents`;
		const totalPrice = availableCar[priceField];

		const scheduleCode = randomBytes(6).toString('hex').toUpperCase();

		await this.carRentalRepository.scheduleCarRental({
			carId: availableCar.id,
			seasonId,
			userId,
			totalAmountInCents: totalPrice,
			scheduleCode,
		});

		return { scheduleCode };
	}
}
