import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo } from 'preact/hooks';
import FlattenedTreeDataProviderView = require('ojs/ojflattenedtreedataproviderview');
import { RESTTreeDataProvider } from 'ojs/ojresttreedataprovider';
import { CollectionMockFetchServer as MockFetchServer } from '../../shared/CollectionMockFetchServer';
import * as treeDataText from 'text!../../data/cookbook/dataCollections/rowExpanderTable/tableCollectionRowExpander/projectData.json';
import 'ojs/ojtable';
import 'ojs/ojrowexpander';

type TaskData = {
  id: string;
  name: string;
  resource: string;
  start: string;
  end: string;
  children?: TaskData[];
};

type TaskKey = TaskData['id'][];
type TaskItem = {
  data: TaskData;
  metadata: {
    key: TaskKey;
    leaf?: boolean;
  };
};

export const RowExpanderTableTableCollectionRowExpander = () => {
  const keyAttributes: keyof TaskData = 'id';
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(
    () => [
      { headerText: 'Task Name', sortProperty: 'name', weight: 2, minWidth: '13rem', id: 'name' },
      { headerText: 'Resource', sortProperty: 'resource', minWidth: '8rem', id: 'resource' },
      { headerText: 'Start Date', sortProperty: 'start', minWidth: '8rem', id: 'start' },
      { headerText: 'End Date', sortProperty: 'end', minWidth: '8rem', id: 'end' }
    ],
    []
  );
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'name' }
  };
  const server = useMemo(
    () => {
      const mockServer = new MockFetchServer({
        keyAttributes,
        data: JSON.parse(treeDataText as string) as TaskData[],
        hierarchical: true,
        returnMetadata: true,
        debug: true
      });
      mockServer.start();
      return mockServer;
    },
    [keyAttributes]
  );

  useEffect(() => {
    return () => server.stop();
  }, [server]);

  const viewDataProvider = useMemo(() => {
    let rootDataProvider: RESTTreeDataProvider<TaskKey, TaskData>;
    let options: RESTTreeDataProvider.Options<TaskKey, TaskData>;

    const getChildDataProvider = (
      item?: TaskItem | null
    ): RESTTreeDataProvider<TaskKey, TaskData> | null => {
      if (!item || item.metadata.leaf) {
        return null;
      }

      const parentKey = item.metadata.key[item.metadata.key.length - 1];
      if (!parentKey) {
        return null;
      }

      const url = new URL(server.getUrl());
      url.searchParams.set('parentKey', parentKey);

      return new RESTTreeDataProvider<TaskKey, TaskData>({
        ...options,
        url: url.href,
        rootDataProvider,
        getChildDataProvider
      } as RESTTreeDataProvider.Options<TaskKey, TaskData>);
    };

    options = {
      url: server.getUrl(),
      keyAttributes,
      useKeyPaths: 'on',
      capabilities: {
        fetchByOffset: {
          implementation: 'randomAccess'
        }
      },
      transforms: {
        fetchByOffset: {
          request: async (options: RESTTreeDataProvider.FetchByOffsetRequestTransformOptions<TaskKey, TaskData>) => {
            const url = new URL(options.url);
            const { size, offset } = options.fetchParameters;
            if (size != null) {
              url.searchParams.set('limit', String(size));
            }
            if (offset != null) {
              url.searchParams.set('offset', String(offset));
            }
            return new Request(url.href);
          },
          response: async (options: RESTTreeDataProvider.FetchResponseTransformOptions) => {
            const { data, hasMore, totalSize, metadata } = options.body as {
              data: TaskData[];
              hasMore: boolean;
              totalSize: number;
              metadata: Array<{ key: TaskKey; leaf?: boolean }>;
            };
            return { data, hasMore, totalSize, metadata };
          }
        }
      },
      getChildDataProvider
    };

    rootDataProvider = new RESTTreeDataProvider<TaskKey, TaskData>(options);
    return new FlattenedTreeDataProviderView(rootDataProvider);
  }, [keyAttributes, server]);

  return (
    <oj-table
      id="table"
      aria-label="Tasks Table"
      data={viewDataProvider}
      selectionMode={{ row: 'multiple' }}
      layout="fixed"
      columns={columns}
      class="oj-sm-width-full"
      {...ojTableProps}
    >
      <template
        slot="rowTemplate"
        render={(row: any) => (
          <tr>
            <td>
              <oj-row-expander data-oj-clickthrough="disabled" context={row} />
              <span>{row.item.data.name}</span>
            </td>
            <td>
              <span>{row.item.data.resource}</span>
            </td>
            <td>
              <span>{row.item.data.start}</span>
            </td>
            <td>
              <span>{row.item.data.end}</span>
            </td>
          </tr>
        )}
      />
    </oj-table>
  );
};

export default RowExpanderTableTableCollectionRowExpander;
