import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import 'ojs/ojbutton';
import 'ojs/ojmenu';
import 'ojs/ojbutton';
import 'ojs/ojoption';

type MenuActionEvent = Parameters<NonNullable<ComponentProps<'oj-menu'>['onojMenuAction']>>[0];

export const MenuOverview = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');
  const [selectedMenuItem1, setSelectedMenuItem1] = useState<string>('(None selected yet)');
  const [selectedMenuItem2, setSelectedMenuItem2] = useState<string>('(None selected yet)');

  const handleMenuItemAction = (event: MenuActionEvent) => {
    setSelectedMenuItem(event.detail.selectedValue);
  };

  const handleMenuItemAction1 = (event: MenuActionEvent) => {
    setSelectedMenuItem1(event.detail.selectedValue);
  };

  const handleMenuItemAction2 = (event: MenuActionEvent) => {
    setSelectedMenuItem2(event.detail.selectedValue);
  };

  return (
    <div id="menubutton-container">
      <h6>Single Menu</h6>
      <oj-menu-button id="menuButton2" class="oj-sm-margin-5x-bottom">
        Actions
        <oj-menu id="myMenu2" slot="menu" onojMenuAction={handleMenuItemAction2} aria-label="menu with actions items">
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
        <span id="results2">{selectedMenuItem2}</span>
      </div>
      <h6 class="oj-sm-margin-8x-top">Menu with Icons</h6>
      <oj-menu-button id="menuButton" class="oj-sm-margin-5x-bottom">
        Item Icons
        <oj-menu id="myMenu" slot="menu" onojMenuAction={handleMenuItemAction} aria-label="menu with icons">
          <oj-option id="iconFont1" value="Icon Font">
            <span class="oj-ux-ico-home" slot="startIcon" />
            Icon Font
            <span class="oj-ux-ico-home" slot="endIcon" />
          </oj-option>
          <oj-option id="iconFont3" value="Icon Font Disabled" disabled>
            <span class="oj-ux-ico-chat" slot="startIcon" />
            Icon Font Disabled
            <span class="oj-ux-ico-chat" slot="endIcon" />
          </oj-option>
        </oj-menu>
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span id="results">{selectedMenuItem}</span>
      </div>
      <h6 class="oj-sm-margin-8x-top">Submenu</h6>
      <oj-menu-button id="menuButton1" class="oj-sm-margin-5x-bottom">
        Message
        <oj-menu
          id="myMenu1"
          slot="menu"
          onojMenuAction={handleMenuItemAction1}
          aria-label="menu with actions items and submenu"
        >
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
            <span>Move to</span>
            <oj-menu id="zoom_menu" aria-label="menu with actions">
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
      <h6 class="oj-sm-margin-8x-top">Disabled</h6>
      <oj-menu-button id="menuButton4" class="oj-sm-margin-5x-bottom">
        File
        <oj-menu id="myMenu4" slot="menu" disabled aria-label="menu with disabled items">
          <oj-option id="iconFont5" value="Home Icon">
            New
          </oj-option>
          <oj-option id="iconFont6" value="Icon Font Disabled" disabled>
            Open
          </oj-option>
          <oj-option id="iconFont7" value="Chat On Icon">
            Save
          </oj-option>
          <oj-option id="iconFont8" value="Chat Off Icon">
            Save As
          </oj-option>
        </oj-menu>
      </oj-menu-button>
    </div>
  );
};

export default MenuOverview;
