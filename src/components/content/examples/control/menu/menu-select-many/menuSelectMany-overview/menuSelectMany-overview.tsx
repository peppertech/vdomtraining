import 'ojs/ojbutton';
import 'ojs/ojmenu';
import 'ojs/ojmenuselectmany';
import 'ojs/ojoption';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';

type MenuActionEvent = Parameters<NonNullable<ComponentProps<'oj-menu'>['onojMenuAction']>>[0];
type MenuSelectManyValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-menu-select-many'>['onvalueChanged']>
>[0];

export const MenuSelectManyOverview = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');
  const [pageSettingsMSMValue, setPageSettingsMSMValue] = useState<string[]>(['large font']);
  const [selectedMenuItem2, setSelectedMenuItem2] = useState<string>('(None selected yet)');
  const [primaryValue, setPrimaryValue] = useState<string[]>(['bookmark']);
  const [secondaryValue, setSecondaryValue] = useState<string[]>(['bold']);

  const msmValue = useMemo(() => ['item3'], []);

  const handlePageSettingsMSMValueValueChanged = (event: MenuSelectManyValueChangedEvent) => {
    setPageSettingsMSMValue((event.detail.value ?? []) as string[]);
  };

  const handlePrimaryValueValueChanged = (event: MenuSelectManyValueChangedEvent) => {
    setPrimaryValue((event.detail.value ?? []) as string[]);
  };

  const handleSecondaryValueValueChanged = (event: MenuSelectManyValueChangedEvent) => {
    setSecondaryValue((event.detail.value ?? []) as string[]);
  };

  const handleMenuItemAction = (event: MenuActionEvent) => {
    setSelectedMenuItem(event.detail.selectedValue);
  };

  const handleMenuItemAction2 = (event: MenuActionEvent) => {
    setSelectedMenuItem2(event.detail.selectedValue);
  };

  return (
    <div id="menubutton-container">
      <h6>Inline Options</h6>
      <oj-menu-button id="menuButton" class="oj-sm-margin-5x-bottom">
        Page Settings
        <oj-menu id="myMenu" slot="menu" onojMenuAction={handleMenuItemAction} aria-label="menu with actions">
          <oj-menu-select-many
            onvalueChanged={handlePageSettingsMSMValueValueChanged}
            value={pageSettingsMSMValue}
          >
            <oj-option value="sliding navigation">Sliding Navigation</oj-option>
            <oj-option value="right-to-left reading direction">
              Right-to-Left Reading Direction
            </oj-option>
            <oj-option value="large font">Large Font</oj-option>
            <oj-option value="debug mode">Debug Mode</oj-option>
            <oj-option value="high contrast mode">High Contrast Mode</oj-option>
          </oj-menu-select-many>
        </oj-menu>
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-5x-bottom">
        Last selected menu item:
        <span id="results1">{selectedMenuItem}</span>
      </div>
      <div class="oj-typography-body-md oj-typography-bold">
        Selected Settings:
        <span id="results2">{pageSettingsMSMValue}</span>
      </div>
      <h6 class="oj-sm-margin-8x-top">Disabled</h6>
      <oj-menu-button id="menuButton1">
        Disabled Items
        <oj-menu id="myMenu1" slot="menu" aria-label="menu with actions">
          <oj-menu-select-many disabled value={msmValue}>
            <oj-option value="item2">Item 2</oj-option>
            <oj-option value="item3" disabled>
              Item 3
            </oj-option>
            <oj-option value="item4">Item 4</oj-option>
          </oj-menu-select-many>
        </oj-menu>
      </oj-menu-button>
      <h6 class="oj-sm-margin-8x-top">Submenu</h6>
      <oj-menu-button id="menuButton2" class="oj-sm-margin-5x-bottom">
        View
        <oj-menu id="myMenu2" slot="menu" onojMenuAction={handleMenuItemAction2} aria-label="menu with actions">
          <oj-menu-select-many onvalueChanged={handlePrimaryValueValueChanged} value={primaryValue}>
            <oj-option value="bookmark">
              <span slot="endIcon" class="oj-ux-ico-bookmark" />
              Show Bookmarks
            </oj-option>
            <oj-option value="toolbar">
              <span slot="endIcon" class="oj-ux-ico-toolbar" />
              Show Toolbar
            </oj-option>
            <oj-option value="sidebar">
              <span slot="endIcon" class="oj-ux-ico-side-bar" />
              Show Side Bar
            </oj-option>
          </oj-menu-select-many>
          <oj-option>---</oj-option>
          <oj-option value="secondary">
            Select Font
            <oj-menu>
              <oj-menu-select-many
                onvalueChanged={handleSecondaryValueValueChanged}
                value={secondaryValue}
              >
                <oj-option value="bold">
                  <span slot="endIcon" class="oj-ux-ico-bold" />
                  Bold
                </oj-option>
                <oj-option value="italics">
                  <span slot="endIcon" class="oj-ux-ico-italics" />
                  Italics
                </oj-option>
                <oj-option value="underline">
                  <span slot="endIcon" class="oj-ux-ico-underline" />
                  Underline
                </oj-option>
                <oj-option value="strikethrough">
                  <span slot="endIcon" class="oj-ux-ico-strikethrough" />
                  Strikethrough
                </oj-option>
              </oj-menu-select-many>
            </oj-menu>
          </oj-option>
        </oj-menu>
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-5x-bottom">
        Last selected menu item:
        <span id="results3">{selectedMenuItem2}</span>
      </div>
      <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-5x-bottom">
        Main menu item:
        <span id="results4">{primaryValue}</span>
      </div>
      <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-5x-bottom">
        Select Font item:
        <span id="results5">{secondaryValue}</span>
      </div>
    </div>
  );
};

export default MenuSelectManyOverview;
