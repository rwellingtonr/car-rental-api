import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtProviderService } from './jwt-provider.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '3d' },
		}),
	],
	providers: [JwtProviderService],
	exports: [JwtProviderService],
})
export class JwtProviderModule {}
