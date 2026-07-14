// @ts-nocheck
import 'preact';

export const tableFilteringTableDescription = (
  <>
    <p>A table displays data items in a tabular format with highly interactive features.</p>
    <p>This demo shows a Table with a filter using the filterCriterion option of ListDataProviderView. Also shows how to create observable for totalFilteredRowCount using includeFilteredRowCount option and getTotalFilteredRowCountObservable method.</p>
    <p>ListDataProviderView is used to wrap an underlying DataProvider that does not allow specifying filter criterion when it is created. For example, ArrayDataProvider does not have a filterCriterion constructor option. ArrayDataProvider only accepts a filterCriterion in its fetch methods, which an application does not call directly when the DataProvider is used by a JET component. A ListDataProviderView is needed in this case to pass the filterCriterion indirectly.</p>
    <p>Type some characters in the Filter field and observe that the table only shows rows that match the filter.</p>
  </>
);
