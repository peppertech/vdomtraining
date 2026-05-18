import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import type { CSplitMenuButtonElement } from "oj-c/split-menu-button";
import "oj-c/split-menu-button";

type MenuItems = CSplitMenuButtonElement["items"];
type MenuActionHandler = NonNullable<ComponentProps<"oj-c-split-menu-button">["onojAction"]>;
type MenuMenuActionHandler = NonNullable<
  ComponentProps<"oj-c-split-menu-button">["onojMenuAction"]
>;

const items: MenuItems = [
  { label: "Copy", key: "Copy" },
  { label: "Cut", key: "Cut" },
  { label: "Paste", key: "Paste", disabled: true },
  { type: "separator" },
  { label: "Undo", key: "Undo" }
];

export const SplitmenubuttonEventcorepack = () => {
  const [log, setLog] = useState("(Nothing yet)");

  const handleAction: MenuActionHandler = () => {
    setLog("Copy");
  };

  const handleMenuAction: MenuMenuActionHandler = (event) => {
    const detail = (event as CustomEvent<{ key: string | number }>).detail;
    setLog(detail.key.toString());
  };

  return (
    <div id="menuButtons-container">
      <h6>SplitMenuButton Using Event</h6>
      <oj-c-split-menu-button
        id="menuButton"
        label="Copy"
        items={items}
        onojAction={handleAction}
        onojMenuAction={handleMenuAction}
        class="oj-sm-margin-5x-bottom"
      />
      <div class="oj-typography-body-md oj-typography-bold">
        Log: <span id="results">{log}</span>
      </div>
    </div>
  );
};

export default SplitmenubuttonEventcorepack;
