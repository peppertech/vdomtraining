// @ts-nocheck
import { h } from 'preact';

export const drawerLayoutEventsDescription = (
  <>
    <p>A Drawer Layout adds expandable side contents (drawers) alongside some primary content.</p><p>Drawer Layout supports 'openedChanged' and 'ojBeforeClose' events.</p>
    <p>
      This demo shows how to listen for drawer's events:
      {" "}
      <code className={"prettyprint"}>startOpenedChanged</code>
      ,
      <code className={"prettyprint"}>endOpenedChanged</code>
      ,
      <code className={"prettyprint"}>ojBeforeClose</code>
      {" "}
      (supported only in overlay mode using 'implicit' close with the 'ESC' key).
    </p>
  </>
);
