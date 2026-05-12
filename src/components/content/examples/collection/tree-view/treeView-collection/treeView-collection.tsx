import { h } from 'preact';
import { useEffect, useMemo } from 'preact/hooks';
import { RESTTreeDataProvider } from 'ojs/ojresttreedataprovider';
import { CollectionMockFetchServer as MockFetchServer } from '../../shared/CollectionMockFetchServer';
import * as treeData from 'text!./projectData.json';
import 'ojs/ojtreeview';

type TreeNode = {
  id: string;
  title: string;
};

type TreeKey = TreeNode['id'][];
type TreeItem = {
  data: TreeNode;
  metadata: {
    key: TreeKey;
    leaf?: boolean;
  };
};

type TreeViewItemTemplateContext = {
  data: TreeNode;
};

const itemTemplateRenderer = (row: TreeViewItemTemplateContext) => [
  <span key="icon" class="oj-treeview-item-icon" />,
  <span key="text" class="oj-treeview-item-text">
    {row.data.title}
  </span>
];

export const TreeViewCollection = () => {
  const keyAttributes: keyof TreeNode = 'id';

  const server = useMemo(
    () =>
      new MockFetchServer({
        keyAttributes,
        data: JSON.parse(treeData as string) as TreeNode[],
        hierarchical: true,
        returnMetadata: true,
        debug: true
      }),
    [keyAttributes]
  );

  useEffect(() => {
    server.start();
    return () => server.stop();
  }, [server]);

  const dataProvider = useMemo(() => {
    let rootDataProvider: RESTTreeDataProvider<TreeKey, TreeNode>;
    let options: RESTTreeDataProvider.Options<TreeKey, TreeNode>;

    const getChildDataProvider = (
      item?: TreeItem | null
    ): RESTTreeDataProvider<TreeKey, TreeNode> | null => {
      if (!item || item.metadata.leaf) {
        return null;
      }

      const url = new URL(server.getUrl());
      const parentKey = item.metadata.key[item.metadata.key.length - 1];
      if (!parentKey) {
        return null;
      }

      url.searchParams.set('parentKey', parentKey);

      return new RESTTreeDataProvider<TreeKey, TreeNode>({
        ...options,
        url: url.href,
        rootDataProvider,
        getChildDataProvider
      } as RESTTreeDataProvider.Options<TreeKey, TreeNode>);
    };

    options = {
      url: server.getUrl(),
      keyAttributes,
      useKeyPaths: 'on',
      transforms: {
        fetchFirst: {
          request: async (transformOptions: {
            url: string;
            fetchParameters: { size?: number; offset?: number };
          }) => {
            const url = new URL(transformOptions.url);
            const { size, offset } = transformOptions.fetchParameters;

            if (size != null) {
              url.searchParams.set('limit', String(size));
            }

            if (offset != null) {
              url.searchParams.set('offset', String(offset));
            }

            return new Request(url.href);
          },
          response: async (transformOptions: {
            body: {
              data: TreeNode[];
              hasMore: boolean;
              totalSize: number;
              metadata: Array<{ key: TreeKey; leaf?: boolean }>;
            };
          }) => {
            const { data, hasMore, totalSize, metadata } = transformOptions.body;
            return { data, hasMore, totalSize, metadata };
          }
        }
      },
      getChildDataProvider
    };

    rootDataProvider = new RESTTreeDataProvider<TreeKey, TreeNode>(options);
    return rootDataProvider;
  }, [keyAttributes, server]);

  return (
    <div id="mainContent">
      <oj-tree-view
        id="treeview"
        data={dataProvider}
        aria-label="Tree View With RESTreeDataProvider Demo"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-tree-view>
    </div>
  );
};

export default TreeViewCollection;
