import { h } from 'preact';

export const lineChartRefObjectRecipe = (
  <>
    <p>
      On the chart's x-Axis and/or y-Axis object, create a
      {" "}
      <i><b>reference-objects</b></i>
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
        To set a different value or range at a particular x-coordinate declare an
        {" "}
        <i><b>items</b></i>
        {" "}
        array. For each element set the
        {" "}
        <i><b>x</b></i>
        {" "}
        property and declare a
        {" "}
        <i><b>value</b></i>
        {" "}
        or range with
        {" "}
        <i><b>low</b></i>
        {" "}
        and
        {" "}
        <i><b>high</b></i>
        .
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
