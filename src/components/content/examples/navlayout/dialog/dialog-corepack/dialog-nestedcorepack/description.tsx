import 'preact';

const descriptionHtmlText = String.raw`<p>A Dialog is a floating window that typically contains a header, content and footer area. A Dialog is typically modal and centered in viewport.</p><p>
  Dialogs can be launched from inside other dialogs. This example shows how you would define a
  simple nested dialog.
</p>`;

export const dialogNestedcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
