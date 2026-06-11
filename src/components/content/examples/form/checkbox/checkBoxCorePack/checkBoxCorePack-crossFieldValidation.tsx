import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/checkbox";
import "oj-c/checkboxset";
import "oj-c/form-layout";
import {
  groceryOptions,
  type CheckBoxCorePackProps,
} from "./checkBoxCorePack-shared";

export default function CheckBoxCorePackCrossFieldValidationExample() {
  const [isChecked, setIsChecked] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [age21Messages, setAge21Messages] = useState<
    NonNullable<CheckBoxCorePackProps["messagesCustom"]>
  >([]);

  const options = useMemo(() => groceryOptions, []);

  return (
    <div id="crossfield-example">
      <oj-c-form-layout>
        <oj-c-checkboxset
          id="checkboxSetId"
          value={items}
          options={options}
          labelHint="Groceries"
          onvalueChanged={(event) => {
            setItems((event.detail.value as string[]) ?? []);
          }}
        ></oj-c-checkboxset>
        <oj-c-checkbox
          value={isChecked}
          messagesCustom={age21Messages}
          help={{ instruction: "Are you 21 years old or older?" }}
          onvalueChanged={(event) => {
            setIsChecked(Boolean(event.detail.value));
            setAge21Messages([]);
          }}
        >
          21 or older?
        </oj-c-checkbox>
      </oj-c-form-layout>
      <hr />
      <oj-c-button
        id="button"
        label="Add to cart"
        onojAction={() => {
          const hasAlcohol = items.some((item) => item === "wine" || item === "beer");

          if (hasAlcohol && !isChecked) {
            setAge21Messages([
              {
                summary: "Age restricted item",
                detail: "You must be at least 21 to purchase alcohol",
                severity: "error",
              },
            ]);
            return;
          }

          setCartItemCount((current) => current + items.length);
          setItems([]);
          setAge21Messages([]);
        }}
      ></oj-c-button>
      <div>
        <span>Items in cart: </span>
        <span>{cartItemCount}</span>
      </div>
    </div>
  );
}
