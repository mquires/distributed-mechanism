import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UrlTaskController } from 'src/modules/url-task/url-task.controller';
import { UrlTaskEntity } from 'src/modules/url-task/url-task.entity';
import { UrlTaskService } from 'src/modules/url-task/url-task.service';

import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...(config.orm as TypeOrmModuleOptions),
      ...(config.orm.sslEnabled
        ? {
            ssl: true,
            extra: {
              ssl: { rejectUnauthorized: false },
            },
          }
        : {}),
    }),
    TypeOrmModule.forFeature([UrlTaskEntity]),
  ],
  providers: [UrlTaskService],
  controllers: [UrlTaskController],
})
export class AppModule {}
