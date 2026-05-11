type CollectionMockFetchServerOptions<D> = {
  data: D[];
  keyAttributes?: string;
};

type ActiveServer = {
  url: string;
  handleFetch: (requestUrl: string) => Promise<Response>;
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
    const limit = parseNumberParam(url.searchParams, "limit", this.options.data.length);
    const data = this.options.data.slice(offset, offset + limit);

    return new Response(
      JSON.stringify({
        data,
        totalSize: this.options.data.length,
        hasMore: offset + data.length < this.options.data.length,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
