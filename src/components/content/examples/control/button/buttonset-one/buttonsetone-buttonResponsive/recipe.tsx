// @ts-nocheck
import { h } from "preact";

export const buttonsetoneButtonResponsiveRecipe = (
  <>
    <ol>
      <li>
        Use shorter labels at narrower screen widths and switch
        <code className={"prettyprint"}>display</code> to
        <code className={"prettyprint"}>icons</code> when only icons should remain visible.
      </li>
      <li>
        Apply <code className={"prettyprint"}>oj-buttonset-width-auto</code> when the buttonset
        should fit its contents.
      </li>
      <li>For very narrow screens, replace the buttonset with a more compact form control.</li>
    </ol>
  </>
);
