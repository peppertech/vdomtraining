// @ts-nocheck
import { h } from 'preact';

export const badgeEndbadgeDescription = (
  <>
    <p>
      Badges are labels which hold small amounts of information such as number of unread messages, or an
      item's status.
    </p>
    <p>
      End badges are used at the edge of a component like card to highlight an item's status. This demo
      shows how to use end badge on a card.
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
