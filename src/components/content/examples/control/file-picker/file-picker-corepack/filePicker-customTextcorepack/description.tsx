import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A file picker displays a clickable dropzone for selecting files from the device storage.</p>This demo shows how to use custom text in the default JET oj-c-file-picker.

<h5>Test Steps</h5>

<ul>
  <li>Toggle the 'Select Multiple' checkbox to see secondary text change.</li>
</ul>`;

export const filePickerCustomTextcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
