import { UserRepositoryInMemory } from '@/infra/database/in-memory-repository/user.repository';
import { LoginUseCase } from './login.use-case';
import { randomUUID } from 'node:crypto';
import { JwtProviderService } from '@/common/provider/jwt/jwt-provider.service';
import { RegisterUseCase } from './register.use-case';
import { UnauthorizedException } from '@nestjs/common';

describe('LoginUseCase', () => {
	let repository: UserRepositoryInMemory;
	let sut: LoginUseCase;

	beforeEach(async () => {
		repository = new UserRepositoryInMemory();
		const jwtService = {
			sign: vi.fn().mockResolvedValue(randomUUID()),
			verify: vi.fn().mockResolvedValue({ id: randomUUID() }),
		} as unknown as JwtProviderService;

		const registerService = new RegisterUseCase(repository);
		await registerService.execute({
			password: 'hashed-password',
			email: 'john_doe@mail.com',
			driveLicense: '1290387',
			driveLicenseExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
		});

		sut = new LoginUseCase(repository, jwtService);
	});

	// Successfully authenticates user with valid email and password
	it('should return access token when credentials are valid', async () => {
		const result = await sut.execute({ email: 'john_doe@mail.com', password: 'hashed-password' });

		expect(result).toEqual(expect.objectContaining({ accessToken: expect.any(String) }));
	});

	// Throws UnauthorizedException when user with provided email is not found
	it('should throw UnauthorizedException when user is not found', async () => {
		// Act & Assert
		await expect(sut.execute({ email: 'test@mail.com', password: 'hashed-password' })).rejects.toThrow(
			UnauthorizedException,
		);
	});

	// Throws UnauthorizedException when password is incorrect
	it('should throw UnauthorizedException when password is invalid', async () => {
		await expect(sut.execute({ email: 'john_doe@mail.com', password: 'lorem' })).rejects.toThrow(UnauthorizedException);
	});
});
