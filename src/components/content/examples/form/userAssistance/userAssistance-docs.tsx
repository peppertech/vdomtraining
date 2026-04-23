import { h } from "preact";
import type { ComponentChildren } from "preact";

export type UserAssistanceDemoId =
  | "overview"
  | "converter-hint"
  | "validator-hints";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const userAssistanceDocs: Record<UserAssistanceDemoId, DocsEntry> = {
  overview: {
    description: (
      <>
        <p>
          Help and hints and messages are known as user assistance text.
        </p>
        <p>
          This demo shows where <code>help-hints.definition</code>,{" "}
          <code>help-hints.source</code> and <code>help.instruction</code> are
          displayed on the component by default. The user assistance help and
          hints displays to the user on focus of the field. The form
          component&apos;s <code>help-hints.source</code> provides a link to the
          user to learn more. It is displayed appended to the user assistance
          text.
        </p>
        <p>
          In the Redwood theme for clarity only one user assistance text shows
          to the user, even if multiple user assistance text properties are on
          the component. Following are the precedence rules:
        </p>
        <p>
          <code>help.instruction</code> shows;
          <br />
          if no <code>help.instruction</code>, then the validator hint shows;
          <br />
          if no <code>help.instruction</code> or validator hint, then{" "}
          <code>help-hints.definition</code> shows;
          <br />
          if no <code>help.instruction</code>, validator hint, or{" "}
          <code>help-hints.definition</code>, then the converter hint shows.
        </p>
      </>
    ),
    recipe: (
      <>
        <p>
          <code>help-hints</code> attributes:
        </p>
        <ul>
          <li>
            For help definition text, set{" "}
            <code>
              help-hints.definition=&apos;your custom help definition
              here&apos;
            </code>{" "}
            on the form component. The user will see this text inline under the
            field when they focus on the component if no hints with higher
            precedence are shown.
          </li>
          <li>
            For help source url, set{" "}
            <code>help-hints.source=&apos;https://www.oracle.com&apos;</code>{" "}
            on the form component. The user will see a &apos;Learn
            more...&apos; link after the user assistance text.
          </li>
        </ul>
        <p>
          <code>help.instruction</code>:
        </p>
        <ul>
          <li>
            Set the <code>help.instruction</code> attribute on the component to
            a string to see the help.instruction. Example:{" "}
            <code>
              help.instruction = &quot;enter at least 3 alphanumeric
              characters&quot;
            </code>
            .
          </li>
          <li>
            Set the <code>help.instruction</code> attribute on the component to
            a formatted string. Example:{" "}
            <code>
              help.instruction =
              &apos;&lt;html&gt;enter &lt;span style=&quot;color:red&quot;&gt;at
              least 3 alphanumeric&lt;/span&gt;
              characters&lt;/html&gt;&apos;
            </code>
            .
          </li>
          <li>
            The user will see the <code>help.instruction</code> inline under
            the field when they focus. <code>help.instruction</code> has the
            highest precedence over other hint types, like{" "}
            <code>help-hints.definition</code>.
          </li>
        </ul>
      </>
    ),
  },
  "converter-hint": {
    description: (
      <>
        <p>
          The converter hint shows under the field when the field has focus.
        </p>
        <p>
          This demo shows how to not show the component&apos;s converter hint to
          the user by setting <code>display-options.converter-hint</code> to{" "}
          <code>none</code>, and how placeholder text affects the hint display.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-c-input-text</code> and bind a converter to the{" "}
          <code>converter</code> property.
        </li>
        <li>
          To suppress the converter hint, set{" "}
          <code>display-options.converter-hint=&quot;none&quot;</code> on the
          component.
        </li>
        <li>
          Add a placeholder to compare how converter hints are shown when
          placeholder text is also present.
        </li>
      </ol>
    ),
  },
  "validator-hints": {
    description: (
      <>
        <p>
          The demo shows where the validator hint text and validator error
          messages are displayed on the component.
        </p>
        <p>
          To view the hint set focus on the input. The validator hints are
          displayed under the field. Only one type of hint shows under the
          field, so if the component has <code>help.instruction</code>, that
          will take precedence over the validator hints.
        </p>
        <p>
          Error messages generated during component validation are shown inline
          by default.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Set <code>min</code> and <code>max</code> attributes, if supported on
          the component, to see the default range validator hint on focus.
        </li>
        <li>
          For number components, setting <code>min</code> and <code>max</code>{" "}
          automatically creates a number range validator.
        </li>
        <li>
          Alternatively, you can provide explicit validators through the{" "}
          <code>validators</code> attribute when you need custom rules.
        </li>
      </ul>
    ),
  },
};
