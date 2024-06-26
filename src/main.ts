import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ENVIROMENT } from './config/enviroments'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  await app.listen(ENVIROMENT.PORT)
}
bootstrap()
