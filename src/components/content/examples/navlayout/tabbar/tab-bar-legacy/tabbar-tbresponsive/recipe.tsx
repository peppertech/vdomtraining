// @ts-nocheck
import { h } from 'preact';

export const tabbarTbresponsiveRecipe = (
  <>
    <p>
      In above demo, When screen size is large, all items are collapsed and list is aligned to right.
      Changing screen size to medium will align list to center. When screen size is small, all items
      will be stretched to occupy available space and displays only icons.
    </p>
    <ul>
      <li>
        See the <a href={"#"}>Basic demo</a> for how to create a Tab Bar.
      </li>
      <li>
        On the ul put classes <code class="demo-selectornames">oj-md-condense oj-md-justify-content-center oj-lg-justify-content-flex-end</code>:
      </li>
      <li><code>oj-md-condense</code>: collapses the Tab bar items on medium and up screens.</li>
      <li><code>oj-md-justify-content-center</code>: centers the tab bar on medium and up screens.</li>
      <li><code>oj-lg-justify-content-flex-end</code>: end aligns the tab bar on large and up screens.</li>
    </ul>
    <p>
      Use Tab bar only to toggle between related content sections. To perform any actions on the
      content use <a href={"#"}>oj-toolbar</a>.
    </p>
  </>
);
