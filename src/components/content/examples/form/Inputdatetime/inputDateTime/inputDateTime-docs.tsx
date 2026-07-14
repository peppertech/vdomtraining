import 'preact';
import type { ComponentChildren } from "preact";

export type InputDateTimeDemoId =
  | "states"
  | "simple"
  | "time-zone"
  | "multiple-widgets"
  | "width"
  | "text-align"
  | "styling";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputDateTimeDocs: Record<InputDateTimeDemoId, DocsEntry> = {
  states: {
    description: (
      <>
        <p>
          This demo allows you to quickly scan important visual aspects of{" "}
          <code>oj-input-date-time</code>.
        </p>
        <p>
          It shows states, required validation, date and time picker variations,
          help, and custom messages in <code>oj-form-layout</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> to compare enabled, disabled, and
          readonly states in rows.
        </li>
        <li>
          Add a required field, week-of-year picker option, and 15-minute time
          increment option to show common date-time behavior.
        </li>
        <li>
          Include <code>help</code>, <code>helpHints</code>, and{" "}
          <code>messagesCustom</code> examples so user assistance is visible in
          one place.
        </li>
      </ul>
    ),
  },
  simple: {
    description: (
      <>
        <p>
          A JET <code>oj-input-date-time</code> value must be an ISO string.
        </p>
        <p>
          This demo shows the component&apos;s ISO string value and how that
          value is formatted and displayed in the field.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-input-date-time</code> element and assign it an id.
        </li>
        <li>
          Bind the <code>value</code> to a moment-in-time ISO date-time string.
        </li>
        <li>Render the same value next to the field for quick comparison.</li>
      </ol>
    ),
  },
  "time-zone": {
    description: (
      <>
        <p>
          An input date time allows the user to enter or select a date and time
          value.
        </p>
        <p>
          This JET InputDateTime demo provides an example of using the{" "}
          <code>timeZone</code> in the converter options and seeing how it
          affects the value presented to the user and the value used internally.
        </p>
        <p>
          A value of <code>2013-12-02T04:00:00Z</code> has a different local
          datetime shown to the user depending on the <code>timeZone</code>. It
          is <code>12/1/13, 8:00:00 PM PST</code> in America/Los_Angeles, and{" "}
          <code>12/1/13, 11:00:00 PM EST</code> in America/New_York, and it
          would be <code>12/2/13, 4:00:00 AM GMT</code> if no{" "}
          <code>timeZone</code> is set and your local browser is in
          Europe/London.
        </p>
        <ul>
          <li>
            <code>dateFormat</code>: How the converter formats the date portion
            of the component value.
          </li>
          <li>
            <code>timeFormat</code>: How the converter formats the time portion
            of the component value.
          </li>
          <li>
            <code>isoStrFormat</code>: What ISO string format to use when the
            converter parses the display value into the component value. If the
            ISO string format is <code>local</code>, it is ignored and treated
            as <code>offset</code> for datetime values, which must be
            moment-in-time. <code>local</code> <code>isoStrFormat</code> only
            applies to time-only and date-only ISO strings.
          </li>
          <li>
            <code>timeZone</code>: What timeZone is used for the value. If{" "}
            <code>timeZone</code> is not specified, it defaults to the
            user&apos;s system&apos;s timeZone. Use the timeZone option if the
            user wants to see the moment-in-time datetime in a timezone other
            than their own local browser&apos;s timezone.
          </li>
        </ul>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-input-date-time</code> element.</li>
        <li>
          Bind its <code>converter</code> to an{" "}
          <code>IntlDateTimeConverter</code> with a selected{" "}
          <code>timeZone</code>.
        </li>
        <li>
          Rebuild the converter when date format, time format, ISO string
          format, or timezone options change.
        </li>
      </ol>
    ),
  },
  "multiple-widgets": {
    description: (
      <>
        <p>
          This demo shows multiple <code>oj-input-date-time</code> components
          bound to the same value, each with a different converter.
        </p>
        <p>
          Bind shared values only to similar components. Binding date-time and
          date-only components to the same value can wipe out the time portion.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create two <code>oj-input-date-time</code> elements with separate ids
          and labels.
        </li>
        <li>
          Bind both fields to the same date-time value so a change in either
          field updates the other.
        </li>
        <li>
          Add a second <code>IntlDateTimeConverter</code> to show the same
          value with a different date and time format.
        </li>
      </ol>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows how to control the width and max-width of{" "}
          <code>oj-input-date-time</code> with framework and custom classes.
        </p>
        <p>
          Custom classes are used instead of inline styles, which aligns with
          content security policy best practices.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Prefer <code>max-width</code> where possible so the field can still
          shrink with its container.
        </li>
        <li>
          Use JET form-control width classes or scoped custom CSS classes
          instead of inline width styles.
        </li>
      </ul>
    ),
  },
  "text-align": {
    description: (
      <>
        <p>
          This demo shows how text can be aligned via text alignment classes on{" "}
          <code>oj-input-date-time</code>.
        </p>
        <ul>
          <li>
            <code>oj-form-control-text-align-start</code> aligns left when
            reading direction is ltr and right when reading direction is rtl.
          </li>
          <li>
            <code>oj-form-control-text-align-right</code> aligns right
            regardless of reading direction, often used for numbers.
          </li>
          <li>
            <code>oj-form-control-text-align-end</code> aligns right when
            reading direction is ltr and left when reading direction is rtl.
          </li>
        </ul>
      </>
    ),
    recipe: (
      <p>
        Add <code>oj-form-control-text-align-start</code>,{" "}
        <code>oj-form-control-text-align-right</code>, or{" "}
        <code>oj-form-control-text-align-end</code> to the custom element or to
        one of its ancestor elements.
      </p>
    ),
  },
  styling: {
    description: (
      <p>
        This demo shows how to use CSS variables to style an{" "}
        <code>oj-input-date-time</code> text field instance.
      </p>
    ),
    recipe: (
      <p>
        Create a CSS class with text field variables set to the preferred
        values, then apply that class to the <code>oj-input-date-time</code>{" "}
        instance. This example uses <code>demo-text-field-info</code> to change
        the background, border, and value text color.
      </p>
    ),
  },
};
