import { h } from 'preact';
import 'ojs/ojmenu';
import 'ojs/ojmenubutton';
import 'ojs/ojoption';

type RecursiveMenuItem = {
  name: string;
  disabled: boolean;
  items?: RecursiveMenuItem[];
};

const items: RecursiveMenuItem[] = [
  { name: 'Aberdeen', disabled: true },
  { name: 'Ada', disabled: false },
  { name: 'Adamsville', disabled: false },
  { name: 'Addyston', disabled: false },
  {
    name: 'Delphi',
    disabled: false,
    items: [
      { name: 'Ada', disabled: true },
      { name: 'Saarland', disabled: false },
      { name: 'Salzburg', disabled: false }
    ]
  },
  { name: 'Saarland', disabled: false },
  {
    name: 'Salzburg',
    disabled: false,
    items: [
      {
        name: 'Delphi',
        disabled: false,
        items: [
          { name: 'Ada', disabled: false },
          { name: 'Saarland', disabled: false },
          { name: 'Salzburg', disabled: false }
        ]
      },
      { name: 'Perch', disabled: false }
    ]
  },
  { name: 'Amesville', disabled: true }
];

const renderMenuItems = (menuItems: RecursiveMenuItem[]) =>
  menuItems.map((item) => (
    <oj-option key={item.name} disabled={item.disabled} value={item.name}>
      <span>{item.name}</span>
      {item.items?.length ? <oj-menu>{renderMenuItems(item.items)}</oj-menu> : null}
    </oj-option>
  ));

export const MenuMenuRecursiveTemplate = () => {
  return (
    <div id="menubutton-container">
      <oj-menu-button id="menuButton">
        Places to Travel
        <oj-menu id="myMenu" slot="menu" aria-label="menu with recursive template">
          {renderMenuItems(items)}
        </oj-menu>
      </oj-menu-button>
    </div>
  );
};

export default MenuMenuRecursiveTemplate;
