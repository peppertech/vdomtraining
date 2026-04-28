export const rangeChartPolarRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart element with
        <i>
          <b>coordinate-system</b>
          : 'polar'
        </i>
        .
      </li>
      <li>
        For polar range area chart, use
        <i>
          <b>polar-grid-shape</b>
          : 'polygon'
        </i>
        to get a "radar" shape.
      </li>
      <li>
        <b>Accessibility</b>
        : In polar charts, the
        <a href={"#"}>
          <i><b>short-desc</b></i>
        </a>
        property in
        <b>oj-chart-item</b>
        is automatically populated with a default descriptor. However it can be explicitly set by the
        application to provide alternative or more detailed information.
      </li>
    </ol>
  </>
);
