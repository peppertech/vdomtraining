import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import 'ojs/ojbutton';
import 'ojs/ojmenu';
import 'ojs/ojmenubutton';
import 'ojs/ojoption';

type MenuActionEvent = Parameters<NonNullable<ComponentProps<'oj-menu'>['onojMenuAction']>>[0];

export const MenuButtonsMenuButton = () => {
  const [selectedMenuItem1, setSelectedMenuItem1] = useState<string>('(None selected yet)');
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');

  const handleMenuItemAction1 = (event: MenuActionEvent) => {
    setSelectedMenuItem1(event.detail.selectedValue);
  };

  const handleMenuItemAction = (event: MenuActionEvent) => {
    setSelectedMenuItem(event.detail.selectedValue);
  };

  return (
    <div id="menubutton-container">
      <h6>MenuButton</h6>
      <oj-menu-button id="menuButton" class="oj-sm-margin-5x-bottom">
        Actions
        <oj-menu id="myMenu" slot="menu" onojMenuAction={handleMenuItemAction} aria-label="menu with actions">
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
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span id="results">{selectedMenuItem}</span>
      </div>
      <h6 class="oj-sm-margin-8x-top">MenuButton with Submenu</h6>
      <oj-menu-button id="menuButton1" class="oj-sm-margin-5x-bottom">
        Actions
        <oj-menu id="myMenu1" slot="menu" onojMenuAction={handleMenuItemAction1} aria-label="menu with actions">
          <oj-option id="cut" value="Reply">
            <span class="oj-ux-ico-email-reply" slot="startIcon" />
            Reply
          </oj-option>
          <oj-option id="copy" value="ReplyAll" disabled>
            <span class="oj-ux-ico-email-reply-all" slot="startIcon" />
            Reply All
          </oj-option>
          <oj-option id="paste" value="Forward" disabled>
            <span class="oj-ux-ico-email-forward" slot="startIcon" />
            Forward
          </oj-option>
          <oj-option>---------------------------------</oj-option>
          <oj-option id="zoom">
            Move to
            <oj-menu id="zoom_menu" aria-label="menu with options">
              <oj-option id="inbox" value="Inbox">
                <span class="oj-ux-ico-inbox" slot="startIcon" />
                Inbox
              </oj-option>
              <oj-option id="archive" value="Archive">
                <span class="oj-ux-ico-archive" slot="startIcon" />
                Archive
              </oj-option>
            </oj-menu>
          </oj-option>
        </oj-menu>
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span id="results1">{selectedMenuItem1}</span>
      </div>
    </div>
  );
};

export default MenuButtonsMenuButton;
