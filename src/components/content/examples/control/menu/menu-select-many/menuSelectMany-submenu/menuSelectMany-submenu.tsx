import { h } from 'preact';
import { useState } from 'preact/hooks';
import { ojMenu } from 'ojs/ojmenu';
import 'ojs/ojmenu';
import 'ojs/ojbutton';
import 'ojs/ojoption';
import 'ojs/ojmenuselectmany';

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const MenuSelectManySubmenu = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');
  const [primaryColorsMSMValue, setPrimaryColorsMSMValue] = useState<string[]>(['red']);
  const [secondaryColorsMSMValue, setSecondaryColorsMSMValue] = useState<string[]>(['green']);

  const handlePrimaryColorsMSMValueValueChanged = (event: PropertyChangedEvent<string[]>) => {
    setPrimaryColorsMSMValue(event.detail.value);
  };

  const handleSecondaryColorsMSMValueValueChanged = (event: PropertyChangedEvent<string[]>) => {
    setSecondaryColorsMSMValue(event.detail.value);
  };

  const menuItemAction = (event: ojMenu.ojMenuAction) => {
      setSelectedMenuItem(event.detail.selectedValue);
  };

  return (
      <div id="menubutton-container">
            <oj-menu-button id="menuButton">
                    Colors
                    <oj-menu id="myMenu" slot="menu" onojMenuAction={menuItemAction} aria-label="menu with options">
                              <oj-menu-select-many onvalueChanged={handlePrimaryColorsMSMValueValueChanged} value={primaryColorsMSMValue}>
                                          <oj-option value="red">
                                                        <span slot="endIcon" class="demo-red demo-icon" />
                                                        Red
                                                    </oj-option>
                                          <oj-option value="blue">
                                                        <span slot="endIcon" class="demo-blue demo-icon" />
                                                        Blue
                                                    </oj-option>
                                          <oj-option value="yellow">
                                                        <span slot="endIcon" class="demo-yellow demo-icon" />
                                                        Yellow
                                                    </oj-option>
                                      </oj-menu-select-many>
                              <oj-option>---</oj-option>
                              <oj-option value="secondary">
                                          Secondary
                                          <oj-menu>
                                                        <oj-menu-select-many onvalueChanged={handleSecondaryColorsMSMValueValueChanged} value={secondaryColorsMSMValue}>
                                                                        <oj-option value="green">
                                                                                          <span slot="startIcon" class="demo-green demo-icon" />
                                                                                          Green
                                                                                      </oj-option>
                                                                        <oj-option value="orange">
                                                                                          <span slot="startIcon" class="demo-orange demo-icon" />
                                                                                          Orange
                                                                                      </oj-option>
                                                                        <oj-option value="purple">
                                                                                          <span slot="startIcon" class="demo-purple demo-icon" />
                                                                                          Purple
                                                                                      </oj-option>
                                                                    </oj-menu-select-many>
                                                    </oj-menu>
                                      </oj-option>
                          </oj-menu>
                </oj-menu-button>
            <p />
            <p class="bold">
                    Last selected menu item:
                    <span>{selectedMenuItem}</span>
                </p>
            <p class="bold">
                    Primary color values:
                    <span>{primaryColorsMSMValue}</span>
                </p>
            <p class="bold">
                    Secondary color values:
                    <span>{secondaryColorsMSMValue}</span>
                </p>
        </div>
    );
};

export default MenuSelectManySubmenu;
