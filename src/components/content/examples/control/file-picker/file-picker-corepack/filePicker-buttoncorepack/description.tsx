import 'preact';

const descriptionHtmlText = String.raw`<p>A file picker displays a clickable dropzone for selecting files from the device storage.</p>
<p>The demo shows how to select a file from the file dialog by clicking a button using the
ojfilepickerutils module.</p>`;

export const filePickerButtoncorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
