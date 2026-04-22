import { h } from "preact";
import type { ComponentChildren } from "preact";

export type ComponentValidationDemoId =
  | "component-create"
  | "async-validators"
  | "converter-option"
  | "messages-custom"
  | "refresh-method"
  | "required-option"
  | "reset-method"
  | "show-messages"
  | "valid-option"
  | "validate-method"
  | "validators-option"
  | "value-option";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const componentValidationDocs: Record<
  ComponentValidationDemoId,
  DocsEntry
> = {
  "component-create": {
    description: (
      <>
        <p>
          This demo shows the behavior of an editable form control when it is
          created with <code>value</code>, <code>required</code>, and{" "}
          <code>validators</code> already configured.
        </p>
        <p>
          It also contrasts that setup with a simpler field created without the
          same validation attributes.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Set the component <code>value</code> to a model value of the correct
          type.
        </li>
        <li>
          Add <code>required</code> and a validator array when the field should
          begin life with validation rules already attached.
        </li>
        <li>
          Use the component state to reflect whether the field starts in an
          initially invalid condition.
        </li>
      </ul>
    ),
  },
  "async-validators": {
    description: (
      <>
        <p>
          This demo shows editable components using both synchronous and
          asynchronous validators.
        </p>
        <p>
          The async validator updates valid state only after its Promise
          settles, so the final message can appear with a delay.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add one validator that fails immediately and another that returns a
          Promise.
        </li>
        <li>
          Attach both to the component <code>validators</code> property.
        </li>
        <li>
          Listen to <code>validChanged</code> if you want to surface pending
          and final validation states in the page.
        </li>
      </ul>
    ),
  },
  "converter-option": {
    description: (
      <>
        <p>
          This demo shows how editable form controls respond when the{" "}
          <code>converter</code> option changes programmatically.
        </p>
        <p>
          It highlights both successful reformatting and the cases where the
          application must ensure its model value still matches the new
          converter.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Bind the <code>converter</code> property to state that can be updated
          programmatically.
        </li>
        <li>
          Replace or clear converter instances from user actions such as
          buttons.
        </li>
        <li>
          Make sure the underlying value is valid for the new converter before
          switching formats.
        </li>
      </ul>
    ),
  },
  "messages-custom": {
    description: (
      <>
        <p>
          This demo shows how to use <code>messagesCustom</code> for cross-field
          business validation.
        </p>
        <p>
          Custom messages make the component invalid without preventing its
          value from being pushed to application state.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Bind <code>messagesCustom</code> to application state.
        </li>
        <li>
          Run cross-field logic when either related field changes.
        </li>
        <li>
          Add or clear custom messages based on the business rule outcome.
        </li>
      </ul>
    ),
  },
  "refresh-method": {
    description: (
      <>
        <p>
          This demo shows what happens when the component <code>refresh()</code>{" "}
          method is called after a dependent label or configuration change.
        </p>
        <p>
          Refresh is useful when markup around the field changes and the
          component needs to re-read that information.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Update the label or other external metadata used by the component.
        </li>
        <li>
          Call <code>refresh()</code> on the component instance.
        </li>
        <li>
          Let the component re-render its UI and validation text using the new
          metadata.
        </li>
      </ul>
    ),
  },
  "required-option": {
    description: (
      <>
        <p>
          This demo shows how the component behaves when the{" "}
          <code>required</code> option changes programmatically.
        </p>
        <p>
          Toggling required can move the component between <code>valid</code>,{" "}
          <code>invalidHidden</code>, and shown validation states depending on
          the current value.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Bind <code>required</code> to application state.
        </li>
        <li>
          Toggle that state from a button or other interaction.
        </li>
        <li>
          Observe how the component <code>valid</code> state responds as the
          required rule is added or removed.
        </li>
      </ul>
    ),
  },
  "reset-method": {
    description: (
      <>
        <p>
          This demo shows how calling <code>reset()</code> clears shown messages
          and restores the component UI to its current committed value.
        </p>
        <p>
          It also demonstrates that custom messages added by the app are
          removed during reset.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create components with validators or required state so they can enter
          visible error conditions.
        </li>
        <li>
          Add a control that calls <code>reset()</code> on each target
          component.
        </li>
        <li>
          Optionally add custom messages first so the reset behavior is easy to
          compare.
        </li>
      </ul>
    ),
  },
  "show-messages": {
    description: (
      <>
        <p>
          This demo shows how deferred errors can be surfaced by calling{" "}
          <code>showMessages()</code> on editable components.
        </p>
        <p>
          It is a field-level counterpart to using <code>oj-validation-group</code>{" "}
          for grouped forms.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Configure fields that can hold deferred validation errors.
        </li>
        <li>
          Call <code>showMessages()</code> on each component when you want those
          deferred errors shown immediately.
        </li>
        <li>
          Read the component <code>valid</code> state before and after the call
          if you want to display the transition.
        </li>
      </ul>
    ),
  },
  "valid-option": {
    description: (
      <>
        <p>
          This demo highlights the component <code>valid</code> property and the{" "}
          <code>onValidChanged</code> event.
        </p>
        <p>
          It shows how applications can watch validity in real time and only
          submit when every field is fully valid.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Bind listeners to <code>validChanged</code> for each field you want
          to track.
        </li>
        <li>
          Store those validity values in component state so they can be
          displayed or checked later.
        </li>
        <li>
          Use the current <code>valid</code> states to decide whether submit is
          allowed.
        </li>
      </ul>
    ),
  },
  "validate-method": {
    description: (
      <>
        <p>
          This demo shows the <code>validate()</code> method, which returns a
          Promise and automatically shows validation messages.
        </p>
        <p>
          It is useful when the application wants to trigger validation
          imperatively during submit.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Get references to the target components from the page.
        </li>
        <li>
          Call <code>validate()</code> on each component and wait for the
          returned Promises.
        </li>
        <li>
          Continue only when each Promise resolves to a <code>valid</code>{" "}
          result.
        </li>
      </ul>
    ),
  },
  "validators-option": {
    description: (
      <>
        <p>
          This demo shows how the component behaves when its{" "}
          <code>validators</code> option changes programmatically.
        </p>
        <p>
          Changing validators can alter hints and future validation behavior,
          and may also re-run validation when the component is already showing an
          error.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Bind <code>validators</code> to computed state that can be recreated
          when settings change.
        </li>
        <li>
          Update the validator inputs from button clicks or other app logic.
        </li>
        <li>
          Compare how the component responds when it is currently valid versus
          currently invalid.
        </li>
      </ul>
    ),
  },
  "value-option": {
    description: (
      <>
        <p>
          This demo shows how components respond when <code>value</code>{" "}
          changes because of both user interaction and programmatic updates.
        </p>
        <p>
          Programmatic value changes clear messages and run deferred validation,
          while user interaction runs full validation against the entered UI
          value.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Bind component values to state that can be changed from both the UI
          and the page logic.
        </li>
        <li>
          Add validators so the difference between user edits and programmatic
          updates is visible.
        </li>
        <li>
          Use buttons to set alternate values, clear values, and add custom
          messages for comparison.
        </li>
      </ul>
    ),
  },
};
