import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A list view displays data items as a list or a grid with highly interactive features.</p><p>This demo shows how to enable Multiple and MultipleToggle selection modes, and track selected items and current item, and clear current selected items
    in oj-c-list-view.</p>

<p><b>Multiple vs MultipleToggle Selection</b></p>

<ul>
    <li>
        Multiple Selection - When specified, most selection gestures made on the ListView will be
        interpreted as 'replace' gestures. For example, clicking on an already selected item will not
        affect that item's selection, and clicking on a non-selected item will select that item and
        deselect any other previously selected items. In order to perform additive selections, users can
        click on selector checkboxes, use spacebar, or ctrl/cmd click on individual items to perform 'toggle'
        selection gestures.
    </li>
    <li>
        MultipleToggle Selection - When specified, all selection gestures made on the ListView will be
        interpreted as 'toggle' gestures. For example, clicking on an already selected item will
        deselect that item, and clicking on any non-selected item will select that item without
        affecting any previously selected items.
    </li>
</ul>`;

export const listViewMultipleSelectioncorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
