// @ts-nocheck
import { h } from 'preact';

export const chartCategoricalAxisStylingRecipe = (
  <>
    <ol>
      <li>
        Add a tooltip to individual categorical axis labels by setting the
        <a target={"_blank"} href={"jsdocs/oj.ojChartItem.html#shortDesc"}>
          <i><b>short-desc</b></i>
        </a>
        property in
        <b>oj-chart-item</b>
        attribute on the corresponding group item.
      </li>
      <li>
        Customize individual categorical axis label styles by setting the
        <i><b>label-style</b></i>
        attribute on the corresponding group item.
      </li>
    </ol>
  </>
);
