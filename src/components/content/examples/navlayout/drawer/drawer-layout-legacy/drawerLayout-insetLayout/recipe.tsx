// @ts-nocheck
import 'preact';

export const drawerLayoutInsetLayoutRecipe = (
  <>
    <ol>
      <li>
        Create a
        {" "}
        <code className={"prettyprint"}>div</code>
        {" "}
        element representing a header.
      </li>
      <li>
        Create a
        {" "}
        <code className={"prettyprint"}>oj-drawer-layout</code>
        {" "}
        element.
      </li>
      <li>
        Create a drawer by adding a child
        {" "}
        <code className={"prettyprint"}>div</code>
        {" "}
        with a
        {" "}
        <code className={"prettyprint"}>slot="start"</code>
        {" "}
        attribute.
      </li>
      <li>
        Create a drawer by adding a child
        {" "}
        <code className={"prettyprint"}>div</code>
        {" "}
        with a
        {" "}
        <code className={"prettyprint"}>slot="end"</code>
        {" "}
        attribute.
      </li>
      <li>
        Limit the height of the
        {" "}
        <code className={"prettyprint"}>oj-drawer-layout</code>
        {" "}
        using e.g. absolute positioning.
        <ul>
          <li>
            Add your own custom class (or use the style attribute) to apply
            {" "}
            <code className={"prettyprint"}>position: absolute; top:0; bottom: 0;</code>
            {" "}
            to the drawer layout element
          </li>
          <li>
            Stretch its parent element to cover desired area applying e.g.
            {" "}
            <code className={"prettyprint"}>min-height: 100vh;</code>
            .
          </li>
        </ul>
      </li>
      <li>
        Create a fixed drawer header using e.g.
        {" "}
        <a href={"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout"}>
          CSS Flexible Box Layout
        </a>
        .
        <ul>
          <li>
            Add your own custom class (or use the style attribute) to apply
            {" "}
            <code className={"prettyprint"}>display: flex; flex-direction: column</code>
            {" "}
            to the drawer element
          </li>
          <li>Create a child div that contains header element.</li>
          <li>Create a child div that contains drawer content.</li>
          <li>
            Add your own custom class (or use the style attribute) to apply
            {" "}
            <code className={"prettyprint"}>overflow-y: auto</code>
            {" "}
            to the element that contains drawer content.
          </li>
        </ul>
      </li>
    </ol>
  </>
);
