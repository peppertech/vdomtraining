import "oj-c/form-layout";
import "oj-c/picto-chart";
import { CPictoChartElement } from "oj-c/picto-chart";
import { ColorAttributeGroupHandler } from "ojs/ojattributegrouphandler";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";
import * as appleDataText from "text!../../data/cookbook/dataVisualizations/pictoChart/resources/appleData.json";
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require("ojs/ojarraydataprovider");

type PictoSelectionMode = NonNullable<ComponentProps<"oj-c-picto-chart">["selectionMode"]>;
type PictoSelection = NonNullable<ComponentProps<"oj-c-picto-chart">["selection"]>;
type PictoSelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-picto-chart">["onselectionChanged"]>
>[0];
type DemoValueChangedEvent = CustomEvent<{ value: string | null }>;
type PictoContextMenuConfig = NonNullable<
  CPictoChartElement<string, AppleDatum>["contextMenuConfig"]
>;

type AppleDatum = {
  name: string;
  count: number;
};

type PictoChartItemTemplateContext = {
  data: AppleDatum;
};

type MenuSelectionValue = "defaultView" | "compactView" | "expandedView";

const appleData = JSON.parse(appleDataText as string) as AppleDatum[];

export const PictoChartContextMenucorepack = () => {
  const [selectionMode, setSelectionMode] = useState<PictoSelectionMode>("single");
  const [selectedItems, setSelectedItems] = useState<PictoSelection>(["iPad"]);
  const [launchedFromItem, setLaunchedFromItem] = useState("None launched yet");
  const [selectedMenuItem, setSelectedMenuItem] = useState("None selected yet");
  const [selectedSelectionMenuItem, setSelectedSelectionMenuItem] =
    useState<MenuSelectionValue>("defaultView");

  const dataProvider = useMemo(
    () => new ArrayDataProvider<string, AppleDatum>(appleData, { keyAttributes: "name" }),
    []
  );
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);

  const contextMenuConfig = useMemo<PictoContextMenuConfig>(
    () => ({
      items: (context) => {
        setLaunchedFromItem(
          context.type === "background" ? "background" : context.data?.name ?? "unknown"
        );

        return [
          {
            label: "View Details",
            key: "viewDetails",
            onAction: () => {
              setSelectedMenuItem("viewDetails");
            }
          },
          {
            label: "Export Data",
            key: "exportData",
            onAction: () => {
              setSelectedMenuItem("exportData");
            }
          },
          {
            label: "Share",
            key: "share",
            onAction: () => {
              setSelectedMenuItem("share");
            }
          },
          { type: "separator" },
          {
            type: "selectsingle",
            key: "chartViewSelection",
            items: [
              { label: "Default View", value: "defaultView" },
              { label: "Compact View", value: "compactView" },
              { label: "Expanded View", value: "expandedView" }
            ],
            selection: selectedSelectionMenuItem,
            onSelection: (selectionInfo) => {
              setSelectedSelectionMenuItem(selectionInfo.value as MenuSelectionValue);
            }
          }
        ];
      },
      accessibleLabel: "chart actions"
    }),
    [selectedSelectionMenuItem]
  );

  const handleSelectionModeChanged = (event: DemoValueChangedEvent) => {
    const nextValue = event.detail.value;

    if (nextValue === "multiple") {
      setSelectionMode("multiple");
      setSelectedItems(["iPhone", "Mac"]);
    } else if (nextValue === "single") {
      setSelectionMode("single");
      setSelectedItems(["iPad"]);
    } else if (nextValue === "none") {
      setSelectionMode("none");
      setSelectedItems([]);
    }
  };

  const handleSelectionChanged = (event: PictoSelectionChangedEvent) => {
    setSelectedItems((event.detail.value as PictoSelection | null) ?? []);
  };

  const renderPictoChartItem: import("ojs/ojvcomponent").TemplateSlot<PictoChartItemTemplateContext> = (item) => (
    <oj-c-picto-chart-item
      name={item.data.name}
      color={colorHandler.getValue(item.data.name)}
      count={String(item.data.count * 2)}
    />
  );

  return (
    <div id="chart-container">
      <oj-c-form-layout maxColumns={2}>
        <demo-radioset-enum
          id="radioButtonset3"
          value={selectionMode}
          onvalueChanged={handleSelectionModeChanged}
          direction="row"
          enumValues={["none", "single", "multiple"]}
          labelHint="Selection Mode"
        />
      </oj-c-form-layout>

      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-1x-horizontal">
          <oj-c-picto-chart
            id="pictochart1"
            data={dataProvider}
            aria-label="Context Menu Picto Chart"
            selectionMode={selectionMode}
            selection={selectedItems}
            onselectionChanged={handleSelectionChanged}
            contextMenuConfig={contextMenuConfig}
            columnCount={12}
          >
            <template slot="itemTemplate" render={renderPictoChartItem} />
          </oj-c-picto-chart>

          <div class="oj-flex oj-sm-flex-direction-column">
            <div class="oj-flex-item">
              <div class="oj-typography-bold oj-sm-margin-2x-vertical">Selected</div>
              {selectedItems.length > 0 ? (
                selectedItems.map((item) => <div key={String(item)}>{String(item)}</div>)
              ) : (
                <div>None</div>
              )}
            </div>

            <div class="oj-flex-item oj-sm-margin-4x-vertical">
              <p>
                Last selected menu action: <span id="selected">{selectedMenuItem}</span>
              </p>
              <p>
                Last view selection:{" "}
                <span id="selectedSelection">{selectedSelectionMenuItem}</span>
              </p>
              <p>
                Launched from: <span id="launched">{launchedFromItem}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictoChartContextMenucorepack;
