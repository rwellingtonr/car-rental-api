import { UserRepositoryInMemory } from '@/infra/database/in-memory-repository/user.repository';
import { RegisterUseCase } from './register.use-case';
import { BadRequestException } from '@nestjs/common';

describe('RegisterUseCase', () => {
	let repository: UserRepositoryInMemory;
	let sut: RegisterUseCase;

	beforeEach(() => {
		repository = new UserRepositoryInMemory();
		sut = new RegisterUseCase(repository);
	});

	// Successfully registers a user with valid credentials and unexpired license
	it('should register a user when credentials are valid and license is not expired', async () => {
		const registerDto = {
			driveLicense: 'ABC123456',
			driveLicenseExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days in the future
			email: 'test@example.com',
			password: 'password123',
		};

		// Act
		await sut.execute(registerDto);

		// Assert
		expect(repository.user).toHaveLength(1);
		expect(repository.user[0]).toEqual(expect.objectContaining({ email: registerDto.email }));
	});

	// Throws BadRequestException when drive license is expired
	it('should throw BadRequestException when drive license is expired', async () => {
		const registerDto = {
			driveLicense: 'ABC123456',
			driveLicenseExpiry: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day in the past
			email: 'test@example.com',
			password: 'password123',
		};

		// Act & Assert
		await expect(sut.execute(registerDto)).rejects.toThrow(BadRequestException);
	});
});
