import "css!./demo.css";
import type { CSplitMenuButtonElement } from "oj-c/split-menu-button";
import "oj-c/split-menu-button";

type MenuItems = CSplitMenuButtonElement["items"];

const items: MenuItems = [
  { label: "Copy", key: "copy", startIcon: { class: "oj-ux-ico-copy" } },
  { label: "Cut", key: "cut", startIcon: { class: "oj-ux-ico-cut" } },
  { label: "Paste", key: "paste", startIcon: { class: "oj-ux-ico-paste" }, disabled: true },
  { type: "separator" },
  { label: "Undo", key: "undo", startIcon: { class: "oj-ux-ico-undo" } }
];

export const SplitmenubuttonOverviewcorepack = () => (
  <div id="buttons-container">
    <h6>Split Menu Button</h6>
    <div>
      <oj-c-split-menu-button id="button1" label="Copy" items={items} />
    </div>
    <h6>Disabled Button</h6>
    <div>
      <oj-c-split-menu-button disabled id="dis_button1" label="Disabled" items={items} />
    </div>
    <h6>Chroming</h6>
    <div>
      <oj-c-split-menu-button
        id="chroming_button1"
        chroming="outlined"
        label="Outlined"
        items={items}
      />
      <oj-c-split-menu-button id="chroming_button2" chroming="solid" label="Solid" items={items} />
      <oj-c-split-menu-button
        id="chroming_button3"
        chroming="callToAction"
        label="Call To Action"
        items={items}
      />
    </div>
    <h6>Sizes</h6>
    <div>
      <oj-c-split-menu-button id="size_button1" size="sm" label="Small" items={items} />
      <oj-c-split-menu-button id="size_button2" label="Default" items={items} />
      <oj-c-split-menu-button id="size_button3" size="md" label="Medium" items={items} />
      <oj-c-split-menu-button id="size_button4" size="lg" label="Large" items={items} />
    </div>
    <h6>Tooltip</h6>
    <div>
      <oj-c-split-menu-button
        id="tooltip_button"
        tooltip="Tooltip"
        label="Tooltip Split Menu Button"
        items={items}
      />
    </div>
  </div>
);

export default SplitmenubuttonOverviewcorepack;
