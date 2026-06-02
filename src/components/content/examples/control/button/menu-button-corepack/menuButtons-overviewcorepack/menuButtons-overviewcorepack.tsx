import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import 'oj-c/menu-button';
import 'css!./demo.css';

type MenuItems = NonNullable<ComponentProps<'oj-c-menu-button'>['items']>;

type ItemInfo = {
  id: string;
  label?: string;
  icon: string;
  disabled?: boolean;
};

const toMenuItems = (items: ItemInfo[], includeIcons: boolean): MenuItems => {
  return items.map((item) => {
    const menuItem: MenuItems[number] = {
      label: item.label ?? '',
      key: item.id,
      disabled: item.disabled
    };

    if (includeIcons && item.icon) {
      menuItem.startIcon = { class: item.icon };
    }

    return menuItem;
  });
};

export const MenuButtonsOverviewcorepack = () => {
  const { textMenuItems, iconMenuItems } = useMemo(() => {
    const items: ItemInfo[] = [
      { id: 'save', label: 'Save', icon: 'oj-ux-ico-print', disabled: false },
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
      },
      {
        id: 'print',
        label: 'Print...',
        icon: 'oj-ux-ico-print',
        disabled: true
      }
    ];

    return {
      textMenuItems: toMenuItems(items, false),
      iconMenuItems: toMenuItems(items, true)
    };
  }, []);

  return (
    <div id="menuButtons-container" class="oj-sm-margin-2x-bottom">
      <h6>Text MenuButton</h6>
      <div>
        <oj-c-menu-button id="menuButton1" label="Action" items={textMenuItems} />
      </div>
      <h6 class="oj-sm-margin-8x-top">MenuButton with Icon</h6>
      <div>
        <oj-c-menu-button id="menuButton2" label="Action" items={iconMenuItems}>
          <span slot="startIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
        <oj-c-menu-button id="menuButton3" label="Action" items={iconMenuItems} display="icons">
          <span slot="startIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
        <oj-c-menu-button id="menuButton4" label="Action" items={iconMenuItems} display="icons">
          <span slot="endIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
        <oj-c-menu-button id="menuButton5" label="Action" items={iconMenuItems} display="icons" />
      </div>
      <h6 class="oj-sm-margin-8x-top">Disabled MenuButton</h6>
      <div>
        <oj-c-menu-button id="menuButton6" label="Disabled" items={iconMenuItems} disabled>
          <span slot="startIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
      </div>
      <h6 class="oj-sm-margin-8x-top">Chroming</h6>
      <div>
        <oj-c-menu-button chroming="outlined" id="menuButton7" label="Outlined" items={iconMenuItems}>
          <span slot="startIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
        <oj-c-menu-button
          chroming="borderless"
          id="menuButton8"
          label="Borderless"
          items={iconMenuItems}
        >
          <span slot="startIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
        <oj-c-menu-button chroming="solid" id="menuButton9" label="Solid" items={iconMenuItems}>
          <span slot="startIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
      </div>
      <h6 class="oj-sm-margin-8x-top">Sizes</h6>
      <div>
        <oj-c-menu-button id="menuButton10" label="Small" items={iconMenuItems} size="sm">
          <span slot="startIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
        <oj-c-menu-button id="menuButton11" label="Default" items={iconMenuItems}>
          <span slot="startIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
        <oj-c-menu-button id="menuButton12" label="Large" items={iconMenuItems} size="lg">
          <span slot="startIcon" class="oj-ux-ico-settings" />
        </oj-c-menu-button>
      </div>
    </div>
  );
};

export default MenuButtonsOverviewcorepack;
