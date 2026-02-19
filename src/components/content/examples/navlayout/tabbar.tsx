import "ojs/ojactioncard";
import { ActionCardElement } from "ojs/ojactioncard";
import "ojs/ojlabel";
import "oj-c/tab-bar-mixed"
import "ojs/ojnavigationlist"
import { CTabBarMixedElement } from 'oj-c/tab-bar-mixed';
import "preact";
import { useState } from "preact/hooks";
import { ojTabBar } from "ojs/ojnavigationlist";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

export const TabBar = () => {
  const [logMsg, setLogMsg] = useState<string>("none");
  const [selectedTab, setSelectedTab] = useState<string>("lisa");

  const actionHandler = (event: ActionCardElement.ojAction) => {
    setLogMsg(
      "Action handler invoked - " + (event.currentTarget as HTMLElement).id
    );
  };

  const staticTabs: CTabBarMixedElement<string>['staticTabs'] = [
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

  const dynamicTabs: CTabBarMixedElement<string>['dynamicTabs'] = [
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

  const dataProvider  = new MutableArrayDataProvider(dynamicTabs,{keyAttributes:'itemKey'})

  const displayOptions = [{ label: 'Standard', value: 'standard' },
  { label: 'Icons', value: 'icons' }];
  const sizeOptions = [{ label: 'Large', value: 'lg' },
  { label: 'Medium', value: 'md' }];
  const overflowOptions = [{ label: 'Conveyor', value: 'conveyor' },
  { label: 'Popup', value: 'popup' }];

  const handleRemove = (event: { detail: CTabBarMixedElement<string> }) => {

  };

  const tabBarItems = (item: ojTabBar.ItemTemplateContext) => {

    return (
      <li>
        <a href="#">
          {/* @ts-ignore */}
          {item.data.label}
        </a>
      </li>
    )
  }

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
      <div
        class="oj-flex-item oj-sm-12 demo-tabbar-container oj-sm-padding-10x-bottom oj-sm-padding-2x-horizontal">
        <h2 class="oj-typography-subheading-xs oj-sm-margin-0-bottom">
          overflow="popup" and truncation="progressive"
        </h2>
        <oj-tab-bar
          style="width:30rem"
          edge="top"
          overflow="popup"
          selection="{{selectedItem4}}"
          truncation="progressive"
          data={dataProvider}>
          <template slot="itemTemplate" render={tabBarItems}>
          </template>
        </oj-tab-bar>
      </div>
    </div>
  );
};
