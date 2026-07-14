import "oj-c/buttonset-single";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import 'preact';
import { useState } from "preact/hooks";

const drinkOptions = [
  { value: "coffee", label: "Coffee" },
  { value: "tea", label: "Tea" },
  { value: "milk", label: "Milk" }
];

export const ButtonsetsingleLabelledButtonsetcorepack = () => {
  const [currentDrink, setCurrentDrink] = useState<string | undefined>("milk");

  return (
    <div id="buttonsetContainer">
      <div class="oj-sm-margin-4x-bottom">
        <oj-label-value>
          <oj-label id="mainlabelid" slot="label">
            Drinks
          </oj-label>
          <oj-c-buttonset-single
            slot="value"
            value={currentDrink}
            onvalueChanged={(event) => setCurrentDrink(event.detail.value ?? undefined)}
            id="buttonsetLabelDemoId"
            items={drinkOptions}
            aria-labelledby="mainlabelid"
          />
        </oj-label-value>
      </div>
      <span>Now serving:</span>
      <span id="curr-value"> {currentDrink}</span>
    </div>
  );
};

export default ButtonsetsingleLabelledButtonsetcorepack;
