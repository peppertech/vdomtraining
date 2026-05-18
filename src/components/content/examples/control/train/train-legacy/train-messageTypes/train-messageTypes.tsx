import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import { ojTrain } from 'ojs/ojtrain';
import 'ojs/ojbutton';
import 'ojs/ojoption';
import 'ojs/ojtrain';

type ButtonsetOneValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-buttonset-one'>['onvalueChanged']>>[0];
type MessageType = NonNullable<ojTrain.Step['messageType']>;
type MessageOption = {
  id: MessageType;
  label: string;
};

const gallerySteps: ojTrain.Step[] = [
  { label: 'Step One', visited: true, messageType: 'confirmation', id: 'gallery-stp1' },
  { label: 'Step Two', visited: true, messageType: 'error', id: 'gallery-stp2' },
  { label: 'Step Three', visited: true, messageType: 'warning', id: 'gallery-stp3' },
  { label: 'Step Four', visited: true, messageType: 'info', id: 'gallery-stp4' },
  { label: 'Step Five', id: 'gallery-stp5' }
];

const initialSelectionSteps: ojTrain.Step[] = [
  { label: 'Step One', id: 'selection-stp1' },
  { label: 'Step Two', id: 'selection-stp2' },
  { label: 'Step Three', id: 'selection-stp3' },
  { label: 'Step Four', id: 'selection-stp4' },
  { label: 'Step Five', id: 'selection-stp5' }
];

const customMessageArray: MessageOption[] = [
  { id: 'fatal', label: 'Fatal' },
  { id: 'error', label: 'Error' },
  { id: 'warning', label: 'Warning' },
  { id: 'info', label: 'Info' },
  { id: 'confirmation', label: 'Confirmation' }
];

export const TrainMessageTypes = () => {
  const [selectedStep, setSelectedStep] = useState<string>('selection-stp1');
  const [currentMessage, setCurrentMessage] = useState<MessageType>('confirmation');
  const [stepArraySelection, setStepArraySelection] = useState<ojTrain.Step[]>(initialSelectionSteps);

  const handleCurrentMessageChanged = (event: ButtonsetOneValueChangedEvent): void => {
    setCurrentMessage((event.detail.value ?? 'confirmation') as MessageType);
  };

  const handleSelectedStepChanged = (event: ojTrain.selectedStepChanged): void => {
    setSelectedStep(event.detail.value);
  };

  const handleTrainDeselect = (event: ojTrain.ojDeselect): void => {
    const previousStepId = event.detail.fromStep.id;
    setStepArraySelection((currentSteps) =>
      currentSteps.map((step) =>
        step.id === previousStepId ? { ...step, messageType: currentMessage } : step
      )
    );
  };

  return (
    <div id="train-container">
      <div class="oj-sm-margin-4x">
        <h3>Gallery</h3>
      </div>
      <oj-train id="gallery-train" selectedStep="gallery-stp5" steps={gallerySteps}></oj-train>
      <br />

      <div class="oj-sm-margin-4x">
        <h3>Message Type Selection</h3>
        <span>
          Click on a step or label to move to that step. Selecting a messageType will display the corresponding
          message icon on the previous step when transitioning to a new step.
        </span>
      </div>
      <div id="buttons-container" class="oj-sm-margin-4x">
        <oj-buttonset-one
          class="oj-sm-margin-4x"
          id="messageTypeButtonSet"
          value={currentMessage}
          aria-label="Choose a message type to apply to the previous step after navigating to a new step."
          onvalueChanged={handleCurrentMessageChanged}
        >
          {customMessageArray.map((messageOption) => (
            <oj-option key={messageOption.id} value={messageOption.id}>
              <span>{messageOption.label}</span>
            </oj-option>
          ))}
        </oj-buttonset-one>
      </div>
      <oj-train
        id="selection-train"
        selectedStep={selectedStep}
        steps={stepArraySelection}
        onojDeselect={handleTrainDeselect}
        onselectedStepChanged={handleSelectedStepChanged}
      ></oj-train>
      <br />
    </div>
  );
};

export default TrainMessageTypes;
