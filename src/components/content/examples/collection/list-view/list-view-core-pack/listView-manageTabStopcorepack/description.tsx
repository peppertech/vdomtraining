import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A list view displays data items as a list or a grid with highly interactive features.</p><p>
  This demo shows how to manage tab stops in oj-c-list-view.  Specifically, oj-c-list-view should be a single
  tab stop unless user activates tabbable mode through the F2 key or by interacting with focusable elements within the item.
</p>
<p>
  This demo highlights what applications should do under these cases:
</p>
<ol>
  <li>Focusable elements that are directly in the template: for example, the template in this demo contains an anchor element, you should set the tabindex of the element to -1 if isTabbable property in the item context is false.</li>
  <li>Custom elements that contain focusable elements, this includes legacy JET components as well as third party components: for example, the demo-responsive-buttonset component used in this demo contains focusable elements which you don't have access to.  You should set data-oj-manage-tabs attribute on the custom element or one of its ancestors.</li>
  <li>Core pack components: No change needed as all core pack components handle this automatically in an optimal way.</li>
</ol>`;

export const listViewManageTabStopcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
