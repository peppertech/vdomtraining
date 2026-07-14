import 'preact';

const descriptionHtmlText = String.raw`<p>Buttons direct users to initiate or take actions and work with a single tap, click, or keystroke.</p><p>
  This demo shows various chroming values for buttons.
</p>
<p>"Chroming" refers to the borders and background of the button. In typical themes:</p>
<ul>
  <li>
    Ghost buttons are the least prominent variation. Ghost buttons are useful for 
    performing low-priority tasks, such as manipulating the UI.
  </li>
  <li>
    Borderless buttons are a more prominent variation. Borderless buttons are useful for
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
</p>`;

export const buttonsChromingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
