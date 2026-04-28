// @ts-nocheck
import { h } from 'preact';

export const combinationChartDefaultRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart element and set
        <i>
          <b>type</b>
          : 'combo'
        </i>
        .
      </li>
      <li>
        Supply the data items using the
        <i><b>data</b></i>
        attribute. See below for an example.
      </li>
      <li>
        The
        <i><b>type</b></i>
        attribute can be used on a series item to set its type. Valid values are
        <i>'bar'</i>
        ,
        <i>'line'</i>
        , and
        <i>'area'</i>
        . By default, the first three series are assigned
        <i>'bar'</i>
        ,
        <i>'line'</i>
        , and
        <i>'area'</i>
        type respectively and then the type repeats, i.e the successive series will be
        <i>'bar'</i>
        ,
        <i>'line'</i>
        ,
        <i>'area'</i>
        and so on.
      </li>
      <li>
        Make the chart grow horizontally with
        <i>
          <b>orientation</b>
          : 'horizontal'
        </i>
        attribute.
      </li>
      <li>
        Stack the data items with
        <i>
          <b>stack</b>
          : 'on'
        </i>
        attribute.
      </li>
      <li>
        <b>Accessibility</b>
        : In combination charts, the
        <a target={"_blank"} href={"jsdocs/oj.ojChartItem.html#shortDesc"}>
          <i><b>short-desc</b></i>
        </a>
        property in
        <b>oj-chart-item</b>
        is automatically populated with a default descriptor that contains series, group, and value
        information. However it can be explicitly set by the application to provide alternative or more
        detailed information.
      </li>
    </ol>
  </>
);
