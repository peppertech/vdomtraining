import { h } from "preact";
import type { ComponentChildren } from "preact";

export type InputTimeDemoId =
  | "states"
  | "simple"
  | "minmax"
  | "time-zone"
  | "custom-validator";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputTimeDocs: Record<InputTimeDemoId, DocsEntry> = {
  states: {
    description: (
      <>
        <p>
          This demo shows the main visual behaviors of <code>oj-input-time</code>.
        </p>
        <p>
          It combines states, required, time variations, help, and messaging
          examples into a compact reference page.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> to compare enabled, disabled, and
          readonly behavior inside form rows.
        </li>
        <li>
          Add required and converter-based time variation examples so the page
          doubles as a quick behavior scan.
        </li>
        <li>
          Include help hints and <code>messagesCustom</code> examples so form
          guidance is visible in one place.
        </li>
      </ul>
    ),
  },
  simple: {
    description: (
      <>
        <p>
          This demo shows the value behavior for <code>oj-input-time</code>.
        </p>
        <p>
          The component value is a time-only ISO string, and the example shows
          that committed value directly under the field.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-input-time</code> element and assign it an id.</li>
        <li>Bind the value to a time-only ISO string.</li>
      </ol>
    ),
  },
  minmax: {
    description: (
      <>
        <p>
          This demo shows how to apply minimum and maximum time limits to{" "}
          <code>oj-input-time</code>.
        </p>
        <p>
          The configured min and max values constrain both typed input and the
          mobile time picker.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-input-time</code> element and assign it an id.</li>
        <li>
          Set <code>min</code> and <code>max</code> to local, time-only ISO
          strings.
        </li>
        <li>
          Use a time converter with <code>isoStrFormat=&quot;local&quot;</code>{" "}
          so user input parses back to local time-only ISO strings.
        </li>
      </ol>
    ),
  },
  "time-zone": {
    description: (
      <>
        <p>
          This demo shows how converter <code>timeZone</code> options affect
          what <code>oj-input-time</code> displays and stores.
        </p>
        <p>
          It compares time format, ISO string format, and timezone settings
          against the same component value.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-input-time</code> element.</li>
        <li>
          Bind the <code>converter</code> to an{" "}
          <code>IntlDateTimeConverter</code> with a <code>timeZone</code>.
        </li>
        <li>
          Rebuild the converter when format or timezone options change, and
          re-parse the component value so its ISO format stays in sync.
        </li>
      </ol>
    ),
  },
  "custom-validator": {
    description: (
      <>
        <p>
          This demo shows a custom validator for <code>oj-input-time</code>.
        </p>
        <p>
          The validator only allows times that fall on 15-minute intervals and
          shows nearby valid examples when validation fails.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create the standard <code>oj-input-time</code> element.</li>
        <li>
          Build a custom validator and pass the component&apos;s converter so
          it can format hint and error text.
        </li>
        <li>
          Bind that validator through the <code>validators</code> property.
        </li>
      </ol>
    ),
  },
};
