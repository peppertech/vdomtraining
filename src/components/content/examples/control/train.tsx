import "preact";
import { useState, useRef } from "preact/hooks";
import "ojs/ojtrain";
import { TrainElement } from "ojs/ojtrain";

const stepArray = [
  { label: "Step One", id: "stp1", disabled: false },
  { label: "Step Two", id: "stp2", disabled: false },
  { label: "Step Three", id: "stp3", disabled: true },
  { label: "Step Four", id: "stp4", disabled: true },
  { label: "Step Five", id: "stp5", disabled: true },
];

const Train = () => {
  const [selectedStep, setSelectedStep] = useState<string>("stp1");
  const [selectedStepLabel, setSelectedStepLabel] =
    useState<string>("Step One");

  const trainRef = useRef<TrainElement>(null);

  const update = (event: TrainElement.selectedStepChanged) => {
    const selectedStep = trainRef?.current?.getStep(
      event.detail.value
    ) as TrainElement.Step;
    if (selectedStep != null) {
      setSelectedStep(event.detail.value);
      setSelectedStepLabel(selectedStep.label);
    }
    for (let i = 0; i <= stepArray.length - 1; i++) {
      const previousStepId = event.detail.previousValue;
      const step: Partial<TrainElement.Step> = stepArray[i];
      if (step.id == selectedStep.id && i < stepArray.length - 1) {
        stepArray[i + 1].disabled = false;
        step.messageType = undefined;
      }
      if (step.id == previousStepId) {
        step.messageType = "confirmation";
      }
    }
  };

  return (
    <>
      <oj-train
        ref={trainRef}
        id="lineartrain"
        class="oj-train-stretch oj-sm-margin-4x-horizontal"
        onselectedStepChanged={update}
        selectedStep={selectedStep}
        steps={stepArray}></oj-train>
      <div class="oj-sm-margin-4x-vertical">
        <p class="oj-helper-text-align-center">
          {`You are on ${selectedStepLabel}`}
        </p>
      </div>
    </>
  );
};

export default Train;
