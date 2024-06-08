import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';

import { Task } from './entities/task.entity';

@Module({
    providers: [TaskService],
    controllers: [TaskController],
    imports: [
        TypeOrmModule.forFeature([Task])
    ],
})
export class TasksModule { }
