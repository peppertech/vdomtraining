// @ts-nocheck
import { h } from 'preact';

export const collapsibleHeaderBehaviorRecipe = (
  <>
    <ol>
      <li>
        When embedding other controls in the
        <code className={"prettyprint"}>oj-collapsible</code>
        header area, set the
        <code className={"prettyprint"}>class=&quot;oj-clickthrough-disabled&quot;</code>
        on the control to prevent the click event from propagating to the header area.
      </li>
    </ol>
  </>
);
