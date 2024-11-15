import { TaskRepositoryPrisma } from "./infra/repositories/task/task.repository.prisma";
import { prisma } from "./common/prisma/prisma";
import { CreateTaskCase } from "./cases/create-task";
import { ListTaskCase } from "./cases/list-tasks";
import { CreateTaskRoute } from "./infra/http/express/routes/task/create-task";
import { ListTasksRoute } from "./infra/http/express/routes/task/list-task";
import { HttpExpress } from "./infra/http/express/http.express";

(() => {
	const taskRepository = TaskRepositoryPrisma.create(prisma);
	const createTaskCase = CreateTaskCase.create(taskRepository);
	const listTaskCase = ListTaskCase.create(taskRepository);

	const createRoute = CreateTaskRoute.create(createTaskCase);
	const ListRoute = ListTasksRoute.create(listTaskCase);

	const server = HttpExpress.create([createRoute, ListRoute]);

	server.start(8080);
})();
