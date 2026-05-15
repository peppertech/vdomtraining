import { h } from 'preact';
import { useState } from 'preact/hooks';
import { ojButton } from 'ojs/ojbutton';
import 'ojs/ojbutton';

export const PushButtonsEvents = () => {
  const [activatedButton, setActivatedButton] = useState('(None activated yet)');

  const buttonAction = (event: ojButton.ojAction) => {
    setActivatedButton((event.currentTarget as HTMLElement).id);
    return true;
  };

  return (
    <div id="buttons-container">
      <h6>Button Action</h6>
      <div>
        <oj-button id="button1" onojAction={buttonAction}>
          Button Action 1
        </oj-button>
        <oj-button id="button2" onojAction={buttonAction}>
          Button Action 2
        </oj-button>
        <oj-button id="button3" disabled={true} onojAction={buttonAction} display="icons">
          <span slot="startIcon" class="oj-ux-ico-information" />
          Button Action 3
        </oj-button>
        <p />
        <p id="last" class="oj-typography-bold">
          ID of last button to be activated:
          <span id="results">{activatedButton}</span>
        </p>
      </div>
    </div>
  );
};

export default PushButtonsEvents;
