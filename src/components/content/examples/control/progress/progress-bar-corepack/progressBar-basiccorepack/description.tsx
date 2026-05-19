import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A progress bar allows the user to visualize the progression of an extended computer operation.</p>This is a demo of the JET Core Pack Progress Bar. You can use oj-input-number to define the value for the
oj-c-progress-bar. Use the "Indeterminate" checkbox to configure the oj-c-progress-bar to display an
indeterminate progress state.`;

export const progressBarBasiccorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
