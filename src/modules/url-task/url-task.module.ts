import { Module } from '@nestjs/common';
import { UrlTaskService } from './url-task.service';
import { UrlTaskController } from './url-task.controller';

@Module({
  controllers: [UrlTaskController],
  providers: [UrlTaskService],
})
export class UrlTaskModule {}
