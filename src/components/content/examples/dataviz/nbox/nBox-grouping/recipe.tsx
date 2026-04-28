// @ts-nocheck
import { h } from 'preact';

export const nBoxGroupingRecipe = (
  <>
    <ol>
      <li>Create an oj-n-box element.</li>
      <li>
        Shape each data item with the NBox node properties: label, row, column,
        icon, shortDesc, and groupCategory.
      </li>
      <li>
        Set the <b>groupCategory</b> property on nodes that should be grouped
        together.
      </li>
      <li>
        Use <b>groupBehavior</b> to choose whether groups are formed within each
        cell or across cells.
      </li>
      <li>
        Use <b>groupAttributes</b> to specify which shared visual attributes are
        reflected by the group node.
      </li>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the
        <i><b>shortDesc</b></i>
        property with meaningful descriptors as the oj-n-box element does not provide a default
        descriptor.
      </li>
    </ol>
  </>
);
