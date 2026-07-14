// @ts-nocheck
import 'preact';

export const chartSelectingRecipe = (
  <>
    <ol>
      <li>
        Set
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        on all components that will respond to selection to
        {" "}
        <i>'single'</i>
        {" "}
        or
        {" "}
        <i>'multiple'</i>
        .
      </li>
      <li>
        Tie the
        {" "}
        <i><b>selection</b></i>
        {" "}
        array on each associated component to the same observable.
      </li>
      <li>
        To show a live update of associated components during marquee selection, have the initiating
        component update the
        {" "}
        <i><b>selection</b></i>
        {" "}
        array of other associated components when the
        {" "}
        <i>ojSelectInput</i>
        {" "}
        event is fired (See example).
        <p><i>Note: This will not remove or affect the binding created in Step 2.</i></p>
      </li>
    </ol>
  </>
);
