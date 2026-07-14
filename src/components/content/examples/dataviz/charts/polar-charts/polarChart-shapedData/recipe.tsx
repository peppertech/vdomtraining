import 'preact';

export const polarChartShapedDataRecipe = (
  <ol>
    <li>
      Create an oj-chart element with <i><b>coordinate-system</b>: 'polar'</i>.
    </li>
    <li>
      To set the chart type, use the <i><b>type</b></i> attribute. The available
      options are <i>bar</i>, <i>line</i>, <i>area</i>, <i>combo</i>, <i>scatter</i>,
      {" "}
      and <i>bubble</i>.
    </li>
    <li>
      Supply the data items using the <i><b>data</b></i> attribute.
    </li>
    <li>
      The data supplied to the ArrayDataProvider should be of type{' '}
      <a target="_blank" href={'#'}>ojChart.DataItem</a>.
    </li>
    <li>
      For polar line and area chart, use <i><b>polar-grid-shape</b>: 'polygon'</i> to
      get a &quot;radar&quot; shape.
    </li>
    <li>
      Stack the data items with <i><b>stack</b>: 'on'</i> attribute.
    </li>
    <li>
      <b>Accessibility</b>: In polar charts, the <a target="_blank" href={'#'}><i><b>short-desc</b></i></a>{' '}
      property in <b>oj-chart-item</b> is automatically populated with a default
      descriptor. However it can be explicitly set by the application to provide
      alternative or more detailed information.
    </li>
  </ol>
);
