import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9091']
        },
        consumer: {
          groupId: 'users',          
        },
      },
    },
  );

  await app.listen().then(() => console.log('Micro Service User Up'));
}
bootstrap();
