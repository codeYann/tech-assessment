import { Menu } from "../../components/menu/Menu";
import { CreateTaskForm } from "../../components/task-form/TaskForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Home() {
	return (
		<div>
			<Menu linkName="Listar Tarefas" path="/tasks" />
			<CreateTaskForm />
			<ToastContainer />
		</div>
	);
}
