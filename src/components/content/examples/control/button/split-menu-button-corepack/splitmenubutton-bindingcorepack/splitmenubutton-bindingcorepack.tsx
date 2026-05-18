import type { ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import "css!./demo.css";
import type { CSplitMenuButtonElement } from "oj-c/split-menu-button";
import "oj-c/split-menu-button";

type MenuItems = CSplitMenuButtonElement["items"];
type MenuActionHandler = NonNullable<ComponentProps<"oj-c-split-menu-button">["onojAction"]>;

export const SplitmenubuttonBindingcorepack = () => {
  const [label] = useState("Copy");
  const [logOutput, setLogOutput] = useState("(None clicked yet)");

  const items: MenuItems = useMemo(
    () => [
      {
        label: "Copy",
        key: "copy",
        onAction: () => setLogOutput("Copy"),
        startIcon: { class: "oj-ux-ico-copy" }
      },
      {
        label: "Cut",
        key: "cut",
        onAction: () => setLogOutput("Cut"),
        startIcon: { class: "oj-ux-ico-cut" }
      },
      {
        label: "Paste",
        key: "paste",
        disabled: true,
        onAction: () => undefined,
        startIcon: { class: "oj-ux-ico-paste" }
      },
      { type: "separator" },
      {
        label: "Undo",
        key: "undo",
        onAction: () => setLogOutput("Undo")
      }
    ],
    []
  );

  const handleAction: MenuActionHandler = () => {
    setLogOutput(label);
  };

  return (
    <div id="buttons-container">
      <h6>Binding Split Menu Button</h6>
      <div>
        <oj-c-split-menu-button
          id="splitmenubutton"
          label={label}
          items={items}
          onojAction={handleAction}
        />
      </div>
      <p />
      <p id="last" class="oj-typography-bold">
        Log: <span id="results">{logOutput}</span>
      </p>
    </div>
  );
};

export default SplitmenubuttonBindingcorepack;
