import { h } from "preact";
import type { ComponentChildren } from "preact";

export type ValidationGroupDemoId =
  | "required-fields"
  | "form-fields"
  | "one-required"
  | "cross-field"
  | "async-validation"
  | "dynamic-form";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const validationGroupDocs: Record<ValidationGroupDemoId, DocsEntry> = {
  "required-fields": {
    description: (
      <>
        <p>
          This demo shows form-level validity checking with{" "}
          <code>oj-validation-group</code> together with required field
          validation on individual controls.
        </p>
        <p>
          When submit is pressed, deferred required messages are shown and focus
          moves to the first invalid field.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Wrap the editable components you want to track in an{" "}
          <code>oj-validation-group</code>.
        </li>
        <li>
          Mark the individual fields as <code>required</code>.
        </li>
        <li>
          On submit, inspect the group <code>valid</code> state and call{" "}
          <code>showMessages()</code> and{" "}
          <code>focusOn("@firstInvalidShown")</code> when submission should be
          blocked.
        </li>
      </ul>
    ),
  },
  "form-fields": {
    description: (
      <>
        <p>
          This demo highlights the <code>oj-validation-group</code> API while
          also showing cross-field confirmation logic for two email fields.
        </p>
        <p>
          It uses the group for form-level checks and{" "}
          <code>messagesCustom</code> on the confirmation field to surface the
          mismatch.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-validation-group</code> to track the overall form state.
        </li>
        <li>
          Reset the confirmation field when the primary email changes.
        </li>
        <li>
          Add a custom error to the confirmation field when its value no longer
          matches the original email.
        </li>
      </ul>
    ),
  },
  "one-required": {
    description: (
      <>
        <p>
          This demo combines form-level validity checks, custom cross-field
          validation, required validation, and component validators in a single
          example.
        </p>
        <p>
          At least one of the first three fields must be filled in, and the odd
          field also runs its own validator.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Track the overall form with <code>oj-validation-group</code>.
        </li>
        <li>
          Bind the same change handler to the related fields and use{" "}
          <code>messagesCustom</code> for the cross-field “one required” rule.
        </li>
        <li>
          Add a field-level validator separately so cross-field and component
          validation stay distinct.
        </li>
      </ul>
    ),
  },
  "cross-field": {
    description: (
      <>
        <p>
          This demo shows a simple business validation rule across Best Reached
          By, Email, and Phone Number.
        </p>
        <p>
          The group handles overall tracked validity, while custom messages are
          used to push cross-field errors onto the dependent field.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use application logic to determine which dependent field is required
          based on the controlling field.
        </li>
        <li>
          Push business validation failures through{" "}
          <code>messagesCustom</code> on the affected component.
        </li>
        <li>
          Run the group check first, then application-level cross-field
          validation before allowing create or submit.
        </li>
      </ul>
    ),
  },
  "async-validation": {
    description: (
      <>
        <p>
          This demo shows how <code>oj-validation-group</code> behaves when one
          or more tracked fields use asynchronous validators.
        </p>
        <p>
          While validation is still running, the group enters{" "}
          <code>pending</code> and submission should wait until the state
          settles.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Wrap the async-validated fields in <code>oj-validation-group</code>.
        </li>
        <li>
          Listen for <code>validChanged</code> so you can react when the group
          leaves <code>pending</code>.
        </li>
        <li>
          Disable or defer submission while the group state is{" "}
          <code>pending</code>.
        </li>
      </ul>
    ),
  },
  "dynamic-form": {
    description: (
      <>
        <p>
          This demo shows that <code>oj-validation-group</code> keeps its valid
          state current even as tracked fields are added or removed from the
          form.
        </p>
        <p>
          It mirrors the cookbook dynamic contact-number flow using dynamically
          rendered rows plus a stable validation group container.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Render repeated form rows from application state so rows can be added
          and removed dynamically.
        </li>
        <li>
          Keep those rows inside a single <code>oj-validation-group</code>.
        </li>
        <li>
          Use the group <code>valid</code> state when deciding whether the
          dynamic form can proceed.
        </li>
      </ul>
    ),
  },
};
