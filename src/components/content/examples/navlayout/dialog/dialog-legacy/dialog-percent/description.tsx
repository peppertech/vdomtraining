// @ts-nocheck
import 'preact';

export const dialogPercentDescription = (
  <>
    <p>A dialog displays a popup window that provides information and gathers input from the application user.</p><p>
      Dialog dimensions can be specified using height and width percentages that are relative to the
      size of the viewport. In this example, we have set
      {" "}
      <code className={"prettyprint"}>width:50vw</code>
      {" "}
      and
      {" "}
      <code className={"prettyprint"}>height:50vh</code>
      {" "}
      using the
      {" "}
      <code className={"prettyprint"}>style</code>
      {" "}
      attribute.
    </p>

    <p>
      Specifying height and width using the percentage unit
      {" "}
      <code className={"prettyprint"}>%</code>
      {" "}
      is problematic. To achieve fluid dialog sizing relative to the browser's viewport, use the
      viewport-percentage units:
      {" "}
      <code className={"prettyprint"}>vw, vh, vmin, vmax</code>
      .
    </p>
  </>
);
