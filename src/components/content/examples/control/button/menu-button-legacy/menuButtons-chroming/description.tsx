import { h } from 'preact';

export const menuButtonsChromingDescription = (
  <>
    <p>A menu button launches a menu when clicked.</p>
    <p>
      This demo features various chroming value for:
      {" "}
      <code className={"prettyprint"}>&lt;oj-button&gt;, &lt;oj-buttonset-one&gt;, &lt;oj-buttonset-many&gt;</code>
      {" "}
      and <code>&lt;oj-menu-button&gt;</code>.
    </p>
    <p>"Chroming" refers to the borders and background of the button. In typical themes:</p>
    <ul>
      <li>
        Borderless buttons are the least prominent variation. Borderless buttons are useful for
        supplemental actions that require minimal emphasis.
      </li>
      <li>
        Outlined buttons are salient, but lighter weight than the solid buttons. Outlined buttons are
        useful for secondary actions.
      </li>
      <li>
        Solid buttons stand out, and direct the user's attention to the most important actions in the
        UI.
      </li>
      <li>
        A Call To Action (CTA) button guides the user to take or complete the action that is the main
        goal of the page or page section. UX guidance is that there should only be one CTA button on a
        page at any given time.
      </li>
      <li>A Danger button alerts the user to a dangerous condition.</li>
    </ul>
    <p>
      In this demo, borderless and outlined-chrome buttons should be hovered and activated to see the
      chroming in action.
    </p>
  </>
);
