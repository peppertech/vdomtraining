import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import { RESTDataProvider } from 'ojs/ojrestdataprovider';
import 'oj-c/table';
import 'preact';
import type { ComponentProps } from 'preact';
import { useEffect,useMemo,useState } from 'preact/hooks';
import * as jsonDataStr from 'text!../../../data/cookbook/dataCollections/sharedData/employeeData.json';
import { CollectionMockFetchServer } from '../../../shared/CollectionMockFetchServer';
import DemoDelayingDataProvider from '../../../shared/DemoDelayingDataProvider';

type Employee = {
    EMPLOYEE_ID: number;
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL: string;
    PHONE_NUMBER: string;
};

type Key = Employee['EMPLOYEE_ID'];
type EmployeeResponse = { Employees: Employee[] };
type DelayedEmployeeDataProvider = DemoDelayingDataProvider<Key, Employee>;

type NumberChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];

export default function TableProgressiveLoadTablecorepack() {
  const [fetchDelay, setFetchDelay] = useState(2000);
  const [appliedFetchDelay, setAppliedFetchDelay] = useState(2000);
  const [dataProvider, setDataProvider] = useState<DelayedEmployeeDataProvider | undefined>(undefined);
  const columns = useMemo<NonNullable<ComponentProps<'oj-c-table'>['columns']>>(() => ({
      id: { headerText: 'Employee Id', field: 'EMPLOYEE_ID', resizable: 'enabled' },
      first: { headerText: 'First Name', field: 'FIRST_NAME', resizable: 'enabled' },
      last: { headerText: 'Last Name', field: 'LAST_NAME', resizable: 'enabled' },
      email: { headerText: 'E-mail', field: 'EMAIL', resizable: 'enabled' },
      phone: { headerText: 'Phone #', field: 'PHONE_NUMBER', resizable: 'enabled' }
  }), []);

  const keyAttributes: keyof Employee = 'EMPLOYEE_ID';
  const server = useMemo(() => new CollectionMockFetchServer<Employee>({
      keyAttributes: keyAttributes,
	      data: (JSON.parse(jsonDataStr as string) as EmployeeResponse).Employees
  }), [keyAttributes]);
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
  useEffect(() => {
      server.start();
      setDataProvider(new DemoDelayingDataProvider(restDataProvider, appliedFetchDelay));
      return () => server.stop();
  }, [appliedFetchDelay, restDataProvider, server]);

  const handleFetchDelayValueChanged = (event: NumberChangedEvent) => {
    setFetchDelay(event.detail.value ?? 0);
  };

  const applyFetchDelay = () => {
      setAppliedFetchDelay(fetchDelay);
  };

  return (
      <div id="container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <oj-form-layout max-columns="2" direction="row">
                              <oj-input-number id="fetch-delay-input" min={0} step={500} onvalueChanged={handleFetchDelayValueChanged} value={fetchDelay} label-hint="Fetch Delay (ms)" />
                              <oj-button id="fetch-delay-button" class="oj-button-lg" onojAction={applyFetchDelay}>Apply</oj-button>
                          </oj-form-layout>
                </div>
            <oj-c-table id="table" aria-label="Fetch Delay Table" data={dataProvider} columns={columns} row={{ accessibleRowHeader: ['first', 'last'] }} class="demo-table-container" />
        </div>
    );
}

export { TableProgressiveLoadTablecorepack };
