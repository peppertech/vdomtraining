import { h } from 'preact';

export const legendSectionsRecipe = (
  <>
    <ol>
      <li>
        Specify legend data by passing a TreeDataProvider to the <i><b>data</b></i>{' '}
        attribute.
      </li>
      <li>Leaf nodes will be treated as items; all other nodes will be treated as sections.</li>
      <li>
        Sections can be configured by providing an <code>oj-legend-section</code> element
        in the <code>sectionTemplate</code> slot.
      </li>
      <li>
        Configure the text displayed for each section using the <i><b>text</b></i>{' '}
        attribute.
      </li>
    </ol>
  </>
);
