import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Action slot can have buttons, menu buttons, button set and toolbar buttons. Its recommended that
    we use small sized buttons so the height of the list item is not too
    tall.
  </li>
  <li>Use the selector slot for selector component and metadata slot for extra content.</li>
  <li>
    Look at the demos
    <a href="#" onclick="demoGoLink(event, 'listItemLayout', 'overview'); return false;">
      Overview,
    </a>
    <a href="#" onclick="demoGoLink(event, 'listItemLayout', 'threeLine'); return false;">
      Three Line,
    </a>
    <a href="#" onclick="demoGoLink(event, 'listItemLayout', 'overlineSlot'); return false;">
      Overline,
    </a>
    <a href="#" onclick="demoGoLink(event, 'listItemLayout', 'leadingSlot'); return false;">
      Leading,
    </a>
    <a href="#" onclick="demoGoLink(event, 'listItemLayout', 'trailingSlot'); return false;">
      Trailing,
    </a>
    <a href="#" onclick="demoGoLink(event, 'listItemLayout', 'quaternarySlot'); return false;">
      Quaternary
    </a>
    for configuring other slots.
  </li>
</ol>`;

export const listItemLayoutActionlegacyRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
