import 'preact';

const descriptionHtmlText = String.raw`<p>A tab bar allows navigation between different content sections.</p><p>This demo shows how to associate a custom context menu to a TabBar and also insert default context menu items amongst the custom menu items.</p>`;

export const tabBarContextMenucorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
