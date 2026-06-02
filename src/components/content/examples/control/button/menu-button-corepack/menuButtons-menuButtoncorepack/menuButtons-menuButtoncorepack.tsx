import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import 'oj-c/menu-button';

type MenuItems = NonNullable<ComponentProps<'oj-c-menu-button'>['items']>;
type MenuActionEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-menu-button'>['onojMenuAction']>
>[0];

export const MenuButtonsMenuButtoncorepack = () => {
  const [selectedMenuItem1, setSelectedMenuItem1] = useState<string>('(None selected yet)');
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');

  const menuItems = useMemo<MenuItems>(
    () => [
      {
        label: 'Zoom In',
        key: 'Zoom In',
        startIcon: { class: 'oj-ux-ico-zoom-in' }
      },
      {
        label: 'Zoom Out',
        key: 'Zoom Out',
        startIcon: { class: 'oj-ux-ico-zoom-out' }
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

  const submenuItems = useMemo<MenuItems>(
    () => [
      {
        label: 'Reply',
        key: 'Reply',
        startIcon: { class: 'oj-ux-ico-email-reply' }
      },
      {
        label: 'Reply All',
        key: 'Reply All',
        disabled: true,
        startIcon: { class: 'oj-ux-ico-email-reply-all' }
      },
      {
        label: 'Forward',
        key: 'Forward',
        disabled: true,
        startIcon: { class: 'oj-ux-ico-email-forward' }
      },
      { type: 'separator' },
      {
        type: 'submenu',
        label: 'Move to',
        items: [
          {
            label: 'Inbox',
            key: 'Inbox',
            startIcon: { class: 'oj-ux-ico-inbox' }
          },
          {
            label: 'Archive',
            key: 'Archive',
            startIcon: { class: 'oj-ux-ico-archive' }
          }
        ]
      }
    ],
    []
  );

  const handleMenuItemAction1 = (event: MenuActionEvent) => {
    setSelectedMenuItem1(String(event.detail.key));
  };

  const handleMenuItemAction = (event: MenuActionEvent) => {
    setSelectedMenuItem(String(event.detail.key));
  };

  return (
    <div id="menubutton-container">
      <h6>MenuButton</h6>
      <oj-c-menu-button
        id="menuButton"
        label="Actions"
        items={menuItems}
        onojMenuAction={handleMenuItemAction}
        class="oj-sm-margin-5x-bottom"
      />
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span id="results">{selectedMenuItem}</span>
      </div>
      <h6 class="oj-sm-margin-8x-top">MenuButton with Submenu</h6>
      <oj-c-menu-button
        id="menuButton1"
        label="Actions"
        items={submenuItems}
        onojMenuAction={handleMenuItemAction1}
        class="oj-sm-margin-5x-bottom"
      />
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span id="results1">{selectedMenuItem1}</span>
      </div>
    </div>
  );
};

export default MenuButtonsMenuButtoncorepack;
