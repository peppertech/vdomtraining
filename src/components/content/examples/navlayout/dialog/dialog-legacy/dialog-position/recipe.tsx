// @ts-nocheck
import { h } from 'preact';

export const dialogPositionRecipe = (
  <>
    <ul>
      <li>
        Use the
        <code className={"prettyprint"}>oj-dialog</code>
        custom element to create a
        <code className={"prettyprint"}>dialog</code>
        component.
      </li>
      <li>Define the dialog body content.</li>
      <li>
        Use the
        <code className={"prettyprint"}>position</code>
        attribute to set the dialog position.
      </li>
      <li>
        Use the
        <code className={"prettyprint"}>position.offset</code>
        in combination with
        <code className={"prettyprint"}>position.my</code>
        to specify the distance (in pixels) of the dialog&apos;s edge from the target&apos;s edge.
      </li>
      <li>
        Use a style class on the
        <code className={"prettyprint"}>oj-dialog</code>
        element to set the dialog size. To set it to the full screen size use:
        <ul>
          <li><code className={"prettyprint"}>width: 100vw;</code></li>
          <li><code className={"prettyprint"}>height: 100vh;</code></li>
        </ul>
      </li>
      <li>
        Use the
        <code className={"prettyprint"}>Config.getDeviceRenderMode()</code>
        API to apply different positioning/sizing policy in different platforms.
      </li>
    </ul>
  </>
);
