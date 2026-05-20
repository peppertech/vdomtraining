import { h } from 'preact';
import type { ComponentProps, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { ojMenu } from 'ojs/ojmenu';
import 'ojs/ojbutton';
import 'ojs/ojmenu';
import 'ojs/ojmenubutton';
import 'ojs/ojoption';

type MenuActionEvent = Parameters<NonNullable<ComponentProps<'oj-menu'>['onojMenuAction']>>[0];

export const MenuMenuOpen = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');
  const [selectedMenuItem1, setSelectedMenuItem1] = useState<string>('(None selected yet)');

  const handleLaunch = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    (document.getElementById('myMenu') as ojMenu | null)?.open(event);
  };

  const handleMenuItemAction = (event: MenuActionEvent) => {
    setSelectedMenuItem(event.detail.selectedValue);
  };

  const handleMenuItemAction1 = (event: MenuActionEvent) => {
    setSelectedMenuItem1(event.detail.selectedValue);
  };

  const handleMenuButtonAction1 = () => {
    setTimeout(() => {
      (document.getElementById('myMenu1') as ojMenu | null)?.close();
    }, 3000);
  };

  return (
    <div id="menu-container">
      <h6>Open API</h6>
      <div class="oj-sm-margin-5x-bottom">
        <a id="myLauncher" href="#" tabIndex={-1} onClick={handleLaunch}>
          Actions
        </a>
        <oj-menu
          id="myMenu"
          aria-labelledby="myLauncher"
          onojMenuAction={handleMenuItemAction}
          openOptions={{ launcher: '#myLauncher' }}
        >
          <oj-option id="zoomin" value="Zoom In">
            <span class="oj-ux-ico-zoom-in" slot="startIcon" />
            Zoom In
          </oj-option>
          <oj-option id="zoomout" value="Zoom Out">
            <span class="oj-ux-ico-zoom-out" slot="startIcon" />
            Zoom Out
          </oj-option>
          <oj-option id="divider" />
          <oj-option id="save" value="Save">
            <span class="oj-ux-ico-save" slot="startIcon" />
            Save
          </oj-option>
          <oj-option id="print" value="Print..." disabled>
            <span class="oj-ux-ico-print" slot="startIcon" />
            Print...
          </oj-option>
        </oj-menu>
      </div>
      <h6 class="oj-sm-margin-8x-top">Close API</h6>
      <div class="oj-typography-bold oj-sm-margin-5x-bottom">Menu will close after 3 seconds</div>
      <oj-menu-button
        id="menuButton1"
        onojAction={handleMenuButtonAction1}
        class="oj-sm-margin-5x-bottom"
        aria-label="menu that shows close action"
      >
        Actions
        <oj-menu id="myMenu1" slot="menu" onojMenuAction={handleMenuItemAction1} aria-label="menu with actions">
          <oj-option id="save1" value="Save">
            <span class="oj-ux-ico-save" slot="startIcon" />
            Save
          </oj-option>
          <oj-option id="print1" value="Print" disabled>
            <span class="oj-ux-ico-print" slot="startIcon" />
            Print
          </oj-option>
        </oj-menu>
      </oj-menu-button>
    </div>
  );
};

export default MenuMenuOpen;
