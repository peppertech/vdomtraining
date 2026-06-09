// @ts-nocheck
import { h } from 'preact';

export const dialogCancelBehaviorDescription = (
  <>
    <p>A dialog displays a popup window that provides information and gathers input from the application user.</p><p>
      The demo show how changing the dialog's cancel-behavior option can alter the dialog's header
      appearance and alter the cancel behavior. The following describes the different settings of the
      {" "}
      <code className={"prettyprint"}>cancel-behavior</code>
      {" "}
      option:
    </p>
    <table className={"dialogDemo"}>
      <tr>
        <th className={"padding-10"}>Option Setting</th>
        <th className={"padding-10"}>Close icon is created?</th>
        <th className={"padding-10"}>Escape key closes the dialog?</th>
      </tr>
      <tr>
        <td><code className={"prettyprint"}>cancel-behavior: 'icon'</code></td>
        <td className={"align-center"}>yes</td>
        <td className={"align-center"}>yes</td>
      </tr>
      <tr>
        <td><code className={"prettyprint"}>cancel-behavior: 'escape'</code></td>
        <td className={"align-center"}>no</td>
        <td className={"align-center"}>yes</td>
      </tr>
      <tr>
        <td><code className={"prettyprint"}>cancel-behavior: 'none'</code></td>
        <td className={"align-center"}>no</td>
        <td className={"align-center"}>no</td>
      </tr>
    </table>
    <p></p>
    <p>
      The dialog's default
      {" "}
      <code className={"prettyprint"}>cancel-behavior</code>
      {" "}
      setting is theme specific. In the Redwood theme, by default the close behavior is 'none'. In the
      Alta theme, a close icon is automatically created in the header. In Alta mobile themes (Android,
      iOS, and Windows), by default, no close icon is created. The following table summarizes the
      default option settings in various themes:
    </p>

    <table className={"dialogDemo"}>
      <tr>
        <th>Theme</th>
        <th className={"padding-10"}>
          Default
          {" "}
          <code className={"prettyprint"}>cancel-behavior</code>
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
        <td className={"align-center"}><code className={"prettyprint"}>'icon'</code></td>
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
      <code className={"prettyprint"}>cancel-behavior</code>
      {" "}
      option. For example, in the Redwood theme, if you want to have a close icon in the dialog header,
      you can set
      {" "}
      <code className={"prettyprint"}>cancel-behavior:'icon'</code>
      ; or if you want to use ESC key to close the dialog, you can set
      {" "}
      <code className={"prettyprint"}>cancel-behavior:'escape'</code>
      .
    </p>
  </>
);
