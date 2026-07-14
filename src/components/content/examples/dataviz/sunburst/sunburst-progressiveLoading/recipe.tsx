// @ts-nocheck
import 'preact';

export const sunburstProgressiveLoadingRecipe = (
  <>
    <ol>
      <li>
        Supply a TreeDataProvider using the
        {" "}
        <i><b>data</b></i>
        {" "}
        attribute. In general, supplying any TreeDataProvider that takes time to fetch data (e.g.
        RESTTreeDataProvider) may cause the component to show the progressive loading indicator. Note
        that the initial fetch is intentionally slowed down in this demo to show this.
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
