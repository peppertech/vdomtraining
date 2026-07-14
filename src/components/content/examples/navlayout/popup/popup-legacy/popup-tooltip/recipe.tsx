import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>Set the "position" option to an alignment that gives the desired effect.</li>
  <li>Register a "mouseenter" and "focus" event listeners to "open" the tooltip popup.</li>
  <li>
    The default "autoDismiss" option of "focusLoss" will "close" the popup when focus is established
    outside of the launcher or the popups content. In addition, this "autoDismiss" option provides
    dismissal for keyboard navigation away from the launcher.
  </li>
  <li>
    The mouse listeners gives the designed hover tooltip popup effect for the non-assisted desktop
    platforms.
  </li>
  <li>
    The F6 keypress can be used to toggle focus between the launcher and tooltip without causing
    dismissal. This navigation is announced in a live region when assisted technology is used.
  </li>
  <li>
    Set the data-oj-binding-provider attribute to 'none' to notify the framework that this element
    has no knockout dependencies and does not need to wait for an applyBindings call before
    initializing.
  </li>
</ul>`;

export const popupTooltipRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
