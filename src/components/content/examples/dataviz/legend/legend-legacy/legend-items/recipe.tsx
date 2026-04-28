import { h } from 'preact';

export const legendItemsRecipe = (
  <>
    <ol>
      <li>
        This demo configures item properties directly in the data object to more easily
        show a variety of different configurations. These properties can also be
        configured using attributes on the <code>oj-legend-item</code> element.
      </li>
      <li>
        To create a line icon, set <i><b>symbolType</b></i> to <i>line</i> or{' '}
        <i>lineWithMarker</i>. The line can be customized using <i><b>lineWidth</b></i>{' '}
        and <i><b>lineStyle</b></i>.
      </li>
      <li>
        To create a marker icon, set <i><b>symbolType</b></i> to <i>marker</i> or{' '}
        <i>lineWithMarker</i>. The marker can be customized using{' '}
        <i><b>markerShape</b></i>. Additionally, <i><b>markerColor</b></i> can be
        specified to control the marker color if it is different from the line color for
        the <i>lineWithMarker</i> type.
      </li>
      <li>
        To create a marker icon with pattern, set <i><b>symbolType</b></i> to{' '}
        <i>marker</i> or <i>lineWithMarker</i>, and set the <i><b>pattern</b></i>{' '}
        property.
      </li>
      <li>
        To create an image icon, set <i><b>symbolType</b></i> to <i>image</i> and{' '}
        <i><b>source</b></i> to the image path.
      </li>
    </ol>
  </>
);
