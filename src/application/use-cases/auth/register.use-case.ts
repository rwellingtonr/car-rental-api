import { AbsUserRepository } from '@/application/repository/user.repository';
import type { RegisterDto } from '@/infra/controller/auth/dto/register.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

type RegisterProps = RegisterDto;

@Injectable()
export class RegisterUseCase {
	constructor(private readonly userRepository: AbsUserRepository) {}

	async execute({ driveLicense, driveLicenseExpiry, email, password }: RegisterProps) {
		const now = new Date().getTime();
		const expiryDate = new Date(driveLicenseExpiry).getTime();

		if (expiryDate <= now) {
			throw new BadRequestException('Expired drive license');
		}

		const salt = await bcrypt.genSalt(6);
		const hashedPassword = await bcrypt.hash(password, salt);

		await this.userRepository.create({
			driveLicense,
			driveLicenseExpiry,
			email,
			password: hashedPassword,
		});
	}
}
