import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';

import { TaskDto } from './dtos/task.dto';
import { TaskService } from './task.service';

import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    @ApiResponse({ type: [Task] })
    getTasks(): Promise<Task[]> {
        return this.taskService.getTasks()
    }

    @Post()
    @ApiResponse({ type: Task })
    postTask(@Body() taskDto: TaskDto): Promise<Task> {
        return this.taskService.addTask(taskDto)
    }

    @Put(':id')
    @ApiResponse({ type: Number })
    async putTask(@Param('id') id: number, @Body() taskDto: TaskDto): Promise<number> {
        taskDto.uuid = id
        const affected = await this.taskService.updateTask(taskDto)

        if (!affected) {
            throw new NotFoundException(`Task {${id}} not Found`)
        }

        return affected
    }

    @Delete(':id')
    @ApiResponse({ type: Number })
    async deleteTask(@Param('id') id: number): Promise<number> {
        const affected = await this.taskService.deleteTask(id)

        if (!affected) {
            throw new NotFoundException(`Task {${id}} not Found`)
        }

        return affected
    }
}
