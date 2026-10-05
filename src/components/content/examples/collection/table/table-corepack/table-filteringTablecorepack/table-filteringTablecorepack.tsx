import { FilterFactory } from 'ojs/ojdataprovider';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'oj-c/table';
import type { CTableElement } from 'oj-c/table';
import 'preact';
import type { ComponentProps } from 'preact';
import { useEffect,useMemo,useState } from 'preact/hooks';
import * as deptDataText from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ListDataProviderView = require('ojs/ojlistdataproviderview');

interface DepartmentSource {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
}

interface EmployeeData {
  DepartmentId: string;
  DepartmentName: string;
  LocationId: string;
  ManagerId: string;
}

type ColumnKey = 'depId' | 'depName' | 'locId' | 'manId';
type TableColumns = NonNullable<ComponentProps<'oj-c-table'>['columns']>;
type FilterChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onrawValueChanged']>>[0];

const baseDeptArray = JSON.parse(deptDataText as string) as DepartmentSource[];

const generateDeptArray = (num: number) => {
  const deptArray: Array<EmployeeData> = [];
  let count = 0;
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < baseDeptArray.length; j++) {
      deptArray[count] = {
        DepartmentId: `${baseDeptArray[j].DepartmentId}${count}`,
        DepartmentName: `${baseDeptArray[j].DepartmentName}${count}`,
        LocationId: `${baseDeptArray[j].LocationId}`,
        ManagerId: `${baseDeptArray[j].ManagerId}`
      };
      count++;
    }
  }
  return deptArray;
};

export default function TableFilteringTablecorepack() {
  const [filter, setFilter] = useState('');
  const [rowCount, setRowCount] = useState('');

  const deptArray = useMemo(() => generateDeptArray(1000), []);
  const arrayDataProvider = useMemo(
    () => new ArrayDataProvider<EmployeeData['DepartmentId'], EmployeeData>(deptArray, { keyAttributes: 'DepartmentId' }),
    [deptArray]
  );
  const dataprovider = useMemo(() => {
    const filterCriterion =
      filter !== ''
        ? FilterFactory.getFilter({
            filterDef: { text: filter }
          })
        : undefined;

    return new ListDataProviderView<string, EmployeeData, string, EmployeeData>(arrayDataProvider, {
      includeFilteredRowCount: 'enabled',
      filterCriterion
    });
  }, [arrayDataProvider, filter]);

  useEffect(() => {
    const observable = dataprovider.getTotalFilteredRowCountObservable();
    if (!observable) {
      setRowCount('');
      return;
    }
    const subscriber = observable.subscribe((value: { type: string; count?: number }) => {
      if (value.type === 'exact' && typeof value.count === 'number') {
        setRowCount(value.count.toString());
      } else if (value.type === 'notFetched') {
        setRowCount('Not Fetched');
      } else {
        setRowCount('');
      }
    });

    return () => subscriber.unsubscribe?.();
  }, [dataprovider]);

  const renderHighlightedCell = (
    context: CTableElement.CellTemplateContext<EmployeeData['DepartmentId'], EmployeeData, ColumnKey>
  ) => {
    const data = String(context.data ?? '');
    const index = filter ? data.toLowerCase().indexOf(filter.toLowerCase()) : -1;
    return (
      <span>
        {index < 0 ? data : (
          <>
            {data.slice(0, index)}
            <b>{data.slice(index, index + filter.length)}</b>
            {data.slice(index + filter.length)}
          </>
        )}
      </span>
    );
  };

  const columns = useMemo<TableColumns>(() => ({
    depId: { headerText: 'Department Id', field: 'DepartmentId', template: 'highlight' },
    depName: { headerText: 'Department Name', field: 'DepartmentName', template: 'highlight' },
    locId: { headerText: 'Location Id', field: 'LocationId', template: 'highlight' },
    manId: { headerText: 'Manager Id', field: 'ManagerId', template: 'highlight' }
  }), []);

  const handleFilterRawValueChanged = (event: FilterChangedEvent) => {
    setFilter(event.detail.value ?? '');
  };

  return (
    <div id="mainContent">
      <oj-form-layout maxColumns={2} direction="row">
        <oj-input-text
          id="filter"
          class="oj-form-control-max-width-md"
          labelHint="Filter"
          labelEdge="inside"
          placeholder="Type to filter"
          onrawValueChanged={handleFilterRawValueChanged}
          value={filter}
          clearIcon="always"
        />
        <span>
          Filtered Row Count:
          {rowCount}
        </span>
      </oj-form-layout>
      <oj-c-table
        id="table"
        aria-label="Departments Table"
        data={dataprovider}
        columns={columns}
        row={{ accessibleRowHeader: 'depName' }}
        class="demo-table-container"
      >
        <template slot="highlight" render={renderHighlightedCell} />
      </oj-c-table>
    </div>
  );
}

export { TableFilteringTablecorepack };
