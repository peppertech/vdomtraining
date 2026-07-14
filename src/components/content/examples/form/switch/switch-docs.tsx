import 'preact';
import type { ComponentChildren } from "preact";

export type SwitchDemoId =
  | "states"
  | "switch-component"
  | "readonly"
  | "cross-field-validation";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const switchDocs: Record<SwitchDemoId, DocsEntry> = {
  states: {
    description: (
      <>
        <p>
          This demo provides a quick visual scan of the most important aspects
          of <code>oj-switch</code>, including states, help, and custom
          messages.
        </p>
        <p>
          It also shows how switch aligns in <code>oj-form-layout</code> next
          to other form content.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> to organize the states, help, and
          messaging sections.
        </li>
        <li>
          Show enabled, disabled, and readonly variations for both true and
          false values.
        </li>
        <li>
          Add <code>helpHints</code> and <code>messagesCustom</code> examples so
          the page works as a compact behavior reference.
        </li>
      </ul>
    ),
  },
  "switch-component": {
    description: (
      <>
        <p>
          This demo shows how to bind application state to the{" "}
          <code>value</code> property of <code>oj-switch</code>.
        </p>
        <p>
          The displayed text updates immediately as the switch is toggled
          between ON and OFF.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-switch</code> and give it a label.</li>
        <li>
          Bind its <code>value</code> to a boolean value in component state.
        </li>
        <li>
          Render derived UI from that same state so the change is visible
          outside the control.
        </li>
      </ol>
    ),
  },
  readonly: {
    description: (
      <>
        <p>
          This demo shows readonly mode for <code>oj-switch</code>.
        </p>
        <p>
          In readonly mode the component uses textual ON and OFF output to
          represent its state.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-switch</code>.</li>
        <li>
          Set <code>readonly</code> to <code>true</code>.
        </li>
        <li>
          Provide both true and false examples so the readonly rendering is easy
          to compare.
        </li>
      </ol>
    ),
  },
  "cross-field-validation": {
    description: (
      <>
        <p>
          This demo shows custom validation for <code>oj-switch</code> in a
          cross-field scenario.
        </p>
        <p>
          The switch is used to confirm that a customer is 21 or older before
          alcoholic drinks can be added to the cart.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Combine <code>oj-switch</code> with related fields whose values affect
          whether the switch state is acceptable.
        </li>
        <li>
          Use <code>messagesCustom</code> on the switch to surface
          cross-field business validation failures.
        </li>
        <li>
          Run the custom validation from the action button before updating the
          rest of the page state.
        </li>
      </ul>
    ),
  },
};
