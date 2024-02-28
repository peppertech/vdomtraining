import "preact";
import { ButtonElement } from "ojs/ojbutton"; // import the types for oj-button
import "ojs/ojbutton"; // Import Oracle JET Button component

const Button = () => {
  const handleOjAction = (event: ButtonElement.ojAction) => {
    const label = event.detail.originalEvent.currentTarget.innerText;
    console.log("Button clicked: ", label ? label : "Icon Only");
  };

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
    </div>
  );
};

export default Button;
