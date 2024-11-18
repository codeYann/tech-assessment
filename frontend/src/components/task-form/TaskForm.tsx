import type React from "react";
import { useState } from "react";
import { TaskSelect, type ColourOption } from "../task-select/TaskSelect";
import { toast } from "react-toastify";

import { apiClient } from "../../api";

import {
	TaskForm,
	Input,
	Button,
	InputContainer,
	TaskFormContainer,
	ButtonContainer,
} from "./TaskFormStyles";

export const CreateTaskForm: React.FC = () => {
	const [title, setTitle] = useState("");
	const [priority, setPriority] = useState<ColourOption | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const postTask = await apiClient.post("/tarefas", {
				title,
				priority: priority?.value,
			});

			if (postTask.status === 201) {
				toast.success("Tarefa criada com sucesso!", {
					position: "top-right",
					autoClose: 2000,
					closeOnClick: true,
					theme: "light",
				});

				setTitle("");
				setPriority(null);
			}
		} catch (error) {
			console.error(error);
			toast.error("Erro ao criar tarefa. Tente novamente.", {
				position: "top-right",
				autoClose: 2000,
				closeOnClick: true,
				theme: "light",
			});
		}
	};

	return (
		<TaskFormContainer>
			<TaskForm onSubmit={handleSubmit}>
				<InputContainer>
					<Input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Título da nova tarefa"
						autoComplete="off"
						required
					/>
					<TaskSelect
						// biome-ignore lint/style/noNonNullAssertion: <explanation>
						selectedOption={priority!}
						onChange={(selectedOption) => setPriority(selectedOption)}
					/>
				</InputContainer>
				<ButtonContainer>
					<Button type="submit">Criar tarefa</Button>
				</ButtonContainer>
			</TaskForm>
		</TaskFormContainer>
	);
};
