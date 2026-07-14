import 'ojs/ojbutton';
import 'ojs/ojdefer';
import 'ojs/ojmenu';
import 'ojs/ojoption';
import * as preact from 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';

type MenuActionEvent = Parameters<NonNullable<ComponentProps<'oj-menu'>['onojMenuAction']>>[0];

export const MenuDeferredRendering = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');

  const handleMenuItemAction = (event: MenuActionEvent) => {
    setSelectedMenuItem(event.detail.selectedValue);
  };

  return (
    <div id="menubutton-container">
      <oj-menu-button id="deferredMenuButton" class="oj-sm-margin-5x-bottom">
        Actions
        <oj-menu
          id="deferredMenu"
          slot="menu"
          onojMenuAction={handleMenuItemAction}
          aria-label="menu with deferred content"
        >
          {preact.h('oj-defer', null, [
            <oj-option id="deferredZoomIn" value="Zoom In">
              <span class="oj-ux-ico-zoom-in" slot="startIcon" />
              Zoom In
            </oj-option>,
            <oj-option id="deferredZoomOut" value="Zoom Out">
              <span class="oj-ux-ico-zoom-out" slot="startIcon" />
              Zoom Out
            </oj-option>,
            <oj-option id="deferredDivider" />,
            <oj-option id="deferredSave" value="Save">
              <span class="oj-ux-ico-save" slot="startIcon" />
              Save
            </oj-option>,
            <oj-option id="deferredPrint" value="Print..." disabled>
              <span class="oj-ux-ico-print" slot="startIcon" />
              Print...
            </oj-option>
          ])}
        </oj-menu>
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span id="deferredResults">{selectedMenuItem}</span>
      </div>
    </div>
  );
};

export default MenuDeferredRendering;
