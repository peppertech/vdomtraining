import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import MessageBannerLegacyRecipePage from "./message-banner-legacy/index";
import MessageToastLegacyRecipePage from "./message-toast-legacy/index";
import MessageBannerCorePackRecipePage from "./message-banner-corepack/index";
import MessageToastCorePackRecipePage from "./message-toast-corepack/index";
import {
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../../shared/catalog-breadcrumb";

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
    description: "Core Pack message banner demos with page, section, detail template, and sorting examples.",
    image: "oj-ux-icon-size-12x oj-ux-ico-message-banner",
    isCorePack: true,
  },
  {
    id: 3,
    name: "Messages Toast",
    description: "Legacy oj-messages notification demos with custom message content and actions.",
    image: "oj-ux-icon-size-12x  oj-ux-ico-messages",
  },
  {
    id: 4,
    name: "Message Toast",
    description: "Core Pack oj-c-message-toast demos with auto timeout, detail actions, and progress examples.",
    image: "oj-ux-icon-size-12x  oj-ux-ico-messages",
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

const MessageHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
}: NestedCatalogHomeProps) => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<MessageComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(null);
  const activeComponent = messageComponents.find(
    (component) => component.id === activeComponentId,
  );

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
        return <MessageBannerLegacyRecipePage />;
      case 2:
        return <MessageBannerCorePackRecipePage />;
      case 3:
        return <MessageToastLegacyRecipePage />;
      case 4:
        return <MessageToastCorePackRecipePage />;
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

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<MessageComponent["id"]>);
    onBreadcrumbChange?.(null);
  }, [onBreadcrumbChange]);

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Controls", onSelect: onNavigateRootHome },
      { label: "Messages", onSelect: handleBack },
      {
        label: formatCorePackLabel(
          activeComponent.name,
          activeComponent.isCorePack,
        ),
        current: true,
      },
    ]);

    return () => onBreadcrumbChange(null);
  }, [
    activeComponent,
    handleBack,
    onBreadcrumbChange,
    onNavigateRootHome,
    showComponentDetail,
  ]);

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
          {ComponentDetail()}
        </div>
      )}
    </div>
  );
};

export default MessageHome;
