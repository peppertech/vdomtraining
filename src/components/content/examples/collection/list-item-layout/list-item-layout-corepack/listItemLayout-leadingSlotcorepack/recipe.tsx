import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    The sample shows how to render leading slot contents within a oj-c-list-item-layout component.
  </li>
  <li>
    Leading slot can have icon, image,
    <a href="#" onclick="demoGoLink(event, 'avatar', 'overview'); return false;">avatar</a>,
    <a href="#" onclick="demoGoLink(event, 'badge', 'overview'); return false;">badge</a>.
  </li>
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

export const listItemLayoutLeadingSlotcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
