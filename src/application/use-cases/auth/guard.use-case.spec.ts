import { JwtProviderService } from '@/common/provider/jwt/jwt-provider.service';
import { AuthGuard } from './guard.use-case';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('auth guard', () => {
	// Successfully validates a request with a valid Bearer token
	it('should allow access when a valid Bearer token is provided', async () => {
		// Arrange
		const mockJwtService = {
			verify: vi.fn().mockResolvedValue({ userId: '123' }),
		};

		const guard = new AuthGuard(mockJwtService as unknown as JwtProviderService);

		const mockRequest = {
			headers: {
				authorization: 'Bearer valid-token',
			},
		};

		const mockContext = {
			switchToHttp: () => ({
				getRequest: () => mockRequest,
			}),
		} as ExecutionContext;

		// Act
		const result = await guard.canActivate(mockContext);

		// Assert
		expect(result).toBe(true);
		expect(mockJwtService.verify).toHaveBeenCalledWith('valid-token');
		expect(mockRequest['user']).toEqual({ userId: '123' });
	});

	// Throws UnauthorizedException when no Authorization header is present
	it('should throw UnauthorizedException when no Authorization header is present', async () => {
		// Arrange
		const mockJwtService = {
			verify: vi.fn(),
		};

		const guard = new AuthGuard(mockJwtService as unknown as JwtProviderService);

		const mockRequest = {
			headers: {},
		};

		const mockContext = {
			switchToHttp: () => ({
				getRequest: () => mockRequest,
			}),
		} as ExecutionContext;

		// Act & Assert
		await expect(guard.canActivate(mockContext)).rejects.toThrow(UnauthorizedException);
		expect(mockJwtService.verify).not.toHaveBeenCalled();
	});

	// Throws UnauthorizedException when Authorization header doesn't use Bearer scheme
	it("should throw UnauthorizedException when Authorization header doesn't use Bearer scheme", async () => {
		// Arrange
		const mockJwtService = {
			verify: vi.fn(),
		};

		const guard = new AuthGuard(mockJwtService as unknown as JwtProviderService);

		const mockRequest = {
			headers: {
				authorization: 'Basic some-credentials',
			},
		};

		const mockContext = {
			switchToHttp: () => ({
				getRequest: () => mockRequest,
			}),
		} as ExecutionContext;

		// Act & Assert
		await expect(guard.canActivate(mockContext)).rejects.toThrow(UnauthorizedException);
		expect(mockJwtService.verify).not.toHaveBeenCalled();
	});
});
