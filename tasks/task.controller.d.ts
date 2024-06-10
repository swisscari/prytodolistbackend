import { TaskDto } from './dtos/task.dto';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getTasks(): Promise<Task[]>;
    postTask(taskDto: TaskDto): Promise<Task>;
    putTask(id: number, taskDto: TaskDto): Promise<number>;
    deleteTask(id: number): Promise<number>;
}
