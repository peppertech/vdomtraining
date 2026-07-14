import "css!./demo.css";
import "oj-c/split-menu-button";
import type { CSplitMenuButtonElement } from "oj-c/split-menu-button";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";

type MenuItems = NonNullable<CSplitMenuButtonElement["items"]>;
type ActionMenuItem = Extract<MenuItems[number], { label: string; key?: string | number }>;
type MenuActionHandler = NonNullable<ComponentProps<"oj-c-split-menu-button">["onojAction"]>;
type MenuMenuActionHandler = NonNullable<
  ComponentProps<"oj-c-split-menu-button">["onojMenuAction"]
>;

const baseItems: ActionMenuItem[] = [
  { label: "Copy", key: "copy" },
  { label: "Cut", key: "cut" },
  { label: "Paste", key: "paste", disabled: true },
  { label: "Undo", key: "undo" }
];

export const SplitmenubuttonPersistentcorepack = () => {
  const [label, setLabel] = useState("Copy");
  const [logOutput, setLogOutput] = useState("(None clicked yet)");
  const [hiddenKey, setHiddenKey] = useState<string | null>(null);

  const items = useMemo<MenuItems>(() => baseItems.filter((item) => item.key !== hiddenKey), [hiddenKey]);

  const handleMenuAction: MenuMenuActionHandler = (event) => {
    const detail = (event as CustomEvent<{ key: string | number }>).detail;
    const selectedKey = detail.key.toString();
    const selectedItem = baseItems.find((item) => item.key === selectedKey);
    if (!selectedItem) {
      return;
    }

    setLabel(selectedItem.label);
    setLogOutput(selectedItem.label);
    setHiddenKey(selectedKey);
  };

  const handleAction: MenuActionHandler = () => {
    setLogOutput(label);
  };

  return (
    <div id="buttons-container">
      <h6>Persistent Split Menu Button</h6>
      <div>
        <oj-c-split-menu-button
          id="persistent_button"
          label={label}
          items={items}
          onojAction={handleAction}
          onojMenuAction={handleMenuAction}
        />
      </div>
      <p />
      <p id="last" class="oj-typography-bold">
        Log: <span id="results">{logOutput}</span>
      </p>
    </div>
  );
};

export default SplitmenubuttonPersistentcorepack;
