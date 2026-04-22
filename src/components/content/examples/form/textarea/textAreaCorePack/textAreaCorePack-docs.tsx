import { h } from "preact";
import type { ComponentChildren } from "preact";

export type TextAreaCorePackDemoId =
  | "overview"
  | "width"
  | "resize"
  | "length-max"
  | "max-rows";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const textAreaCorePackDocs: Record<
  TextAreaCorePackDemoId,
  DocsEntry
> = {
  overview: {
    description: (
      <>
        <p>
          This overview highlights the main visual behaviors of{" "}
          <code>oj-c-text-area</code>, including states, label placement, text
          alignment, help, and messaging examples.
        </p>
        <p>
          It follows the structure of the core pack cookbook states demo while
          fitting the newer recipe-first layout used across the VDOM examples.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-c-form-layout</code> for grouped states, required, help,
          and messaging examples.
        </li>
        <li>
          Show behavior both inside and outside form layout because assistance
          spacing differs between those contexts.
        </li>
        <li>
          Include separate examples for <code>labelEdge</code> and{" "}
          <code>textAlign</code> so layout behavior is easy to compare.
        </li>
      </ul>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows how to control width and max width for{" "}
          <code>oj-c-text-area</code>, including responsive sizing and form
          layout behavior.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-text-area</code> element.</li>
        <li>
          Set <code>width</code> or <code>maxWidth</code> using supported
          tokens like <code>sm</code> and <code>md</code>, or custom values.
        </li>
        <li>
          Outside <code>oj-c-form-layout</code>, use <code>maxWidth="md"</code>{" "}
          when you want sizing closer to form-layout defaults.
        </li>
      </ol>
    ),
  },
  resize: {
    description: (
      <>
        <p>
          This demo shows examples of the <code>resizeBehavior</code> attribute
          on <code>oj-c-text-area</code>.
        </p>
        <p>
          Resizing depends on native browser support, so the exact affordance
          can vary slightly by browser.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-text-area</code> element.</li>
        <li>
          Set <code>resizeBehavior</code> to values such as{" "}
          <code>both</code>, <code>horizontal</code>, or <code>vertical</code>.
        </li>
        <li>
          Provide a value so users can easily compare how the resize modes
          behave.
        </li>
      </ol>
    ),
  },
  "length-max": {
    description: (
      <>
        <p>
          This demo shows examples of the <code>length.max</code> and{" "}
          <code>length.counter</code> attributes.
        </p>
        <p>
          A visible counter can be shown or hidden, and readonly text areas
          never display the counter visually.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-text-area</code> element.</li>
        <li>
          Set <code>length.max</code> to cap the number of characters users can
          enter.
        </li>
        <li>
          Use <code>length.counter="none"</code> when you want screen-reader
          support without a visible counter.
        </li>
      </ol>
    ),
  },
  "max-rows": {
    description: (
      <>
        <p>
          This demo shows how the <code>maxRows</code> attribute affects growth
          and scrolling behavior in <code>oj-c-text-area</code>.
        </p>
        <p>
          Use <code>0</code> for fixed height, <code>-1</code> for unlimited
          growth, and positive values to cap expansion at a defined size.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-text-area</code> element.</li>
        <li>
          Set <code>maxRows</code> to control how tall the field can grow as
          content increases.
        </li>
        <li>
          Pair <code>rows</code> and <code>maxRows</code> so both the minimum
          and maximum visible size are intentional.
        </li>
      </ol>
    ),
  },
};
