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
			console.error("Erro ao criar a tarefa:", error);
			throw new Error("Não foi possível criar a tarefa!");
		}
	}

	public async list(): Promise<Task[]> {
		try {
			const tasks = await this.prismaClient.task.findMany({
				where: {
					completed: false,
				},
			});
			return tasks?.map((task) => Task.with(task)) || [];
		} catch (error) {
			console.error("Erro ao buscar as tarefas:", error);
			return [];
		}
	}

	public async completeTasks(tasks: Task[]): Promise<Task[]> {
		const completedTasks: Array<Task> = [];

		for (const task of tasks) {
			if (task.isCompleted()) {
				throw new Error("Não é permitido completar uma tarefa já completada!");
			}

			task.toggleCompletionStatus();

			completedTasks.push(
				Task.with({
					id: task.getId(),
					title: task.getTitle(),
					priority: task.getPriority(),
					completed: task.isCompleted(),
					createdAt: task.getCreatedAt(),
				}),
			);
		}

		try {
			await Promise.all(
				completedTasks.map((task) =>
					this.prismaClient.task.update({
						where: { id: task.getId() },
						data: { completed: task.isCompleted() },
					}),
				),
			);
			return completedTasks;
		} catch (error) {
			console.error("Erro ao completar as tarefas:", error);
			throw new Error("Não foi possível completar as tarefas");
		}
	}
}
