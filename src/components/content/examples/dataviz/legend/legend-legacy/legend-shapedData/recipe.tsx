import { h } from 'preact';

export const legendShapedDataRecipe = (
  <>
    <ol>
      <li>
        Specify a DataProvider (items only) or a TreeDataProvider (sections and items)
        using the <i><b>data</b></i> attribute.
      </li>
      <li>
        The data supplied to the DataProvider should be of types{' '}
        <a target={"_blank"} href={"jsdocs/oj.ojLegend.html#Section"}>
          ojLegend.Section
        </a>{' '}
        and{' '}
        <a target={"_blank"} href={"jsdocs/oj.ojLegend.html#Item"}>
          ojLegend.Item
        </a>.
      </li>
    </ol>
  </>
);
