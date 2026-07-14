import 'css!./demo.css';
import 'ojs/ojbutton';
import { ojButton } from 'ojs/ojbutton';
import 'ojs/ojtrain';
import { ojTrain } from 'ojs/ojtrain';
import 'preact';
import { useRef,useState } from 'preact/hooks';

const defaultSteps: ojTrain.Step[] = [
  { label: 'Step One', id: 'stp1' },
  { label: 'Step Two', disabled: true, id: 'stp2' },
  { label: 'Step Three', id: 'stp3' },
  { label: 'Step Four', id: 'stp4' },
  { label: 'Step Five', id: 'stp5' }
];

const stretchedSteps: ojTrain.Step[] = [
  { label: 'Step One', id: 'stp1' },
  { label: 'Step Two', disabled: true, id: 'stp2' },
  { label: 'Step Three', id: 'stp3' },
  { label: 'Step Four', id: 'stp4' },
  { label: 'Step Five', id: 'stp5' }
];

const getStepLabel = (steps: readonly ojTrain.Step[], id: string): string =>
  steps.find((step) => step.id === id)?.label ?? '';

const selectAdjacentStep = (
  train: ojTrain | null,
  getNextStepId: (element: ojTrain) => string | null,
  setSelectedStep: (value: string) => void
): void => {
  if (!train) {
    return;
  }

  const nextStepId = getNextStepId(train);
  if (nextStepId) {
    setSelectedStep(nextStepId);
  }
};

export const TrainButtonNavigation = () => {
  const defaultTrainRef = useRef<ojTrain | null>(null);
  const stretchedTrainRef = useRef<ojTrain | null>(null);
  const [selectedStep, setSelectedStep] = useState<string>('stp1');
  const [selectedStep2, setSelectedStep2] = useState<string>('stp1');

  const handleDefaultTrainChange = (event: ojTrain.selectedStepChanged): void => {
    setSelectedStep(event.detail.value);
  };

  const handleStretchedTrainChange = (event: ojTrain.selectedStepChanged): void => {
    setSelectedStep2(event.detail.value);
  };

  const handlePreviousStep = (_event: ojButton.ojAction): void => {
    selectAdjacentStep(defaultTrainRef.current, (train) => train.getPreviousSelectableStep(), setSelectedStep);
  };

  const handleNextStep = (_event: ojButton.ojAction): void => {
    selectAdjacentStep(defaultTrainRef.current, (train) => train.getNextSelectableStep(), setSelectedStep);
  };

  const handlePreviousStep2 = (_event: ojButton.ojAction): void => {
    selectAdjacentStep(
      stretchedTrainRef.current,
      (train) => train.getPreviousSelectableStep(),
      setSelectedStep2
    );
  };

  const handleNextStep2 = (_event: ojButton.ojAction): void => {
    selectAdjacentStep(stretchedTrainRef.current, (train) => train.getNextSelectableStep(), setSelectedStep2);
  };

  return (
    <div id="train-container">
      <h3>Default</h3>
      <br />
      <div class="demo-default-train-container oj-helper-text-align-center">
        <oj-button
          id="PreviousStep"
          class="demo-default-train-step"
          disabled={selectedStep === 'stp1'}
          onojAction={handlePreviousStep}
        >
          Back
        </oj-button>
        <oj-train
          id="train"
          class="demo-default-train"
          ref={defaultTrainRef}
          selectedStep={selectedStep}
          steps={defaultSteps}
          onselectedStepChanged={handleDefaultTrainChange}
        ></oj-train>
        <oj-button
          id="NextStep"
          class="demo-default-train-step"
          disabled={selectedStep === 'stp5'}
          onojAction={handleNextStep}
        >
          Next
        </oj-button>
      </div>
      <br />
      <h3 id="currentStepText" class="oj-helper-text-align-center">
        You are on {getStepLabel(defaultSteps, selectedStep)}
      </h3>
      <br />
      <h3>Stretch full width</h3>
      <br />
      <div class="oj-sm-margin-4x-bottom">
        <div class="oj-flex-bar">
          <div class="oj-flex-bar-start">
            <oj-button
              class="demo-stretched-train-step"
              disabled={selectedStep2 === 'stp1'}
              onojAction={handlePreviousStep2}
            >
              Back
            </oj-button>
          </div>
          <div class="oj-flex-bar-middle oj-flex">
            <oj-train
              id="train2"
              class="oj-flex-item oj-train-stretch demo-stretched-train"
              ref={stretchedTrainRef}
              selectedStep={selectedStep2}
              steps={stretchedSteps}
              onselectedStepChanged={handleStretchedTrainChange}
            ></oj-train>
          </div>
          <div class="oj-flex-bar-end">
            <oj-button
              class="demo-stretched-train-step"
              disabled={selectedStep2 === 'stp5'}
              onojAction={handleNextStep2}
            >
              Next
            </oj-button>
          </div>
        </div>
        <h3 id="currentStepText2" class="oj-helper-text-align-center">
          You are on {getStepLabel(stretchedSteps, selectedStep2)}
        </h3>
      </div>
    </div>
  );
};

export default TrainButtonNavigation;
