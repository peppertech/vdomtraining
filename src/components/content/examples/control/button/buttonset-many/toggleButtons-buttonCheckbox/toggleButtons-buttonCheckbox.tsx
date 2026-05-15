import { h } from 'preact';
import { useState } from 'preact/hooks';
import 'ojs/ojbutton';

export const ToggleButtonsButtonCheckbox = () => {
  const [isAdvanced, setIsAdvanced] = useState<string[]>([]);
  const userText = `User is: ${isAdvanced.length ? 'an expert' : 'a beginner'}`;

  const handleValueChanged = (event: any) => {
    if (event.detail.updatedFrom === 'internal') {
      setIsAdvanced(event.detail.value ?? []);
    }
  };

  return (
    <div id="buttons-container">
      <div class="oj-sm-margin-4x-bottom">
        <oj-buttonset-many id="advancedWrapper" value={isAdvanced} onvalueChanged={handleValueChanged}>
          <oj-option value="advanced">Advanced mode</oj-option>
        </oj-buttonset-many>
      </div>
      <p class="oj-typography-bold" id="userText">
        {userText}
      </p>
    </div>
  );
};

export default ToggleButtonsButtonCheckbox;
