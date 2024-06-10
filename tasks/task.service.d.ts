import { Repository } from 'typeorm';
import { TaskDto } from './dtos/task.dto';
import { Task } from './entities/task.entity';
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<Task>);
    getTasks(): Promise<Task[]>;
    addTask(taskDto: TaskDto): Promise<Task>;
    updateTask(taskDto: TaskDto): Promise<number>;
    deleteTask(uuid: number): Promise<number>;
}
