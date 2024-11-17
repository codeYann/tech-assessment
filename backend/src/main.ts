import { TaskRepositoryPrisma } from "./infra/repositories/task/task.repository.prisma";
import { prisma } from "./common/prisma/prisma";
import { CreateTaskCase } from "./cases/create-task";
import { ListTaskCase } from "./cases/list-tasks";
import { CreateTaskRoute } from "./infra/http/express/routes/task/create-task";
import { ListTasksRoute } from "./infra/http/express/routes/task/list-task";
import { HttpExpress } from "./infra/http/express/http.express";
import { UpdateTasksRoute } from "./infra/http/express/routes/task/update-tasks";
import { UpdateTasksCase } from "./cases/update-tasks";

(() => {
	const taskRepository = TaskRepositoryPrisma.create(prisma);

	const createTaskUseCase = CreateTaskCase.create(taskRepository);
	const listTasksUseCase = ListTaskCase.create(taskRepository);
	const updateTasksUseCase = UpdateTasksCase.create(taskRepository);

	const createTaskRoute = CreateTaskRoute.create(createTaskUseCase);
	const listTasksRoute = ListTasksRoute.create(listTasksUseCase);

	const updateTasksRoute = UpdateTasksRoute.create(updateTasksUseCase);

	const server = HttpExpress.create([
		createTaskRoute,
		listTasksRoute,
		updateTasksRoute,
	]);

	server.start(8080);
})();
