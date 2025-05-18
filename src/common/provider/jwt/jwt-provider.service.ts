import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

type JwtPayload = {
	id: string;
};

@Injectable()
export class JwtProviderService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async sign(payload: JwtPayload): Promise<string> {
		const token = await this.jwtService.signAsync(payload);
		return token;
	}

	async verify(token: string): Promise<any> {
		const decoded = await this.jwtService.verifyAsync<JwtPayload>(token, {
			secret: this.configService.get<string>('JWT_SECRET'),
		});
		return decoded;
	}
}
