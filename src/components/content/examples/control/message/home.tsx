import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojbutton";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import MessageBannerVDOMExample from "./messagebanner";
import { MessageBannerCorePackOverview } from "./messageBannerCorePackOverview";

type MessageComponent = {
  id: number;
  name: string;
  description: string;
  image: string;
  isCorePack?: boolean;
};

const messageComponents: MessageComponent[] = [
  {
    id: 1,
    name: "Message Banner",
    description: "Interactive VDOM example demonstrating dismissible banner messages with actions.",
    image: "oj-ux-icon-size-12x oj-ux-ico-message-banner",
  },
  {
    id: 2,
    name: "Message Banner",
    description: "Core Pack overview of message banner variations, custom detail templates, and affordances.",
    image: "oj-ux-icon-size-12x oj-ux-ico-message-banner",
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<MessageComponent["id"], MessageComponent>(
  messageComponents,
  {
    keyAttributes: "id",
  },
);

const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<MessageComponent["id"]>;

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };

const MessageHome = () => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<MessageComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(null);

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        MessageComponent["id"],
        MessageComponent
      >,
    ) => (
      <li>
        <oj-action-card>
          <div class="component-item" key={item.data.id}>
            <div class="componentImage">
              {item.data.isCorePack ? (
                <span class="demo-badge-position oj-sm-margin-2x-vertical oj-badge oj-badge-end oj-badge-success oj-badge-sm">
                  Core Pack
                </span>
              ) : null}
              <div
                class="oj-helper-text-align-center"
                style={{ paddingTop: "25px" }}
              >
                <div className={item.data.image}></div>
              </div>
              <div class="oj-flex-item oj-text-sm componentInfo oj-typography-body-md oj-typography-bold">
                {item.data.name}
              </div>
             
            </div>
          </div>
        </oj-action-card>
      </li>
    ),
    [selectedItems],
  );

  const ComponentDetail = useCallback(() => {
    switch (activeComponentId) {
      case 1:
        return <MessageBannerVDOMExample />;
      case 2:
        return <MessageBannerCorePackOverview />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as MessageComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<MessageComponent["id"]>;
      setSelectedItems(selection);
    }
  };

  const handleBack = () => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<MessageComponent["id"]>);
  };

  return (
    <div class="component-wrapper">
      {!showComponentDetail ? (
        <oj-list-view
          data={dataProvider}
          selectionMode="single"
          selected={selectedItems}
          gridlines={gridlines}
          onselectedChanged={handleSelectedChanged}
          display="card"
          class="listview-sizing"
        >
          <template slot="itemTemplate" render={renderListItem}></template>
        </oj-list-view>
      ) : (
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12">
          <oj-button
            chroming="borderless"
            display="icons"
            onojAction={handleBack}
          >
            <span slot="startIcon" class="oj-ux-ico-chevron-left"></span>
            Message Components
          </oj-button>
          {ComponentDetail()}
        </div>
      )}
    </div>
  );
};

export default MessageHome;
