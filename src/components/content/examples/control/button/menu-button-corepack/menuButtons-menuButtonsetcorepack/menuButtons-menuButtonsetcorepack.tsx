import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import 'oj-c/menu-button';
import 'ojs/ojtoolbar';

type MenuItems = NonNullable<ComponentProps<'oj-c-menu-button'>['items']>;
type MenuActionEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-menu-button'>['onojMenuAction']>
>[0];

export const MenuButtonsMenuButtonsetcorepack = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');

  const fileMenuItems = useMemo<MenuItems>(
    () => [
      {
        label: 'New File',
        key: 'New File',
        startIcon: { class: 'oj-ux-ico-new-application' }
      },
      {
        label: 'Open File',
        key: 'Open File',
        startIcon: { class: 'oj-ux-ico-folder-open' }
      },
      { type: 'separator' },
      {
        label: 'Save',
        key: 'Save',
        startIcon: { class: 'oj-ux-ico-save' }
      },
      {
        label: 'Print...',
        key: 'Print...',
        disabled: true,
        startIcon: { class: 'oj-ux-ico-print' }
      }
    ],
    []
  );
  const editMenuItems = useMemo<MenuItems>(
    () => [
      {
        label: 'Cut',
        key: 'Cut',
        startIcon: { class: 'oj-ux-ico-cut' }
      },
      {
        label: 'Copy',
        key: 'Copy',
        startIcon: { class: 'oj-ux-ico-copy' }
      },
      {
        label: 'Paste',
        key: 'Paste',
        startIcon: { class: 'oj-ux-ico-copy-field-to' }
      },
      {
        label: 'Find',
        key: 'Find',
        startIcon: { class: 'oj-ux-ico-input-search' }
      }
    ],
    []
  );
  const viewMenuItems = useMemo<MenuItems>(
    () => [
      {
        label: 'Always Show Bookmarks Bar',
        key: 'Always Show Bookmarks Bar',
        startIcon: { class: 'oj-ux-ico-bookmark' }
      },
      {
        label: 'Always Show Toolbar in Full Screen',
        key: 'Always Show Toolbar in Full Screen',
        startIcon: { class: 'oj-ux-ico-toolbar' }
      },
      {
        label: 'Show Side Bar',
        key: 'Show Side Bar',
        startIcon: { class: 'oj-ux-ico-side-bar' }
      },
      { type: 'separator' },
      {
        label: 'Zoom In',
        key: 'Zoom In',
        startIcon: { class: 'oj-ux-ico-zoom-in' }
      },
      {
        label: 'Zoom Out',
        key: 'Zoom Out',
        startIcon: { class: 'oj-ux-ico-zoom-out' }
      }
    ],
    []
  );

  const handleMenuItemAction = (event: MenuActionEvent) => {
    setSelectedMenuItem(String(event.detail.key));
  };

  return (
    <div id="menuset-container">
      <oj-toolbar id="menuSet" chroming="borderless" class="oj-sm-margin-5x-bottom">
        <oj-c-menu-button
          id="menuButton1"
          label="File"
          items={fileMenuItems}
          onojMenuAction={handleMenuItemAction}
        />
        <oj-c-menu-button
          id="menuButton2"
          label="Edit"
          items={editMenuItems}
          onojMenuAction={handleMenuItemAction}
        />
        <oj-c-menu-button
          id="menuButton3"
          label="View"
          items={viewMenuItems}
          onojMenuAction={handleMenuItemAction}
        />
      </oj-toolbar>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span id="results">{selectedMenuItem}</span>
      </div>
    </div>
  );
};

export default MenuButtonsMenuButtonsetcorepack;
