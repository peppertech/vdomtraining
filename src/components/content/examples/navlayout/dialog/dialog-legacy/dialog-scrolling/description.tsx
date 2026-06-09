// @ts-nocheck
import { h } from 'preact';

export const dialogScrollingDescription = (
  <>
    <p>A dialog displays a popup window that provides information and gathers input from the application user.</p><p>
      In most cases, developers will want to use the default dialog height setting of
      {" "}
      <code className={"prettyprint"}>auto</code>
      {" "}
      (along with a fixed width) - so the dialog body would have the height automatically adjusted to
      display all content. Using this setting, when the dialog is resized to be smaller than its body
      content, a scrollbar will appear.
    </p>
    <p>
      The scrollable area depends on the total height of the dialog. If the dialog is higher than 400px,
      only the
      {" "}
      <code className={"prettyprint"}>body</code>
      {" "}
      slot content is scrollable and the 'header' and 'footer' areas remain sticky. If the dialog height
      is smaller than 400px, the entire dialog content (including the 'header' and 'footer' areas) is
      scrollable.
    </p>
    <p>
      In this example, the dialog has been set to a relatively small fixed height and the body content
      overflows, which is why the scrollbar is displayed on dialog open.
    </p>
  </>
);
