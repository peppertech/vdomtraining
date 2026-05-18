import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import 'ojs/ojbutton';
import 'ojs/ojmenu';
import 'ojs/ojmenubutton';
import 'ojs/ojoption';
import 'ojs/ojtoolbar';

type MenuActionEvent = Parameters<NonNullable<ComponentProps<'oj-menu'>['onojMenuAction']>>[0];

type MenuInfo = {
  id: string;
  label: string;
  icon: string;
  disabled: boolean;
};

export const MenuButtonsMenuButtonset = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');

  const fileMenuItems = useMemo<MenuInfo[]>(
    () => [
      {
        id: 'new',
        label: 'New File',
        icon: 'oj-ux-ico-new-application',
        disabled: false
      },
      {
        id: 'open',
        label: 'Open File',
        icon: 'oj-ux-ico-folder-open',
        disabled: false
      },
      { id: 'divider', label: '----', icon: '', disabled: false },
      { id: 'save', label: 'Save', icon: 'oj-ux-ico-save', disabled: false },
      {
        id: 'print',
        label: 'Print...',
        icon: 'oj-ux-ico-print',
        disabled: true
      }
    ],
    []
  );
  const editMenuItems = useMemo<MenuInfo[]>(
    () => [
      {
        id: 'cut',
        label: 'Cut',
        icon: 'oj-ux-ico-cut',
        disabled: false
      },
      {
        id: 'copy',
        label: 'Copy',
        icon: 'oj-ux-ico-copy',
        disabled: false
      },
      {
        id: 'paste',
        label: 'Paste',
        icon: 'oj-ux-ico-copy-field-to',
        disabled: false
      },
      {
        id: 'find',
        label: 'Find',
        icon: 'oj-ux-ico-input-search',
        disabled: false
      }
    ],
    []
  );
  const viewMenuItems = useMemo<MenuInfo[]>(
    () => [
      {
        id: 'bookmark',
        label: 'Always Show Bookmarks Bar',
        icon: 'oj-ux-ico-bookmark',
        disabled: false
      },
      {
        id: 'toolbar',
        label: 'Always Show Toolbar in Full Screen',
        icon: 'oj-ux-ico-toolbar',
        disabled: false
      },
      {
        id: 'sidebar',
        label: 'Show Side Bar',
        icon: 'oj-ux-ico-side-bar',
        disabled: false
      },
      { id: 'divider', label: '----', icon: '', disabled: false },
      {
        id: 'zoomin',
        label: 'Zoom In',
        icon: 'oj-ux-ico-zoom-in',
        disabled: false
      },
      {
        id: 'zoomout',
        label: 'Zoom Out',
        icon: 'oj-ux-ico-zoom-out',
        disabled: false
      }
    ],
    []
  );

  const handleMenuItemAction = (event: MenuActionEvent) => {
    setSelectedMenuItem(event.detail.selectedValue);
  };

  const renderMenuOption = (item: MenuInfo) => {
    if (item.id === 'divider') {
      return <oj-option id={item.id} />;
    }

    return (
      <oj-option id={item.id} disabled={item.disabled} value={item.label}>
        {item.icon ? <span slot="startIcon" class={item.icon} /> : null}
        {item.label}
      </oj-option>
    );
  };

  return (
    <div id="menuset-container">
      <oj-toolbar id="menuSet" chroming="borderless" class="oj-sm-margin-5x-bottom">
        <oj-menu-button id="menuButton1">
          File
          <oj-menu id="myMenu1" slot="menu" onojMenuAction={handleMenuItemAction} aria-label="menu with selection">
            {fileMenuItems.map(renderMenuOption)}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton2">
          Edit
          <oj-menu id="myMenu2" slot="menu" onojMenuAction={handleMenuItemAction} aria-label="menu with selection">
            {editMenuItems.map(renderMenuOption)}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton3">
          View
          <oj-menu id="myMenu3" slot="menu" onojMenuAction={handleMenuItemAction} aria-label="menu with selection">
            {viewMenuItems.map(renderMenuOption)}
          </oj-menu>
        </oj-menu-button>
      </oj-toolbar>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span id="results">{selectedMenuItem}</span>
      </div>
    </div>
  );
};

export default MenuButtonsMenuButtonset;
