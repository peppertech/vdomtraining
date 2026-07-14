import "oj-c/buttonset-multiple";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import 'preact';
import { useState } from "preact/hooks";

const drinkOptions = [
  { value: "coffee", label: "Coffee" },
  { value: "tea", label: "Tea" },
  { value: "milk", label: "Milk" }
];

export const ButtonsetmultipleLabelledButtonsetcorepack = () => {
  const [currentDrink, setCurrentDrink] = useState<string[]>(["milk"]);

  return (
    <div id="buttonsetContainer">
      <div class="oj-sm-margin-4x-bottom">
        <oj-label-value>
          <oj-label id="mainlabelid" slot="label">
            Drinks
          </oj-label>
          <oj-c-buttonset-multiple
            slot="value"
            value={currentDrink}
            onvalueChanged={(event) => setCurrentDrink((event.detail.value as string[]) ?? [])}
            id="buttonsetLabelDemoId"
            items={drinkOptions}
            aria-labelledby="mainlabelid"
          />
        </oj-label-value>
      </div>
      <span>Now serving:</span>
      <span id="curr-value"> {JSON.stringify(currentDrink)}</span>
    </div>
  );
};

export default ButtonsetmultipleLabelledButtonsetcorepack;
