import { Module } from '@nestjs/common';
import { ControllerModule } from './infra/controller/controller.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './common/config/validate-env.config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
		ThrottlerModule.forRoot([
			{
				ttl: 10000,
				limit: 50,
			},
		]),
		ControllerModule,
	],
})
export class AppModule {}
