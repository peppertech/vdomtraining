import 'preact';

const descriptionHtmlText = String.raw`<p>A Dialog is a floating window that typically contains a header, content and footer area. A Dialog is typically modal and centered in viewport.</p><p>
  Unlike modal dialogs, modeless dialogs do not disable interaction with the surrounding window. To
  configure a modeless dialog, simply set the modality option to 'modeless'.
</p>`;

export const dialogModelesscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
