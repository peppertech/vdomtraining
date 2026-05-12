import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { FilterFactory } from 'ojs/ojdataprovider';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ListDataProviderView = require('ojs/ojlistdataproviderview');
import 'ojs/ojactioncard';
import 'ojs/ojbutton';
import 'ojs/ojwaterfalllayout';
import '../../../../../jet-composites/demo-dept-card-layout/loader';
import '../../../../../jet-composites/demo-profile-card-layout/loader';
import "css!./demo.css";

type FilterValue = 'all' | 'people' | 'department';
type ButtonsetValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-buttonset-one'>['onvalueChanged']>>[0];

type WaterfallCardData = {
  type: 'people' | 'department';
  id: string;
  name: string;
  title?: string;
  work?: number;
  email?: string;
  initials?: string;
  head?: string;
  count?: string;
  image?: string;
};

type WaterfallItemTemplateContext = {
  data: WaterfallCardData;
  index: number;
  key: string;
};

const filteringWaterfallData: WaterfallCardData[] = [
  { type: 'people', id: 'p1', name: 'Employee 1', title: 'Title 1', work: 1234567890, email: 'employee1@company.com', initials: 'E1' },
  { type: 'department', id: 'd1', name: 'Department 1', head: 'Employee 1', count: '40 Employees' },
  { type: 'department', id: 'd2', name: 'Department 2', head: 'Employee 2' },
  { type: 'people', id: 'p2', name: 'Employee 2', title: 'Title 2', work: 1234567890, email: 'employee2@company.com', initials: 'E2' },
  { type: 'people', id: 'p3', name: 'Employee 3', title: 'Title 3', work: 1234567890, email: 'employee3@company.com', initials: 'E3' },
  { type: 'people', id: 'p4', name: 'Employee 4', title: 'Title 4', work: 1234567890, email: 'employee4@company.com', initials: 'E4' },
  { type: 'people', id: 'p5', name: 'Employee 5', title: 'Title 5', work: 1234567890, email: 'employee5@company.com', initials: 'E5' },
  { type: 'people', id: 'p6', name: 'Employee 6', title: 'Title 6', work: 1234567890, email: 'employee6@company.com', initials: 'E6' },
  { type: 'department', id: 'd3', name: 'Department 3', head: 'Employee 3', count: '40 Employees' },
  { type: 'department', id: 'd4', name: 'Department 4', head: 'Employee 4' },
  { type: 'people', id: 'p7', name: 'Employee 7', title: 'Title 7', work: 1234567890, email: 'employee7@company.com', initials: 'E7' },
  { type: 'department', id: 'd5', name: 'Department 5', head: 'Employee 5', count: '40 Employees' },
  { type: 'department', id: 'd6', name: 'Department 6', head: 'Employee 6' },
  { type: 'people', id: 'p8', name: 'Employee 8', title: 'Title 8', work: 1234567890, email: 'employee8@company.com', initials: 'E8' },
  { type: 'people', id: 'p9', name: 'Employee 9', title: 'Title 9', work: 1234567890, email: 'employee9@company.com', initials: 'E9' },
  { type: 'people', id: 'p10', name: 'Employee 10', title: 'Title 10', work: 1234567890, email: 'employee10@company.com', initials: 'E10' },
  { type: 'department', id: 'd7', name: 'Department 7', head: 'Employee 7', count: '40 Employees' },
  { type: 'people', id: 'p11', name: 'Employee 11', title: 'Title 11', work: 1234567890, email: 'employee11@company.com', initials: 'E11' },
  { type: 'people', id: 'p12', name: 'Employee 12', title: 'Title 12', work: 1234567890, email: 'employee12@company.com', initials: 'E12' },
  { type: 'department', id: 'd8', name: 'Department 8', head: 'Employee 8' }
];

const renderFilteringWaterfallItem = (item: WaterfallItemTemplateContext) => {
  if (item.data.type === 'people') {
    return (
      <oj-action-card>
        {h("demo-profile-card-layout", {
          name: item.data.name,
          initials: item.data.initials,
          image: item.data.image,
          workTitle: item.data.title
        })}
      </oj-action-card>
    );
  }

  return (
    <oj-action-card class="oj-bg-warning-30">
      {h("demo-dept-card-layout", {
        deptName: item.data.name,
        deptCount: item.data.count,
        image: item.data.image,
        name: item.data.head
      })}
    </oj-action-card>
  );
};

export const WaterfallLayoutFilteringWaterfallLayout = () => {
  const [filterValue, setFilterValue] = useState<FilterValue>('all');
  const baseDataProvider = useMemo(
    () => new ArrayDataProvider<WaterfallCardData['id'], WaterfallCardData>(filteringWaterfallData, { keyAttributes: 'id' }),
    []
  );
  const dataProvider = useMemo(() => {
    if (filterValue === 'all') {
      return baseDataProvider;
    }
    const filterCriterion = FilterFactory.getFilter({
      filterDef: {
        op: '$eq',
        value: { type: filterValue }
      }
    });
    return new ListDataProviderView(baseDataProvider, { filterCriterion });
  }, [baseDataProvider, filterValue]);

  const handleFilterChanged = (event: ButtonsetValueChangedEvent) => {
    setFilterValue((event.detail.value ?? 'all') as FilterValue);
  };

  return (
    <div id="waterfall-container">
      <oj-buttonset-one
        id="filters"
        onvalueChanged={handleFilterChanged}
        value={filterValue}
        aria-label="Choose to show employees or departments or both."
        class="oj-buttonset-width-auto"
      >
        <oj-option value="all">Show All</oj-option>
        <oj-option value="people">Show Employees</oj-option>
        <oj-option value="department">Show Departments</oj-option>
      </oj-buttonset-one>
      <oj-waterfall-layout id="waterfall" aria-label="dashboard" class="demo-waterfall" data={dataProvider}>
        <template slot="itemTemplate" render={renderFilteringWaterfallItem} />
      </oj-waterfall-layout>
    </div>
  );
};

export default WaterfallLayoutFilteringWaterfallLayout;
