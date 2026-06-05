// @ts-nocheck
import { h } from 'preact';

export const conveyorBeltCustomKeyNavigationDescription = (
  <>
    <p>A conveyor belt manages overflow for its child elements and allows scrolling among them.</p><p><b>ADVANCED DEMO</b></p>
    <p>
      This demo showcases programmatically scrolling a conveyor belt. This may be useful when a conveyor
      belt is embedded in a custom component that allows keyboard navigation among the items by a means
      other than tabbing. This demo adds a keyboard listener to listen to the Right/Left arrow keys in
      order to manage highlighting of the items. It then uses the conveyor belt function
      scrollElementIntoView() to programmatically scroll to the highlighted item.
    </p>
  </>
);
