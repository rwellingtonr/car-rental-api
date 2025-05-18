import { Body, Controller, Post } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginUseCase } from '@/application/use-cases/auth/login.use-case';
import { RegisterUseCase } from '@/application/use-cases/auth/register.use-case';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly loginUseCase: LoginUseCase,
		private readonly registerUseCase: RegisterUseCase,
	) {}

	@ApiOperation({ summary: 'User login' })
	@ApiCreatedResponse({ type: LoginResponseDto })
	@ApiBadRequestResponse()
	@ApiUnauthorizedResponse()
	@Post('login')
	async handleLogin(@Body() body: LoginDto) {
		const result = await this.loginUseCase.execute(body);
		return result;
	}

	@ApiCreatedResponse()
	@ApiBadRequestResponse()
	@ApiOperation({ summary: 'User register' })
	@Post('register')
	async handleRegister(@Body() body: RegisterDto) {
		await this.registerUseCase.execute(body);
		return;
	}
}
