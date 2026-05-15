import { h } from "preact";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/button";

type ButtonActionEvent = Parameters<NonNullable<ComponentProps<"oj-c-button">["onojAction"]>>[0];

export const ButtonsEventscorepack = () => {
  const [activatedButton, setActivatedButton] = useState("(None activated yet)");

  const handleButtonAction = (event: ButtonActionEvent) => {
    setActivatedButton((event.currentTarget as HTMLElement).id);
  };

  return (
    <div id="buttons-container">
      <h6>Button Action</h6>
      <div>
        <oj-c-button id="button1" onojAction={handleButtonAction} label="Button Action 1" />
        <oj-c-button id="button2" onojAction={handleButtonAction} label="Button Action 2" />
        <oj-c-button
          id="button3"
          disabled
          onojAction={handleButtonAction}
          display="icons"
          label="Button Action 3"
        >
          <span slot="startIcon" class="oj-ux-ico-information" />
        </oj-c-button>
        <p />
        <p id="last" class="oj-typography-bold">
          ID of last button to be activated:
          <span id="results"> {activatedButton}</span>
        </p>
      </div>
    </div>
  );
};

export default ButtonsEventscorepack;
