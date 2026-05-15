import { h } from "preact";
import type { ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import "oj-c/buttonset-single";
import "oj-c/button";

type ButtonsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-buttonset-single">["onvalueChanged"]>
>[0];

const drinkOptions = [
  { value: "coffee", label: "Coffee" },
  { value: "tea", label: "Tea" },
  { value: "milk", label: "Milk" }
];

export const ButtonsetsingleBasiccorepack = () => {
  const [drink, setDrink] = useState<string | undefined>("tea");

  const drinkText = useMemo(
    () => `Now serving: ${drink ?? "A dry dusty glass of nothing"}`,
    [drink]
  );

  const handleDrinkChanged = (event: ButtonsetValueChangedEvent) => {
    setDrink(event.detail.value ?? undefined);
  };

  const toggleCoffee = () => {
    setDrink((currentDrink) => (currentDrink === "coffee" ? undefined : "coffee"));
  };

  return (
    <div id="buttons-container">
      <div class="oj-sm-margin-4x-bottom">
        <oj-c-buttonset-single
          id="drinkset"
          items={drinkOptions}
          value={drink}
          onvalueChanged={handleDrinkChanged}
          aria-label="Choose only one beverage."
        />
      </div>

      <p class="oj-typography-bold" id="selectedDrink">
        {drinkText}
      </p>

      <p>
        <oj-c-button onojAction={toggleCoffee} label="Toggle Coffee" />
      </p>
    </div>
  );
};

export default ButtonsetsingleBasiccorepack;
