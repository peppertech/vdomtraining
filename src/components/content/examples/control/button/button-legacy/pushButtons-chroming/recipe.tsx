// @ts-nocheck
import 'preact';

export const pushButtonsChromingRecipe = (
  <>
    <ol>
      <li>Create any kind of JET Button, per the instructions in the corresponding Button demo.</li>
      <li>
        Set the
        {" "}
        <code className={"prettyprint"}>chroming</code>
        {" "}
        attribute on the button or (if present) the containing toolbar.
      </li>
      <li>
        Valid chroming values are
        {" "}
        <code className={"prettyprint"}>"callToAction"</code>
        ,
        <code className={"prettyprint"}>"danger"</code>
        ,
        <code className={"prettyprint"}>"solid"</code>
        ,
        <code className={"prettyprint"}>"outlined"</code>
        , and
        {" "}
        <code className={"prettyprint"}>"borderless"</code>
        . The default value varies by theme, as discussed in the
        {" "}
        <a href={"jsdocs/oj.ojButton.html#chroming"}>Button Chroming</a>
        {" "}
        section in the API doc.
      </li>
      <li>
        For menu button in the Redwood theme, when there is no start slot and
        {" "}
        <code className={"prettyprint"}>"display='icons'"</code>
        , the icon will change to three dots.
      </li>
    </ol>
  </>
);
