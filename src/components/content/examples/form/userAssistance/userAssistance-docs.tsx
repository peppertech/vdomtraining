import { h } from "preact";

export const userAssistanceDescription = (
  <>
    <p>
      This recipe collects the user-assistance patterns used across form
      controls, including help hints, instructions, and custom messages.
    </p>
    <p>
      It takes logical cues from the cookbook help, hints, and messaging
      examples while using core pack inputs in the VDOM demo.
    </p>
  </>
);

export const userAssistanceRecipe = (
  <ol>
    <li>Add form controls that support help and messaging APIs.</li>
    <li>
      Configure <code>help</code>, <code>helpHints</code>, and{" "}
      <code>messagesCustom</code> to show different assistance channels.
    </li>
    <li>
      Pair the controls with validation group behavior when you want to surface
      message flow in a larger form.
    </li>
  </ol>
);
