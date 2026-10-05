import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Construct an ArrayDataProvider using the JavaScript array as shown. Make sure to specify the
    "keyAttributes" property of the "options" parameter.
  </li>
  <li>
    Pass that data provider and a keyed columns record to each <code>oj-c-table</code>.
  </li>
  <li>
    If an application uses any background color class demonstrated in the
    <a href="#" onclick="demoGoLink(event, 'colors', 'bgcolors'); return false;">
      background color demo
    </a>, then the table will automatically pick up that background color.
  </li>
  <li>
    If an application uses any other background color, then the table's background color can be set using
    the --oj-current-bg-color CSS variable as shown in the demo.
  </li>
</ol>`;

export const tableBackgroundColorcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
