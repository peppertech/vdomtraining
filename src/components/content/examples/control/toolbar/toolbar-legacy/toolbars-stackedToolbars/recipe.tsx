// @ts-nocheck
import 'preact';

export const toolbarsStackedToolbarsRecipe = (
  <>
    <p>Basics:</p>
    <ol>
      <li>See the basic Toolbar demo for information applicable to all toolbars.</li>
    </ol>
    <p>Layout:</p>
    <ol>
      <li>
        To lay out toolbars next to each other, put the toolbars in a div with the class
        {" "}
        <code className={"prettyprint"}>.oj-flex</code>
        ,
        <code>oj-sm-padding-2x-start</code>
        {" "}
        or
        {" "}
        <code>oj-sm-padding-2x-end</code>
        {" "}
        where applicable, and
        {" "}
        <code className={"prettyprint"}>.oj-divider-start</code>
        {" "}
        on the second toolbar in the row . This will automatically add a vertical divider between the
        toolbars.
      </li>
      <li>
        To stack toolbars on top of each other, create each row from a div with class
        {" "}
        <code className={"prettyprint"}>.oj-divider-top</code>
        {" "}
        or
        {" "}
        <code className={"prettyprint"}>.oj-divider-bottom</code>
        , where each row contains one or more toolbars as described in Step 2. This will automatically
        add a horizontal border between the toolbar rows.
      </li>
    </ol>
    <p>Theming:</p>
    <ol>
      <li>
        If outer toolbar borders are desired in certain themes, apply
        {" "}
        <code className={"prettyprint"}>.oj-divider-top</code>
        {" "}
        and/or
        {" "}
        <code className={"prettyprint"}>.oj-divider-bottom</code>
        {" "}
        on the outer div. Also, apply
        {" "}
        <code className={"prettyprint"}>.oj-divider-start</code>
        {" "}
        and/or
        {" "}
        <code className={"prettyprint"}>.oj-divider-end</code>
        {" "}
        where applicable.
      </li>
      <li>
        Borderless buttons are recommended for use in toolbars. This is the default in most themes. See
        the JSDoc for the Toolbar's
        {" "}
        <code className={"prettyprint"}>chroming</code>
        {" "}
        option for details.
      </li>
      <li>
        Note that default width settings of Buttons in Buttonsets varies by theme and chroming, and
        overriding classes are available for flexible control. See the
        {" "}
        <a href={"#"}>
          Buttonset Width demo
        </a>
        {" "}
        for more details.
      </li>
    </ol>
    <p>Accessibility:</p>
    <ol>
      <li>
        Since multiple toolbars are present, apply an
        {" "}
        <code className={"prettyprint"}>aria-label</code>
        {" "}
        to each toolbar element as shown.
      </li>
    </ol>
  </>
);
