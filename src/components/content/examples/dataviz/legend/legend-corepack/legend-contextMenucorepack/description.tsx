import 'preact';

const descriptionHtmlText = String.raw`<p>A legend displays an interactive description of symbols, colors, etc., used in graphical information representations.</p>This demo shows how to trigger context menus on legend items. Right click on an item and select an action. The context menu can also be accessed by keyboard. Press Shift + F10 to open the context menu after navigating to an item. Select one of the actions by navigating to it and pressing Enter.`;

export const legendContextMenucorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
