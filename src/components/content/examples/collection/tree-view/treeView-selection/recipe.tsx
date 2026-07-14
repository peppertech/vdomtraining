import 'preact';

export const treeViewSelectionRecipe = (
  <>
    <ol>
      <li>
        Construct an ArrayTreeDataProvider using the JavaScript array as shown. Make sure to
        specify the &quot;keyAttributes&quot; property of the &quot;options&quot; parameter.
      </li>
      <li>
        Use the JET binding to create a JET Treeview which uses the ArrayTreeDataProvider you
        created previously as input.
      </li>
      <li>
        Create an ArrayDataProvider to capture different selection modes and use it as datasource
        for oj-select-single component which is used to switch selection-mode.
      </li>
      <li>
        Use the &quot;selection-mode&quot; attribute of table to set either single or multiple
        row and/or column selection. As a note, the &apos;id&apos; property of each column is
        required when column selection is enabled.
      </li>
      <li>Register an event handler for &apos;selectedChanged&apos; event.</li>
      <li>
        To get data from selected rows use fetchByKeys on the dataprovder as shown in the{' '}
        <a href={"#"}>
          data provider demo.
        </a>
      </li>
    </ol>
  </>
);
