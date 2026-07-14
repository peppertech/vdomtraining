import 'preact';
import type { ComponentChildren } from "preact";

export type FormLayoutCorePackDemoId =
  | "form-inputs"
  | "mixed"
  | "column-span"
  | "conditional-inputs"
  | "job-application"
  | "readonly-vs-mixed"
  | "shared-column";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const formLayoutCorePackDocs: Record<
  FormLayoutCorePackDemoId,
  DocsEntry
> = {
  "form-inputs": {
    description: (
      <>
        <p>
          This demo shows a broad overview of the core pack components commonly
          used inside <code>oj-c-form-layout</code>.
        </p>
        <p>
          It mirrors the cookbook form-inputs example and exposes layout and
          child-control options together so the form can be explored
          interactively.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add an <code>oj-c-form-layout</code> component.
        </li>
        <li>
          Add core pack form components as direct children of the form layout.
        </li>
        <li>
          Use nested <code>oj-c-form-layout</code> children when two related
          fields need to share one column of space.
        </li>
      </ul>
    ),
  },
  mixed: {
    description: (
      <>
        <p>
          This demo shows enabled and readonly core pack controls side by side
          in the same <code>oj-c-form-layout</code>.
        </p>
        <p>
          It demonstrates the mixed mode presentation where readonly child
          controls still align visually with enabled controls.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add an <code>oj-c-form-layout</code> component without setting the
          layout itself to readonly.
        </li>
        <li>
          Place both enabled and <code>readonly</code> child components inside
          the layout.
        </li>
        <li>
          Use the same layout settings across both groups so the rendering
          differences are easy to compare.
        </li>
      </ul>
    ),
  },
  "column-span": {
    description: (
      <>
        <p>
          This demo shows how <code>columnSpan</code> works inside{" "}
          <code>oj-c-form-layout</code> when the layout direction is set to{" "}
          <code>row</code>.
        </p>
        <p>
          If the current row does not have enough space, the field moves to the
          next row and spans the available columns.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add an <code>oj-c-form-layout</code> component.
        </li>
        <li>
          Set <code>direction="row"</code> because column spanning only applies
          in row layouts.
        </li>
        <li>
          Apply <code>columnSpan</code> values greater than <code>1</code> on
          the child components that should stretch across multiple columns.
        </li>
      </ul>
    ),
  },
  "conditional-inputs": {
    description: (
      <>
        <p>
          This demo shows how input fields can be added or removed from{" "}
          <code>oj-c-form-layout</code> based on application state.
        </p>
        <p>
          When the condition changes, the layout automatically reflows to match
          the currently visible children.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add an <code>oj-c-form-layout</code> component and place form
          controls inside it.
        </li>
        <li>
          Store the visibility state in component state and use conditional
          rendering around the field that should appear or disappear.
        </li>
        <li>
          Update the state from a button or other control so the form layout can
          reflow automatically.
        </li>
      </ul>
    ),
  },
  "job-application": {
    description: (
      <>
        <p>
          This demo adapts the cookbook job application sample into the recipe
          format to show a realistic multi-section form built with{" "}
          <code>oj-c-form-layout</code>.
        </p>
        <p>
          It combines nested layouts, column spanning, and multiple input types
          to model a real-world form flow.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add top-level and nested <code>oj-c-form-layout</code> components to
          group related fields by section.
        </li>
        <li>
          Use nested layouts with fixed <code>columns</code> when two controls
          must fit in the space of one parent column.
        </li>
        <li>
          Use <code>columnSpan</code> on longer fields like descriptions or
          addresses so they can extend across multiple columns.
        </li>
      </ul>
    ),
  },
  "readonly-vs-mixed": {
    description: (
      <>
        <p>
          A form layout manages the layout of labels and fields in a form.
        </p>
        <p>
          This demo shows the difference between an all readonly form and a
          form with a mix of both enabled and readonly controls.
        </p>
        <p>
          In an all readonly form, text fields are compact and do not have a
          border. To achieve this, set <code>readonly="true"</code> on the{" "}
          <code>oj-c-form-layout</code>.
        </p>
        <p>
          In a form with a mix of enabled and readonly controls, the readonly
          and enabled fields both have borders and a similar size in order for
          things to line up nicely. To achieve this set{" "}
          <code>readonly="true"</code> on the appropriate fields and not the{" "}
          <code>oj-c-form-layout</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          For mixed forms, set <code>readonly</code> on the individual child
          fields only.
        </li>
        <li>
          For all-readonly forms, set <code>readonly</code> on the{" "}
          <code>oj-c-form-layout</code> itself.
        </li>
        <li>
          Reuse the same fields in both sections so the difference in rendering
          is easy to see.
        </li>
      </ul>
    ),
  },
  "shared-column": {
    description: (
      <>
        <p>
          This demo shows different techniques for letting two fields share a
          single form-layout column.
        </p>
        <p>
          It uses Oracle JET flex utility classes inside form-layout cells to
          create percentage-based and fixed-width splits.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add an <code>oj-c-form-layout</code> component and place a wrapper{" "}
          <code>div</code> inside the column that should be split.
        </li>
        <li>
          Use <code>oj-flex</code> or <code>oj-flex-bar</code> utility classes
          on that wrapper to control how the child fields share the space.
        </li>
        <li>
          Add responsive spacing classes between the split fields so the layout
          remains readable across breakpoints.
        </li>
      </ul>
    ),
  },
};
