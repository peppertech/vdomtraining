// @ts-nocheck
import { h } from 'preact';

export const dialogHeaderDecorationDescription = (
  <>
    <p>A dialog displays a popup window that provides information and gathers input from the application user.</p><p>
      The demo show how changing the dialog's header decoration option can affect the dialog. The
      following describes the different settings of the
      <code className={"prettyprint"}>headerDecoration</code>
      property:
    </p>
    <table className={"dialogDemo"}>
      <tr>
        <th>Attribute Setting</th>
        <th className={"padding-10"}>Header Decoration</th>
      </tr>
      <tr>
        <td><code className={"prettyprint"}>header-decoration="on"</code></td>
        <td className={"align-center"}>
          a texture strip is displayed at the top of the dialog header (Redwood theme only)
        </td>
      </tr>
      <tr>
        <td><code className={"prettyprint"}>header-decoration="off"</code></td>
        <td className={"align-center"}>no header decoration is displayed</td>
      </tr>
    </table>
    <br />
    <p>
      The dialog's default
      <code className={"prettyprint"}>headerDecoration</code>
      value is
      <code className={"prettyprint"}>'on'</code>
      , but the decoration is only seen in the Redwood theme,
      <code className={"prettyprint"}>'on'</code>
      shows no decoration in other themes.
    </p>
  </>
);
