import { type PriorityType, Task } from "../../domain/task/entity/task";
import type { TaskGateway } from "../../domain/task/gateway/task.gateway";
import type { Case } from "../case";

export type UpdateTasksInputDTO = {
	tasks: Array<{
		id: string;
		title: string;
		priority: PriorityType;
		completed: boolean;
		createdAt: Date;
	}>;
};

export type UpdateTasksOutputDTO = {
	tasks: Array<{
		id: string;
		title: string;
		priority: PriorityType;
		completed: boolean;
		createdAt: Date;
	}>;
};

export class UpdateTasksCase
	implements Case<UpdateTasksInputDTO, UpdateTasksOutputDTO>
{
	private constructor(private readonly taskGateway: TaskGateway) {}

	public static create(taskGateway: TaskGateway): UpdateTasksCase {
		return new UpdateTasksCase(taskGateway);
	}

	public async execute(
		inputDTO: UpdateTasksInputDTO,
	): Promise<UpdateTasksOutputDTO> {
		try {
			const tasksToComplete = inputDTO.tasks.map((task) =>
				Task.with({
					id: task.id,
					title: task.title,
					priority: task.priority,
					completed: task.completed,
					createdAt: task.createdAt,
				}),
			);

			const completedTaskIds =
				await this.taskGateway.completeTasks(tasksToComplete);

			const response: UpdateTasksOutputDTO = {
				tasks: completedTaskIds.map((task) => ({
					id: task.getId(),
					title: task.getTitle(),
					priority: task.getPriority(),
					completed: task.isCompleted(),
					createdAt: task.getCreatedAt(),
				})),
			};
			return response;
		} catch (error) {
			console.error("Error updating tasks:", error);
			throw new Error("Failed to update tasks");
		}
	}
}
