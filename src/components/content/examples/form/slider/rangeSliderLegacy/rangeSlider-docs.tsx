import 'preact';
import type { ComponentChildren } from "preact";

export type RangeSliderDemoId =
  | "states"
  | "basic"
  | "vertical"
  | "validation"
  | "icons"
  | "width";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const rangeSliderDocs: Record<RangeSliderDemoId, DocsEntry> = {
  states: {
    description: (
      <>
        <p>
          This demo allows you to quickly scan some of the more important visual
          aspects of <code>oj-range-slider</code>.
        </p>
        <p>
          The <code>oj-form-layout</code> overview demo may also be of interest
          since it shows <code>oj-range-slider</code> relative to other controls
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
          States section: <code>oj-range-slider</code> is enabled by default.
          Set <code>disabled=&quot;true&quot;</code> for disabled.
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
          A basic JET Range Slider with several options set, including{" "}
          <code>min</code>, <code>max</code>, and <code>step</code>.
        </p>
        <p>
          It also shows the difference between committed <code>value</code> and{" "}
          <code>transientValue</code> while the thumbs are being dragged.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-range-slider</code> element and set appropriate{" "}
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
              Set the initial range with the <code>value</code> attribute.
            </li>
            <li>
              Bind both <code>value</code> and <code>transientValue</code> to
              see the difference between committed changes and drag-time updates.
            </li>
          </ul>
        </li>
      </ol>
    ),
  },
  vertical: {
    description: (
      <p>
        A vertical JET Range Slider is configured using{" "}
        <code>orientation=&quot;vertical&quot;</code>.
      </p>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-range-slider</code> element and set appropriate{" "}
          <code>label-hint</code>.
          <ul>
            <li>
              Set <code>orientation=&quot;vertical&quot;</code>.
            </li>
            <li>
              Set the other initial attributes in the same way as the basic
              range slider demo.
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
          A JET Range Slider with <code>messagesCustom</code> and{" "}
          <code>help.instruction</code>.
        </p>
        <p>
          In this demo, <code>messagesCustom</code> is set to an error message
          if the input range is not within 5.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-range-slider</code> element and set appropriate{" "}
          <code>label-hint</code>.
        </li>
        <li>
          Bind options to initial values:
          <ul>
            <li>
              Set <code>messagesCustom</code> to a state-backed message
              collection.
            </li>
            <li>
              Set the other initial attributes as shown in the basic range
              slider demo.
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
  icons: {
    description: (
      <p>This example shows how to add icons to a range slider.</p>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-range-slider</code> element and set appropriate{" "}
          <code>label-hint</code>.
        </li>
        <li>
          Bind options to initial values, as shown in the basic range slider
          demo.
        </li>
        <li>
          Create an HTML <code>span</code> element for each icon and place the
          icons beside the range slider.
        </li>
      </ol>
    ),
  },
  width: {
    description: (
      <p>This shows how you can set the width of a form control.</p>
    ),
    recipe: (
      <p>
        Create a class that sets the max width. Use <code>!important</code> to
        avoid specificity issues when overriding cookbook CSS.
      </p>
    ),
  },
};
