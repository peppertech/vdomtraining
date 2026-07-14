import "ojs/ojbutton";
import "ojs/ojcheckboxset";
import "ojs/ojformlayout";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import "ojs/ojoption";
import "ojs/ojswitch";
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from "preact/hooks";

export default function SwitchCrossFieldValidationExample() {
  const [isChecked, setIsChecked] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [age21Messages, setAge21Messages] =
    useState<ComponentProps<'oj-switch'>['messagesCustom']>([]);

  const labelEdge = useMemo<"top" | "start">(() => "start", []);

  return (
    <div id="crossfield-example">
      <oj-form-layout labelEdge={labelEdge}>
        <oj-checkboxset
          id="checkboxSetId"
          value={items}
          labelHint="Drinks"
          onvalueChanged={(event) => {
            setItems((event.detail.value as string[]) ?? []);
          }}
        >
          <oj-option value="milk">Milk</oj-option>
          <oj-option value="yogurt">Yogurt</oj-option>
          <oj-option value="wine">Wine</oj-option>
          <oj-option value="beer">Beer</oj-option>
        </oj-checkboxset>
        <oj-label-value>
          <oj-label for="age21Switch" slot="label">
            21 or older?
          </oj-label>
          <oj-switch
            id="age21Switch"
            value={isChecked}
            messagesCustom={age21Messages as ComponentProps<'oj-switch'>['messagesCustom']}
            help={{ instruction: "Are you 21 years old or older?" } as ComponentProps<'oj-switch'>['help']}
            slot="value"
            onvalueChanged={(event) => {
              setIsChecked(Boolean(event.detail.value));
              setAge21Messages([]);
            }}
          />
        </oj-label-value>
      </oj-form-layout>
      <hr />
      <oj-button
        onojAction={() => {
          const messages: Array<{
            summary: string;
            detail: string;
            severity: "error";
          }> = [];
          let itemCount = 0;

          items.forEach((item) => {
            if ((item === "wine" || item === "beer") && !isChecked) {
              messages.push({
                summary: "Age restricted item",
                detail: `You must be at least 21 to purchase ${item}.`,
                severity: "error",
              });
            } else {
              itemCount += 1;
            }
          });

          if (messages.length > 0) {
            setAge21Messages(messages);
            return;
          }

          setCartItemCount((current) => current + itemCount);
          setItems([]);
          setAge21Messages([]);
        }}
      >
        Add to cart
      </oj-button>
      <div>
        <span>Items in cart: </span>
        <span>{cartItemCount}</span>
      </div>
    </div>
  );
}
