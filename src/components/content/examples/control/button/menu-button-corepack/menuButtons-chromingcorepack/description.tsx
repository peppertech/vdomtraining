import { h } from 'preact';

const descriptionHtmlText = String.raw`<p>A menu button launches a menu when clicked.</p>
<p>
  This demo features various chroming values for
  <code class="prettyprint">&lt;oj-c-button&gt;, &lt;oj-c-progress-button&gt;, &lt;oj-c-menu-button&gt;, &lt;oj-c-split-menu-button&gt;, &lt;oj-c-buttonset-single&gt;, &lt;oj-c-buttonset-multiple&gt;</code>.
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
    goal of the page or page section.
  </li>
  <li>A Danger button alerts the user to a dangerous condition.</li>
</ul>
<p>
  In this demo, borderless and outlined-chrome menu buttons should be hovered and activated to see
  the chroming in action.
</p>`;

export const menuButtonsChromingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
