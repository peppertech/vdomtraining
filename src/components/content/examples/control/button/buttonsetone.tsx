import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojoption";

const ButtonSetOne = () => {
	const formatValues = [
		{ id: "bold", label: "Bold" },
		{ id: "italic", label: "Italic" },
		{ id: "underline", label: "Underline" },
	];

	const [selectedValue, setSelectedValue] = useState("bold");

	return (
		<oj-buttonset-one
			id="setMultipleButtons"
			value={selectedValue}
			aria-label="Choose only one format"
			on-oj-value-changed={(event: {
				detail: { value: string | ((prevState: string) => string) };
			}) => setSelectedValue(event.detail.value)}
		>
			{formatValues.map((format) => (
				<oj-option value={format.id} key={format.id}>
					{format.label}
				</oj-option>
			))}
		</oj-buttonset-one>
	);
};

export default ButtonSetOne;
