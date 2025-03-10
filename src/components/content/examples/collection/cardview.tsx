import { ComponentProps } from "preact";
import { useState, useMemo } from "preact/hooks";
import "oj-c/card-view"
import "oj-c/button";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { CCardViewElement } from "oj-c/card-view";
import { CButtonElement } from "oj-c/button";

type Card = {
  label: string,
  count: number
}

const initCardData: Array<Card> = [
  { label: "Producer", count: 0 },
  { label: "Consumer", count: 0 },
  { label: "Instance", count: 0 }
]

const CardView = () => {
  const [cardData, setCardData] = useState<Array<Card>>(initCardData);
  const cardDP = useMemo(() => new MutableArrayDataProvider<Card['label'], Card>(
    cardData,
    {
      keyAttributes: "label",
    }
  ), [cardData]);

  const updateCounts = (e: CButtonElement.ojAction) => {
    let tempData: Array<Card> = []
    Object.assign(tempData, cardData);
    tempData.map((item) => {
      item.count = Math.floor(Math.random() * 101);
    })
    setCardData(tempData);
  }

  const cardItemTemplate:CCardViewElement.RenderItemTemplate<Card['label'],Card> = (item) => {
    return (
      <div class="oj-panel oj-panel-shadow-sm" style="width:200px;height:150px">
        <div>{item.data.label}</div>
        <div>{item.data.count}</div>
      </div>
    )
  };

  return (
    <div class="oj-md-margin-4x-horizontal">
      <oj-c-button label="Update Counts" onojAction={updateCounts}></oj-c-button>
      <oj-c-card-view
        id="producer-card"
        data={cardDP}
      >
        <template slot="itemTemplate" render={cardItemTemplate}></template>
      </oj-c-card-view>
    </div>
  );
};
export default CardView;
