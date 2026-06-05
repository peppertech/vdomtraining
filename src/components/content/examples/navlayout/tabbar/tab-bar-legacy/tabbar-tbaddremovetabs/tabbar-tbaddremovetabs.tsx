// @ts-nocheck
import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojbutton';
import 'ojs/ojdialog';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojlabel';
import 'ojs/ojswitch';
import 'ojs/ojnavigationlist';

export const TabbarTbaddremovetabs = () => {
  const nextIdRef = useRef(1);
  const [tabs, setTabs] = useState([
    { name: 'Settings', id: 'settings' },
    { name: 'Tools', id: 'tools', isRemovable: true },
    { name: 'Base', id: 'base', isRemovable: true },
    { name: 'Environment', id: 'environment' },
    { name: 'Security', id: 'security', isRemovable: true }
  ]);
  const [selectedItem, setSelectedItem] = useState('settings');
  const [currentItem, setCurrentItem] = useState();
  const [newTabTitle, setNewTabTitle] = useState();
  const [isContrastBackground, setIsContrastBackground] = useState(false);
  const [isChecked, setIsChecked] = useState();
  const [accInfo, setAccInfo] = useState('');

  const dataProvider = useMemo(() => new ArrayDataProvider(tabs, { keyAttributes: 'id' }), [tabs]);
  const tabbarContainerClass = `tabbarcontainer oj-sm-margin-1x-top oj-sm-margin-4x-bottom${isContrastBackground ? ' oj-bg-neutral-170 oj-color-invert' : ''}`;
  const tabbarClass = isChecked ? 'oj-sm-condense' : '';

  const removeTabById = (id: any) => {
    let removedLabel = null;

    setTabs((items: any) =>
      items.filter((item: any) => {
        if (item.id === id) {
          removedLabel = item.name;
          return false;
        }
        return true;
      })
    );

    return removedLabel;
  };

  const onRemove = (event: any) => {
    const removedLabel = removeTabById(event.detail.key);
    setAccInfo(`Removed ${removedLabel}`);
    event.preventDefault();
    event.stopPropagation();
  };

  const openDialog = () => {
    nextIdRef.current += 1;
    setNewTabTitle(`Tab ${nextIdRef.current}`);
    document.getElementById('tabDialog')?.open();
  };

  const closeDialog = () => {
    document.getElementById('tabDialog')?.close();
  };

  const addTab = () => {
    const tabId = `tid${nextIdRef.current}`;
    setTabs((items: any) => [...items, { name: newTabTitle, id: tabId }]);
    setSelectedItem(tabId);
    closeDialog();
  };

  return (
    <div id="tabbardemo">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <div class="oj-flex oj-sm-justify-content-flex-end oj-sm-margin-4x-bottom">
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-label id="condenseLabel" class="oj-label" for="condense">Condense</oj-label>
            <oj-switch id="condense" onvalueChanged={(event: any) => setIsChecked(event.detail.value)} value={isChecked} />
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-label id="contrastBgLabel" class="oj-label" for="contrastBgSwitch">Dark Background</oj-label>
            <oj-switch id="contrastBgSwitch" onvalueChanged={(event: any) => setIsContrastBackground(!!event.detail.value)} value={isContrastBackground} />
          </div>
        </div>
      </div>

      <oj-dialog class="demo-tab-dialog" id="tabDialog" dialogTitle="Tab data">
        <div slot="body">
          <oj-form-layout>
            <oj-input-text id="t1" onvalueChanged={(event: any) => setNewTabTitle(event.detail.value)} value={newTabTitle} labelHint="Title" />
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
          onselectionChanged={(event: any) => setSelectedItem(event.detail.value)}
          selection={selectedItem}
          oncurrentItemChanged={(event: any) => setCurrentItem(event.detail.value)}
          currentItem={currentItem}
          edge="top"
          data={dataProvider}
          onojRemove={onRemove}
        >
          <template slot="itemTemplate" render={(item: any) => <li class={item.data.isRemovable ? 'oj-removable' : ''}><a href="#">{item.data.name}</a></li>} />
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
