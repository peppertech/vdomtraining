import "oj-c/menu-button";
import "oj-c/split-menu-button";
import 'preact';
import { ComponentProps,JSX } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

type MenuButtonProps = ComponentProps<"oj-c-menu-button">;
type MenuButtonItem = NonNullable<MenuButtonProps["items"]>[number];
type MenuButtonActionEvent = Parameters<NonNullable<MenuButtonProps["onojMenuAction"]>>[0];
type MenuButtonSelectionEvent = Parameters<NonNullable<MenuButtonProps["onselectionChanged"]>>[0];

type SplitMenuButtonProps = ComponentProps<"oj-c-split-menu-button">;
type SplitMenuButtonItem = NonNullable<SplitMenuButtonProps["items"]>[number];
type SplitMenuButtonActionEvent = Parameters<NonNullable<SplitMenuButtonProps["onojAction"]>>[0];
type SplitMenuButtonMenuEvent = Parameters<NonNullable<SplitMenuButtonProps["onojMenuAction"]>>[0];

type MenuSelectRecord = NonNullable<MenuButtonProps["selection"]>;

const ICON_SIZE_CLASS = "";//oj-ux-icon-size-12x
const MENU_BUTTON_ICON = `${ICON_SIZE_CLASS} oj-ux-ico-menu-button`;
const MENU_OVERFLOW_ICON = `${ICON_SIZE_CLASS} oj-ux-ico-menu-modal`;
const DENSITY_ICON_MAP: Record<string, string> = {
  comfortable: `${ICON_SIZE_CLASS} oj-ux-ico-menu-button`,
  compact: `${ICON_SIZE_CLASS} oj-ux-ico-menu-modal`,
  spacious: `${ICON_SIZE_CLASS} oj-ux-ico-menu-select-many`,
};

const STATUS_ICON_MAP: Record<string, string> = {
  active: `${ICON_SIZE_CLASS} oj-ux-ico-menu-button`,
  paused: `${ICON_SIZE_CLASS} oj-ux-ico-menu-select-many`,
  draft: `${ICON_SIZE_CLASS} oj-ux-ico-menu-modal`,
};

const SUFFIX_MAP: Record<string, string> = {
  draft: "Draft",
  review: "Review",
  published: "Published",
};

const createMenuIcon = (iconClass: string) => ({
  type: "class" as const,
  class: iconClass,
});

const createSplitMenuIcon = (iconClass: string) => ({
  type: "class" as const,
  class: `oj-button-icon oj-start ${iconClass}`,
});

const basicItems: MenuButtonItem[] = [
  { key: "cut", label: "Cut" },
  { key: "copy", label: "Copy" },
  { key: "paste", label: "Paste", disabled: true },
];

const iconMenuItems: MenuButtonItem[] = [
  { key: "settings", label: "Settings" },
  { key: "customize", label: "Customize" },
  { key: "help", label: "Help" },
];

const persistentMenuItems: MenuButtonItem[] = [
  { key: "active", label: "Active", startIcon: createMenuIcon(STATUS_ICON_MAP.active) },
  { key: "paused", label: "Paused", startIcon: createMenuIcon(STATUS_ICON_MAP.paused) },
  { key: "draft", label: "Draft", startIcon: createMenuIcon(STATUS_ICON_MAP.draft) },
];

const suffixItems: MenuButtonItem[] = [
  { key: "draft", label: "Draft" },
  { key: "review", label: "In Review" },
  { key: "published", label: "Published" },
];

const selectSingleOptions = [
  { label: "Bold", value: "bold" },
  { label: "Italic", value: "italic" },
  { label: "Underline", value: "underline" },
];

const selectMultipleOptions = [
  { label: "Align Left", value: "left" },
  { label: "Align Center", value: "center" },
  { label: "Align Right", value: "right" },
];

const densityOptions = [
  { label: "Comfortable", value: "comfortable" },
  { label: "Compact", value: "compact" },
  { label: "Spacious", value: "spacious" },
];

const filterOptions = [
  { label: "Favorites", value: "favorites" },
  { label: "Archived", value: "archived" },
  { label: "Shared", value: "shared" },
];

