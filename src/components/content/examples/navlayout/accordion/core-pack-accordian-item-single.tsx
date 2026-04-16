import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/accordion-item-single";
import "oj-c/radioset";

type AccordionItemSingleProps = ComponentProps<"oj-c-accordion-item-single">;

type RadioOption = {
  value: string;
  label: string;
};

const colorOptions: RadioOption[] = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
];

const CorePackAccordianItemSingle = () => {
  const [expandedKey, setExpandedKey] = useState<
    AccordionItemSingleProps["expandedKey"]
  >("key1");
  const [currentColor, setCurrentColor] = useState("red");

  const handleExpandedKeyChanged = useCallback(
    (
      event: Parameters<
        NonNullable<AccordionItemSingleProps["onexpandedKeyChanged"]>
      >[0],
    ) => {
      setExpandedKey(event.detail.value ?? null);
    },
    [],
  );

  const handleColorChanged = useCallback(
    (
      event: Parameters<
        NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
      >[0],
    ) => {
      setCurrentColor(event.detail.value ?? "");
    },
    [],
  );

  return (
    <div
      id="accordionPage"
      class="oj-web-applayout-max-width oj-web-applayout-content"
    >
      <oj-c-accordion-item-single
        id="id1"
        itemKey="key1"
        expandedKey={expandedKey}
        onexpandedKeyChanged={handleExpandedKeyChanged}
      >
        <h3 slot="header">
          <span class="oj-ux-ico-cart oj-ux-icon-size-5x oj-sm-padding-2x-end"></span>
          Header 1
        </h3>
        <p>Content 1.</p>
      </oj-c-accordion-item-single>

      <oj-c-accordion-item-single
        id="id2"
        itemKey="key2"
        expandedKey={expandedKey}
        onexpandedKeyChanged={handleExpandedKeyChanged}
      >
        <h3 slot="header">Header 2</h3>
        <div>
          <oj-c-radioset
            labelHint="Colors"
            labelEdge="inside"
            options={colorOptions}
            value={currentColor}
            onvalueChanged={handleColorChanged}
          ></oj-c-radioset>
        </div>
      </oj-c-accordion-item-single>

      <oj-c-accordion-item-single
        id="id3"
        itemKey="key3"
        expandedKey={expandedKey}
        onexpandedKeyChanged={handleExpandedKeyChanged}
      >
        <h3 slot="header">Header 3</h3>
        <p>Content 3.</p>
      </oj-c-accordion-item-single>
    </div>
  );
};

export default CorePackAccordianItemSingle;
