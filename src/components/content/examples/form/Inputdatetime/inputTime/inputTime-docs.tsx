import { h } from "preact";

export const inputTimeDescription = (
  <>
    <p>
      This recipe wraps the <code>oj-input-time</code> example with the newer
      recipe layout.
    </p>
    <p>
      The demo covers typed time input, time increment configuration, and
      messaging or help states around time entry.
    </p>
  </>
);

export const inputTimeRecipe = (
  <ol>
    <li>Add an <code>oj-input-time</code> field.</li>
    <li>
      Configure the time picker increment and any related converter behavior.
    </li>
    <li>
      Add help and message states to show how time entry is guided in forms.
    </li>
  </ol>
);
