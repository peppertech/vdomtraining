// @ts-nocheck
import 'preact';

export const menuMenuOpenRecipe = (
  <>
    <ol>
      <li>
        Create the menu per the instructions in the
        {" "}
        <a href={"#"}>Menu demo</a>
        .
      </li>
      <li>
        Call
        {" "}
        <code className={"prettyprint"}>open()</code>
        {" "}
        from the app, passing in the UI event if applicable.
      </li>
      <li>
        Specify a focusable launcher, either via the
        {" "}
        <code className={"prettyprint"}>openOptions</code>
        , on each menu launch (in the
        {" "}
        <code className={"prettyprint"}>open()</code>
        {" "}
        call as seen here), or by specifying an
        {" "}
        <code className={"prettyprint"}>ojBeforeOpen</code>
        {" "}
        listener as discussed in the API doc.
      </li>
      <li>Call close() from the app.</li>
      <li>
        If needed, listen for the
        {" "}
        <code className={"prettyprint"}>open</code>
        {" "}
        and
        {" "}
        <code className={"prettyprint"}>close</code>
        {" "}
        events.
      </li>
      <li>
        See the
        {" "}
        <a href={"jsdocs/oj.ojMenu.html"}>API doc</a>
        {" "}
        for other ways to customize the menu via component options or the
        {" "}
        <code className={"prettyprint"}>open()</code>
        {" "}
        or
        {" "}
        <code className={"prettyprint"}>close()</code>
        {" "}
        call.
      </li>
    </ol>
  </>
);
