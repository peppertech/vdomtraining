import {ComponentProps} from "preact";
import { ButtonElement } from "ojs/ojbutton"; // import the types for oj-button
import "ojs/ojbutton"; // Import Oracle JET Button component
import "oj-c/button"
import { CButtonElement } from "oj-c/button";

const Button = () => {
  const handleOjAction = (event: ButtonElement.ojAction) => {
    const label = event.detail.originalEvent.currentTarget.innerText;
    console.log("Button clicked: ", label ? label : "Icon Only");
  };
  const handleOjActionCore = (event:CButtonElement.ojAction) => {
    // console.log("Reason: ", event.detail.reason)  
    console.log("CoreButtonID: ", (event.target as HTMLElement).id)  
  }

  return (
    <div>
      <oj-button label="Button Text 1" onojAction={handleOjAction} />
      <br />
      <br />
      <oj-button
        label="Icon Button"
        display="icons"
        onojAction={handleOjAction}>
        <span slot="startIcon" class="oj-ux-ico-information"></span>
      </oj-button>
      <br />
      <br />
      <oj-button label="Disabled Button" disabled={true}></oj-button>
      <br />
      <br />
      <oj-button
        label="Call To Action"
        chroming="callToAction"
        class="oj-button-full-width"
        onojAction={handleOjAction}></oj-button>
      <oj-c-button id="ReasonBtn" label="Check Reason" onojAction={handleOjActionCore}></oj-c-button>
    </div>
  );
};

export default Button;
