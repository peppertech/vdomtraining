// @ts-nocheck
import { h, type ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojbutton';
import 'ojs/ojdialog';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojlabel';
import 'ojs/ojswitch';
import 'ojs/ojnavigationlist';
import { ojTabBar } from 'ojs/ojnavigationlist';

type TabbarItem = {
  name: string;
  id: string;
  isRemovable?: boolean;
};
type TabbarItemContext = ojTabBar.ItemContext<TabbarItem["id"], TabbarItem>;
type SwitchValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>
>[0];
type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>
>[0];
type TabbarSelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-tab-bar'>['onselectionChanged']>
>[0];
type TabbarCurrentItemChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-tab-bar'>['oncurrentItemChanged']>
>[0];
type TabbarRemoveEvent = Parameters<
  NonNullable<ComponentProps<'oj-tab-bar'>['onojRemove']>
>[0];

export const TabbarTbaddremovetabs = () => {
  const dialogRef = useRef<HTMLElement & { open: () => void; close: () => void }>(null);
  const nextIdRef = useRef(1);
  const [tabs, setTabs] = useState<TabbarItem[]>([
    { name: 'Settings', id: 'settings' },
    { name: 'Tools', id: 'tools', isRemovable: true },
    { name: 'Base', id: 'base', isRemovable: true },
    { name: 'Environment', id: 'environment' },
    { name: 'Security', id: 'security', isRemovable: true }
  ]);
  const [selectedItem, setSelectedItem] = useState('settings');
  const [currentItem, setCurrentItem] = useState<string>();
  const [newTabTitle, setNewTabTitle] = useState<string>();
  const [isContrastBackground, setIsContrastBackground] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [accInfo, setAccInfo] = useState('');

  const dataProvider = useMemo(() => new ArrayDataProvider<TabbarItem["id"], TabbarItem>(tabs, { keyAttributes: 'id' }), [tabs]);
  const tabbarContainerClass = `tabbarcontainer oj-sm-margin-1x-top oj-sm-margin-4x-bottom${isContrastBackground ? ' oj-bg-neutral-170 oj-color-invert' : ''}`;
  const tabbarClass = isChecked ? 'oj-sm-condense' : '';

  const removeTabById = (id: TabbarItem["id"]) => {
    let removedLabel: string | null = null;

    setTabs((items: TabbarItem[]) =>
      items.filter((item: TabbarItem) => {
        if (item.id === id) {
          removedLabel = item.name;
          return false;
        }
        return true;
      })
    );

    return removedLabel;
  };

  const onRemove = (event: TabbarRemoveEvent) => {
    const removedLabel = removeTabById(event.detail.key as TabbarItem["id"]);
    setAccInfo(`Removed ${removedLabel}`);
    event.preventDefault();
    event.stopPropagation();
  };

  const openDialog = () => {
    nextIdRef.current += 1;
    setNewTabTitle(`Tab ${nextIdRef.current}`);
    dialogRef.current?.open();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const addTab = () => {
    const tabId = `tid${nextIdRef.current}`;
    setTabs((items: TabbarItem[]) => [...items, { name: newTabTitle ?? '', id: tabId }]);
    setSelectedItem(tabId);
    closeDialog();
  };

  return (
    <div id="tabbardemo">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <div class="oj-flex oj-sm-justify-content-flex-end oj-sm-margin-4x-bottom">
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-label id="condenseLabel" class="oj-label" for="condense">Condense</oj-label>
            <oj-switch id="condense" onvalueChanged={(event: SwitchValueChangedEvent) => setIsChecked(Boolean(event.detail.value))} value={isChecked} />
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-label id="contrastBgLabel" class="oj-label" for="contrastBgSwitch">Dark Background</oj-label>
            <oj-switch id="contrastBgSwitch" onvalueChanged={(event: SwitchValueChangedEvent) => setIsContrastBackground(!!event.detail.value)} value={isContrastBackground} />
          </div>
        </div>
      </div>

      <oj-dialog ref={dialogRef} class="demo-tab-dialog" id="tabDialog" dialogTitle="Tab data">
        <div slot="body">
          <oj-form-layout>
            <oj-input-text id="t1" onvalueChanged={(event: InputTextValueChangedEvent) => setNewTabTitle(event.detail.value as string)} value={newTabTitle} labelHint="Title" />
          </oj-form-layout>
        </div>
        <div slot="footer">
          <oj-button id="idOK" onojAction={addTab}>OK</oj-button>
          <oj-button id="idCancel" onojAction={closeDialog}>Cancel</oj-button>
        </div>
      </oj-dialog>

      <oj-button id="addTab" onojAction={openDialog}>Add Tab</oj-button>
      <div class={tabbarContainerClass}>
        <oj-tab-bar
          id="hnavlist"
          class={tabbarClass}
          onselectionChanged={(event: TabbarSelectionChangedEvent) => setSelectedItem(event.detail.value)}
          selection={selectedItem}
          oncurrentItemChanged={(event: TabbarCurrentItemChangedEvent) => setCurrentItem(event.detail.value as string)}
          currentItem={currentItem}
          edge="top"
          data={dataProvider}
          onojRemove={onRemove}
        >
          <template slot="itemTemplate" render={(item: TabbarItemContext) => <li class={item.data.isRemovable ? 'oj-removable' : ''}><a href="#">{item.data.name}</a></li>} />
        </oj-tab-bar>
        <div id="tabBarRemoveInfo" class="oj-helper-hidden-accessible" aria-live="polite">{accInfo}</div>
      </div>
      <div>
        <p class="bold">
          Last selected list item:
          <span id="results">{selectedItem}</span>
        </p>
      </div>
    </div>
  );
};

export default TabbarTbaddremovetabs;
