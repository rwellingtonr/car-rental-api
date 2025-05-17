import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { CatchErrorMiddleware } from './infra/middleware/catch.middleware';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new ConsoleLogger({
			json: true,
			colors: true,
		}),
	});

	app.setGlobalPrefix('api');
	app.useGlobalFilters(new CatchErrorMiddleware());
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

	const configService = app.get(ConfigService);
	const port = configService.get<string>('PORT');

	const config = new DocumentBuilder()
		.setTitle('Car Rental API')
		.setDescription('Rent a car with ease')
		.setVersion('1.0.0')
		.addBearerAuth()
		.addServer(`http://localhost:${port}`, 'Development')
		.build();

	app.use(
		helmet({
			crossOriginEmbedderPolicy: false,
			contentSecurityPolicy: {
				directives: {
					imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
					scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
					manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
					frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
				},
			},
		}),
	);

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document);

	await app.listen(port, () => console.log('Server is running on port', port));
}

bootstrap().catch(console.error);
