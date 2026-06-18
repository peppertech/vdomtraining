import { h } from "preact";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/accordion-item-single";
import "oj-c/radioset";

type ExpandedKeyChangedEvent = Parameters<
  NonNullable<
    ComponentProps<"oj-c-accordion-item-single">["onexpandedKeyChanged"]
  >
>[0];
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

const colorOptions = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
];

export const AccordionItemSingleBasiccorepack = () => {
  const [currentColor, setCurrentColor] = useState("red");
  const [expandedKey, setExpandedKey] = useState<string | null>("key3");

  const handleExpandedKeyChanged = (event: ExpandedKeyChangedEvent) => {
    setExpandedKey((event.detail.value as string | null) ?? null);
  };

  const handleCurrentColorChanged = (event: RadioValueChangedEvent) => {
    const nextValue = event.detail.value;
    if (typeof nextValue === "string") {
      setCurrentColor(nextValue);
    }
  };

  return (
    <div id="accordionPage">
      <oj-c-accordion-item-single
        expandedKey={expandedKey}
        onexpandedKeyChanged={handleExpandedKeyChanged}
        itemKey="key1"
        id="id1"
      >
        <h3 slot="header">
          <span class="oj-ux-ico-cart oj-ux-icon-size-5x oj-sm-padding-2x-end" />
          Header 1
        </h3>
        <p>Content 1.</p>
      </oj-c-accordion-item-single>
      <oj-c-accordion-item-single
        expandedKey={expandedKey}
        onexpandedKeyChanged={handleExpandedKeyChanged}
        itemKey="key2"
        id="id2"
      >
        <h3 slot="header">Header 2</h3>
        <div>
          <oj-c-radioset
            labelHint="Colors"
            labelEdge="inside"
            options={colorOptions}
            value={currentColor}
            onvalueChanged={handleCurrentColorChanged}
          />
        </div>
      </oj-c-accordion-item-single>
      <oj-c-accordion-item-single
        expandedKey={expandedKey}
        onexpandedKeyChanged={handleExpandedKeyChanged}
        itemKey="key3"
        id="id3"
      >
        <h3 slot="header">Header 3</h3>
        <p>Content 3.</p>
      </oj-c-accordion-item-single>
    </div>
  );
};

export default AccordionItemSingleBasiccorepack;