const splitMenuItems: SplitMenuButtonItem[] = [
  { key: "copy", label: "Copy", startIcon: createSplitMenuIcon(MENU_BUTTON_ICON) },
  { key: "duplicate", label: "Duplicate", startIcon: createSplitMenuIcon(MENU_OVERFLOW_ICON) },
  { type: "separator" },
  { key: "rename", label: "Rename", startIcon: createSplitMenuIcon(MENU_BUTTON_ICON) },
  { key: "archive", label: "Archive", startIcon: createSplitMenuIcon(MENU_OVERFLOW_ICON) },
];

const chromingSplitItems: SplitMenuButtonItem[] = [
  { key: "outlined", label: "Outlined", startIcon: createSplitMenuIcon(MENU_BUTTON_ICON) },
  { key: "cta", label: "Call To Action", startIcon: createSplitMenuIcon(MENU_OVERFLOW_ICON) },
  { key: "solid", label: "Solid", startIcon: createSplitMenuIcon(`${ICON_SIZE_CLASS} oj-ux-ico-menu-select-many`) },
];

const persistentSplitItems: SplitMenuButtonItem[] = [
  { key: "email", label: "Send Email", startIcon: createSplitMenuIcon(MENU_BUTTON_ICON) },
  { key: "share", label: "Share Link", startIcon: createSplitMenuIcon(MENU_OVERFLOW_ICON) },
  { key: "download", label: "Download", startIcon: createSplitMenuIcon(`${ICON_SIZE_CLASS} oj-ux-ico-menu-select-many`) },
];

const selectSingleItems: MenuButtonItem[] = [
  {
    type: "selectsingle",
    key: "format",
    items: selectSingleOptions,
  },
];

const selectMultipleItems: MenuButtonItem[] = [
  {
    type: "selectmultiple",
    key: "alignment",
    items: selectMultipleOptions,
  },
];

const persistentSelectItems: MenuButtonItem[] = [
  {
    type: "selectsingle",
    key: "density",
    items: densityOptions,
  },
  {
    type: "selectmultiple",
    key: "filters",
    items: filterOptions,
  },
];

const splitMenuSelectionLabel = (key: string | undefined) => {
  switch (key) {
    case "email":
      return "Send Email";
    case "share":
      return "Share Link";
    case "download":
      return "Download";
    default:
      return "Actions";
  }
};

const getStatusLabel = (key: string | undefined) => {
  switch (key) {
    case "active":
      return "Active";
    case "paused":
      return "Paused";
    case "draft":
      return "Draft";
    default:
      return "Action";
  }
};

