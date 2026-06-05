import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A tab bar allows navigation between different content sections.</p><p>This demo shows how to navigate between tabbar items using right click.</p>
<p>
    The tabbar has 3 tabs. 'Home', 'Support' and 'Cookbook' use a router to update the content of the panel with the value of the state. You can also right click on any of the tabs and view the browser's built in link context menu.
  </p>
  <p>
    Pop out the demo in a new window to see how the URL changes with navigation. Notice how the URL
    parameter ojr updates to reflect the state of the router.
  </p>`;

export const tabBarLinkcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
