import 'preact';
import type { ComponentChildren } from "preact";

export type CheckBoxCorePackDemoId = "overview" | "cross-field-validation";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const checkBoxCorePackDocs: Record<CheckBoxCorePackDemoId, DocsEntry> =
  {
    overview: {
      description: (
        <>
          <p>
            This demo shows some of the more important visual aspects of{" "}
            <code>oj-c-checkbox</code>.
          </p>
          <p>
            It also works as a quick scan for state, required, help, and custom
            message behavior.
          </p>
        </>
      ),
      recipe: (
        <ul>
          <li>
            Use <code>disabled</code> and <code>readonly</code> to show the key
            state variations of <code>oj-c-checkbox</code>.
          </li>
          <li>
            Add required and help examples so the page also serves as a compact
            user assistance reference.
          </li>
          <li>
            Use <code>messagesCustom</code> to demonstrate error, warning,
            information, and confirmation messaging.
          </li>
        </ul>
      ),
    },
    "cross-field-validation": {
      description: (
        <p>
          This demo shows how to use custom validation for{" "}
          <code>oj-c-checkbox</code>.
        </p>
      ),
      recipe: (
        <>
          <h6>Example: Adding items to an online shopping cart.</h6>
          <p>
            An online store has items that can be added to an online cart. The
            custom validation is used to verify that alcoholic drinks are
            purchased by people who are 21 or older.
          </p>
          <h6>Test Steps</h6>
          <ol>
            <li>Pick the type of items to add to the cart.</li>
            <li>
              Use the checkbox component to verify your age. Over 21 is
              unselected by default.
            </li>
            <li>Hit <strong>Add to cart</strong>.</li>
          </ol>
          <h6>Results</h6>
          <ul>
            <li>No alcoholic drinks selected: no errors.</li>
            <li>
              Alcoholic drinks selected while under 21: an error message is
              displayed.
            </li>
            <li>
              Alcoholic drinks selected and 21 or over specified: no errors.
            </li>
          </ul>
        </>
      ),
    },
  };
