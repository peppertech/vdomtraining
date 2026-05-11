// @ts-nocheck
import { h } from 'preact';

export const tableBasicTableRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider using the JavaScript array as shown. Make sure to specify the "keyAttributes" property of the "options" parameter.</li>
      <li>See the API doc for details on how to specify the columns to display as well as other configuration options on ArrayDataProvider.</li>
      <li>Use the JET binding to create a JET Table which uses the ArrayDataProvider you created previously as input.</li>
      <li>Apply the binding as shown at the bottom.</li>
      <li>Add either a summary or caption to conform to accessibility guidelines.</li>
      <li>Set the headerClassName & className to one of the responsive classes like 'oj-sm-only-hide' for columns which should be responsively dropped in small screen sizes such as mobile.</li>
      <li>Set the resizable property for columns.</li>
      <li>Use the "selection-mode" attribute to set either single or multiple row and/or column selection. (As a note, the 'id' property of each column is required when column selection is enabled).</li>
      <li>To enable column reordering specify the dnd option as: &#123;reorder: &#123;columns: 'enabled'&#125;&#125;.</li>
      <li>Optionally, use the 'style' attribute to set a height for the Table. Can be a percentage or px value.</li>
      <li>To enable high-water mark scrolling, set the scrollPolicy option to loadMoreOnScroll.</li>
      <li>Optionally set scrollPolicyOptions.</li>
      <li>If the data you are loading is already sorted and you would like to display the sort icon in the correct direction when table is rendered, then please specify the implicitSort option.</li>
    </ol>
  </>
);
