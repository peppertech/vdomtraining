// @ts-nocheck
import { h } from 'preact';

export const messagesCustomIconRecipe = (
  <>
    <p>Icon attribute:</p>
    <ol>
      <li>
        Include a
        <code className={"prettyprint"}>&lt;oj-messages&gt;</code>
        element in the page with its 'messages' attribute bound to an ArrayDataProvider.
      </li>
      <li>
        Set the 'icon' sub-property in each element in the ArrayDataProvider to a valid URL to custom
        image to be used for message icon
      </li>
    </ol>
  </>
);
