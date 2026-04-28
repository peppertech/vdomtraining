import { h } from "preact";

const descriptionHtmlText = String.raw`<p>Rating gauges are typically used to display or accept user feedback on a product or service.</p><p>
  Rating gauge is a type of rating scale utilizing a star glyph or similar symbol. It is used by
  reviewers for ranking things such as films, TV shows, restaurants, and hotels.
</p>
<p>This demo shows how to use on-value-changed, 
  changed and transient-value to track the various Rating gauge user interactions.
</p>`;

export const ratingGaugeEventscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
