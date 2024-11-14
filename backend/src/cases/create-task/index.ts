import { type PriorityType, Task } from "../../domain/task/entity/task";
import type { TaskGateway } from "../../domain/task/gateway/task.gateway";
import type { Case } from "../case";

export type CreateTaskInputDTO = {
	title: string;
	priority?: PriorityType;
};

export type CreateTaskOutputDTO = {
	id: string;
};

export class CreateTaskCase
	implements Case<CreateTaskInputDTO, CreateTaskOutputDTO>
{
	private constructor(private readonly taskGateway: TaskGateway) {}

	public static create(taskGateway: TaskGateway): CreateTaskCase {
		return new CreateTaskCase(taskGateway);
	}

	public async execute({
		title,
		priority,
	}: CreateTaskInputDTO): Promise<CreateTaskOutputDTO> {
		try {
			const task = Task.create(title, priority);
			await this.taskGateway.save(task);
			return { id: task.getId() };
		} catch (error) {
			console.error("Error creating task:", error);
			throw new Error("Failed to create task");
		}
	}
}
