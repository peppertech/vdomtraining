import 'preact';

const recipeHtmlText = String.raw`<ol>
    <li>
        Choose the orientation of the legend with the
        <i><b>orientation</b></i>
        attribute.
    </li>
    <li>
        Choose the horizontal alignment of the legend with the
        <i><b>halign</b></i>
        attribute.
    </li>
    <li>
        Choose the vertical alignment of the legend with the
        <i><b>valign</b></i>
        attribute.
    </li>
    <li>
        To set the container size to fit the legend, use the <i><b>getPreferredSize</b></i> util to get the preferred size.
    </li>
</ol>`;

export const legendLayoutcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
