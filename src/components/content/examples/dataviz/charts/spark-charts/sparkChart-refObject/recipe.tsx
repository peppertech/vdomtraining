// @ts-nocheck
import { h } from 'preact';

export const sparkChartRefObjectRecipe = (
  <>
    <p>
      On the spark chart, create a
      {" "}
      <i><b>referenceObjects</b></i>
      {" "}
      array. Apply the following steps to this object.
    </p>
    <ol>
      <li>
        Set the
        {" "}
        <i><b>type</b></i>
        {" "}
        property as either
        {" "}
        <i>'line'</i>
        {" "}
        (default) or
        {" "}
        <i>'area'</i>
        .
      </li>
      <li>
        For reference lines, set the
        {" "}
        <i><b>value</b></i>
        {" "}
        property to the desired reference value. For reference areas, use
        {" "}
        <i><b>low</b></i>
        {" "}
        and
        {" "}
        <i><b>high</b></i>
        {" "}
        to declare the reference range.
      </li>
      <li>
        Set the
        {" "}
        <i><b>location</b></i>
        {" "}
        property as either
        {" "}
        <i>'back'</i>
        {" "}
        (default) or
        {" "}
        <i>'front'</i>
        .
      </li>
    </ol>
  </>
);
