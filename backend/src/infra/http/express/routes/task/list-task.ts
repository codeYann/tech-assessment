import type { Request, Response } from "express";
import type { ListTaskCase } from "../../../../../cases/list-tasks";
import { HttpMethod, type Route } from "../routes";

export type ListTasksResponseDTO = {
	tasks: Array<{
		id: string;
		title: string;
		priority: string;
		completed: boolean;
		createdAt: Date;
	}>;
};

export class ListTasksRoute implements Route {
	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		private readonly listTasksService: ListTaskCase,
	) {}

	public static create(listTasksService: ListTaskCase): ListTasksRoute {
		return new ListTasksRoute("/tarefas", HttpMethod.GET, listTasksService);
	}

	public getHandler(): (request: Request, response: Response) => Promise<void> {
		return async (request: Request, response: Response) => {
			try {
				const output = await this.listTasksService.execute();

				const responsePresenter: ListTasksResponseDTO = {
					tasks:
						output?.tasks.map((task) => ({
							id: task.id,
							title: task.title,
							priority: task.priority.toString(),
							completed: task.completed,
							createdAt: task.createdAt,
						})) || [],
				};

				response.status(200).json(responsePresenter);
			} catch (error) {
				response
					.status(500)
					.json({ error: "Erro inexperado ao buscar as tarefas." });
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
