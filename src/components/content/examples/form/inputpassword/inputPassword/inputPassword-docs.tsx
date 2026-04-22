import { h } from "preact";

export const inputPasswordDescription = (
  <>
    <p>
      This recipe wraps the legacy <code>oj-input-password</code> example with
      the standard recipe presentation.
    </p>
    <p>
      It takes cues from the cookbook password input examples for overview,
      binding, pattern matching, readonly behavior, and width handling.
    </p>
  </>
);

export const inputPasswordRecipe = (
  <ol>
    <li>Add an <code>oj-input-password</code> field.</li>
    <li>
      Bind the value and attach required or pattern-based validation where
      needed.
    </li>
    <li>
      Demonstrate readonly, width, and message behavior to round out the usage
      story.
    </li>
  </ol>
);
