// @ts-nocheck
import { h } from 'preact';

export const badgeOverviewDescription = (
  <>
    <p>A Badge is a label which holds a small amount of information. It consists of a span with the appropriate text inside, with class="oj-badge".</p><p>
      Badges are labels which hold small amounts of information such as number of unread messages, or an
      item's status.
    </p>
    <p>
      This demo shows how to create badges of various colors and sizes. An end badge is used to
      highlight an item’s status in a card.
    </p>
    <div className={"oj-sm-padding-2x-top"}>
      <span className={"oj-icon-color-danger oj-ux-ico-error-s oj-icon-size-6x"} role={"img"} aria-label={"error"}></span>
      <b>NOTE</b>
      : Badges are supported in
      <a href={"globalSupport-FAQ.html#redwood"} target={"_blank"}>the Redwood theme</a>
      , they are not supported in the Alta themes.
    </div>
  </>
);
