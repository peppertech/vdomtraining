import { h } from "preact";

const descriptionHtmlText = String.raw`<p>Rating gauges are typically used to display or accept user feedback on a product or service.</p><p>
  Rating gauge is a type of rating scale utilizing a star glyph or similar symbol. It is used by
  reviewers for ranking things such as films, TV shows, restaurants, and hotels.
</p>
<p>This demo showcases the JET Core Pack Rating gauge.</p>
<ul>
  <li>Rating gauge can be readonly, disabled or editable.</li>
  <li>
    Standard size for rating gauge are
    <i>sm</i>
    ,
    <i>md</i>
    and
    <i>lg</i>
    .
  </li>
  <li>
    Additional information can be displayed using tooltips for read only rating gauges or datatips interactive rating gauges.
  </li>
  <li>
    Thresholds can also be indicated by setting the
    <i><b>threshold</b></i>
    object on the component. Use thresholds to display the range of rating gauge, if the value exceeds the threshold, the gauge will change the color.
  </li>
</ul>
<b>NOTE:</b> Components with disabled set cannot be used to convey meaningful information because disabled content may not meet the
<a href="https://www.w3.org/TR/WCAG21/#contrast-minimum">minimum contrast ratio</a>
required of enabled content.`;

export const ratingGaugeOverviewcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
