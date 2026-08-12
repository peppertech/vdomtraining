import "css!./demo.css";
import "oj-c/card-view";
import { RESTDataProvider } from "ojs/ojrestdataprovider";
import * as preact from 'preact';
import { useEffect,useMemo } from "preact/hooks";
import * as jsonDataStr from "text!./contacts.json";
import "../../../../../jet-composites/demo-profile-card-layout/loader";
import { CollectionMockFetchServer } from "../../shared/CollectionMockFetchServer";

interface Contact {
  id: string;
  initials: string;
  name: string;
}

type CardItemContext = {
  data: Contact;
  isTabbable?: boolean;
  item: { data: Contact; metadata: { key: Contact["id"] } };
};

const CONTACTS = JSON.parse(jsonDataStr as string) as Contact[];

const renderCard: import("ojs/ojvcomponent").TemplateSlot<CardItemContext> = (context) => (
  <div class="oj-panel">
    {preact.h("demo-profile-card-layout", {
      name: context.data.name,
      initials: context.data.initials,
    })}
  </div>
);

export default function CardViewLoadMoreOnScrollcorepack() {
  const server = useMemo(
    () =>
      new CollectionMockFetchServer({
        keyAttributes: "id",
        data: CONTACTS
      }),
    []
  );

  useEffect(() => {
    server.start();
    return () => server.stop();
  }, [server]);

  const dataProvider = useMemo(
    () =>
      new RESTDataProvider<Contact["id"], Contact>({
        keyAttributes: "id",
        url: server.getUrl(),
        transforms: {
          fetchFirst: {
            request: async (options) => {
              const url = new URL(options.url);
              const { size, offset } = options.fetchParameters;
              url.searchParams.set("limit", String(size));
              url.searchParams.set("offset", String(offset));
              return new Request(url.href);
            },
            response: async ({ body }) => {
              const { data, totalSize, hasMore } = body;
              return { data, totalSize, hasMore };
            }
          }
        }
      }),
    [server]
  );

  return (
    <oj-c-card-view
      id="cardview"
      class="demo-card-view"
      aria-label="cardview with load more on scroll"
      scrollPolicyOptions={{ fetchSize: 15 }}
      columns={3}
      data={dataProvider}
    >
      <template slot="itemTemplate" render={renderCard} />
    </oj-c-card-view>
  );
}
