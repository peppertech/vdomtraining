// @ts-nocheck
import { h } from 'preact';

export const collapsibleDeferredRenderingRecipe = (
  <>
    <ol>
      <li>
        See
        {" "}
        <a href={"#"}>
          the Basic Collapsible demo
        </a>
        {" "}
        for details on creating a Collapsible.
      </li>
      <li>
        See
        {" "}
        <a href={"#"}>
          the Simple Navigation demo
        </a>
        {" "}
        on how to create views and viewModels for the content.
      </li>
      <li>
        Wrap the content of the collapsible in an oj-defer element in order to defer rendering it until
        the content is shown.
      </li>
    </ol>
  </>
);
