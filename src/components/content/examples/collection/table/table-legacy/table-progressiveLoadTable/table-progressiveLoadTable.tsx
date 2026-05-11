/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { RESTDataProvider } from 'ojs/ojrestdataprovider';
import { CollectionMockFetchServer } from '../../../shared/CollectionMockFetchServer';
import DemoDelayingDataProvider from '../inputSearch-suggestions/DemoDelayingDataProvider';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojbutton';
import 'ojs/ojtable';
import * as jsonDataStr from 'text!../../../data/cookbook/dataCollections/sharedData/employeeData.json';

type Employee = {
    EMPLOYEE_ID: number;
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL: string;
    PHONE_NUMBER: string;
};

type Key = Employee['EMPLOYEE_ID'];

type NumberChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];

export const TableProgressiveLoadTable = () => {
  const [fetchDelay, setFetchDelay] = useState<any>(2000);
  const [dataProvider, setDataProvider] = useState<any>(undefined);
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Employee Id', field: 'EMPLOYEE_ID', id: 'id' },
      { headerText: 'First Name', field: 'FIRST_NAME', id: 'first' },
      { headerText: 'Last Name', field: 'LAST_NAME', id: 'last' },
      { headerText: 'E-mail', field: 'EMAIL', id: 'email' },
      { headerText: 'Phone #', field: 'PHONE_NUMBER', id: 'phone' }
  ], []);
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: ['first', 'last'] },
      columnsDefault: { resizable: 'enabled' }
  };

  const keyAttributes: keyof Employee = 'EMPLOYEE_ID';
  const server = useMemo(() => new CollectionMockFetchServer<Employee>({
      keyAttributes: keyAttributes,
      data: JSON.parse(jsonDataStr).Employees
  }), [keyAttributes]);
  useEffect(() => {
      server.start();
      return () => server.stop();
  }, [server]);
  const restDataProvider = useMemo(() => new RESTDataProvider<Key, Employee>({
      keyAttributes: keyAttributes,
      url: server.getUrl(),
      transforms: {
          fetchFirst: {
              request: async (options: RESTDataProvider.FetchByOffsetRequestTransformOptions<Key, Employee>) => {
                  const url = new URL(options.url);
                  // Map paging params expected by the mock server
                  const { size, offset, sortCriteria } = options.fetchParameters;
                  url.searchParams.set('limit', String(size));
                  url.searchParams.set('offset', String(offset));
                  if (sortCriteria && sortCriteria.length) {
                      const [{ attribute, direction }] = sortCriteria;
                      url.searchParams.set('orderBy', `${attribute}:${direction === 'ascending' ? 'asc' : 'desc'}`);
                  }
                  return new Request(url.href);
              },
              response: async ({ body }: RESTDataProvider.FetchResponseTransformOptions) => {
                  // Mock server returns { data, totalSize, hasMore }
                  const { data, totalSize, hasMore } = body;
                  return { data, totalSize, hasMore };
              }
          }
      }
  }), [keyAttributes, server]);

  const handleFetchDelayValueChanged = (event: NumberChangedEvent) => {
    setFetchDelay(event.detail.value ?? 0);
  };

  const applyFetchDelay = () => {
      setDataProvider(new DemoDelayingDataProvider(restDataProvider, fetchDelay));
  };

  return (
      <div id="container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <oj-form-layout max-columns="2" direction="row">
                              <oj-input-number id="fetch-delay-input" min={0} step={500} onvalueChanged={handleFetchDelayValueChanged} value={fetchDelay} label-hint="Fetch Delay (ms)" />
                              <oj-button id="fetch-delay-button" class="oj-button-lg" onojAction={applyFetchDelay}>Apply</oj-button>
                          </oj-form-layout>
                </div>
            <oj-table id="table" aria-label="Fetch Delay Table" data={dataProvider} columns={columns} class="demo-table-container" {...ojTableProps} />
        </div>
    );
};

export default TableProgressiveLoadTable;
