import "oj-c/menu-button";
import 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

type MenuButtonProps = ComponentProps<"oj-c-menu-button">;
type MenuButtonItem = NonNullable<MenuButtonProps["items"]>[number];
type MenuButtonActionEvent = Parameters<
  NonNullable<MenuButtonProps["onojMenuAction"]>
>[0];
type MenuButtonSelectionEvent = Parameters<
  NonNullable<MenuButtonProps["onselectionChanged"]>
>[0];

const createIcon = (iconClass: string) => ({
  type: "class" as const,
  class: `oj-button-icon oj-start ${iconClass}`,
});

const menuItems: MenuButtonItem[] = [
  {
    key: "new",
    label: "New",
    startIcon: createIcon("oj-ux-ico-add"),
    items: [
      { key: "newDoc", label: "Document" },
      { key: "newSheet", label: "Spreadsheet" },
      { key: "newPresentation", label: "Presentation" },
    ],
  },
  { key: "open", label: "Open...", startIcon: createIcon("oj-ux-ico-open") },
  {
    key: "share",
    label: "Share",
    startIcon: createIcon("oj-ux-ico-share"),
    items: [
      { key: "shareEmail", label: "Email" },
      { key: "shareLink", label: "Copy Link" },
    ],
  },
  { key: "delete", label: "Move to trash", disabled: true, startIcon: createIcon("oj-ux-ico-delete") },
];

const CorePackMenuButton = () => {
  const [actionMessage, setActionMessage] = useState("No menu actions yet.");
  const [selectionSummary, setSelectionSummary] = useState<string>("No selections.");
  const [selection, setSelection] = useState<MenuButtonProps["selection"]>();

  const handleMenuAction = useCallback((event: MenuButtonActionEvent) => {
    const { key } = event.detail;
    setActionMessage(`Menu action fired for "${key ?? "unknown"}".`);
  }, []);

  const handleSelectionChanged = useCallback(
    (event: MenuButtonSelectionEvent) => {
      const nextSelection = event.detail.value;
      setSelection(nextSelection);

      if (nextSelection && Object.keys(nextSelection).length > 0) {
        const summary = Object.entries(nextSelection)
          .map(([groupKey, value]) => {
            if (Array.isArray(value)) {
              return `${groupKey}: [${value.join(", ")}]`;
            }
            return `${groupKey}: ${value}`;
          })
          .join(" • ");
        setSelectionSummary(summary);
      } else {
        setSelectionSummary("No selections.");
      }
    },
    [],
  );

  const favoriteItems = useMemo<MenuButtonItem[]>(() => {
    return [
      {
        key: "favorites",
        label: "Favorites",
        items: [
          { key: "recent", label: "Recent Files" },
          { key: "starred", label: "Starred" },
        ],
      },
      {
        key: "archived",
        label: "Archived",
      },
    ];
  }, []);

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Basic Menu Button</h6>
      <oj-c-menu-button
        id="corepack-menu-button-basic"
        label="Actions"
        display="all"
        items={menuItems}
        selection={selection}
        aria-label="File actions menu button"
        onojMenuAction={handleMenuAction}
        onselectionChanged={handleSelectionChanged}
      ></oj-c-menu-button>
      <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-2x-top" aria-live="polite">
        {actionMessage}
      </p>
      <p class="oj-typography-body-sm oj-text-color-secondary">{selectionSummary}</p>

      <h6 class="oj-sm-margin-4x-top">Icon Display</h6>
      <oj-c-menu-button
        id="corepack-menu-button-icons"
        label="Favorites"
        display="icons"
        chroming="borderless"
        items={favoriteItems}
        tooltip="Favorites menu"
        aria-label="Favorites menu button"
      ></oj-c-menu-button>

      <h6 class="oj-sm-margin-4x-top">Disabled Menu Button</h6>
      <oj-c-menu-button
        id="corepack-menu-button-disabled"
        label="Disabled"
        display="label"
        disabled
        items={menuItems}
        aria-label="Disabled menu button example"
      ></oj-c-menu-button>
    </div>
  );
};

export default CorePackMenuButton;
