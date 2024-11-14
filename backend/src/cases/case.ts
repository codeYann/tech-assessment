export interface Case<Input, Output> {
	execute(input: Input): Promise<Output>;
}
