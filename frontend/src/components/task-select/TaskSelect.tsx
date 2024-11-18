import type React from "react";
import Select, { type StylesConfig } from "react-select";
import chroma from "chroma-js";

export type ColourOption = {
	value: string;
	label: string;
	color: string;
};

const colourStyles: StylesConfig<ColourOption> = {
	control: (styles) => ({ ...styles, backgroundColor: "white" }),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		const color = chroma(data.color);
		return {
			...styles,
			backgroundColor: isDisabled
				? undefined
				: isSelected
					? data.color
					: isFocused
						? color.alpha(0.1).css()
						: undefined,
			color: isDisabled
				? "#ccc"
				: isSelected
					? chroma.contrast(color, "white") > 2
						? "white"
						: "black"
					: data.color,
			cursor: isDisabled ? "not-allowed" : "default",

			":active": {
				...styles[":active"],
				backgroundColor: !isDisabled
					? isSelected
						? data.color
						: color.alpha(0.3).css()
					: undefined,
			},
		};
	},
	input: (styles) => ({ ...styles, alignItems: "center", display: "flex" }),
	placeholder: (styles) => ({
		...styles,
		alignItems: "center",
		display: "flex",
		color: "#ccc",
	}),
	singleValue: (styles, { data }) => ({
		...styles,
		alignItems: "center",
		display: "flex",
		color: data.color,
	}),
};

const colourOptions: ColourOption[] = [
	{ value: "LOW", label: "Pequena", color: "#00FF00" },
	{ value: "MEDIUM", label: "Média", color: "#4E8CF6" },
	{ value: "HIGH", label: "Alta", color: "#FFA500" },
	{ value: "URGENT", label: "Urgente", color: "#FF0000" },
];

interface TaskSelectProps {
	selectedOption: ColourOption;
	onChange: (option: ColourOption | null) => void;
}

export const TaskSelect: React.FC<TaskSelectProps> = ({
	selectedOption,
	onChange,
}) => (
	<Select
		value={selectedOption}
		options={colourOptions}
		styles={colourStyles}
		onChange={(newValue) => onChange(newValue as ColourOption | null)}
	/>
);
