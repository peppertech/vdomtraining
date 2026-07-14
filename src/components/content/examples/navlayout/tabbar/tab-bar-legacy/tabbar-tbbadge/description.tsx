// @ts-nocheck
import 'preact';

export const tabbarTbbadgeDescription = (
  <>
    <p>A tab bar allows navigation between different content sections.</p><p>
      This demo shows how to add types of badge/metadata/icon to a tabbar. Use edge options start and
      end to switch to vertical tabbar, top and bottom for horizontal tabbar. Use Condense switch to
      condense list items in tabbar. Use Dark Background switch to toggle between light and dark theme.
    </p>
    <div>
      <span className={"oj-icon-color-danger oj-ux-ico-error-s oj-icon-size-6x"} role={"img"} aria-label={"error"}></span>
      {" "}
      <b>NOTE</b>
      : Badges are supported in
      {" "}
      <a href={"globalSupport-FAQ.html#redwood"} target={"_blank"}>the Redwood theme,</a>
      {" "}
      they are not supported in the Alta themes.
    </div>
  </>
);
