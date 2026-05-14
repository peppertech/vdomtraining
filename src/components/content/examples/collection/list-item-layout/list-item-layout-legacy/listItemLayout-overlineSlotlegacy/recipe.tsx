import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    The sample shows how to render overline slot contents along with default, secondary slot,
    tertiary slot contents.
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
    <a href="#" onclick="demoGoLink(event, 'listItemLayout', 'leadingSlot'); return false;">
      Leading,
    </a>
    <a href="#" onclick="demoGoLink(event, 'listItemLayout', 'trailingSlot'); return false;">
      Trailing,
    </a>
    <a href="#" onclick="demoGoLink(event, 'listItemLayout', 'actionSlot'); return false;">
      Action,
    </a>
    <a href="#" onclick="demoGoLink(event, 'listItemLayout', 'quaternarySlot'); return false;">
      Quaternary
    </a>
    for configuring other slots.
  </li>
</ol>`;

export const listItemLayoutOverlineSlotlegacyRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
