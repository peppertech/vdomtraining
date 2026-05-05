import { h } from 'preact';

export const lineChartDefaultRecipe = (
  <>
    <ol>
      <li>
        Create an <code>oj-chart</code> element and set <i><b>type</b>: &apos;line&apos;</i>.
      </li>
      <li>
        Supply the data items using the <i><b>data</b></i> attribute.
      </li>
      <li>
        Make the chart grow horizontally with the <i><b>orientation</b>: &apos;horizontal&apos;</i>{' '}
        attribute.
      </li>
      <li>
        <b>Accessibility</b>: In line charts, the{' '}
        <a target={"_blank"} href={"jsdocs/oj.ojChartItem.html#shortDesc"}>
          <i><b>short-desc</b></i>
        </a>{' '}
        property in <b>oj-chart-item</b> is automatically populated with a default descriptor
        that contains series, group, and value information. However, it can be explicitly set
        by the application to provide alternative or more detailed information.
      </li>
    </ol>
  </>
);
