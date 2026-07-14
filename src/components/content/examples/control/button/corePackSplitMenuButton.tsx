import "oj-c/split-menu-button";
import 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useState } from "preact/hooks";

type SplitMenuButtonProps = ComponentProps<"oj-c-split-menu-button">;
type SplitMenuButtonItem = NonNullable<SplitMenuButtonProps["items"]>[number];
type SplitMenuButtonActionEvent = Parameters<NonNullable<SplitMenuButtonProps["onojAction"]>>[0];
type SplitMenuButtonMenuEvent = Parameters<NonNullable<SplitMenuButtonProps["onojMenuAction"]>>[0];

const createIcon = (iconClass: string) => ({
  type: "class" as const,
  class: `oj-button-icon oj-start ${iconClass}`,
});

const splitItems: SplitMenuButtonItem[] = [
  { key: "preview", label: "Preview", startIcon: createIcon("oj-ux-ico-eye") },
  { key: "duplicate", label: "Duplicate", startIcon: createIcon("oj-ux-ico-copy") },
  { type: "separator" },
  { key: "archive", label: "Archive", startIcon: createIcon("oj-ux-ico-archive") },
  { key: "delete", label: "Delete", variant: "destructive", startIcon: createIcon("oj-ux-ico-delete") },
];

const CorePackSplitMenuButton = () => {
  const [primaryMessage, setPrimaryMessage] = useState("Primary action not triggered yet.");
  const [menuMessage, setMenuMessage] = useState("No menu item selected.");

  const handlePrimaryAction = useCallback((event: SplitMenuButtonActionEvent) => {
    setPrimaryMessage(`Primary action fired at ${new Date(event.timeStamp).toLocaleTimeString()}.`);
  }, []);

  const handleMenuAction = useCallback((event: SplitMenuButtonMenuEvent) => {
    const { key } = event.detail;
    setMenuMessage(`Menu action selected "${key ?? "unknown"}".`);
  }, []);

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Default Split Menu Button</h6>
      <oj-c-split-menu-button
        id="split-menu-button-default"
        label="Run Job"
        items={splitItems}
        chroming="callToAction"
        aria-label="Run job split menu button"
        onojAction={handlePrimaryAction}
        onojMenuAction={handleMenuAction}
      ></oj-c-split-menu-button>
      <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-2x-top" aria-live="polite">
        {primaryMessage}
      </p>
      <p class="oj-typography-body-sm oj-text-color-secondary">{menuMessage}</p>

      <h6 class="oj-sm-margin-4x-top">Outlined & Icon Display</h6>
      <oj-c-split-menu-button
        id="split-menu-button-outlined"
        label="Download"
        chroming="outlined"
        tooltip="Download actions"
        items={[
          { key: "downloadPdf", label: "Download PDF", startIcon: createIcon("oj-ux-ico-download") },
          { key: "downloadCsv", label: "Download CSV", startIcon: createIcon("oj-ux-ico-table") },
        ]}
      ></oj-c-split-menu-button>

      <h6 class="oj-sm-margin-4x-top">Disabled Example</h6>
      <oj-c-split-menu-button
        id="split-menu-button-disabled"
        label="Disabled"
        items={splitItems}
        disabled
      ></oj-c-split-menu-button>
    </div>
  );
};

export default CorePackSplitMenuButton;
