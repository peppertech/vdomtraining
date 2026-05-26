// @ts-nocheck
import { h } from 'preact';

export const menuDeferredRenderingRecipe = (
  <>
    <p>Prerequisites:</p>
    <ol>
      <li>Create the menu per the instructions in the Menu demo.</li>
    </ol>

    <p>Deferred Rendering:</p>
    <ol>
      <li>
        Place one
        <code className={"prettyprint"}>oj-defer</code>
        element as the immediate child of the
        <code className={"prettyprint"}>oj-menu</code>
        .
      </li>
      <li>
        Place menu items inside the
        <code className={"prettyprint"}>oj-defer</code>
        element.
      </li>
      <li>
        The menu discloses the deferred content when it is opened and waits for that content before
        positioning the popup.
      </li>
    </ol>
  </>
);
