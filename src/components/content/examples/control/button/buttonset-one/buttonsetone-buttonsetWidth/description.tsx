// @ts-nocheck
import 'preact';

export const buttonsetoneButtonsetWidthDescription = (
  <>
    <p>A buttonset one is a grouping of related buttons where only one button may be selected.</p><p>
      This demo features the theme-based width settings of JET Buttons in JET Buttonsets. Depending on
      the theme and
      {" "}
      <a href={"#"}>chroming</a>
      , default widths of Buttons within Buttonsets can be:
    </p>

    <ul>
      <li>
        Auto: The width of each Button is automatically determined to fit its contents. The overall
        width of the Buttonset can also be specified for further width control. (See demo below for an
        example.)
      </li>
      <li>
        Equal: The width of the Buttonset is equally distributed to all contained Buttons. The overall
        width of the Buttonset defaults to 100%. Set the
        {" "}
        <code className={"prettyprint"}>max-width</code>
        {" "}
        (recommended) or
        {" "}
        <code className={"prettyprint"}>width</code>
        {" "}
        of the Buttonset for further width control. (See demo below for an example.)
      </li>
    </ul>

    <p>
      The classes shown below can be used to override theme defaults. See the
      {" "}
      <a href={"jsdocs/oj.ojButtonset.html#styling-section"}>Buttonset JSDoc styling section</a>
      {" "}
      for details on these classes.
    </p>
    <p>
      Reload this demo in various themes via the demo settings to see the theme defaults and effects of
      applying the overriding classes.
    </p>
    <p>
      For icon-only Buttonsets where the icons are already the same size, applications may prefer to
      make the buttonset auto-width, applying the
      {" "}
      <code className={"prettyprint"}>oj-buttonset-width-auto</code>
      {" "}
      class as needed, to sidestep the need to specify an exact width or max-width.
    </p>
  </>
);
