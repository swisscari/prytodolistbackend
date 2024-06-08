import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskDto } from './dtos/task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) { }

  getTasks(): Promise<Task[]> {
    return this.taskRepository.find()
  }

  addTask(taskDto: TaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(taskDto)
    return this.taskRepository.save(newTask)
  }

  async updateTask(taskDto: TaskDto): Promise<number> {
    const res = await this.taskRepository.update({
      uuid: taskDto.uuid,
    }, taskDto)

    return res.affected
  }

  async deleteTask(uuid: number): Promise<number> {
    const res = await this.taskRepository.delete({ uuid })
    return res.affected
  }
}
