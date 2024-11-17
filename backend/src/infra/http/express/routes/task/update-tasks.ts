import type { Request, Response } from "express";
import type { UpdateTasksCase } from "../../../../../cases/update-tasks";
import { HttpMethod, type Route } from "../routes";
import { UpdateTasksController } from "../../controllers/task/update-tasks.controller";

export class UpdateTasksRoute implements Route {
	private controller: UpdateTasksController;

	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		updateTasksService: UpdateTasksCase,
	) {
		this.controller = new UpdateTasksController(updateTasksService);
	}

	public static create(updateTasksService: UpdateTasksCase): UpdateTasksRoute {
		return new UpdateTasksRoute(
			"/tarefas",
			HttpMethod.PATCH,
			updateTasksService,
		);
	}

	public getHandler(): (request: Request, response: Response) => Promise<void> {
		return (request: Request, response: Response) =>
			this.controller.updateTasks(request, response);
	}

	public getPath(): string {
		return this.path;
	}

	public getMethod(): HttpMethod {
		return this.method;
	}
}
