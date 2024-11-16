import type { Request, Response } from "express";
import type { CreateTaskCase } from "../../../../../cases/create-task";
import { HttpMethod, type Route } from "../routes";
import { CreateTaskController } from "../../controllers/task/create-task.controller";

export class CreateTaskRoute implements Route {
	private controller: CreateTaskController;

	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		createTaskService: CreateTaskCase,
	) {
		this.controller = new CreateTaskController(createTaskService);
	}

	public static create(createTaskService: CreateTaskCase): CreateTaskRoute {
		return new CreateTaskRoute("/tarefas", HttpMethod.POST, createTaskService);
	}

	public getHandler(): (request: Request, response: Response) => Promise<void> {
		return (request: Request, response: Response) =>
			this.controller.createTask(request, response);
	}

	public getPath(): string {
		return this.path;
	}

	public getMethod(): HttpMethod {
		return this.method;
	}
}
