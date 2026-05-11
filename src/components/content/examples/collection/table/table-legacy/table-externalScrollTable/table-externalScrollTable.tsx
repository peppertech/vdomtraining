/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import 'ojs/ojtable';
import 'ojs/ojbutton';

export const TableExternalScrollTable = () => {
  const deptArray: any = JSON.parse(deptData);
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Department Id', minWidth: '500', field: 'DepartmentId', id: 'depId' },
      { headerText: 'Department Name', minWidth: '500', field: 'DepartmentName', id: 'depName' },
      { headerText: 'Location Id', minWidth: '500', field: 'LocationId', id: 'locId' },
      { headerText: 'Manager Id', minWidth: '500', field: 'ManagerId', id: 'manId' },
      { headerText: 'Employee Count', minWidth: '500', field: 'EmployeeCount', id: 'empCount' },
      {
          headerText: 'Action',
          maxWidth: '10rem',
          sortable: 'disabled',
          headerStyle: 'text-align: center;',
          frozenEdge: 'all',
          style: 'text-align: center; padding-top: 0px; padding-bottom: 0px;',
          template: 'actionTemplate',
          id: 'action'
      }
  ], []);
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'depName' },
      selectionMode: { row: 'multiple' },
      scrollPolicyOptions: {
          fetchSize: 10,
          scroller: '#samplePage',
          scrollerOffsetTop: 100,
          scrollerOffsetBottom: 100,
          scrollerOffsetStart: 100,
          scrollerOffsetEnd: 100
      },
      columnsDefault: { resizable: 'enabled' }
  };
  const dataprovider = useMemo(() => new MutableArrayDataProvider(deptArray, {
      keyAttributes: 'DepartmentId',
      implicitSort: [{ attribute: 'DepartmentId', direction: 'ascending' }]
  }), [deptArray]);

  const handleAction = () => {
      alert('Sample Action Triggered');
  };

  return (
      <div id="samplePage" class="demo-sample-page oj-helper-border-box">
            <div id="columnLayoutDiv" class="demo-layout">
                    <div id="startCol" class="demo-side-column demo-start-column oj-bg-neutral-30 oj-helper-text-align-center oj-helper-justify-content-center">
                              <div id="innerStartCol" class="demo-side-column-inner oj-flex oj-sm-align-items-center">
                                          Sample
                                          <br />
                                          Page
                                          <br />
                                          Column
                                      </div>
                          </div>
                    <div id="mainContentCol">
                              <div id="sampleContent" class="demo-sample-content oj-flex oj-helper-text-align-center oj-sm-align-items-center">
                                          <div class="demo-sample-content-inner">Sample Page Content That Scrolls Away On The Page</div>
                                      </div>
                              <div id="sampleBanner" class="demo-sample-banner demo-sample-banner-top oj-bg-neutral-170 oj-color-invert oj-flex oj-helper-text-align-center oj-sm-align-items-center"><div class="demo-sample-banner-inner">Sample Sticky Page Banner</div></div>
                              <div id="sampleContent2" class="demo-sample-content oj-flex oj-helper-text-align-center oj-sm-align-items-center">
                                          <div class="demo-sample-content-inner">More Sample Page Content That Scrolls Away On The Page</div>
                                      </div>
                              <oj-table id="table" aria-label="Departments Table" data={dataprovider} scrollPolicy="loadMoreOnScroll" columns={columns} class="demo-table-container" {...ojTableProps}>
                                           <template slot="actionTemplate" render={(cell) => (
                                                       <>
                                                           <oj-button chroming="borderless" display="icons" onojAction={handleAction} data-oj-clickthrough="disabled">
                                                                            <span slot="startIcon" class="oj-ux-ico-check" />
                                                                            Approve
                                                                        </oj-button>
                                                      </>
                                                    )} />
                                      </oj-table>
                              <div id="sampleContent3" class="demo-sample-content oj-flex oj-helper-text-align-center oj-sm-align-items-center">
                                          <div class="demo-sample-content-inner">Even More Sample Page Content That Is Below The Table On The Page</div>
                                      </div>
                              <div id="sampleBanner2" class="demo-sample-banner demo-sample-banner-bottom oj-bg-neutral-170 oj-color-invert oj-flex oj-helper-text-align-center oj-sm-align-items-center"><div class="demo-sample-banner-inner">Sample Sticky Page Banner</div></div>
                          </div>
                    <div id="endCol" class="demo-side-column demo-end-column oj-bg-neutral-30 oj-helper-text-align-center oj-helper-justify-content-center">
                              <div id="innerEndCol" class="demo-side-column-inner oj-flex oj-sm-align-items-center">
                                          Sample
                                          <br />
                                          Page
                                          <br />
                                          Column
                                      </div>
                          </div>
                </div>
        </div>
    );
};

export default TableExternalScrollTable;
