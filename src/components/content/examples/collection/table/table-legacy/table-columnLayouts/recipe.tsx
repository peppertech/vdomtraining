// @ts-nocheck
import 'preact';

export const tableColumnLayoutsRecipe = (
  <>
    <ol>
      <li>Use the oj-table tag to create a JET Table.</li>
      <li>Use the layout attribute to specify whether the Table's columns should be sized based on its rendered contents (contents), or set percentages (fixed).</li>
      <li>If layout='fixed' is specified, make sure the Table has a set width on it. (width='100%' for example)</li>
      <li>Populate any or all of the Table's columns[] sizing properties to fine-tune the column layouts.</li>
    </ol>
  </>
);
