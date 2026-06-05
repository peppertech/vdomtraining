// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojlabel';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojswitch';
import 'ojs/ojnavigationlist';

export const TabBarBadgecorepack = () => {
  const [isChecked, setIsChecked] = useState();
  const [edge, setEdge] = useState('top');
  const [isDivider, setIsDivider] = useState(false);
  const [isContrastBackground, setIsContrastBackground] = useState(false);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(
        [
          { name: 'Inbox', id: 'inbox', count: '3', starticon: 'oj-ux-ico-inbox', endicon: 'oj-icon-color-danger oj-ux-ico-error-s' },
          { name: 'Deleted Item', id: 'deleteditem', count: '99+', starticon: 'oj-ux-ico-trash', endicon: 'oj-icon-color-success oj-ux-ico-success-s' }
        ],
        { keyAttributes: 'id' }
      ),
    []
  );

  const dividerClass = isDivider ? (edge === 'bottom' ? 'oj-divider-top' : 'oj-divider-bottom') : '';
  const tabbarClass = `${isChecked ? 'oj-sm-condense' : ''} ${dividerClass}`.trim();
  const containerClass = `tabbarcontainer${isContrastBackground ? ' oj-bg-neutral-170 oj-color-invert' : ''}`;

  const badgeItemTemplateRenderer = (item: any) => (
    <li>
      <a href="#">
        <span class={'oj-tabbar-item-icon ' + item.data.starticon} />
        {item.data.name}
        <span class="oj-tabbar-item-end"><span class="oj-badge oj-badge-subtle">{item.data.count}</span></span>
      </a>
    </li>
  );
  const iconItemTemplateRenderer = (item: any) => (
    <li>
      <a href="#">
        {item.data.name}
        <span class={'oj-tabbar-item-end oj-ux-icon-size-5x ' + item.data.endicon} role="img" aria-label="status" />
      </a>
    </li>
  );
  const metaItemTemplateRenderer = (item: any) => (
    <li>
      <a href="#">
        <span class={'oj-tabbar-item-icon ' + item.data.starticon} />
        {item.data.name}
        <span class="oj-tabbar-item-end">({item.data.count})</span>
      </a>
    </li>
  );

  return (
    <div id="tabbardemo">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <div class="oj-flex">
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-radioset id="edgeRadioId" labelledBy="edgeLabelId" labelHint="Edge" labelEdge="inside" onvalueChanged={(event: any) => setEdge(event.detail.value)} value={edge}>
              <oj-option id="horiEdge" value="top">Top</oj-option>
              <oj-option id="horiBottomEdge" value="bottom">Bottom</oj-option>
            </oj-radioset>
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-label id="condenseLabel" class="oj-label" for="condense">Condense</oj-label>
            <oj-switch id="condense" onvalueChanged={(event: any) => setIsChecked(event.detail.value)} value={isChecked} />
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-switch id="verticaldividerSwitch" onvalueChanged={(event: any) => setIsDivider(!!event.detail.value)} value={isDivider} labelHint="Divider" labelEdge="inside" />
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-switch id="contrastBgSwitch" onvalueChanged={(event: any) => setIsContrastBackground(!!event.detail.value)} value={isContrastBackground} labelHint="Dark Background" labelEdge="inside" />
          </div>
        </div>
      </div>

      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-12 oj-lg-4 oj-lg-padding-3x-end oj-divider-end">
          <h6 class="oj-helper-text-align-center">Badge</h6>
          <div class="oj-sm-padding-10x-bottom">
            <div class={containerClass}>
              <oj-tab-bar class={tabbarClass} selection="inbox" data={dataProvider} edge={edge} display="all">
                <template slot="itemTemplate" render={badgeItemTemplateRenderer} />
              </oj-tab-bar>
            </div>
          </div>
        </div>
        <div class="oj-flex-item oj-sm-12 oj-lg-4 oj-lg-padding-3x-horizontal oj-divider-end">
          <h6 class="oj-helper-text-align-center">Icons</h6>
          <div class="oj-sm-padding-10x-bottom">
            <div class={containerClass}>
              <oj-tab-bar class={tabbarClass} selection="inbox" data={dataProvider} edge={edge} display="all">
                <template slot="itemTemplate" render={iconItemTemplateRenderer} />
              </oj-tab-bar>
            </div>
          </div>
        </div>
        <div class="oj-flex-item oj-sm-12 oj-lg-4 oj-lg-padding-3x-start">
          <h6 class="oj-helper-text-align-center">Metadata</h6>
          <div class="oj-sm-padding-10x-bottom">
            <div class={containerClass}>
              <oj-tab-bar class={tabbarClass} selection="inbox" data={dataProvider} edge={edge} display="all">
                <template slot="itemTemplate" render={metaItemTemplateRenderer} />
              </oj-tab-bar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabBarBadgecorepack;
