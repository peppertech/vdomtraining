// @ts-nocheck
import { h } from 'preact';

export const tableFrozenColumnTableRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider using the observable array as shown.</li>
      <li>See the API doc for details on how to specify the columns to display as well as other configuration options on ArrayDataProvider.</li>
      <li>
        To freeze a column, set the columns[].frozenEdge property to
        {" "}
        <code>all</code>
        .
      </li>
      <li>This demo sets the first, third, and last columns to freeze on each edge.</li>
      <li>The Selector checkbox column is always frozen.</li>
    </ol>
  </>
);
