import { ComponentProps } from "preact";
import { ButtonElement } from "ojs/ojbutton"; // import the types for ojButton
import "ojs/ojbutton"; // Import Oracle JET Button component

type ButtonProps = ComponentProps<"oj-button">;

type Props = {
  text: string;
  iconStartClass?: string;
  iconEndClass?: string;
  disabled?: ButtonProps["disabled"];
  chroming?: ButtonProps["chroming"];
  size?: "sm" | "md" | "lg"; // Assuming 'md' is the default size
  fullWidth?: boolean; // This could be used for 'oj-button-full-width'
  // onClick?: (event: MouseEvent) => void;
};

const Button = ({
  text,
  iconStartClass,
  iconEndClass,
  disabled = false,
  chroming = "solid",
  size = "md",
  fullWidth = false,
}: // onClick,
Props) => {
  const buttonClasses = `${size === "sm" ? "oj-button-sm" : ""} ${
    size === "lg" ? "oj-button-lg" : ""
  } ${fullWidth ? "oj-button-full-width" : ""}`;

  const handleAction = (event: ButtonElement.ojAction) => {
    console.log(text + " clicked");
    console.log(
      "Button Label: ",
      event.detail.originalEvent.target.textContent
    );
  };

  return (
    <oj-button
      onojAction={handleAction}
      // onClick={onClick}
      disabled={disabled}
      class={buttonClasses}
      chroming={chroming}
      label={text}
      display={iconStartClass || iconEndClass ? "icons" : "all"}>
      {iconStartClass && <span slot="startIcon" class={iconStartClass}></span>}
      {iconEndClass && <span slot="endIcon" class={iconEndClass}></span>}
    </oj-button>
  );
};

export default Button;
