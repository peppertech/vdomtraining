// @ts-nocheck
import { h } from 'preact';

export const navigationlistCategoryHeaderRecipe = (
  <>
    To support accessibility, each category list should have it's own tab stop and
    {" "}
    <code className={"prettyprint"}>aria-labelledby</code>
    {" "}
    pointing to respective header.So this demo uses multiple Navigation List components and uses
    {" "}
    <code className={"prettyprint"}>on-selection-changed</code>
    {" "}
    listener to ensure one item selected at a time across multiple lists.
    <ol>
      <li>Create multiple navigation lists with separate headers as shown below.</li>
      <li>
        Ensure that
        {" "}
        <code className={"prettyprint"}>aria-labelledby</code>
        {" "}
        on navigation list points to header id.
      </li>
      <li>If desired, an icon can be added before the item text as shown.</li>
      <li>
        Add
        {" "}
        <code className={"prettyprint"}>on-selection-changed</code>
        {" "}
        listener to ensure only one item is selected at a time among all navigation lists.
      </li>
    </ol>
  </>
);
