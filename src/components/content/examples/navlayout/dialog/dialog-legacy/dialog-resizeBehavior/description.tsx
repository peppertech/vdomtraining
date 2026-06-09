// @ts-nocheck
import { h } from 'preact';

export const dialogResizeBehaviorDescription = (
  <>
    <p>A dialog displays a popup window that provides information and gathers input from the application user.</p><p>
      The demo show how changing the dialog's resize behavior option can affect the dialog. The
      following describes the different settings of the
      {" "}
      <code className={"prettyprint"}>resizeBehavior</code>
      {" "}
      property:
    </p>
    <table className={"dialogDemo"}>
      <tr>
        <th>Option Setting</th>
        <th className={"padding-10"}>Resizable?</th>
      </tr>
      <tr>
        <td><code className={"prettyprint"}>resizeBehavior: 'resizable'</code></td>
        <td className={"align-center"}>yes</td>
      </tr>
      <tr>
        <td><code className={"prettyprint"}>resizeBehavior: 'none'</code></td>
        <td className={"align-center"}>no</td>
      </tr>
    </table>
    <p></p>
    <p>
      The dialog's default
      {" "}
      <code className={"prettyprint"}>resizeBehavior</code>
      {" "}
      setting is theme specific. In the Redwood theme, the default behavior is none. In the Alta theme,
      the default behavior is resizable, while in mobile themes (Android, iOS, and Windows), the default
      behavior is not resizable.
    </p>

    <table className={"dialogDemo"}>
      <tr>
        <th>Theme</th>
        <th className={"padding-10"}>
          Default
          {" "}
          <code className={"prettyprint"}>resizeBehavior</code>
          {" "}
          Setting
        </th>
      </tr>
      <tr>
        <td>Redwood</td>
        <td className={"align-center"}><code className={"prettyprint"}>'none'</code></td>
      </tr>
      <tr>
        <td>Alta</td>
        <td className={"align-center"}><code className={"prettyprint"}>'resizable'</code></td>
      </tr>
      <tr>
        <td>Android</td>
        <td className={"align-center"}><code className={"prettyprint"}>'none'</code></td>
      </tr>
      <tr>
        <td>iOS</td>
        <td className={"align-center"}><code className={"prettyprint"}>'none'</code></td>
      </tr>
      <tr>
        <td>Windows</td>
        <td className={"align-center"}><code className={"prettyprint"}>'none'</code></td>
      </tr>
    </table>
    <p></p>
    <p>
      These defaults can be overridden with the
      {" "}
      <code className={"prettyprint"}>resizeBehavior</code>
      {" "}
      property.
    </p>
  </>
);
