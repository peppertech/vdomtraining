import 'preact';
import type { ComponentChildren } from "preact";

export type SliderDemoId =
  | "states"
  | "basic"
  | "vertical"
  | "validation"
  | "width";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const sliderDocs: Record<SliderDemoId, DocsEntry> = {
  states: {
    description: (
      <>
        <p>
          This demo allows you to quickly scan some of the more important visual
          aspects of <code>oj-slider</code>.
        </p>
        <p>
          The <code>oj-form-layout</code> overview demo may also be of interest
          since it shows <code>oj-slider</code> relative to other controls
          typically seen in a form layout.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Layout: This demo uses an <code>oj-form-layout</code> in each section.
        </li>
        <li>
          States section: <code>oj-slider</code> is enabled by default. Set{" "}
          <code>disabled=&quot;true&quot;</code> for disabled.
        </li>
        <li>
          Help and Messages sections: follow the same user assistance patterns
          used across the form control demos.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <>
        <p>
          A basic JET Slider with several options set, including{" "}
          <code>min</code>, <code>max</code>, and <code>step</code>.
        </p>
        <p>
          It also shows the difference between committed <code>value</code> and{" "}
          <code>transientValue</code> while the thumb is being dragged.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-slider</code> element and set appropriate{" "}
          <code>label-hint</code>.
        </li>
        <li>
          Bind options to initial values:
          <ul>
            <li>
              Set the slider range with the <code>min</code> and/or{" "}
              <code>max</code> attributes.
            </li>
            <li>
              Set the step up and step down from the default of 1 with the{" "}
              <code>step</code> attribute.
            </li>
            <li>
              Set the initial value with the <code>value</code> attribute.
            </li>
            <li>
              Bind both <code>value</code> and <code>transientValue</code> to
              see the difference between committed value changes and drag-time
              updates.
            </li>
          </ul>
        </li>
      </ol>
    ),
  },
  vertical: {
    description: (
      <>
        <p>
          A vertical JET Slider is configured using{" "}
          <code>orientation="vertical"</code>.
        </p>
        <p>
          This example keeps the rest of the slider configuration the same so
          the orientation change is easy to isolate.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-slider</code> element and set appropriate{" "}
          <code>label-hint</code>.
          <ul>
            <li>
              Set the orientation attribute to vertical with{" "}
              <code>orientation=&quot;vertical&quot;</code>.
            </li>
            <li>
              Set the other initial attributes in the same way as the basic
              slider demo.
            </li>
            <li>
              Bind the value so the selected position can be displayed next to
              the control.
            </li>
          </ul>
        </li>
      </ol>
    ),
  },
  validation: {
    description: (
      <>
        <p>
          A JET Slider with <code>messagesCustom</code> and{" "}
          <code>help.instruction</code>.
        </p>
        <p>
          In this demo, <code>messagesCustom</code> is set to an error message
          if the slider&apos;s value is between 6 and 9.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-slider</code> element and set appropriate{" "}
          <code>label-hint</code>.
        </li>
        <li>
          Bind options to initial values:
          <ul>
            <li>
              Set the slider element&apos;s <code>messagesCustom</code>{" "}
              attribute to a state-backed message collection.
            </li>
            <li>
              Set the other initial attributes as shown in the basic slider
              demo.
            </li>
            <li>
              Assign an <code>onvalueChanged</code> handler and perform the
              validation logic in that handler.
            </li>
          </ul>
        </li>
      </ol>
    ),
  },
  width: {
    description: (
      <>
        <p>This shows how you can set the width of a form control.</p>
        <p>
          The cookbook example uses max-width so the slider can still shrink
          inside smaller containers.
        </p>
      </>
    ),
    recipe: (
      <p>
        The default width of the component is actually set as the max-width
        instead of the width so that the component will automatically shrink
        when put in a smaller container. Therefore to override the default width
        you must set max-width rather than width.
      </p>
    ),
  },
};
