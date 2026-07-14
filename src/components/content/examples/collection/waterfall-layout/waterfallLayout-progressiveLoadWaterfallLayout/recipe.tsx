import 'preact';

export const waterfallLayoutProgressiveLoadWaterfallLayoutRecipe = (
  <>
    <ol>
      <li>
        Construct an ArrayDataProvider using the JavaScript array as shown. Make sure to specify the
        key attribute.
      </li>
      <li>Use the oj-waterfall-layout tag to create a JET Waterfall Layout.</li>
      <li>
        Use the data attribute to bind the ArrayDataProvider you created previously as data for
        Waterfall Layout.
      </li>
      <li>Specify the content for the item using the itemTemplate slot.</li>
      <li>Apply the binding as shown at the bottom.</li>
      <li>Note the initial fetch is intentionally slowed down to show the loading skeletons.</li>
    </ol>
  </>
);
