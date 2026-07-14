import 'oj-c/menu-button';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';

type MenuItems = NonNullable<ComponentProps<'oj-c-menu-button'>['items']>;

export const MenuButtonsMenuButtonDisplaycorepack = () => {
  const menuItems = useMemo<MenuItems>(
    () => [
      {
        label: 'Zoom In',
        key: 'zoomin',
        startIcon: { class: 'oj-ux-ico-zoom-in' }
      },
      {
        label: 'Zoom Out',
        key: 'zoomout',
        startIcon: { class: 'oj-ux-ico-zoom-out' }
      },
      { type: 'separator' },
      {
        label: 'Save',
        key: 'save',
        startIcon: { class: 'oj-ux-ico-save' }
      },
      {
        label: 'Print...',
        key: 'print',
        disabled: true,
        startIcon: { class: 'oj-ux-ico-print' }
      }
    ],
    []
  );

  return (
    <div id="menubutton-container">
      <h6>Start Slot & display="all"</h6>
      <div>
        <oj-c-menu-button chroming="outlined" id="menuButton2" label="Action" items={menuItems}>
          <span slot="startIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
      </div>
      <h6 class="oj-sm-margin-8x-top">Start Slot & display="icons"</h6>
      <div>
        <oj-c-menu-button
          chroming="outlined"
          id="menuButton4"
          label="Action"
          items={menuItems}
          display="icons"
        >
          <span slot="startIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
      </div>
      <h6 class="oj-sm-margin-8x-top">End Slot & display="icons"</h6>
      <div>
        <oj-c-menu-button
          chroming="outlined"
          id="menuButton5"
          label="Action"
          items={menuItems}
          display="icons"
        >
          <span slot="endIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
      </div>
      <h6 class="oj-sm-margin-8x-top">display="icons" only</h6>
      <div>
        <oj-c-menu-button
          chroming="outlined"
          id="menuButton3"
          label="Action"
          items={menuItems}
          display="icons"
        />
      </div>
    </div>
  );
};

export default MenuButtonsMenuButtonDisplaycorepack;
