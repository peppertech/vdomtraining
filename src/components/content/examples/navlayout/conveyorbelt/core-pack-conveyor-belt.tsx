import { h, ComponentProps } from "preact";
import { useCallback, useMemo } from "preact/hooks";
import "oj-c/button";
import "oj-c/conveyor-belt";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { CConveyorBeltElement } from "oj-c/conveyor-belt";

type ConveyorItem = {
  id: string;
  label: string;
};

const conveyorItems: ConveyorItem[] = [
  { id: "hydrogen", label: "Hydrogen" },
  { id: "helium", label: "Helium" },
  { id: "lithium", label: "Lithium" },
  { id: "beryllium", label: "Beryllium" },
  { id: "boron", label: "Boron" },
  { id: "carbon", label: "Carbon" },
  { id: "nitrogen", label: "Nitrogen" },
  { id: "oxygen", label: "Oxygen" },
  { id: "fluorine", label: "Fluorine" },
  { id: "neon", label: "Neon" },
  { id: "sodium", label: "Sodium" },
  { id: "magnesium", label: "Magnesium" },
];

type ConveyorBeltProps = ComponentProps<"oj-c-conveyor-belt">;

const CorePackConveyorBelt = () => {
  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<ConveyorItem["id"], ConveyorItem>(
        conveyorItems,
        { keyAttributes: "id" },
      ),
    [],
  );

  const renderItem = useCallback(
    (
      itemContext: CConveyorBeltElement.ItemTemplateContext<
        ConveyorItem["id"],
        ConveyorItem
      >,
    ) => {
      return (
        <oj-c-button
          label={itemContext.data.label}
          class="oj-sm-margin-1x"
        ></oj-c-button>
      );
    },
    [],
  );

  return (
    <div
      id="core-pack-conveyorbelt-horizontal-example"
      class="oj-web-applayout-max-width oj-web-applayout-content"
    >
      <div class="oj-flex">
        <oj-c-conveyor-belt
          items={dataProvider as ConveyorBeltProps["items"]}
          class="oj-lg-6 oj-md-9 oj-sm-12 oj-flex-item"
          arrowVisibility="auto"
        >
          <template slot="itemTemplate" render={renderItem}></template>
        </oj-c-conveyor-belt>
      </div>
    </div>
  );
};

export default CorePackConveyorBelt;
