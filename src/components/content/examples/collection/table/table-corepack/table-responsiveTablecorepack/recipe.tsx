import 'preact';

const recipeHtmlText = String.raw`<ul>
    <li>
        Please see the
        <a href="#" onclick="demoGoLink(event, 'tableCorepack', 'basicTable'); return false;">
            basic oj-c-table demo
        </a>
        for more information about configuring a basic oj-c-table.
    </li>
    <li>
      Use the <code class="prettyprint">ResponsiveKnockoutUtils</code> utility function to
      create an observable that responds to screen size changes.
    </li>
    <li>
      Set the <code class="prettyprint">column-order</code> to select a subset of columns to
      display for each screen size desired.
    </li>
  </ul>`;

export const tableResponsiveTablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
