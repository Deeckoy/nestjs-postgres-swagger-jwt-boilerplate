import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import * as express from 'express';
import {join} from 'path';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

    const config = new DocumentBuilder()
        .setTitle('API Service')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                name: 'Authorization',
                bearerFormat: 'JWT',
                scheme: 'Bearer',
                in: 'header',
            },
            'jwt',
        )
        .addBearerAuth(
            {
                type: 'apiKey',
                name: `${process.env.HEADER_API_NAME}`,
                in: 'header',
            },
            'api',
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('swagger', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    await app.listen(process.env.APP_PORT || 3001);
}

bootstrap();
