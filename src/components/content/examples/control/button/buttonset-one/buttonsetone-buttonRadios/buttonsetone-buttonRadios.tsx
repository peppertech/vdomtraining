import "ojs/ojbutton";
import "ojs/ojoption";
import 'preact';
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";

export const ButtonsetoneButtonRadios = () => {
  const [drink, setDrink] = useState<string | null>("tea");
  const drinkValues = useMemo(
    () => [
      { id: "coffee", label: "Coffee" },
      { id: "tea", label: "Tea" },
      { id: "milk", label: "Milk" },
    ],
    []
  );
  const drinkText = (() => {
    const selectedDrink = drink;
    return "Now serving: " + (selectedDrink ? selectedDrink : "A dry dusty glass of nothing");
  })();
  const handleDrinkValueChanged = (
    event: Parameters<NonNullable<ComponentProps<"oj-buttonset-one">["onvalueChanged"]>>[0]
  ) => {
    setDrink(event.detail.value);
  };
  const toggleCoffee = () => {
    const coffeeToggled = drink === "coffee";
    setDrink(coffeeToggled ? null : "coffee");
  };
  return (
    <div id="buttons-container">
      <div class="oj-sm-margin-4x-bottom">
        <oj-buttonset-one
          id="drinkset"
          onvalueChanged={handleDrinkValueChanged}
          value={drink}
          aria-label="Choose only one beverage."
        >
          {drinkValues.map((option) => (
            <oj-option key={option.id} value={option.id}>
              <span>{option.label}</span>
            </oj-option>
          ))}
        </oj-buttonset-one>
      </div>
      <p class="oj-typography-bold" id="selectedDrink">
        {drinkText}
      </p>
      <p>
        <oj-button onojAction={toggleCoffee}>Toggle Coffee</oj-button>
      </p>
    </div>
  );
};
export default ButtonsetoneButtonRadios;
