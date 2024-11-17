import type { Request, Response } from "express";
import type {
	UpdateTasksCase,
	UpdateTasksInputDTO,
	UpdateTasksOutputDTO,
} from "../../../../../cases/update-tasks";

export class UpdateTasksController {
	constructor(private readonly service: UpdateTasksCase) {}

	public async updateTasks(
		request: Request,
		response: Response,
	): Promise<void> {
		const { tasks } = request.body;

		const input: UpdateTasksInputDTO = {
			tasks: tasks,
		};

		try {
			const output = await this.service.execute(input);
			const responsePresenter: UpdateTasksOutputDTO = {
				tasks: output.tasks,
			};
			response.status(200).json(responsePresenter);
		} catch (error) {
			response
				.status(500)
				.json({ error: "Erro inexperado ao completar as tarefas." });
		}
	}
}
