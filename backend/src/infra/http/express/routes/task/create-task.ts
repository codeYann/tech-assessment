import type { Request, Response } from "express";
import type {
	CreateTaskCase,
	CreateTaskInputDTO,
	CreateTaskOutputDTO,
} from "../../../../../cases/create-task";

import { HttpMethod, type Route } from "../routes";

export type CreateTaskResponseDTO = {
	id: string;
};

export class CreateTaskRoute implements Route {
	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		private readonly createTaskService: CreateTaskCase,
	) {}

	public static create(createTaskService: CreateTaskCase): CreateTaskRoute {
		return new CreateTaskRoute("/tarefas", HttpMethod.POST, createTaskService);
	}

	public getHandler(): (request: Request, response: Response) => Promise<void> {
		return async (request: Request, response: Response) => {
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

				const responsePresenter: CreateTaskResponseDTO = {
					id: output.id,
				};

				response.status(201).json(responsePresenter);
			} catch (error) {
				response
					.status(500)
					.json({ error: "Erro inexperado ao criar uma nova tarefa." });
			}
		};
	}

	public getPath(): string {
		return this.path;
	}

	public getMethod(): HttpMethod {
		return this.method;
	}
}
