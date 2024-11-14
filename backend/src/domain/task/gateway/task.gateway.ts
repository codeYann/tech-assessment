import type { Task } from "../entity/task";

export interface TaskGateway {
	save(task: Task): Promise<void>;
	list(): Promise<Task[]>;
}
