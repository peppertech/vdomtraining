import 'preact';

const descriptionHtmlText = String.raw`<p>A file picker displays a clickable dropzone for selecting files from the device storage.</p><p>
  This demo shows how to use custom content in <code class="prettyprint">oj-c-file-picker</code>.
</p>`;

export const filePickerCustomContentcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
