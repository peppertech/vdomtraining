import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A progress circle allows the user to visualize the progression of an extended computer operation.</p>This is a demo of the JET Core Pack Progress Circle. You can use oj-input-number to define the value for the
oj-c-progress-circle. Use the "Indeterminate" checkbox to configure the oj-c-progress-circle to display
an indeterminate progress state.`;

export const progressCircleBasiccorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
