// @ts-nocheck
import 'preact';

export const tableInitialSortTableDescription = (
  <>
    <p>A table displays data items in a tabular format with highly interactive features.</p>
    <p>This demo shows a Table with initial sort specified with the sortCriteria option of a ListDataProviderView.</p>
    <p>ListDataProviderView is used to wrap an underlying DataProvider that does not allow specifying sort criteria when it is created. For example, ArrayDataProvider does not have a sortCriteria constructor option. ArrayDataProvider only accepts a sortCriteria in its fetch methods, which an application does not call directly when the DataProvider is used by a JET component. A ListDataProviderView is needed in this case to pass the sortCriteria indirectly.</p>
  </>
);
