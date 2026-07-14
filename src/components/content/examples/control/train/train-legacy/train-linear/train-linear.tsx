import 'ojs/ojtrain';
import { ojTrain } from 'ojs/ojtrain';
import 'preact';
import { useState } from 'preact/hooks';

const initialSteps: ojTrain.Step[] = [
  { label: 'Step 1', id: 'stp1', disabled: false },
  { label: 'Step 2', id: 'stp2', disabled: false },
  { label: 'Step 3', id: 'stp3', disabled: true },
  { label: 'Step 4', id: 'stp4', disabled: true },
  { label: 'Step 5', id: 'stp5', disabled: true }
];

const getStepLabel = (steps: readonly ojTrain.Step[], id: string): string =>
  steps.find((step) => step.id === id)?.label ?? '';

export const TrainLinear = () => {
  const [selectedStepValue, setSelectedStepValue] = useState<string>('stp1');
  const [steps, setSteps] = useState<ojTrain.Step[]>(initialSteps);

  const handleTrainChange = (event: ojTrain.selectedStepChanged): void => {
    const nextSelectedStep = event.detail.value;
    const previousStepId = event.detail.previousValue;

    setSelectedStepValue(nextSelectedStep);
    setSteps((currentSteps) => {
      const nextSteps = currentSteps.map((step) => ({ ...step }));
      const selectedIndex = nextSteps.findIndex((step) => step.id === nextSelectedStep);

      if (selectedIndex >= 0 && selectedIndex < nextSteps.length - 1) {
        nextSteps[selectedIndex + 1].disabled = false;
      }

      nextSteps.forEach((step) => {
        if (step.id === nextSelectedStep) {
          step.messageType = null;
        } else if (step.id === previousStepId) {
          step.messageType = 'confirmation';
        }
      });

      return nextSteps;
    });
  };

  return (
    <div id="train-container">
      <h3 class="oj-helper-text-align-center">Linear train</h3>
      <oj-train
        id="lineartrain"
        class="oj-train-stretch oj-sm-margin-4x-horizontal"
        selectedStep={selectedStepValue}
        steps={steps}
        onselectedStepChanged={handleTrainChange}
      ></oj-train>
      <div class="oj-sm-margin-4x-vertical">
        <p class="oj-helper-text-align-center">You are on {getStepLabel(steps, selectedStepValue)}</p>
      </div>
    </div>
  );
};

export default TrainLinear;
