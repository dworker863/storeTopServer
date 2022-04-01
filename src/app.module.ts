import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Timur1986',
      database: 'storetop',
      models: [],
      autoLoadModels: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
