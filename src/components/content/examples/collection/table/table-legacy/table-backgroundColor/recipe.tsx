// @ts-nocheck
import { h } from 'preact';

export const tableBackgroundColorRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider using the JavaScript array as shown. Make sure to specify the "keyAttributes" property of the "options" parameter.</li>
      <li>Use the JET binding to create a JET Table which uses the ArrayDataProvider you created previously as input.</li>
      <li>
        If application uses any background color class demonstrated in
        <a href={"#"}>background color demo</a>
        then table automatically picks this background color.
      </li>
      <li>If application uses any other background color then table background color can be set using --oj-current-bg-color CSS variable as shown in demo.</li>
    </ol>
  </>
);
