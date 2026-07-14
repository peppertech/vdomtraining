// @ts-nocheck
import 'preact';

export const badgeBadgecolorsDescription = (
  <>
    <p>A Badge is a label which holds a small amount of information. It consists of a span with the appropriate text inside, with class="oj-badge".</p><p>
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
      <span className={"oj-icon-color-danger oj-ux-ico-error-s oj-icon-size-6x"} role={"img"} aria-label={"error"}></span>
      {" "}
      <b>NOTE</b>
      : Badges are supported in
      {" "}
      <a href={"globalSupport-FAQ.html#redwood"} target={"_blank"}>the Redwood theme</a>
      , they are not supported in the Alta themes.
    </div>
  </>
);
