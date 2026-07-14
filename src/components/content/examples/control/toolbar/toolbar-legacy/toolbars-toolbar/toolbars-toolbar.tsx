import 'oj-c/button';
import 'oj-c/menu-button';
import 'oj-c/progress-button';
import 'oj-c/split-menu-button';
import 'oj-c/toggle-button';
import 'ojs/ojbutton';
import 'ojs/ojmenu';
import { ojMenu } from 'ojs/ojmenu';
import 'ojs/ojtoolbar';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';

const fileMenuItems = [
  { id: 'new', label: 'New File', icon: 'oj-ux-ico-new-application', disabled: false },
  { id: 'open', label: 'Open File', icon: 'oj-ux-ico-folder-open', disabled: false },
  { id: 'divider', label: '----', icon: '', disabled: false },
  { id: 'save', label: 'Save', icon: 'oj-ux-ico-save', disabled: false },
  { id: 'print', label: 'Print...', icon: 'oj-ux-ico-print', disabled: true }
];
const cMenuButtonItems = [
  { label: 'Always Show Bookmarks Bar', key: 'bookmarks', disabled: false },
  { label: 'Always Show Toolbar in Full Screen', key: 'fullscreen', disabled: false },
  { label: 'Show Side Bar', key: 'sidebar', disabled: true },
  { type: 'divider' },
  { label: 'Zoom In', key: 'zoomin', disabled: false },
  { label: 'Zoom Out', key: 'zoomout', disabled: false }
] satisfies NonNullable<ComponentProps<'oj-c-menu-button'>['items']>;
const cSplitMenuButtonItems = [
  { label: 'Copy', key: 'copy' },
  { label: 'Cut', key: 'cut' },
  { label: 'Paste', key: 'paste', disabled: true },
  { type: 'divider' },
  { label: 'Undo', key: 'undo' }
] satisfies NonNullable<ComponentProps<'oj-c-split-menu-button'>['items']>;
const someButtons = [
  { id: 'Library', icon: 'oj-ux-ico-library' },
  { id: 'Home', icon: 'oj-ux-ico-home' },
  { id: 'Grid', icon: 'oj-ux-ico-grid-view-small' }
];

type FileMenuItem = (typeof fileMenuItems)[number];
type ToolbarButtonItem = (typeof someButtons)[number];
type MenuItemActionHandler = (event: ojMenu.ojMenuAction) => void;
type ProgressHandler = () => void;

const renderFileMenu = (id: string, menuItemAction: MenuItemActionHandler) => (
  <oj-menu id={id} slot="menu" onojMenuAction={menuItemAction} aria-label="menu with actions">
    {fileMenuItems.map((item: FileMenuItem) => (
      <oj-option key={`${id}-${item.id}`} id={item.id} disabled={item.disabled} value={item.label}>
        {item.icon ? <span slot="startIcon" class={item.icon} /> : null}
        {item.label}
      </oj-option>
    ))}
  </oj-menu>
);

const renderToolbarButtons = () => (
  <oj-buttonset-many id="iconset" display="icons" focusManagement="none">
    {someButtons.map((button: ToolbarButtonItem) => (
      <oj-option key={button.id} value={button.id}>
        <span slot="startIcon" class={button.icon} />
        <span>{button.id}</span>
      </oj-option>
    ))}
  </oj-buttonset-many>
);

const renderToolbar = (
  suffix: string,
  menuItemAction: MenuItemActionHandler,
  loading: boolean,
  progressHandler: ProgressHandler,
  outlined?: boolean
) => (
  <oj-toolbar
    id={`myToolbar${suffix}`}
    aria-label="Editing Toolbar"
    aria-controls="controlled"
    chroming={outlined ? 'outlined' : undefined}
  >
    <oj-button id={`chat${suffix}`} display="icons">
      <span slot="startIcon" class="oj-ux-ico-chat" />
      Chat
    </oj-button>
    <oj-c-button id={`paint${suffix}`} display="icons" label="Paint">
      <span slot="startIcon" class="oj-ux-ico-color-palette" />
    </oj-c-button>
    <oj-button id={`bookmark${suffix}`} display="icons" disabled={true}>
      <span slot="startIcon" class="oj-ux-ico-bookmark-selected" />
      Bookmark
    </oj-button>

    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />

    <oj-menu-button id={`menuButton${suffix}`}>
      File
      {renderFileMenu(`myMenu${suffix}`, menuItemAction)}
    </oj-menu-button>

    <oj-c-menu-button label="View" id={`cMenuButton${suffix}`} items={cMenuButtonItems} />

    <oj-c-split-menu-button
      chroming={outlined ? undefined : 'outlined'}
      id={`cSplitMenuButton${suffix}`}
      label="Edit"
      items={cSplitMenuButtonItems}
    />

    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />

    {renderToolbarButtons()}

    <oj-c-toggle-button id={`toggle${suffix || '0'}`} display="icons" label="Icon Toggle">
      <span slot="startIcon" class="oj-ux-ico-information" />
    </oj-c-toggle-button>

    <oj-c-progress-button
      id={`progress${suffix || '0'}`}
      isLoading={loading}
      onojAction={progressHandler}
      label="Approve"
    />
  </oj-toolbar>
);

export const ToolbarsToolbar = () => {
  const [loading, setLoading] = useState(false);
  const [, setSelectedMenuItem] = useState<string | null>(null);

  const progressHandler = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  const menuItemAction = useMemo(
    () => (event: ojMenu.ojMenuAction) => {
      setSelectedMenuItem(event.detail.selectedValue);
    },
    []
  );

  return (
    <div id="toolbar-container">
      <h6>Toolbar with Borderless Chroming</h6>
      {renderToolbar('', menuItemAction, loading, progressHandler)}
      <div class="oj-typography-body-sm oj-sm-margin-2x-top">
        Note: split menu button doesn&apos;t support borderless chroming.
      </div>
      <br />
      <h6>Toolbar with Outlined Chroming</h6>
      {renderToolbar('1', menuItemAction, loading, progressHandler, true)}
      <br />
      <br />
      <a id="controlled" href="#">
        Element referenced by toolbar&apos;s aria-controls
      </a>
    </div>
  );
};

export default ToolbarsToolbar;
