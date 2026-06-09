// @ts-nocheck
import { h } from 'preact';

export const tableGridStylingRecipe = (
  <>
    <ol>
      <li>
        Table uses
        {" "}
        <code>list</code>
        {" "}
        as default value for
        {" "}
        <code>display</code>
        {" "}
        attribute. Set it to
        {" "}
        <code>grid</code>
        {" "}
        if compact grid styling is needed.
      </li>
      <li>
        Default value for
        {" "}
        <code>horizontal-grid-visible</code>
        {" "}
        is
        {" "}
        <code>auto</code>
        . Set
        {" "}
        <code>horizontal-grid-visible</code>
        {" "}
        to
        {" "}
        <code>enabled</code>
        {" "}
        or
        {" "}
        <code>disabled</code>
        {" "}
        to show or hide horizontal lines.
      </li>
      <li>
        Default value for
        {" "}
        <code>vertical-grid-visible</code>
        {" "}
        is
        {" "}
        <code>auto</code>
        . Set
        {" "}
        <code>vertical-grid-visible</code>
        {" "}
        to
        {" "}
        <code>enabled</code>
        {" "}
        or
        {" "}
        <code>disabled</code>
        {" "}
        to show or hide vertical lines.
      </li>
    </ol>
  </>
);
