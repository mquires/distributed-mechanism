import { Body, Controller, Get, Post } from '@nestjs/common';

import { UrlTaskService } from './url-task.service';

@Controller('url-tasks')
export class UrlTaskController {
  constructor(private readonly urlTaskService: UrlTaskService) {}

  @Post('create')
  async createTask(@Body('url') url: string): Promise<string> {
    if (!url) {
      throw new Error('URL is required');
    }
    await this.urlTaskService.createTask(url);
    return 'Task created';
  }

  @Get('process')
  async processTasks(): Promise<string> {
    console.log('Task processing started...');
    await this.urlTaskService.processTasksInParallel();
    console.log('Task processing completed');
    return 'Tasks processed in parallel';
  }
}
