// @ts-nocheck
import { h } from 'preact';

export const listViewOverviewListViewRecipe = (
  <>
    <ol>
      <li>
        In the markup, place oj-module with its configuration bound to adapter.koObservableConfig and
        its animation bound to adapter.animation.
      </li>
      <li>
        In the viewModel:
        <br />
        <ul>
          <li>
            Add one router state for listview, one for edit task and another for add new task,
            'listview' is the default state
          </li>
          <li>Create the ModuleRouterAdapter instance, passing the CoreRouter instance to it.</li>
        </ul>
      </li>
      <li>
        Define the listview, edit task and add task module:
        <br />
        <ul>
          <li>In listview module, configure oj-listivew element to display the to-do tasks data.</li>
          <li>Use oj-bind-if to display the two modes for listview: edit and view</li>
          <li>
            Use the scroll-policy attribute to enable high-water mark scrolling (can skip since default
            is already 'loadMoreOnScroll') and the scroll-policy-options.fetch-size attribute to
            explicitly specify a fetch size. See the
            <a href={"#"}>
              high-water mark scrolling demo
            </a>
            for more information.
          </li>
          <li>
            Wrap the ListView within a Refresher. In the ViewModel, assign the appropriate refresh
            function to the Refresher. See the
            <a href={"#"}>
              refresher demo
            </a>
            for more information.
          </li>
          <li>
            In the item template, add the oj-swipeactions-container style class to the root of the item
            and add the oj-swipe-actions tag with the applicable slots. See the
            <a href={"#"}>
              swipe actions demo
            </a>
            for more information. Use the on-oj-action to specify handler when an action is selected in
            the swipe action bar.
          </li>
          <li>
            The edit task module displays an individual task's detail in a editable form using the data
            passed from the parent module.
          </li>
          <li>
            The add task module displays a form and passes the data for the new task to the parent
            module.
          </li>
          <li>
            Specify oj-listview-drag-handle class on the drag affordance. Use the dnd.reorder.items
            attribute to enable item reordering. Use the dnd.drop.items.drag-over attribute to register
            a drag over event callback that prevents drop. Use the on-oj-reorder attribute to specify a
            handler for the reorder event to perform the move operation.
          </li>
          <li>
            Use the oj-selector and associated its selected-keys to the selected KeySet in ListView. Use
            on-selected-changed attribute to register listeners to perform custom logic on selected
            items. See the
            <a href={"#"}>
              selection demo
            </a>
            for more information.
          </li>
          <li>
            Use the noData slot to specify the content to show when there is no data. See the
            <a href={"#"}>
              noData demo
            </a>
            for more information.
          </li>
          <li>
            Note that since an item action listener is registered, the item.enter-key-focus-behavior
            should not be set to 'focusWithin' as that could interfere with the item action.
          </li>
        </ul>
      </li>
    </ol>
  </>
);
