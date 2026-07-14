import 'ojs/ojformlayout';
import 'ojs/ojlabel';
import 'ojs/ojnavigationlist';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojswitch';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

export const TabbarTbbasic = () => {
  const [isContrastBackground, setIsContrastBackground] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDivider, setIsDivider] = useState(false);
  const [selectedItem, setSelectedItem] = useState('home');
  const [display, setDisplay] = useState<NonNullable<ComponentProps<'oj-tab-bar'>['display']>>('all');
  const [edge, setEdge] = useState<NonNullable<ComponentProps<'oj-tab-bar'>['edge']>>('top');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(
        [
          { name: 'Home', id: 'home', icons: 'oj-ux-ico-home' },
          { name: 'Getting Started', id: 'gettingstarted', icons: 'oj-ux-ico-education' },
          { name: 'Cookbook', id: 'cookbook', icons: 'oj-ux-ico-book' },
          { name: 'Style Lab', id: 'stylelab2', icons: 'oj-ux-ico-color-palette' },
          { name: 'Library', id: 'library', icons: 'oj-ux-ico-library' },
          { name: 'Support', id: 'support', icons: 'oj-ux-ico-chat-on' },
          { name: 'Contact us', id: 'contactus', icons: 'oj-ux-ico-contact' }
        ],
        { keyAttributes: 'id' }
      ),
    []
  );

  const dividerClass = isDivider ? (edge === 'bottom' ? 'oj-divider-top' : 'oj-divider-bottom') : '';
  const tabbarClass = `${isChecked ? 'oj-sm-condense' : ''} ${dividerClass}`.trim();
  const containerClass = isContrastBackground ? 'oj-bg-neutral-170 oj-color-invert' : '';

  return (
    <div id="tabbardemo">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <div class="oj-flex">
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-radioset id="displayRadioId" labelledBy="displaylabelid" labelHint="Display" labelEdge="inside" onvalueChanged={(event) => setDisplay(event.detail.value)} value={display}>
              <oj-option id="all" value="all">All</oj-option>
              <oj-option id="icons" value="icons">Icons</oj-option>
            </oj-radioset>
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-radioset id="edgeRadioId" labelledBy="edgeLabelId" labelHint="Edge" labelEdge="inside" onvalueChanged={(event) => setEdge(event.detail.value)} value={edge}>
              <oj-option id="horiEdge" value="top">Top</oj-option>
              <oj-option id="horiBottomEdge" value="bottom">Bottom</oj-option>
            </oj-radioset>
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-label id="condenseLabel" class="oj-label" for="condense">Condense</oj-label>
            <oj-switch id="condense" onvalueChanged={(event) => setIsChecked(event.detail.value)} value={isChecked} />
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-switch id="verticaldividerSwitch" onvalueChanged={(event) => setIsDivider(!!event.detail.value)} value={isDivider} labelHint="Divider" labelEdge="inside" />
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-switch id="contrastBgSwitch" onvalueChanged={(event) => setIsContrastBackground(!!event.detail.value)} value={isContrastBackground} labelHint="Dark Background" labelEdge="inside" />
          </div>
        </div>
      </div>
      <div id="tabbarcontainer" class={containerClass}>
        <oj-tab-bar class={tabbarClass} onselectionChanged={(event) => setSelectedItem(event.detail.value)} selection={selectedItem} data={dataProvider} edge={edge} display={display}>
          <template slot="itemTemplate" render={(item) => <li><a href="#"><span class={'oj-tabbar-item-icon ' + item.data.icons} />{item.data.name}</a></li>} />
        </oj-tab-bar>
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

export default TabbarTbbasic;
