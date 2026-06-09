// @ts-nocheck
import { h } from 'preact';

export const drawerPopupEventsDescription = (
  <>
    <p>A Drawer Popup is a panel that slides into the viewport.</p><p>Drawer Popup supports 'openedChanged' and 'ojBeforeClose' events.</p>
    <p>
      This demo shows how to listen for drawer's events:
      {" "}
      <code className={"prettyprint"}>openedChanged</code>
      ,
      <code className={"prettyprint"}>on-oj-before-close</code>
      {" "}
      (supported only when using 'implicit' close with the 'ESC' key or a click outside).
    </p>
  </>
);
