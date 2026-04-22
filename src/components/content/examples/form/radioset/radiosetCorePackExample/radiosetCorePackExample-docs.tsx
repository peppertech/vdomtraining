import { h } from "preact";

export const radiosetCorePackDescription = (
  <>
    <p>
      This recipe presents the core pack <code>oj-c-radioset</code> example in
      the recipe layout.
    </p>
    <p>
      It follows the core pack cookbook radioset examples for states, user
      assistance, validation, data provider usage, and layout variations.
    </p>
  </>
);

export const radiosetCorePackRecipe = (
  <ol>
    <li>Add an <code>oj-c-radioset</code> with an options array.</li>
    <li>
      Bind the selected value and use layout props like <code>direction</code>{" "}
      and <code>labelEdge</code> to compare arrangements.
    </li>
    <li>
      Add help, messages, and wrapping cases so the example doubles as a
      component reference.
    </li>
  </ol>
);
