// @ts-nocheck
import 'preact';

export const dialogDragAffordanceDescription = (
  <>
    <p>A dialog displays a popup window that provides information and gathers input from the application user.</p><p>
      The demo show how changing the dialog's drag affordance option can affect the dialog. The
      following describes the different settings of the
      {" "}
      <code className={"prettyprint"}>dragAffordance</code>
      {" "}
      property:
    </p>
    <table className={"dialogDemo"}>
      <tr>
        <th>Attribute Setting</th>
        <th className={"padding-10"}>Drag Behavior</th>
      </tr>
      <tr>
        <td><code className={"prettyprint"}>dragAffordance="title-bar"</code></td>
        <td className={"align-center"}>dialog draggable by title-bar</td>
      </tr>
      <tr>
        <td><code className={"prettyprint"}>dragAffordance="none"</code></td>
        <td className={"align-center"}>dialog not draggable</td>
      </tr>
    </table>
    <p>
      The dialog's default
      {" "}
      <code className={"prettyprint"}>dragAffordance</code>
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
          <code className={"prettyprint"}>dragAffordance</code>
          {" "}
          Property
        </th>
      </tr>
      <tr>
        <td>Redwood</td>
        <td className={"align-center"}><code className={"prettyprint"}>'none'</code></td>
      </tr>
      <tr>
        <td>Alta</td>
        <td className={"align-center"}><code className={"prettyprint"}>'title-bar'</code></td>
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
    <p>
      These defaults can be overridden with the
      {" "}
      <code className={"prettyprint"}>dragAffordance</code>
      {" "}
      property.
    </p>
  </>
);
