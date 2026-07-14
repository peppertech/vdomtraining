// @ts-nocheck
import 'preact';

export const listViewWithTableDndListViewRecipe = (
  <>
    <ol>
      <li>Use the JET binding to create a JET ListView and Table.</li>
      <li>
        Allow drag and drop between two ListViews by specify the same dataTypes in drag and drop
        options.
      </li>
      <li>Use the drop option to register a drop event callback.</li>
      <li>
        Add keydown listener on table and logic in ViewModel to support drag and drop using keyboard.
      </li>
      <li>Use Menu to allow users to cut and paste item using menu.</li>
      <li>Apply the binding as shown at the bottom.</li>
    </ol>
  </>
);
