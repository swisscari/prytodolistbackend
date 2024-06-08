import { NotFoundException } from "@nestjs/common"
import { Repository, UpdateResult } from "typeorm"

import * as data from './data.json'

import { TaskDto } from "../dtos/task.dto"
import { Task } from "../entities/task.entity"

import { TaskService } from "../task.service"
import { TaskController } from "../task.controller"

const returnDelete = {
    affected: 1,
    raw: 'delete...'
}

const returnUpdate = {
    affected: 1,
    raw: 'update...',
    generatedMaps: null
} as UpdateResult;

describe('TaskController', () => {
    const taskDto = new TaskDto()
    const repo = new Repository<Task>(null, null, null);

    const service = new TaskService(repo)
    const controller = new TaskController(service)

    beforeAll(() => {
        jest.spyOn(repo, 'find').mockResolvedValue(data.tasks)
    })

    it('GET /tasks, OK', async () => {
        const tasks = await controller.getTasks()
        expect(tasks.length).toEqual(2)
    })

    it('POST /tasks, OK', async () => {
        returnUpdate.affected = 1
        const taskResult = data[0] as Task

        jest.spyOn(repo, 'create').mockReturnValue(taskResult)
        jest.spyOn(repo, 'save').mockResolvedValue(taskResult)

        controller
            .postTask(taskDto)
            .then(res => expect(res).toEqual(taskResult))
    })

    it('PUT /tasks/:id, OK', async () => {
        returnUpdate.affected = 1
        jest.spyOn(repo, 'update').mockResolvedValue(returnUpdate)

        controller
            .putTask(1, taskDto)
            .then(affected => expect(affected).toEqual(1))
    })

    it('PUT /tasks/:id, NOT FOUND', async () => {
        returnUpdate.affected = 0
        jest.spyOn(repo, 'update').mockResolvedValue(returnUpdate)

        controller
            .putTask(1, taskDto)
            .catch(err => expect(err).toBeInstanceOf(NotFoundException))
    })

    it('DELETE /tasks/:id, OK', async () => {
        returnDelete.affected = 1
        jest.spyOn(repo, 'delete').mockResolvedValue(returnDelete)

        controller
            .deleteTask(1)
            .then(affected => expect(affected).toEqual(1))
    })

    it('DELETE /tasks/:id, NOT FOUND', async () => {
        returnDelete.affected = 0
        jest.spyOn(repo, 'delete').mockResolvedValue(returnDelete)

        controller
            .deleteTask(1)
            .catch(err => expect(err).toBeInstanceOf(NotFoundException))
    })
})