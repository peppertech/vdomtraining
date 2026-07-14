import "ojs/ojbutton";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import "ojs/ojoption";
import 'preact';
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type DrinkInfo = {
  id: string;
  value: string;
  drink: string;
};
export const ButtonsetoneLabelledButtonset = () => {
  const [currentDrink, setCurrentDrink] = useState<string>("milk");
  const [drinkOptions] = useState<DrinkInfo[]>([
    { id: "coffeeopt", value: "coffee", drink: "Coffee" },
    { id: "teaopt", value: "tea", drink: "Tea" },
    { id: "milkopt", value: "milk", drink: "Milk" },
  ]);
  const handleCurrentDrinkValueChanged = (
    event: Parameters<NonNullable<ComponentProps<"oj-buttonset-one">["onvalueChanged"]>>[0]
  ) => {
    setCurrentDrink(event.detail.value);
  };
  return (
    <div id="buttonsetContainer">
      <div class="oj-sm-margin-4x-bottom">
        <oj-label-value>
          <oj-label id="mainlabelid" slot="label">
            Drinks
          </oj-label>
          <oj-buttonset-one
            id="buttonsetLabelDemoId"
            labelledBy="mainlabelid"
            onvalueChanged={handleCurrentDrinkValueChanged}
            value={currentDrink}
            slot="value"
          >
            {drinkOptions.map((option) => (
              <oj-option key={option.id} id={option.id} value={option.value}>
                {option.drink}
              </oj-option>
            ))}
          </oj-buttonset-one>
        </oj-label-value>
      </div>
      <span>Now serving:</span>
      <span id="curr-value">{currentDrink}</span>
    </div>
  );
};
export default ButtonsetoneLabelledButtonset;
