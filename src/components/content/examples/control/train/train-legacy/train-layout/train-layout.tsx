import "css!./demo.css";
import 'ojs/ojtrain';
import { ojTrain } from 'ojs/ojtrain';
import 'preact';
import { useState } from 'preact/hooks';

const createTrainSteps = (trainName: string): ojTrain.Step[] => [
  { label: 'Step One', id: `stp1-${trainName}` },
  { label: 'Step Two Text is Long Very Long', id: `stp2-${trainName}` },
  { label: 'Step Three Text is Even Longer Than Step Two Text', id: `stp3-${trainName}` },
  { label: 'Step Four', id: `stp4-${trainName}` }
];

const train1Steps = createTrainSteps('train1');
const train2Steps = createTrainSteps('train2');
const train3Steps = createTrainSteps('train3');

export const TrainLayout = () => {
  const [currentStepValueTrain1, setCurrentStepValueTrain1] = useState<string>('stp1-train1');
  const [currentStepValueTrain2, setCurrentStepValueTrain2] = useState<string>('stp1-train2');
  const [currentStepValueTrain3, setCurrentStepValueTrain3] = useState<string>('stp1-train3');

  const handleTrain1Change = (event: ojTrain.selectedStepChanged): void => {
    setCurrentStepValueTrain1(event.detail.value);
  };

  const handleTrain2Change = (event: ojTrain.selectedStepChanged): void => {
    setCurrentStepValueTrain2(event.detail.value);
  };

  const handleTrain3Change = (event: ojTrain.selectedStepChanged): void => {
    setCurrentStepValueTrain3(event.detail.value);
  };

  return (
    <div id="train-container">
      <h3>Default</h3>
      <oj-train
        id="train1"
        selectedStep={currentStepValueTrain1}
        steps={train1Steps}
        onselectedStepChanged={handleTrain1Change}
      ></oj-train>
      <h3>Stretch full width</h3>
      <oj-train
        id="train2"
        class="oj-train-stretch"
        selectedStep={currentStepValueTrain2}
        steps={train2Steps}
        onselectedStepChanged={handleTrain2Change}
      ></oj-train>
      <h3>Stretch between 240px and 700px</h3>
      <oj-train
        id="train3"
        class="oj-train-stretch oj-sm-margin-4x-horizontal demo-stretched-train-between-240-700"
        selectedStep={currentStepValueTrain3}
        steps={train3Steps}
        onselectedStepChanged={handleTrain3Change}
      ></oj-train>
    </div>
  );
};

export default TrainLayout;
