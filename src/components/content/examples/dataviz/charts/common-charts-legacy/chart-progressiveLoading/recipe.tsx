// @ts-nocheck
import 'preact';

export const chartProgressiveLoadingRecipe = (
  <>
    <ol>
      <li>
        Supply a DataProvider using the
        {" "}
        <i><b>data</b></i>
        {" "}
        attribute. In general, supplying any DataProvider that takes time to fetch data (e.g.
        RESTDataProvider or DeferredDataProvider) may cause the component to show the loading indicator.
        Note that the initial fetch is intentionally slowed down in this demo to show this.
      </li>
      <li>
        Set the chart type using the
        {" "}
        <i><b>type</b></i>
        {" "}
        attribute.
      </li>
      <li>
        Set the coordinate system using the
        {" "}
        <i><b>coordinate-system</b></i>
        {" "}
        attribute.
      </li>
      <li>
        <b>Accessibility:</b>
        {" "}
        The application is responsible for populating the component's aria-label attribute with
        meaningful identifying information. If provided, the screenreader will incorporate it in its
        announcement of loading statuses. This is especially recommended if there are multiple
        visualizations loading in the same page.
      </li>
    </ol>
  </>
);
