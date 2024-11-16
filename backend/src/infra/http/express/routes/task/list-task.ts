import type { Request, Response } from "express";
import type { ListTaskCase } from "../../../../../cases/list-tasks";
import { HttpMethod, type Route } from "../routes";
import { ListTasksController } from "../../controllers/task/list-task.controller";

export class ListTasksRoute implements Route {
	private controller: ListTasksController;

	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		listTasksService: ListTaskCase,
	) {
		this.controller = new ListTasksController(listTasksService);
	}

	public static create(listTasksService: ListTaskCase): ListTasksRoute {
		return new ListTasksRoute("/tarefas", HttpMethod.GET, listTasksService);
	}

	public getHandler(): (request: Request, response: Response) => Promise<void> {
		return (request: Request, response: Response) =>
			this.controller.listTasks(request, response);
	}

	public getPath(): string {
		return this.path;
	}

	public getMethod(): HttpMethod {
		return this.method;
	}
}