const CorePackMenuButton = () => {
  const gapStyle: JSX.CSSProperties = { gap: "5px" };
  const [singleSelection, setSingleSelection] = useState<MenuSelectRecord>();
  const [multipleSelection, setMultipleSelection] = useState<MenuSelectRecord>();
  const [persistentSelection, setPersistentSelection] = useState<MenuSelectRecord>();

  const [persistentLabel, setPersistentLabel] = useState(() => getStatusLabel(undefined));
  const [persistentIcon, setPersistentIcon] = useState(MENU_BUTTON_ICON);
  const [suffixValue, setSuffixValue] = useState(SUFFIX_MAP.draft);
  const [singleSelectLabel, setSingleSelectLabel] = useState("Single");
  const [selectIconClass, setSelectIconClass] = useState(MENU_BUTTON_ICON);
  const [persistentSplitLabel, setPersistentSplitLabel] = useState(splitMenuSelectionLabel(undefined));

  const formatSelectionSummary = useCallback((selection?: MenuSelectRecord) => {
    if (!selection) {
      return "None";
    }
    return Object.entries(selection)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}: [${value.join(", ")}]`;
        }
        return `${key}: ${value}`;
      })
      .join(" • ");
  }, []);

  const singleSelectionSummary = useMemo(
    () => formatSelectionSummary(singleSelection),
    [formatSelectionSummary, singleSelection],
  );

  const multipleSelectionSummary = useMemo(
    () => formatSelectionSummary(multipleSelection),
    [formatSelectionSummary, multipleSelection],
  );

  const persistentSelectionSummary = useMemo(
    () => formatSelectionSummary(persistentSelection),
    [formatSelectionSummary, persistentSelection],
  );

  const handleSingleSelectionChanged = useCallback((event: MenuButtonSelectionEvent) => {
    setSingleSelection(event.detail.value ?? undefined);
  }, []);

  const handleMultipleSelectionChanged = useCallback((event: MenuButtonSelectionEvent) => {
    setMultipleSelection(event.detail.value ?? undefined);
  }, []);

  const handlePersistentSelectionChanged = useCallback((event: MenuButtonSelectionEvent) => {
    const value = event.detail.value ?? undefined;
    setPersistentSelection(value);

    if (value && typeof value === "object") {
      const density = value.density as string | undefined;
      const filters = value.filters as string[] | undefined;

      setSingleSelectLabel(() => {
        if (density) {
          const densityLabel = densityOptions.find((option) => option.value === density)?.label;
          return densityLabel ?? "Selection";
        }
        return "Selection";
      });

      setSelectIconClass(() => {
        if (density && DENSITY_ICON_MAP[density]) {
          return DENSITY_ICON_MAP[density];
        }
        return MENU_BUTTON_ICON;
      });

      if (filters && filters.length > 0) {
        setSuffixValue(filters.join(", "));
      }
    }
  }, []);

  const handlePersistentAction = useCallback((event: MenuButtonActionEvent) => {
    const key = event.detail.key as string | undefined;
    setPersistentLabel(getStatusLabel(key));

    if (key && STATUS_ICON_MAP[key]) {
      setPersistentIcon(STATUS_ICON_MAP[key]);
    } else {
      setPersistentIcon(MENU_BUTTON_ICON);
    }
  }, []);

  const handleSuffixAction = useCallback((event: MenuButtonActionEvent) => {
    const key = event.detail.key as string | undefined;
    if (key && SUFFIX_MAP[key]) {
      setSuffixValue(SUFFIX_MAP[key]);
    }
  }, []);

  const handlePersistentSplitPrimary = useCallback((event: SplitMenuButtonActionEvent) => {
    setPersistentSplitLabel(`Primary Action (${Math.ceil(event.timeStamp)})`);
  }, []);

  const handlePersistentSplitMenu = useCallback((event: SplitMenuButtonMenuEvent) => {
    const key = event.detail.key as string | undefined;
    setPersistentSplitLabel(splitMenuSelectionLabel(key));
  }, []);

  return (
    <div id="menuButtons-container" class="oj-sm-margin-2x-bottom">
      <h6>Text MenuButton and SplitMenuButton</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={gapStyle}>
        <oj-c-menu-button id="menuButton1" label="Action" items={basicItems}></oj-c-menu-button>
        <oj-c-split-menu-button
          id="splitMenuButton1"
          label="Copy"
          items={splitMenuItems}
        ></oj-c-split-menu-button>
      </div>

      <h6 class="oj-sm-margin-8x-top">MenuButton with Icon</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={gapStyle}>
        <oj-c-menu-button id="menuButton2" label="Action" items={iconMenuItems}>
          <span slot="startIcon" class={MENU_BUTTON_ICON}></span>
        </oj-c-menu-button>
        <oj-c-menu-button id="menuButton3" label="Action" items={iconMenuItems} display="icons">
          <span slot="startIcon" class={MENU_BUTTON_ICON}></span>
        </oj-c-menu-button>
        <oj-c-menu-button id="menuButton5" label="Action" items={iconMenuItems} display="icons">
          <span slot="endIcon" class={MENU_OVERFLOW_ICON}></span>
        </oj-c-menu-button>
      </div>

      <h6 class="oj-sm-margin-8x-top">Disabled MenuButton and SplitMenuButton</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={gapStyle}>
        <oj-c-menu-button id="menuButton6" label="Disabled" items={iconMenuItems} disabled>
          <span slot="startIcon" class={MENU_BUTTON_ICON}></span>
        </oj-c-menu-button>
        <oj-c-split-menu-button
          id="dis_splitMenuButton"
          label="Disabled"
          items={splitMenuItems}
          disabled
        ></oj-c-split-menu-button>
      </div>

      <h6 class="oj-sm-margin-8x-top">Chroming</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x oj-sm-margin-2x-bottom" style={gapStyle}>
        <oj-c-menu-button
          id="menuButton7"
          label="Outlined"
          items={iconMenuItems}
          chroming="outlined"
        >
          <span slot="startIcon" class={MENU_BUTTON_ICON}></span>
        </oj-c-menu-button>
        <oj-c-menu-button
          id="menuButton8"
          label="Borderless"
          items={iconMenuItems}
          chroming="borderless"
        >
          <span slot="startIcon" class={MENU_BUTTON_ICON}></span>
        </oj-c-menu-button>
        <oj-c-menu-button
          id="menuButton9"
          label="Solid"
          items={iconMenuItems}
          chroming="solid"
        >
          <span slot="startIcon" class={MENU_BUTTON_ICON}></span>
        </oj-c-menu-button>
      </div>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={gapStyle}>
        <oj-c-split-menu-button
          id="chroming_splitMenuButton1"
          label="Outlined"
          chroming="outlined"
          items={chromingSplitItems}
        ></oj-c-split-menu-button>
        <oj-c-split-menu-button
          id="chroming_splitMenuButton3"
          label="Call To Action"
          chroming="callToAction"
          items={chromingSplitItems}
        ></oj-c-split-menu-button>
        <oj-c-split-menu-button
          id="chroming_splitMenuButton2"
          label="Solid"
          chroming="solid"
          items={chromingSplitItems}
        ></oj-c-split-menu-button>
      </div>

      <h6 class="oj-sm-margin-8x-top">Sizes</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={gapStyle}>
        <oj-c-menu-button id="menuButton10" label="Small" size="sm" items={iconMenuItems}>
          <span slot="startIcon" class={MENU_BUTTON_ICON}></span>
        </oj-c-menu-button>
        <oj-c-menu-button id="menuButton11" label="Default" items={iconMenuItems}>
          <span slot="startIcon" class={MENU_BUTTON_ICON}></span>
        </oj-c-menu-button>
        <oj-c-menu-button id="menuButton12" label="Large" size="lg" items={iconMenuItems}>
          <span slot="startIcon" class={MENU_BUTTON_ICON}></span>
        </oj-c-menu-button>
      </div>

      <h6 class="oj-sm-margin-8x-top">Tooltip</h6>
      <div>
        <oj-c-menu-button id="tooltipMenuButton" label="Tooltip" items={iconMenuItems} tooltip="Tooltip">
          <span slot="startIcon" class={MENU_BUTTON_ICON}></span>
        </oj-c-menu-button>
      </div>

      <h6 class="oj-sm-margin-8x-top">Select</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={gapStyle}>
        <div>
          <oj-c-menu-button
            id="selectSingleButton"
            label="Single"
            items={selectSingleItems}
            selection={singleSelection}
            onselectionChanged={handleSingleSelectionChanged}
          >
            <span slot="startIcon" class={MENU_BUTTON_ICON}></span>
          </oj-c-menu-button>
          <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-2x-top">
            Last Selection: {singleSelectionSummary}
          </p>
        </div>
        <div>
          <oj-c-menu-button
            id="selectMultipleButton"
            label="Multiple"
            items={selectMultipleItems}
            selection={multipleSelection}
            onselectionChanged={handleMultipleSelectionChanged}
          >
            <span slot="startIcon" class={MENU_BUTTON_ICON}></span>
          </oj-c-menu-button>
          <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-2x-top">
            Last Selection: {multipleSelectionSummary}
          </p>
        </div>
      </div>

      <h6 class="oj-sm-margin-8x-top">Persistent MenuButton and SplitMenuButton</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={gapStyle}>
        <oj-c-menu-button
          id="persistentButton"
          label={persistentLabel}
          items={persistentMenuItems}
          onojMenuAction={handlePersistentAction}
        >
          <span slot="startIcon" class={persistentIcon}></span>
        </oj-c-menu-button>

        <oj-c-menu-button
          id="suffixButton"
          label="Suffix"
          suffix={suffixValue}
          items={suffixItems}
          onojMenuAction={handleSuffixAction}
        ></oj-c-menu-button>

        <div>
          <oj-c-menu-button
            id="persistenSelectSingleButton"
            label={singleSelectLabel}
            display="icons"
            items={persistentSelectItems}
            selection={persistentSelection}
            onselectionChanged={handlePersistentSelectionChanged}
          >
            <span slot="startIcon" class={selectIconClass}></span>
          </oj-c-menu-button>
          <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-2x-top">
            Selection: {persistentSelectionSummary}
          </p>
        </div>

        <oj-c-split-menu-button
          id="persistent_splitMenuButton"
          label={persistentSplitLabel}
          items={persistentSplitItems}
          onojAction={handlePersistentSplitPrimary}
          onojMenuAction={handlePersistentSplitMenu}
        ></oj-c-split-menu-button>
      </div>
    </div>
  );
};

export default CorePackMenuButton;
