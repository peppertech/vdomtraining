import "ojs/ojactioncard";
import { ActionCardElement } from "ojs/ojactioncard";
import "ojs/ojlabel";
import "oj-c/tab-bar-mixed"
import { KeyDetail, TabData } from 'oj-c/tab-bar-mixed';
import "preact";
import { useState } from "preact/hooks";

export const TabBar = () => {
  const [logMsg, setLogMsg] = useState<string>("none");
  const [selectedTab, setSelectedTab] = useState<string>("lisa");

  const actionHandler = (event: ActionCardElement.ojAction) => {
    setLogMsg(
      "Action handler invoked - " + (event.currentTarget as HTMLElement).id
    );
  };

  const staticTabs: TabData<string>[] = [
    {
      itemKey: 'home',
      label: 'Home',
      icon: {
        type: 'class',
        class: 'oj-ux-ico-home'
      }
    },
    {
      itemKey: 'resources',
      label: 'Resources',
      icon: {
        type: 'class',
        class: 'oj-ux-ico-library'
      }
    }
  ];

  const dynamicTabs: TabData<string>[] = [
    {
      badge: 3,
      itemKey: 'lisa',
      label: 'Lisa Hernandez'
    },
    {
      itemKey: 'tim',
      label: 'Tim Anderson'
    },
    {
      itemKey: 'stephanie',
      label: 'Stephanie Kim'
    },
    {
      itemKey: 'adam',
      label: 'Adam Susanto'
    },
    {
      badge: 7,
      itemKey: 'denis',
      label: 'Denis Dorsey'
    },
    {
      itemKey: 'lochlan',
      label: 'Lochlan Camacho'
    },
    {
      badge: 1,
      itemKey: 'izaak',
      label: 'Izaak Calderon'
    },
    {
      itemKey: 'nancy',
      label: 'Nancy Richardson'
    }
  ];
  const displayOptions = [{ label: 'Standard', value: 'standard' },
  { label: 'Icons', value: 'icons' }];
  const sizeOptions = [{ label: 'Large', value: 'lg' },
  { label: 'Medium', value: 'md' }];
  const overflowOptions = [{ label: 'Conveyor', value: 'conveyor' },
  { label: 'Popup', value: 'popup' }];

  const handleRemove = (event: { detail: KeyDetail<string> }) => {

  };
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-typography-bold oj-sm-margin-10x-bottom">
        See the /examples/navlayout/index.tsx file for oj-tab-bar code used at the top of this page.
      </div>
      <h3 class="oj-typography-heading-xs">Tabbar Mixed</h3>
      <oj-c-tab-bar-mixed
        dynamicTabs={dynamicTabs}
        staticTabs={staticTabs}
        dynamicTabsOverflow="conveyor"
        selection={selectedTab}
        size="md"
        aria-label="Basic TabBar"></oj-c-tab-bar-mixed>
    </div>
  );
};
