// @ts-nocheck
import 'preact';

export const drawerPopupCancelableEventsDescription = (
  <>
    <p>A Drawer Popup is a panel that slides into the viewport.</p><p>
      Drawer Popup supports 'ojBeforeClose' event that can be canceled synchronously or asynchronously.
    </p>
    <p>
      It is only triggered when closing using 'ESC' key or Auto Dismiss. Not triggered when mutating
      {" "}
      <code className={"prettyprint"}>&lt;edge&gt;-opened</code>
      {" "}
      property explicitly.
    </p>
    <p>
      This demo shows how to listen for drawer's event:
      {" "}
      <code className={"prettyprint"}>ojBeforeClose</code>
      .
    </p>
  </>
);
