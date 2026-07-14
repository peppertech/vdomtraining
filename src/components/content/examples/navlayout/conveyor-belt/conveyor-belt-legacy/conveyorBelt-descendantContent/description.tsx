// @ts-nocheck
import 'preact';

export const conveyorBeltDescendantContentDescription = (
  <>
    <p>A conveyor belt manages overflow for its child elements and allows scrolling among them.</p><p>
      The demo shows the usage of the
      {" "}
      <code className={"prettyprint"}>content-parent</code>
      {" "}
      attribute. The attribute specifies the selector of the descendant DOM element whose direct child
      elements are the items to be controlled by the conveyor belt.
    </p>
    <p>
      Some conveyor content items cannot be specified as direct children of the
      {" "}
      <code className={"prettyprint"}>oj-conveyor-belt</code>
      , for example
      {" "}
      <code className={"prettyprint"}>oj-option</code>
      {" "}
      inside
      {" "}
      <code className={"prettyprint"}>oj-buttonset-many</code>
      . In such cases, the
      {" "}
      <code className={"prettyprint"}>content-parent</code>
      {" "}
      attribute can be used to specify the content wrapper.
    </p>
  </>
);
