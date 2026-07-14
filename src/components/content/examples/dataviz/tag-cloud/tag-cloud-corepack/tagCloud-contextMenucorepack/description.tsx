import 'preact';

const descriptionHtmlText = String.raw`<p>A tag cloud is an interactive data visualization of textual data, where the importance of each tagged word or phrase is represented by font size or color.</p>This demo shows how to trigger context menus on tag cloud items. Right click on an item and select an action. The context menu can also be accessed by keyboard. Press Shift + F10 to open the context menu after navigating to an item. Select one of the actions by navigating to it and pressing Enter.`;

export const tagCloudContextMenucorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
