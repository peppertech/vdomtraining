import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojtable';
import "css!./demo.css";

export const TableBackgroundColor = () => {
  const deptArray = useMemo(() => [
      {
          DepartmentId: 10,
          DepartmentName: 'Administration',
          LocationId: 200,
          ManagerId: 300
      },
      {
          DepartmentId: 20,
          DepartmentName: 'Marketing',
          LocationId: 200,
          ManagerId: 300
      },
      {
          DepartmentId: 30,
          DepartmentName: 'Purchasing',
          LocationId: 200,
          ManagerId: 300
      }
  ], []);
  const columns = useMemo(() => [
      { headerText: 'Department Id', field: 'DepartmentId', id: 'depId' },
      { headerText: 'Department Name', field: 'DepartmentName', id: 'depName' },
      { headerText: 'Location Id', field: 'LocationId', id: 'locId' }
  ], []);
  const dataprovider = useMemo(() => new ArrayDataProvider(deptArray, {
      keyAttributes: 'DepartmentId',
      implicitSort: [{ attribute: 'DepartmentId', direction: 'ascending' }]
  }), [deptArray]);

  return (
      <div id="demoContainer">
            <div class="demo-no-current-color oj-sm-padding-4x-horizontal oj-sm-padding-8x-vertical">
                    <p>
                              In this example the background color was changed in class
                              <code>demo-no-current-color</code>
                              without also setting --oj-current-bg-color, note that the table background color does not blend in with the background.
                          </p>
                    <oj-table id="table1" aria-label="Departments Table" data={dataprovider} columns={columns} {...{ 'accessibility.row-header': "depName" }} />
                </div>
            <div class="demo-with-current-color oj-sm-padding-4x-horizontal oj-sm-padding-8x-vertical">
                    <p>
                              In this example the background color and --oj-current-bg-color were both set to the same value in class
                              <code>demo-current-color</code>
                              , note that the table background color blends in with the background.
                          </p>
                    <oj-table id="table2" aria-label="Departments Table" data={dataprovider} columns={columns} {...{ 'accessibility.row-header': "depName" }} />
                </div>
            <div class="oj-bg-warning-20 oj-sm-padding-4x-horizontal oj-sm-padding-8x-vertical">
                    <p>
                              In this example the background color is set with
                              <code>oj-bg-warning-20</code>
                              , one of the built in background classes. Note that the table background color blends in with the background.
                          </p>
                    <oj-table id="table3" aria-label="Departments Table" data={dataprovider} columns={columns} {...{ 'accessibility.row-header': "depName" }} />
                </div>
        </div>
    );
};

export default TableBackgroundColor;
