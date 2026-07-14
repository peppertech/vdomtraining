// @ts-nocheck
import 'preact';

export const drawerLayoutCancelableEventsDescription = (
  <>
    <p>A Drawer Layout adds expandable side contents (drawers) alongside some primary content.</p><p>
      Drawer Layout supports 'ojBeforeClose' event that can be canceled synchronously or asynchronously.
      Available only in overlay mode.
    </p>
    <p>
      It is only triggered when closing using 'ESC' key. Not triggered when mutating
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
