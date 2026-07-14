// @ts-nocheck
import 'preact';

export const dialogUserDefinedHeaderRecipe = (
  <>
    <ul>
      <li>
        Use the oj-dialog element to create a
        {" "}
        <code className={"prettyprint"}>dialog</code>
        {" "}
        component.
      </li>
      <li>
        Define the dialog body content:
        <ul>
          <li>
            Create a child element with with
            {" "}
            <code className={"prettyprint"}>slot='body'</code>
            , and define your body content within this element.
          </li>
        </ul>
      </li>
      <li>
        Define the dialog header content:
        <ul>
          <li>
            Create a child element with the
            {" "}
            <code className={"prettyprint"}>slot='header'</code>
            {" "}
            and define your header content within this element.
          </li>
          <li>
            Create a header element that has the
            {" "}
            <code className={"prettyprint"}>.oj-dialog-title</code>
            {" "}
            class.
          </li>
          <li>
            Note that, in order to meet accessibility requirements, the rendered dialog includes an
            {" "}
            <code className={"prettyprint"}>aria-labelledby</code>
            {" "}
            reference (in the
            {" "}
            <code className={"prettyprint"}>.oj-dialog</code>
            {" "}
            element) to the title of the header. This is generated automatically, but relies on having a
            title element that is identified by the
            {" "}
            <code className={"prettyprint"}>.oj-dialog-title</code>
            {" "}
            class.
          </li>
        </ul>
      </li>
      <li>
        Configure how to launch the dialog:
        <ul>
          <li>
            Call the dialog's
            {" "}
            <code className={"prettyprint"}>open</code>
            {" "}
            method to open the dialog.
          </li>
        </ul>
      </li>
      <li>
        Configure the cancelbehavior:
        <ul>
          <li>
            The close icon will automatically be generated. If you wish to omit the close icon from your
            header, use
            {" "}
            <code className={"prettyprint"}>cancelBehavior: 'escape'</code>
            {" "}
            or
            {" "}
            <code className={"prettyprint"}>cancelBehavior: 'none'</code>
            .
          </li>
        </ul>
      </li>
    </ul>
  </>
);
