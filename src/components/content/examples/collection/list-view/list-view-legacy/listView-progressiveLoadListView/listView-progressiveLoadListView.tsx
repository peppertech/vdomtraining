// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonDataStr from 'text!../../../data/cookbook/dataCollections/listView/collectionListView/tweets.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import DemoDelayingDataProvider from '../../../shared/DemoDelayingDataProvider';
import 'ojs/ojlabel';
import 'ojs/ojlistview';
import 'ojs/ojbutton';
import 'ojs/ojinputnumber';
import 'ojs/ojavatar';
import 'ojs/ojformlayout';
import 'ojs/ojactioncard';
import 'ojs/ojlistitemlayout';
// import 'ojs/ojbuttonsetone';
import 'ojs/ojoption';

interface Data {
    name: string;
    sreen_name: string;
    profile_background_image_url: string;
    text: string;
    created_at: string;
    source: string;
}

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const ListViewProgressiveLoadListView = () => {
  const initialDelay = 2000;
  const arr: any = useMemo(() => JSON.parse(jsonDataStr), []);
  const [delay, setDelay] = useState<any>(initialDelay);
  const [activeLayout, setActiveLayout] = useState<any>('list');
  const [dataProvider, setDataProvider] = useState<any>(() => new DemoDelayingDataProvider(new ArrayDataProvider<Data['source'], Data>(arr, {
      keyAttributes: 'source'
  }), initialDelay));

  const layoutViewRadios = useMemo(() => [
      { id: 'card', icon: 'oj-ux-ico-grid-view-small' },
      { id: 'list', icon: 'oj-ux-ico-list-round' }
  ], []);

  const handleActiveLayoutValueChanged = (event: PropertyChangedEvent<any>) => {
    setActiveLayout(event.detail.value);
  };

  const handleDelayValueChanged = (event: PropertyChangedEvent<any>) => {
    setDelay(event.detail.value);
  };

  const applyDelay = () => {
      setDataProvider(new DemoDelayingDataProvider(new ArrayDataProvider<Data['source'], Data>(arr, {
          keyAttributes: 'source'
      }), delay));
  };

  return (
      <div id="listviewContainer">
            <div class="oj-flex-bar">
                    <oj-buttonset-one display="icons" onvalueChanged={handleActiveLayoutValueChanged} value={activeLayout} chroming="borderless" class="oj-flex-bar-end" aria-label="Choose layout view.">
                              {
                                        (layoutViewRadios ?? []).map(($current, index) => (
                                          <>
                                            <oj-option value={$current.id} id={$current.id}>
                                                            <span slot="startIcon" class={$current.icon} />
                                                            <span>{$current.id}</span>
                                                        </oj-option>
                                          </>
                                        ))
                                      }
                          </oj-buttonset-one>
                </div>
            <div class="demo-list-container">
                    <oj-form-layout max-columns="2" direction="row">
                              <oj-input-number id="fetch-delay-input" min="0" step="0" onvalueChanged={handleDelayValueChanged} value={delay} label-hint="Fetch delay (ms)" />
                              <oj-button class="oj-button-lg" onojAction={applyDelay}>Apply</oj-button>
                          </oj-form-layout>
                    <oj-list-view id="listview" aria-label="progressive loading" data={dataProvider} display={activeLayout} class="demo-list oj-sm-padding-1x-horizontal oj-listview-item-padding-off" {...{ 'item.enter-key-focus-behavior': "focusWithin", 'scroll-policy-options.fetch-size': "15" }}>
                              <template slot="itemTemplate" render={(item) => (
                                        <>
                                            {
                                                          activeLayout == 'list' ? (
                                                            <>
                                                              <oj-list-item-layout>
                                                                                <div>
                                                                                                    <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
                                                                                                    <span class="oj-typography-body-xs">{'@' + item.data.screen_name}</span>
                                                                                                </div>
                                                                                <oj-avatar slot="leading" size="xs" src={'../images/listView/oracle.gif'} />
                                                                                <div slot="secondary" class="demo-tweet">
                                                                                                    <span class="oj-typography-body-sm oj-text-color-secondary">{item.data.text}</span>
                                                                                                    <a href={item.data.source} class="oj-text-color-danger">{item.data.source}</a>
                                                                                                </div>
                                                                                <span slot="tertiary" class="oj-typography-body-xs">{item.data.created_at}</span>
                                                                            </oj-list-item-layout>
                                                            </>
                                                          ) : null
                                                        }
                                            {
                                                          activeLayout == 'card' ? (
                                                            <>
                                                              <oj-action-card>
                                                                                <div class="demo-card oj-sm-padding-2x">
                                                                                                    <div class="oj-flex">
                                                                                                                          <div class="oj-flex oj-flex-item">
                                                                                                                                                  <oj-avatar size="xs" src={'../images/listView/oracle.gif'} />
                                                                                                                                                  <div class="oj-flex oj-sm-flex-direction-column oj-sm-margin-2x-start">
                                                                                                                                                                            <strong>{item.data.name}</strong>
                                                                                                                                                                            <span class="oj-typography-body-xs">{'@' + item.data.screen_name}</span>
                                                                                                                                                                        </div>
                                                                                                                                              </div>
                                                                                                                          <div class="demo-tweet oj-flex-item oj-sm-padding-1x-vertical">
                                                                                                                                                  <span>{item.data.text}</span>
                                                                                                                                                  <a href={item.data.source} class="oj-text-color-danger">{item.data.source}</a>
                                                                                                                                              </div>
                                                                                                                      </div>
                                                                                                </div>
                                                                            </oj-action-card>
                                                            </>
                                                          ) : null
                                                        }
                                        </>
                                      )} />
                          </oj-list-view>
                </div>
        </div>
    );
};

export default ListViewProgressiveLoadListView;
