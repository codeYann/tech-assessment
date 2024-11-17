import type { IHttp } from "../http";
import express, { type Express } from "express";
import type { Route } from "./routes/routes";
import cors from "cors";

export class HttpExpress implements IHttp {
	private app: Express;

	private constructor(routes: Route[]) {
		this.app = express();
		this.app.use(express.json());
		this.app.use(cors());
		this.addRoutes(routes);
	}

	public static create(routes: Route[]) {
		return new HttpExpress(routes);
	}

	public start(port: number): void {
		this.app.listen(port, () => {
			console.log(`Aplicação rodando em localhost:${port}`);
		});
	}

	private addRoutes(routes: Route[]): void {
		for (const route of routes) {
			const path = route.getPath();
			const method = route.getMethod();
			const handler = route.getHandler();
			this.app[method](path, handler);
		}
	}
}
