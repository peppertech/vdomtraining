// @ts-nocheck
import { h } from 'preact';

export const pictoChartSelectionRecipe = (
  <>
    <ul>
      <li>
        Set the
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        attribute to either
        {" "}
        <i>'none'</i>
        ,
        <i>'single'</i>
        , or
        {" "}
        <i>'multiple'</i>
        .
      </li>
      <li>
        Initially select items by passing them to the
        {" "}
        <i><b>selection</b></i>
        {" "}
        attribute.
      </li>
      <li>
        To catch and process events triggered by the selection/de-selection of an item, initialize the
        component with an
        {" "}
        <i>on-selection-changed</i>
        {" "}
        callback. See documentation for more detail.
      </li>
      <li>
        To implement images and special images for when picto items are select, set the
        {" "}
        <i><b>source</b></i>
        {" "}
        and
        {" "}
        <i><b>source-selected</b></i>
        {" "}
        attributes of
        {" "}
        <b>oj-picto-item</b>
        .
      </li>
      <li>
        To implement
        {" "}
        <i>hover</i>
        {" "}
        images and special images for when picto items are hovered on, set the
        {" "}
        <i><b>source-hover</b></i>
        {" "}
        and
        {" "}
        <i><b>source-hover-selected</b></i>
        {" "}
        attributes of
        {" "}
        <b>oj-picto-item</b>
        .
      </li>
      <li>
        Set the
        {" "}
        <i><b>drilling</b></i>
        {" "}
        attribute to either
        {" "}
        <i>'on'</i>
        {" "}
        or
        {" "}
        <i>'off'</i>
        .
      </li>
      <li>
        To catch and process events triggered by the drilling of an item, initialize the component with
        a
        {" "}
        <i>on-oj-drill</i>
        {" "}
        callback. See documentation for more detail.
      </li>
    </ul>
  </>
);
