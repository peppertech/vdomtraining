import "oj-c/legend";
import { CLegendElement } from "oj-c/legend";
import { ColorAttributeGroupHandler } from "ojs/ojattributegrouphandler";
import { useMemo,useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

type FruitDatum = {
  fruit: string;
};

type LegendContextMenuConfig = NonNullable<CLegendElement<string, FruitDatum>["contextMenuConfig"]>;
type LegendItemTemplateContext = {
  data: FruitDatum;
};
type LegendSelectionValue = "selection1" | "selection2" | "selection3";

const fruits: FruitDatum[] = [
  { fruit: "Blueberries" },
  { fruit: "Kiwis" },
  { fruit: "Bananas" },
  { fruit: "Apples" },
  { fruit: "Grapes" }
];

export const LegendContextMenucorepack = () => {
  const [launchedFromItem, setLaunchedFromItem] = useState("None launched yet");
  const [selectedMenuItem, setSelectedMenuItem] = useState("None selected yet");
  const [selectedSelectionMenuItem, setSelectedSelectionMenuItem] =
    useState<LegendSelectionValue>("selection1");

  const dataProvider = useMemo(
    () => new ArrayDataProvider<string, FruitDatum>(fruits, { keyAttributes: "fruit" }),
    []
  );
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);

  const contextMenuConfig = useMemo<LegendContextMenuConfig>(
    () => ({
      items: (context) => {
        setLaunchedFromItem(context.type === "background" ? "background" : context.data?.text ?? "");

        return [
          {
            label: "Action 1",
            key: "action1",
            onAction: () => {
              setSelectedMenuItem("action1");
            }
          },
          {
            label: "Action 2",
            key: "action2",
            onAction: () => {
              setSelectedMenuItem("action2");
            }
          },
          {
            label: "Action 3",
            key: "action3",
            onAction: () => {
              setSelectedMenuItem("action3");
            }
          },
          { type: "separator" },
          {
            type: "selectsingle",
            key: "legendSelection",
            items: [
              { label: "Selection 1", value: "selection1" },
              { label: "Selection 2", value: "selection2" },
              { label: "Selection 3", value: "selection3" }
            ],
            selection: selectedSelectionMenuItem,
            onSelection: (selectionInfo) => {
              setSelectedSelectionMenuItem(selectionInfo.value as LegendSelectionValue);
            }
          }
        ];
      },
      accessibleLabel: "actions"
    }),
    [selectedSelectionMenuItem]
  );

  const renderLegendItem: import("ojs/ojvcomponent").TemplateSlot<LegendItemTemplateContext> = (item) => (
    <oj-c-legend-item text={item.data.fruit} color={colorHandler.getValue(item.data.fruit)} />
  );

  return (
    <div id="legend-container">
      <div>
        <oj-c-legend
          id="legend1"
          orientation="vertical"
          contextMenuConfig={contextMenuConfig}
          data={dataProvider}
          aria-label="Legend of fruits"
        >
          <template slot="itemTemplate" render={renderLegendItem} />
        </oj-c-legend>
      </div>
      <div class="oj-sm-margin-8x-vertical">
        <p>
          Last selected menu action: <span id="selected">{selectedMenuItem}</span>
        </p>
        <p>
          Last select single group selection:{" "}
          <span id="selectedSelection">{selectedSelectionMenuItem}</span>
        </p>
        <p>
          Launched from: <span id="launched">{launchedFromItem}</span>
        </p>
      </div>
    </div>
  );
};

export default LegendContextMenucorepack;
