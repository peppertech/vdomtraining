import 'preact';

const descriptionHtmlText = String.raw`<p>A Dialog is a floating window that typically contains a header, content and footer area. A Dialog is typically modal and centered in viewport.</p><p>
  In most cases, developers will want to use the default dialog height setting of
  <code class="prettyprint">auto</code>
  (along with a fixed width) - so the dialog body would have the height automatically adjusted to
  display all content. Using this setting, when the dialog is resized to be smaller than its body
  content, a scrollbar will appear.
</p>
<p>
  This default behavior is controlled by the
  <code class="prettyprint">overflow: auto</code>
  style of the dialog body. Also note that the Dialog has
  <code class="prettyprint">overflow:hidden</code>, so that only the body will have a scrollbar.
</p>
<p>
  However, in this example, the dialog has been set to a small fixed height, which is why the
  scrollbar is displayed on dialog open.
</p>`;

export const dialogScrollingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
