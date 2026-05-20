import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import 'ojs/ojbutton';
import 'ojs/ojmenu';
import 'ojs/ojmenubutton';
import 'ojs/ojmenuselectmany';
import 'ojs/ojoption';

type MenuActionEvent = Parameters<NonNullable<ComponentProps<'oj-menu'>['onojMenuAction']>>[0];
type MenuSelectManyValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-menu-select-many'>['onvalueChanged']>
>[0];

export const MenuSelectManyDisabled = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');
  const [selectedItemsMSMValue, setSelectedItemsMSMValue] = useState<string[]>(['item5']);

  const handleSelectedItemsMSMValueValueChanged = (event: MenuSelectManyValueChangedEvent) => {
    setSelectedItemsMSMValue((event.detail.value ?? []) as string[]);
  };

  const handleMenuItemAction = (event: MenuActionEvent) => {
    setSelectedMenuItem(event.detail.selectedValue);
  };

  return (
    <div id="menubutton-container">
      <oj-menu-button id="menuButton" class="oj-sm-padding-2x">
        Items
        <oj-menu id="myMenu" slot="menu" onojMenuAction={handleMenuItemAction} aria-label="menu with actions">
          <oj-menu-select-many
            onvalueChanged={handleSelectedItemsMSMValueValueChanged}
            value={selectedItemsMSMValue}
          >
            <oj-option value="item1">Item 1</oj-option>
            <oj-option>---</oj-option>
          </oj-menu-select-many>
          <oj-menu-select-many
            disabled
            onvalueChanged={handleSelectedItemsMSMValueValueChanged}
            value={selectedItemsMSMValue}
          >
            <oj-option value="item2">Item 2</oj-option>
            <oj-option value="item3" disabled>
              Item 3
            </oj-option>
            <oj-option value="item4">Item 4</oj-option>
          </oj-menu-select-many>
          <oj-menu-select-many
            onvalueChanged={handleSelectedItemsMSMValueValueChanged}
            value={selectedItemsMSMValue}
          >
            <oj-option>---</oj-option>
            <oj-option value="item5">Item 5</oj-option>
          </oj-menu-select-many>
        </oj-menu>
      </oj-menu-button>
      <div class="bold oj-sm-padding-2x">
        <p>
          Last selected menu item:
          {selectedMenuItem}
        </p>
        <p>
          Selected items:
          {selectedItemsMSMValue}
        </p>
      </div>
    </div>
  );
};

export default MenuSelectManyDisabled;
