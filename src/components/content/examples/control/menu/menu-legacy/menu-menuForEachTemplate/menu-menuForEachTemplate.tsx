import 'ojs/ojbutton';
import 'ojs/ojmenu';
import 'ojs/ojoption';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';

type MenuActionEvent = Parameters<NonNullable<ComponentProps<'oj-menu'>['onojMenuAction']>>[0];

type MenuItem = {
  id: string;
  label: string;
  disabled: boolean;
  value: string;
};

export const MenuMenuForEachTemplate = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');

  const menuItems = useMemo<MenuItem[]>(
    () => [
      { id: 'new', label: 'New', disabled: false, value: 'New' },
      { id: 'open', label: 'Open', disabled: false, value: 'Open' },
      { id: 'save', label: 'Save', disabled: false, value: 'Save' },
      { id: 'saveas', label: 'Save As...', disabled: false, value: 'Save As...' },
      { id: 'print', label: 'Print...', disabled: true, value: 'Print...' }
    ],
    []
  );

  const handleMenuItemAction = (event: MenuActionEvent) => {
    setSelectedMenuItem(event.detail.selectedValue);
  };

  const renderMenuItem = (item: MenuItem) => {
    return (
      <oj-option id={item.id} disabled={item.disabled} value={item.value}>
        <span>{item.label}</span>
      </oj-option>
    );
  };

  return (
    <div id="menubutton-container">
      <oj-menu-button id="menuButton" class="oj-sm-margin-5x-bottom">
        File
        <oj-menu
          id="myMenu"
          slot="menu"
          onojMenuAction={handleMenuItemAction}
          aria-label="menu using mapped template items"
        >
          {menuItems.map(renderMenuItem)}
        </oj-menu>
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span id="results">{selectedMenuItem}</span>
      </div>
    </div>
  );
};

export default MenuMenuForEachTemplate;
