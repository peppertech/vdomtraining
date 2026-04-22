import { h } from "preact";
import type { ComponentChildren } from "preact";

export type FormLayoutLegacyDemoId =
  | "form-inputs"
  | "mixed"
  | "column-span"
  | "nested"
  | "shared-column"
  | "job-application";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const formLayoutLegacyDocs: Record<FormLayoutLegacyDemoId, DocsEntry> = {
  "form-inputs": {
    description: (
      <>
        <p>
          This demo shows various components typically seen in an{" "}
          <code>oj-form-layout</code>.
        </p>
        <p>
          Use the controls above the form to try out some of the important
          aspects of the layout and its child form controls.
        </p>
      </>
    ),
    recipe: (
      <>
        <p>Classes:</p>
        <ul>
          <li>
            <code>oj-formlayout-full-width</code>: in Redwood, form layouts
            have a max width by default. Add this class when you want the form
            to stretch to the full container width.
          </li>
          <li>
            <code>oj-helper-margin-auto</code>: use this class to center the
            form when the max width is smaller than the container.
          </li>
        </ul>
      </>
    ),
  },
  mixed: {
    description: (
      <>
        <p>
          This demo shows the various components typically seen in an{" "}
          <code>oj-form-layout</code> side by side in enabled and readonly mode.
        </p>
        <p>
          The <code>oj-form-layout</code> itself remains enabled, so the example
          demonstrates the mixed mode presentation rather than a fully readonly
          form.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add an <code>oj-form-layout</code> and place matching enabled and
          readonly controls next to each other.
        </li>
        <li>
          Use a shared set of controls for label edge and value size so both
          columns stay visually comparable.
        </li>
      </ul>
    ),
  },
  "column-span": {
    description: (
      <>
        <p>
          This page demonstrates the <code>colspan</code> attribute.
        </p>
        <p>
          The <code>oj-label-value</code> must be a child of{" "}
          <code>oj-form-layout</code> for colspan to work, and the layout needs{" "}
          <code>direction="row"</code> or the span is ignored.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add an <code>oj-form-layout</code> component.
        </li>
        <li>
          Set <code>direction="row"</code>, because colspan only works in row
          layouts.
        </li>
        <li>
          Wrap the field in <code>oj-label-value</code> and set{" "}
          <code>colspan</code> greater than <code>1</code>.
        </li>
      </ul>
    ),
  },
  nested: {
    description: (
      <>
        <p>This demo shows nested forms.</p>
        <p>
          A nested <code>oj-form-layout</code> is useful when one row in the
          outer form needs its own small internal layout.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Place an outer <code>oj-form-layout</code> around the main fields.
        </li>
        <li>
          Insert a nested <code>oj-form-layout</code> where one outer row should
          expand into multiple inner rows.
        </li>
        <li>
          Using <code>label-edge="inside"</code> on the nested form often
          produces the best visual result.
        </li>
      </ul>
    ),
  },
  "shared-column": {
    description: (
      <>
        <p>This demo shows several ways that two fields can share a form column.</p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use CSS grid utility classes for percentage splits like 25% and 75%.
        </li>
        <li>
          Use flex-bar utility classes when one field needs a fixed width and
          the other should fill the remaining space.
        </li>
        <li>
          Add responsive padding utility classes between the fields to preserve
          spacing across breakpoints.
        </li>
      </ul>
    ),
  },
  "job-application": {
    description: (
      <>
        <p>
          This is a real-world use case of a job posting form sample that uses{" "}
          <code>oj-form-layout</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add an <code>oj-form-layout</code> component.
        </li>
        <li>
          Add form components inside the layout and use nested{" "}
          <code>oj-form-layout</code> blocks to arrange related fields.
        </li>
        <li>
          Use <code>oj-label-value</code> when a field should span multiple
          columns, and use nested layouts when two controls need to share the
          space of one parent column.
        </li>
      </ul>
    ),
  },
};
