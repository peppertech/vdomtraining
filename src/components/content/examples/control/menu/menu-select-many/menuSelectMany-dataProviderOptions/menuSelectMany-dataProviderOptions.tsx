import 'ojs/ojbutton';
import 'ojs/ojmenu';
import 'ojs/ojmenuselectmany';
import 'ojs/ojoption';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type MenuActionEvent = Parameters<NonNullable<ComponentProps<'oj-menu'>['onojMenuAction']>>[0];
type MenuSelectManyValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-menu-select-many'>['onvalueChanged']>
>[0];

type MenuSelectManyOption = {
  id: string;
  value: string;
  label: string;
};

export const MenuSelectManyDataProviderOptions = () => {
  const primaryArray: MenuSelectManyOption[] = [
    { id: 'bookmark-option', value: 'bookmark', label: 'Show Bookmarks' },
    { id: 'toolbar-option', value: 'toolbar', label: 'Show Toolbar' },
    { id: 'sidebar-option', value: 'sidebar', label: 'Show Side Bar' }
  ];
  const secondaryArray: MenuSelectManyOption[] = [
    { id: 'bold-option', value: 'bold', label: 'Bold' },
    { id: 'italics-option', value: 'italics', label: 'Italics' },
    { id: 'underline-option', value: 'underline', label: 'Underline' },
    {
      id: 'strikethrough-option',
      value: 'strikethrough',
      label: 'Strikethrough'
    }
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');
  const [primaryMSMValue, setPrimaryMSMValue] = useState<string[]>(['bookmark']);
  const [secondaryMSMValue, setSecondaryMSMValue] = useState<string[]>(['bold']);

  const primaryOptionsDP = useMemo(
    () =>
      new ArrayDataProvider<MenuSelectManyOption['id'], MenuSelectManyOption>(primaryArray, {
        keyAttributes: 'id'
      }),
    []
  );
  const secondaryOptionsDP = useMemo(
    () =>
      new ArrayDataProvider<MenuSelectManyOption['id'], MenuSelectManyOption>(secondaryArray, {
        keyAttributes: 'id'
      }),
    []
  );

  const handlePrimaryMSMValueValueChanged = (event: MenuSelectManyValueChangedEvent) => {
    setPrimaryMSMValue((event.detail.value ?? []) as string[]);
  };

  const handleSecondaryMSMValueValueChanged = (event: MenuSelectManyValueChangedEvent) => {
    setSecondaryMSMValue((event.detail.value ?? []) as string[]);
  };

  const handleMenuItemAction = (event: MenuActionEvent) => {
    setSelectedMenuItem(event.detail.selectedValue);
  };

  return (
    <div id="menubutton-container">
      <oj-menu-button id="menuButton" class="oj-sm-margin-5x-bottom">
        View
        <oj-menu id="myMenu" slot="menu" onojMenuAction={handleMenuItemAction} aria-label="menu with actions">
          <oj-menu-select-many
            onvalueChanged={handlePrimaryMSMValueValueChanged}
            value={primaryMSMValue}
            options={primaryOptionsDP}
          />
          <oj-option>---</oj-option>
          <oj-option value="secondary">
            Select Font
            <oj-menu>
              <oj-menu-select-many
                onvalueChanged={handleSecondaryMSMValueValueChanged}
                value={secondaryMSMValue}
                options={secondaryOptionsDP}
              />
            </oj-menu>
          </oj-option>
        </oj-menu>
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-5x-bottom">
        Last selected menu item:
        <span id="results1">{selectedMenuItem}</span>
      </div>
      <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-5x-bottom">
        Main menu values:
        <span id="results2">{primaryMSMValue}</span>
      </div>
      <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-5x-bottom">
        Select Font values:
        <span id="results3">{secondaryMSMValue}</span>
      </div>
    </div>
  );
};

export default MenuSelectManyDataProviderOptions;
