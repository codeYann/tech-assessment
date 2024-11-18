import type React from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import type { ColourOption } from "../task-select/TaskSelect";

export interface DataType {
	key: string;
	title: string;
	priority: string;
}

const colourOptions: ColourOption[] = [
	{ value: "LOW", label: "Pequena", color: "#00FF00" },
	{ value: "MEDIUM", label: "Média", color: "#4E8CF6" },
	{ value: "HIGH", label: "Alta", color: "#FFA500" },
	{ value: "URGENT", label: "Urgente", color: "#FF0000" },
];

const columns: TableProps<DataType>["columns"] = [
	{
		title: "Título",
		dataIndex: "title",
		key: "title",
		render: (text) => <a href="#none">{text}</a>,
	},
	{
		title: "Prioridade",
		dataIndex: "priority",
		key: "priority",
		render: (priority) => {
			const colourOption = colourOptions.find(
				(option) => option.value === priority,
			);
			const color = colourOption ? colourOption.color : "#000000";
			const label = colourOption ? colourOption.label : priority;

			return <Tag color={color}>{label}</Tag>;
		},
	},
];

export const TaskTable: React.FC<{ data: DataType[] }> = ({ data }) => (
	<Table<DataType> columns={columns} dataSource={data} />
);
