import type { PriorityType } from "../../domain/task/entity/task";
import type { TaskGateway } from "../../domain/task/gateway/task.gateway";
import type { Case } from "../case";

export type ListTaskOutputDTO = {
	tasks: Array<{
		id: string;
		title: string;
		priority: PriorityType;
		completed: boolean;
		createdAt: Date;
	}>;
};

export class ListTaskCase implements Case<void, ListTaskOutputDTO> {
	private constructor(private readonly taskGateway: TaskGateway) {}

	public static create(taskGateway: TaskGateway): ListTaskCase {
		return new ListTaskCase(taskGateway);
	}

	public async execute(): Promise<ListTaskOutputDTO> {
		try {
			const tasks = await this.taskGateway.list();
			const response = {
				tasks: tasks.map((task) => ({
					id: task.getId(),
					title: task.getTitle(),
					priority: task.getPriority(),
					completed: task.isCompleted(),
					createdAt: task.getCreatedAt(),
				})),
			};

			return response;
		} catch (error) {
			console.error("Error fetching tasks:", error);
			throw new Error("Failed to list tasks");
		}
	}
}
