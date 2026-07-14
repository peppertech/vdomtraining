import 'preact';
import type { ComponentChildren } from "preact";

export type LabelledLinkDemoId = "states" | "editable" | "custom-action";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const labelledLinkDocs: Record<LabelledLinkDemoId, DocsEntry> = {
  states: {
    description: (
      <>
        <p>
          This demo shows the important visual aspects of{" "}
          <code>oj-c-labelled-link</code>, including form-layout rendering,
          standalone rendering, label-edge variations, and text alignment.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-c-form-layout</code> for grouped readonly link
          presentation and a flex layout for standalone rendering.
        </li>
        <li>
          Set <code>href</code> for the default link target and use{" "}
          <code>text</code> when the rendered link text should differ from the
          URL.
        </li>
        <li>
          Demonstrate <code>labelEdge</code>, <code>textAlign</code>, and
          truncation variants so the example acts as a visual reference page.
        </li>
      </ul>
    ),
  },
  editable: {
    description: (
      <>
        <p>
          This demo shows how a custom editable experience can switch between{" "}
          <code>oj-c-input-text</code> in enabled mode and{" "}
          <code>oj-c-labelled-link</code> in readonly mode.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create a wrapper component that can render either an input or a labelled link.</li>
        <li>
          Switch the rendered content based on readonly state and whether a
          value is available.
        </li>
        <li>
          When readonly with a value, render <code>oj-c-labelled-link</code>{" "}
          with a <code>mailto:</code> href and the value as link text.
        </li>
      </ul>
    ),
  },
  "custom-action": {
    description: (
      <>
        <p>
          This demo shows how <code>oj-c-labelled-link</code> can trigger a
          custom action instead of following the default href behavior.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-labelled-link</code> element.</li>
        <li>
          To perform the default action on clicking the link, set the{" "}
          <code>href</code> attribute to the corresponding url.
        </li>
        <li>
          To perform the custom action on clicking the link, do not set the{" "}
          <code>href</code> attribute and add an event listener to the{" "}
          <code>ojAction</code> event using the <code>on-oj-action</code>{" "}
          attribute.
        </li>
      </ol>
    ),
  },
};
