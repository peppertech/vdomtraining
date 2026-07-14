import 'preact';

const descriptionHtmlText = String.raw`<p>A tab bar allows navigation between different content sections.</p><p>This demo shows how to remove a tab from oj-c-tab-bar.</p>
<p> For mobile touch devices, a default context menu
    is available for removing a tab. To trigger the context menu on mobile touch devices, press and hold to
    bring up the context menu.</p>`;

export const tabBarAddAndRemovecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
