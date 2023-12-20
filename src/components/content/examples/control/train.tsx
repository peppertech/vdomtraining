import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojtrain";
import { ojTrain } from "ojs/ojtrain";

const Train = () => {
	const [selectedStep, setSelectedStep] = useState("stp1");
	const stepArray = [
		{ label: "Step One", id: "stp1" },
		{ label: "Step Two", id: "stp2" },
		{ label: "Step Three", id: "stp3" },
		{ label: "Step Four", id: "stp4" },
		{ label: "Step Five", id: "stp5" },
	];

	const handleSelectionChange = (event: ojTrain.selectedStepChanged) => {
		setSelectedStep(event.detail.value);
	};

	return (
		<oj-train
			id="nonlineartrain"
			class="oj-train-stretch oj-sm-margin-4x-horizontal"
			selectedStep={selectedStep}
			steps={stepArray}
			onselectedStepChanged={handleSelectionChange}
		></oj-train>
	);
};

export default Train;
