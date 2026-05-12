type CollectionMockFetchServerOptions<D> = {
  data: D[];
  keyAttributes?: string;
  hierarchical?: boolean;
  returnMetadata?: boolean;
  debug?: boolean;
};

type ActiveServer = {
  url: string;
  handleFetch: (requestUrl: string) => Promise<Response>;
};

type TreeItem<D> = D & {
  children?: TreeItem<D>[];
};

type TreeNodeResult<D> = {
  items: TreeItem<D>[];
  path: string[];
};

let serverCounter = 0;
let originalFetch: typeof fetch | null = null;
const activeServers: ActiveServer[] = [];

const getRequestUrl = (input: RequestInfo | URL): string => {
  if (typeof input === "string") {
    return input;
  }

  if (input instanceof URL) {
    return input.href;
  }

  return input.url;
};

const parseNumberParam = (
  searchParams: URLSearchParams,
  name: string,
  fallback: number,
): number => {
  const rawValue = searchParams.get(name);
  const value = rawValue === null ? NaN : Number(rawValue);

  return Number.isFinite(value) ? Math.max(0, value) : fallback;
};

export class CollectionMockFetchServer<D> {
  private readonly url = `https://collection-cookbook.local/mock/${serverCounter++}`;
  private started = false;

  public constructor(private readonly options: CollectionMockFetchServerOptions<D>) {}

  public getUrl(): string {
    return this.url;
  }

  public start(): void {
    if (this.started) {
      return;
    }

    if (originalFetch === null) {
      originalFetch = globalThis.fetch.bind(globalThis);
      globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
        const requestUrl = getRequestUrl(input);
        const server = activeServers.find((activeServer) =>
          requestUrl.startsWith(activeServer.url),
        );

        if (server) {
          return server.handleFetch(requestUrl);
        }

        return originalFetch?.(input, init) ?? Promise.reject(new Error("fetch is unavailable"));
      }) as typeof fetch;
    }

    activeServers.unshift({
      url: this.url,
      handleFetch: (requestUrl) => this.handleFetch(requestUrl),
    });
    this.started = true;
  }

  public stop(): void {
    if (!this.started) {
      return;
    }

    const activeServerIndex = activeServers.findIndex(
      (activeServer) => activeServer.url === this.url,
    );

    if (activeServerIndex >= 0) {
      activeServers.splice(activeServerIndex, 1);
    }

    if (activeServers.length === 0 && originalFetch !== null) {
      globalThis.fetch = originalFetch;
      originalFetch = null;
    }

    this.started = false;
  }

  private async handleFetch(requestUrl: string): Promise<Response> {
    const url = new URL(requestUrl);
    const offset = parseNumberParam(url.searchParams, "offset", 0);
    const sourceData = this.getSourceData(url);
    const limit = parseNumberParam(url.searchParams, "limit", sourceData.items.length);
    const data = sourceData.items.slice(offset, offset + limit);
    const body: {
      data: TreeItem<D>[];
      totalSize: number;
      hasMore: boolean;
      metadata?: Array<{ key: string; leaf?: boolean }>;
    } = {
      data,
      totalSize: sourceData.items.length,
      hasMore: offset + data.length < sourceData.items.length,
    };

    if (this.options.returnMetadata) {
      body.metadata = data.map((item) => {
        return {
          key: this.getItemKey(item),
          leaf: !Array.isArray(item.children) || item.children.length === 0,
        };
      });
    }

    return new Response(JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private getSourceData(url: URL): TreeNodeResult<D> {
    if (!this.options.hierarchical) {
      return {
        items: this.options.data as TreeItem<D>[],
        path: [],
      };
    }

    const parentKey = url.searchParams.get("parentKey");
    if (!parentKey) {
      return {
        items: this.options.data as TreeItem<D>[],
        path: [],
      };
    }

    const parent = this.findTreeItem(this.options.data as TreeItem<D>[], parentKey);
    return {
      items: parent?.item.children ?? [],
      path: parent?.path ?? [],
    };
  }

  private findTreeItem(items: TreeItem<D>[], key: string, path: string[] = []): TreeNodeResult<D> & {
    item: TreeItem<D>;
  } | null {
    for (const item of items) {
      const itemKey = this.getItemKey(item);
      const itemPath = [...path, itemKey];

      if (itemKey === key) {
        return {
          item,
          items: item.children ?? [],
          path: itemPath,
        };
      }

      const childResult = this.findTreeItem(item.children ?? [], key, itemPath);
      if (childResult) {
        return childResult;
      }
    }

    return null;
  }

  private getItemKey(item: TreeItem<D>): string {
    const keyAttribute = this.options.keyAttributes;
    if (keyAttribute && keyAttribute in (item as Record<string, unknown>)) {
      return String((item as Record<string, unknown>)[keyAttribute]);
    }

    return String((item as Record<string, unknown>).id);
  }
}
