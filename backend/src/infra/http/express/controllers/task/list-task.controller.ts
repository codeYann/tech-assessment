import type { Request, Response } from "express";
import type { ListTaskCase } from "../../../../../cases/list-tasks";

type ListTasksResponseDTO = {
	tasks: Array<{
		id: string;
		title: string;
		priority: string;
		completed: boolean;
		createdAt: Date;
	}>;
};

export class ListTasksController {
	constructor(private readonly service: ListTaskCase) {}

	public async listTasks(request: Request, response: Response): Promise<void> {
		try {
			const output = await this.service.execute();

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
	}
}
