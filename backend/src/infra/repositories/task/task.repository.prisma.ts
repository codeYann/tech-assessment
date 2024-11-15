import type { PrismaClient } from "@prisma/client";
import type { TaskGateway } from "../../../domain/task/gateway/task.gateway";
import { Task } from "../../../domain/task/entity/task";

export class TaskRepositoryPrisma implements TaskGateway {
	private constructor(private readonly prismaClient: PrismaClient) {}

	public static create(prismaClient: PrismaClient): TaskRepositoryPrisma {
		return new TaskRepositoryPrisma(prismaClient);
	}

	public async save(task: Task): Promise<void> {
		const data = {
			id: task.getId(),
			title: task.getTitle(),
			priority: task.getPriority(),
			completed: task.isCompleted(),
			createdAt: task.getCreatedAt(),
		};

		try {
			await this.prismaClient.task.create({ data });
		} catch (error) {
			console.error("Error saving task:", error);
			throw new Error("Could not save task");
		}
	}

	public async list(): Promise<Task[]> {
		try {
			const tasks = await this.prismaClient.task.findMany();
			return tasks?.map((task) => Task.with(task)) || [];
		} catch (error) {
			console.error("Error fetching tasks:", error);
			return [];
		}
	}
}
