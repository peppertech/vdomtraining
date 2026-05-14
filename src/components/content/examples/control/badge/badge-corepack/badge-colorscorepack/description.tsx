import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A badge is a label which holds a small amount of information.</p><p>
  Badges are labels which hold small amounts of information such as number of unread messages, or an
  item's status.
</p>

This demo shows recommended mappings of states to colors
<ul>
  <li>default - deemphasized states</li>
  <li>danger - emphasized, failure, negative, or destructive states</li>
  <li>success - valid, positive, or completed states</li>
  <li>warning - impeded progress states</li>
  <li>info - normal progress states</li>
</ul>

<div>
  <span
    class="oj-icon-color-danger oj-ux-ico-error-s oj-icon-size-6x"
    role="img"
    aria-label="error"></span>
  <b>NOTE</b>
  : Badges are supported in
  <a href="globalSupport-FAQ.html#redwood" target="_blank">the Redwood theme</a>
  , they are not supported in the Alta themes.
</div>`;

export const badgeColorscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
