import type { Request, Response } from "express";

import type {
	CreateTaskCase,
	CreateTaskInputDTO,
	CreateTaskOutputDTO,
} from "../../../../../cases/create-task";

export class CreateTaskController {
	constructor(private readonly createTaskService: CreateTaskCase) {}

	public async createTask(request: Request, response: Response): Promise<void> {
		const { title, priority } = request.body;

		if (!title) {
			response
				.status(400)
				.json({ error: "Título da tarefa não pode ser vazio!" });
			return;
		}

		const input: CreateTaskInputDTO = {
			title,
			...(priority ? { priority } : {}),
		};

		try {
			const output: CreateTaskOutputDTO =
				await this.createTaskService.execute(input);

			const responsePresenter = {
				id: output.id,	
				createdAt: output.createdAt,
			};

			response.status(201).json(responsePresenter);
		} catch (error) {
			response
				.status(500)
				.json({ error: "Erro inexperado ao criar uma nova tarefa." });
		}
	}
}
