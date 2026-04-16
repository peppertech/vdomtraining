import { h, ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/accordion-item-multiple";

type AccordionItem = {
  id: number;
  itemKey: string;
  title: string;
  text: string;
};

type AccordionItemMultipleProps = ComponentProps<"oj-c-accordion-item-multiple">;

const accordionItems: AccordionItem[] = [
  {
    id: 1,
    itemKey: "overview",
    title: "Overview",
    text: "Use accordion item multiple when users may need to keep more than one section open at the same time while comparing related details.",
  },
  {
    id: 2,
    itemKey: "guidance",
    title: "Guidance",
    text: "Each item receives the shared expandedKeys array so expansion stays synchronized across the group while each header remains independently toggleable.",
  },
  {
    id: 3,
    itemKey: "accessibility",
    title: "Accessibility",
    text: "Provide meaningful header text for every accordion item so screen readers can announce each section clearly when users move through the content.",
  },
];

const CorePackAccordianItemMultiple = () => {
  const items = useMemo(() => accordionItems, []);
  const [expandedKeys, setExpandedKeys] = useState<
    NonNullable<AccordionItemMultipleProps["expandedKeys"]>
  >(["overview"]);

  const handleExpandedKeysChanged = useCallback(
    (
      event: Parameters<
        NonNullable<AccordionItemMultipleProps["onexpandedKeysChanged"]>
      >[0],
    ) => {
      setExpandedKeys(event.detail.value ?? []);
    },
    [],
  );

  return (
    <div
      id="accordionPage"
      class="oj-web-applayout-max-width oj-web-applayout-content"
    >
      {items.map((item) => (
        <oj-c-accordion-item-multiple
          key={item.id}
          id={`accordionItem_${item.id}`}
          itemKey={item.itemKey}
          expandedKeys={expandedKeys}
          onexpandedKeysChanged={handleExpandedKeysChanged}
        >
          <h3 slot="header">{item.title}</h3>
          <p>{item.text}</p>
        </oj-c-accordion-item-multiple>
      ))}
    </div>
  );
};

export default CorePackAccordianItemMultiple;
