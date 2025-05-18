import { AbsUserRepository } from '@/application/repository/user.repository';
import { JwtProviderService } from '@/common/provider/jwt/jwt-provider.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';

type LoginProps = {
	email: string;
	password: string;
};

@Injectable()
export class LoginUseCase {
	constructor(
		private readonly userRepository: AbsUserRepository,
		private readonly jwtProviderService: JwtProviderService,
	) {}

	async execute({ email, password }: LoginProps) {
		const user = await this.userRepository.findUserByEmail(email);

		if (!user) {
			throw new UnauthorizedException('Wrong credentials');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) throw new UnauthorizedException('Wrong credentials');

		const accessToken = await this.jwtProviderService.sign({ id: user.id });

		delete user.password;

		return { accessToken, user };
	}
}
