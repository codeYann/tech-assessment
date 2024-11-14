import crypto from "node:crypto";

export type PriorityType = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TaskProps = {
	id: string;
	title: string;
	priority: PriorityType;
	completed: boolean;
	createdAt: Date;
};

const titleErrorMessage = "A tarefa não pode conter um título vazio!";

export class Task {
	private constructor(private props: TaskProps) {
		this.checkHealth();
	}

	public getId(): string {
		return this.props.id;
	}

	public getTitle(): string {
		return this.props.title;
	}

	public getPriority(): PriorityType {
		return this.props.priority;
	}

	public isCompleted(): boolean {
		return this.props.completed;
	}

	public getCreatedAt(): Date {
		return this.props.createdAt;
	}

	public static create(title: string, priority: PriorityType = "LOW"): Task {
		return new Task({
			id: crypto.randomUUID(),
			title,
			priority,
			completed: false,
			createdAt: new Date(),
		});
	}

	public static with(props: TaskProps): Task {
		return new Task(props);
	}

	private checkHealth() {
		if (!this.props.title || this.props.title.trim() === "") {
			throw new Error(titleErrorMessage);
		}
	}

	public toggleCompletionStatus() {
		this.props.completed = !this.props.completed;
	}

	public updateTitle(newTitle: string) {
		if (!newTitle || newTitle.trim() === "") {
			throw new Error(titleErrorMessage);
		}
		this.props.title = newTitle;
	}
}
