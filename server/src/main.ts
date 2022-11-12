import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from '@shared/configs/app.config';

const port = appConfig.getPort();
const host = appConfig.getHost();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, host, () => console.log(`Server started on port = ${port}`));
}
bootstrap();
