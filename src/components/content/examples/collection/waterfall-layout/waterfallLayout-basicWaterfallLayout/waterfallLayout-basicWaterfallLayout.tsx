import "css!./demo.css";
import 'ojs/ojactioncard';
import 'ojs/ojwaterfalllayout';
import * as preact from 'preact';
import { useMemo } from 'preact/hooks';
import '../../../../../jet-composites/demo-dept-card-layout/loader';
import '../../../../../jet-composites/demo-profile-card-layout/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

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

const basicWaterfallData: WaterfallCardData[] = [
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
  { type: 'people', id: 'p7', name: 'Employee 7', title: 'Title 7', work: 1234567890, email: 'employee4@company.com', initials: 'E7' },
  { type: 'people', id: 'p8', name: 'Employee 8', title: 'Title 8', work: 1234567890, email: 'employee5@company.com', initials: 'E8' },
  { type: 'people', id: 'p9', name: 'Employee 9', title: 'Title 9', work: 1234567890, email: 'employee6@company.com', initials: 'E9' },
  { type: 'department', id: 'd5', name: 'Department 5', head: 'Employee 5', count: '30 Employees' },
  { type: 'department', id: 'd6', name: 'Department 6', head: 'Employee 6' }
];

const renderBasicWaterfallItem = (item: WaterfallItemTemplateContext) => {
  if (item.data.type === 'people') {
    return (
      <oj-action-card class="oj-sm-only-width-4/5">
        {preact.h("demo-profile-card-layout", {
          name: item.data.name,
          initials: item.data.initials,
          image: item.data.image,
          workTitle: item.data.title
        })}
      </oj-action-card>
    );
  }

  return (
    <oj-action-card class="oj-bg-warning-30 oj-sm-only-width-4/5">
      {preact.h("demo-dept-card-layout", {
        deptName: item.data.name,
        deptCount: item.data.count,
        image: item.data.image,
        name: item.data.head
      })}
    </oj-action-card>
  );
};

export const WaterfallLayoutBasicWaterfallLayout = () => {
  const dataProvider = useMemo(
    () => new ArrayDataProvider<WaterfallCardData['id'], WaterfallCardData>(basicWaterfallData, { keyAttributes: 'id' }),
    []
  );

  return (
    <oj-waterfall-layout id="waterfall" aria-label="dashboard" class="demo-waterfall" data={dataProvider}>
      <template slot="itemTemplate" render={renderBasicWaterfallItem} />
    </oj-waterfall-layout>
  );
};

export default WaterfallLayoutBasicWaterfallLayout;
