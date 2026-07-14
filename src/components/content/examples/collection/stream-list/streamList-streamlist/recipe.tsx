// @ts-nocheck
import 'preact';

export const streamListStreamlistRecipe = (
  <>
    <ol>
      <li>Construct the ArrayDataProvider and GroupingDataProvider instances with the array data.</li>
      <li>Use the oj-stream-list tag to create each JET StreamList.</li>
      <li>Use the oj-collapsible tag to make a loadAll streamList collapsible.</li>
      <li>Use the data attribute to bind the DataProviders to their StreamLists.</li>
      <li>Use the expanded attribute to make the past data expanded.</li>
      <li>
        Use the itemTemplate and groupTemplate slot to specify the template for rendering the item.
      </li>
      <li>
        Use supported styling classes to change background colors on oj-collapsible and the suggested
        actions.
      </li>
    </ol>
    Notes on Web Components (CCAs) shown:
    <ul>
      <li>
        All the CCAs shown here can be downloaded by clicking the download icon next to the "Apply"
        button in this demo, and can be modified as the application sees fit.
      </li>
      <li>
        The main CCA shown here is the
        {" "}
        <code>demo-activity-stream-item</code>
        , which can be slotted into the itemTemplate.
      </li>
      <li>
        The
        {" "}
        <code>demo-activity-stream-item</code>
        {" "}
        in particular, shows how actions within a CCA can be communicated and handled by the application
        through custom events.
      </li>
    </ul>
  </>
);
