import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { isAxiosError } from 'axios';
import { UrlTaskStatus } from 'src/modules/url-task/constants/url-task-status';
import { UrlTaskEntity } from 'src/modules/url-task/url-task.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class UrlTaskService {
  constructor(
    @InjectRepository(UrlTaskEntity)
    private urlTaskRepository: Repository<UrlTaskEntity>,
  ) {}

  createTask(url: string): Promise<UrlTaskEntity> {
    const task = this.urlTaskRepository.create({
      url,
      status: UrlTaskStatus.NEW,
    });
    return this.urlTaskRepository.save(task);
  }

  async getAndLockTasks(limit = 5): Promise<UrlTaskEntity[]> {
    const tasks = await this.urlTaskRepository.find({
      where: { status: UrlTaskStatus.NEW },
      take: limit,
    });

    if (tasks.length === 0) return [];

    await this.urlTaskRepository.update(
      { id: In(tasks.map((task) => task.id)) },
      { status: UrlTaskStatus.PROCESSING },
    );

    return tasks;
  }

  async executeUrlRequest(url: string): Promise<number> {
    try {
      const response = await axios.get(url);
      return response.status;
    } catch (error) {
      if (isAxiosError(error)) {
        return error.response ? error.response.status : 500;
      }
      return 500;
    }
  }

  async processTasksInParallel(): Promise<void> {
    console.log('Task processing started...');

    const tasks = await this.getAndLockTasks(5);
    if (tasks.length === 0) {
      console.log('No new tasks');
      return;
    }

    const promises = tasks.map(async (task) => {
      console.log(`Processing: ${task.url}`);

      const httpCode = await this.executeUrlRequest(task.url);
      const status =
        httpCode === 200 ? UrlTaskStatus.DONE : UrlTaskStatus.ERROR;

      await this.urlTaskRepository.update(task.id, {
        status,
        http_code: httpCode,
      });

      console.log(`Completed: ${task.url} -> ${status} (${httpCode})`);
    });

    await Promise.all(promises);
  }
}
