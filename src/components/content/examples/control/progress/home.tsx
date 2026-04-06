import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojbutton";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import ProgressBar from "./progressbar";
import ProgressButton from "./progressbutton";
import ProgressCircle from "./progresscircle";

type ProgressComponent = {
  id: number;
  name: string;
  description: string;
  image: string;
  isCorePack?: boolean;
};

const progressComponents: ProgressComponent[] = [
  {
    id: 1,
    name: "Progress Bar (oj-c)",
    description: "Linear progress with determinate, indeterminate, and status examples.",
    image: "oj-ux-icon-size-12x oj-ux-ico-progress-linear",
    isCorePack: true,
  },
  {
    id: 2,
    name: "Progress Circle (oj-c)",
    description: "Radial progress indicators across sizes and statuses.",
    image: "oj-ux-icon-size-12x oj-ux-ico-progress-radial",
    isCorePack: true,
  },
  {
    id: 3,
    name: "Progress Button (oj-c)",
    description: "Buttons with async progress states and sizing variants.",
    image: "oj-ux-icon-size-12x oj-ux-ico-progress-button",
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<ProgressComponent["id"], ProgressComponent>(progressComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<ProgressComponent["id"]>;

const ProgressHome = () => {
  const [selectedItems, setSelectedItems] = useState<KeySet<ProgressComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(null);

  const renderListItem = useCallback(
    (item: ojListView.ItemTemplateContext<ProgressComponent["id"], ProgressComponent>) => (
      <li>
        <oj-action-card>
          <div class="component-item" key={item.data.id}>
            <div class="componentImage">
              {item.data.isCorePack ? (
                <span class="demo-badge-position oj-sm-margin-2x-vertical oj-badge oj-badge-end oj-badge-success oj-badge-sm">
                  Core Pack
                </span>
              ) : null}
              <div class="oj-helper-text-align-center" style={{ paddingTop: "25px" }}>
                <div className={item.data.image}></div>
              </div>
              <div class="oj-flex-item oj-text-sm componentInfo oj-typography-body-md oj-typography-bold">
                {item.data.name}
              </div>
              <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-0">
                {item.data.description}
              </p>
            </div>
          </div>
        </oj-action-card>
      </li>
    ),
    [selectedItems],
  );

  const ComponentDetail = useCallback(() => {
    const activeComponent = progressComponents.find((component) => component.id === activeComponentId);
    if (!activeComponent) {
      return null;
    }

    let detailContent: preact.ComponentChildren = null;
    switch (activeComponentId) {
      case 1:
        detailContent = <ProgressBar />;
        break;
      case 2:
        detailContent = <ProgressCircle />;
        break;
      case 3:
        detailContent = <ProgressButton />;
        break;
      default:
        detailContent = null;
    }

    return (
      <div class="oj-sm-margin-4x-top">
        <h5 class="oj-typography-subheading-sm oj-sm-margin-0">{activeComponent.name}</h5>
        <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-0 oj-sm-margin-2x-bottom">
          {activeComponent.description}
        </p>
        {detailContent}
      </div>
    );
  }, [activeComponentId]);

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as ProgressComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<ProgressComponent["id"]>;
      setSelectedItems(selection);
    }
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
            onojAction={() => {
              setShowComponentDetail(false);
              setActiveComponentId(null);
              setSelectedItems(new KeySetImpl([]) as KeySet<ProgressComponent["id"]>);
            }}
          >
            <span slot="startIcon" class="oj-ux-ico-chevron-left"></span>
            Progress Components
          </oj-button>
          {ComponentDetail()}
        </div>
      )}
    </div>
  );
};

export default ProgressHome;
