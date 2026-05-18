import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A file picker displays a clickable dropzone for selecting files from the device storage.</p><p><strong>NOTE:</strong> This demo should be run on a physical mobile device and support may vary by browser and device.</p>
<p>The <a href="jsdocs/oj-c.FilePicker.html#capture">capture</a> attribute can allow the File Picker to directly launch the camera application on mobile devices when the <a href="jsdocs/oj-c.FilePicker.html#accept">accept</a> attribute is specified and has an associated capture control type (e.g. "image/*"). Specific cameras may be targeted by specifying "user" (front-facing), "environment" (rear-facing), or "implementation" (device-specific behavior).</p>`;

export const filePickerCapturecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
