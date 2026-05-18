import { h } from 'preact';
import { useState } from 'preact/hooks';
import { ojTrain } from 'ojs/ojtrain';
import 'ojs/ojtrain';

const stepArray: ojTrain.Step[] = [
  { label: 'Step One', id: 'stp1', disabled: false },
  { label: 'Step Two', id: 'stp2', disabled: false },
  { label: 'Step Three', id: 'stp3', disabled: false },
  { label: 'Step Four', id: 'stp4', disabled: false },
  { label: 'Step Five', id: 'stp5', disabled: false }
];

const getStepLabel = (steps: readonly ojTrain.Step[], id: string): string =>
  steps.find((step) => step.id === id)?.label ?? '';

export const TrainNonlinear = () => {
  const [selectedStepValue, setSelectedStepValue] = useState<string>('stp1');

  const handleTrainChange = (event: ojTrain.selectedStepChanged): void => {
    setSelectedStepValue(event.detail.value);
  };

  return (
    <div id="train-container">
      <h3 class="oj-helper-text-align-center">Non linear train</h3>
      <oj-train
        id="nonlineartrain"
        class="oj-train-stretch oj-sm-margin-4x-horizontal"
        selectedStep={selectedStepValue}
        steps={stepArray}
        onselectedStepChanged={handleTrainChange}
      ></oj-train>
      <div class="oj-sm-margin-4x-vertical">
        <p class="oj-helper-text-align-center">You are on {getStepLabel(stepArray, selectedStepValue)}</p>
      </div>
    </div>
  );
};

export default TrainNonlinear;
