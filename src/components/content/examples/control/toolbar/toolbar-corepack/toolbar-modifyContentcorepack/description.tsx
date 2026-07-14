import 'preact';

const descriptionHtmlText = String.raw`<p>A toolbar displays a strip of control elements such as buttons and menu buttons, often grouped by separators.</p>This demo shows a toolbar that can have its content dynamically modified. Note, that if you are
focused on an item that is removed or disabled, focus then moves to the first focusable item in the
toolbar.`;

export const toolbarModifyContentcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
