import 'css!./demo.css';
import 'ojs/ojrowexpander';
import 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataStr from 'text!../../data/cookbook/dataCollections/rowExpanderTable/tableAnimationRowExpander/projectData.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import FlattenedTreeDataProviderView = require('ojs/ojflattenedtreedataproviderview');

export const RowExpanderTableTableAnimationRowExpander = () => {
  const arrayTreeDataProvider = useMemo(() => new ArrayTreeDataProvider(JSON.parse(jsonDataStr), {
      keyAttributes: 'id'
  }), []);
  const dataProvider = useMemo(
    () => new FlattenedTreeDataProviderView(arrayTreeDataProvider),
    [arrayTreeDataProvider]
  );
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Task Name', sortProperty: 'name', weight: 2, minWidth: '13rem', id: 'name' },
      { headerText: 'Resource', sortProperty: 'resource', minWidth: '9rem', id: 'resource' },
      { headerText: 'Start Date', sortProperty: 'start', minWidth: '8rem', id: 'start' },
      { headerText: 'End Date', sortProperty: 'end', minWidth: '8rem', id: 'end' }
  ], []);
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'name' }
  };

  return (
      <div id="tableContainer">
            <oj-table id="table" aria-label="Tasks Animation Table" data={dataProvider} layout="fixed" columns={columns} class="oj-sm-width-full demo-custom" {...ojTableProps}>
                    <template slot="rowTemplate" render={(row) => (
                      <tr>
                        <td>
                          <oj-row-expander context={row} data-oj-clickthrough="disabled" />
                          <span>{row.item.data.name}</span>
                        </td>
                        <td><span>{row.item.data.resource}</span></td>
                        <td><span>{row.item.data.start}</span></td>
                        <td><span>{row.item.data.end}</span></td>
                      </tr>
                          )} />
                </oj-table>
        </div>
    );
};

export default RowExpanderTableTableAnimationRowExpander;
