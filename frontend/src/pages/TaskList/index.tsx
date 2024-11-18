import { Menu } from "../../components/menu/Menu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	type DataType,
	TaskTable,
} from "../../components/task-table/TaskTable";
import { useEffect, useState } from "react";
import { apiClient } from "../../api";

function useFetchTasks() {
	const [tasks, setTasks] = useState<DataType[]>([]);

	useEffect(() => {
		const fetchTasks = async () => {
			const response = await apiClient.get("tarefas");
			const tasksResponse = response.data.tasks.map(
				(task: { title: string; priority: string }, idx: number) => ({
					id: idx,
					title: task.title,
					priority: task.priority,
				}),
			);
			setTasks(tasksResponse);
		};

		fetchTasks();
	}, []);

	return tasks;
}

export function TasksList() {
	const tasks = useFetchTasks();

	return (
		<div>
			<Menu linkName="Criar tarefa" path="/" />
			<TaskTable data={tasks} />
			<ToastContainer />
		</div>
	);
}
