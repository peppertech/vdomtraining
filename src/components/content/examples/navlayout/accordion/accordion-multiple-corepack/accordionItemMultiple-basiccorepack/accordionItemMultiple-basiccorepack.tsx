import "oj-c/accordion-item-multiple";
import 'preact';
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type ExpandedKeysChangedEvent = Parameters<
  NonNullable<
    ComponentProps<"oj-c-accordion-item-multiple">["onexpandedKeysChanged"]
  >
>[0];

type AccordionItemData = {
  id: number;
  itemKey: string;
  text: string;
  title: string;
};

const accordionItemData: AccordionItemData[] = [
  { id: 1, itemKey: "itemKey1", text: "Content 1", title: "Header 1" },
  { id: 2, itemKey: "itemKey2", text: "Content 2", title: "Header 2" },
  { id: 3, itemKey: "itemKey3", text: "Content 3", title: "Header 3" },
  { id: 4, itemKey: "itemKey4", text: "Content 4", title: "Header 4" },
];

export const AccordionItemMultipleBasiccorepack = () => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([
    "itemKey2",
    "itemKey3",
  ]);

  const handleExpandedKeysChanged = (event: ExpandedKeysChangedEvent) => {
    setExpandedKeys((event.detail.value as string[]) ?? []);
  };

  return (
    <div id="accordionPage">
      {accordionItemData.map((item) => (
        <oj-c-accordion-item-multiple
          key={item.id}
          itemKey={item.itemKey}
          expandedKeys={expandedKeys}
          onexpandedKeysChanged={handleExpandedKeysChanged}
          id={`accordionItem_${item.id}`}
        >
          <h3 slot="header">{item.title}</h3>
          <p>{item.text}</p>
        </oj-c-accordion-item-multiple>
      ))}
    </div>
  );
};

export default AccordionItemMultipleBasiccorepack;
