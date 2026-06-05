import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A tab bar allows navigation between different content sections.</p><P>This demo shows how to reorder TabBar Items in oj-c-tab-bar</P>
<p> For mobile touch devices, a default context menu
    is available for moving a tab. To trigger the context menu on mobile touch devices, press and hold to
    bring up the context menu.</p>`;

export const tabBarReordercorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
