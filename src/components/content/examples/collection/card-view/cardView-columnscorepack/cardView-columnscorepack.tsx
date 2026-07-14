import "css!./demo.css";
import "oj-c/card-view";
import "oj-c/input-number";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

interface DataItem {
  id: number;
  label: string;
}

type CardItemContext = {
  data: DataItem;
  isTabbable?: boolean;
  item: { data: DataItem; metadata: { key: DataItem["id"] } };
};
type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-input-number">["onvalueChanged"]>
>[0];

const ITEMS: DataItem[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  label: `Item ${index + 1}`
}));

const renderCard = (context: CardItemContext) => (
  <div class="oj-panel oj-bg-success-30 demo-card">
    <span>{context.data.label}</span>
  </div>
);

export const CardViewColumnscorepack = () => {
  const [columns, setColumns] = useState<number>(3);

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<DataItem["id"], DataItem>(ITEMS, {
        keyAttributes: "id"
      }),
    []
  );

  const handleColumnsChanged = (event: InputNumberValueChangedEvent) => {
    const nextValue = event.detail.value;
    if (typeof nextValue === "number") {
      setColumns(Math.min(5, Math.max(2, Math.trunc(nextValue))));
    }
  };

  return (
    <div id="cardviewContainer">
      <div class="oj-flex oj-panel oj-bg-neutral-30 oj-sm-padding-4x-top oj-sm-margin-4x-bottom">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-number
            id="input-columns"
            labelHint="Number of columns"
            labelEdge="start"
            value={columns}
            min={2}
            max={5}
            step={1}
            onvalueChanged={handleColumnsChanged}
          />
        </div>
      </div>
      <oj-c-card-view
        id="cardview"
        columns={columns}
        aria-label="cardview with fixed number of columns"
        data={dataProvider}
      >
        <template slot="itemTemplate" render={renderCard} />
      </oj-c-card-view>
    </div>
  );
};

export default CardViewColumnscorepack;
