// @ts-nocheck
import { Fragment, h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import 'ojs/ojactioncard';
import '../../../../../../jet-composites/demo-profile-card-layout/loader';
import 'ojs/ojlistview';
import { ojButtonsetOne } from 'ojs/ojbutton';
import 'ojs/ojbutton';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import 'ojs/ojswitch';
import 'ojs/ojlabel';
// import 'ojs/ojbuttonsetone';
import 'ojs/ojoption';

interface Contact {
    id: number;
    name: string;
    title: string;
    image: string;
}

interface Data {
    id: string;
    label: string;
    children: Array<Contact>;
}

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type ActiveLayout = 'card' | 'list';

export const ListViewCardLayoutHierListView = () => {
  const listViewRef = useRef<HTMLElement | null>(null);
  const [fullWidthMode, setFullWidthMode] = useState(false);
  const [activeLayout, setActiveLayout] = useState<ActiveLayout>('card');

  const data = useMemo(() => [
      {
          id: 'a',
          label: 'A',
          children: [
              {
                  id: 1,
                  name: 'Alfred Marchris',
                  title: 'Principal Developer',
                  image: '../images/hcm/placeholder-male-13.png'
              },
              {
                  id: 11,
                  name: 'Andrew Chrismon',
                  title: 'Consulting Project Technical Manager',
                  image: '../images/hcm/placeholder-male-08.png'
              },
              {
                  id: 12,
                  name: 'Annett Christy',
                  title: 'Area Business Operations Director EMEA & JAPAC',
                  image: '../images/hcm/placeholder-female-03.png'
              }
          ]
      },
      {
          id: 'b',
          label: 'B',
          children: [
              {
                  id: 5,
                  name: 'Bart Christian',
                  title: 'Consulting Project Technical Manager',
                  image: '../images/hcm/placeholder-male-05.png'
              },
              {
                  id: 6,
                  name: 'Ben Marchris',
                  title: 'Customer Service Analyst',
                  image: '../images/hcm/placeholder-male-06.png'
              },
              {
                  id: 7,
                  name: 'Brie Christian Cooperman',
                  title: 'Senior Principal Escalation Manager',
                  image: '../images/hcm/placeholder-female-02.png'
              }
          ]
      },
      {
          id: 'c',
          label: 'C',
          children: [
              {
                  id: 3,
                  name: 'Christine Cooper',
                  title: 'Senior Principal Escalation Manager',
                  image: '../images/hcm/placeholder-female-01.png'
              },
              {
                  id: 31,
                  name: 'Chris Benalamore',
                  title: 'Area Business Operations Director EMEA & JAPAC',
                  image: '../images/hcm/placeholder-male-03.png'
              },
              {
                  id: 32,
                  name: 'Christopher Johnson',
                  title: 'Vice-President HCM Application Development',
                  image: '../images/hcm/placeholder-male-04.png'
              }
          ]
      }
  ], []);
  const layoutViewRadios = useMemo(() => [
      { id: 'card', icon: 'oj-ux-ico-grid-view-small' },
      { id: 'list', icon: 'oj-ux-ico-list-round' }
  ], []);
  const dataProvider = useMemo(() => new ArrayTreeDataProvider<Data['id'], Data>(data, {
      keyAttributes: 'id'
  }), [data]);

  const handleActiveLayoutValueChanged = (event: PropertyChangedEvent<ActiveLayout>) => {
    setActiveLayout(event.detail.value ?? 'card');
  };

  const handleFullWidthModeChange = (event: PropertyChangedEvent<boolean>) => {
	      const enabled = event.detail.value ?? false;
	      setFullWidthMode(enabled);
	      listViewRef.current?.classList.toggle('oj-listview-full-width', enabled);
  };

  return (
      <div id="listviewContainer">
            <div class="oj-flex">
                    <div class="oj-flex-item">
                              <oj-label id="switchLabel" for="switch">Full width mode:</oj-label>
                              <oj-switch id="switch" value={fullWidthMode} onvalueChanged={handleFullWidthModeChange} />
                          </div>
                    <oj-buttonset-one display="icons" onvalueChanged={handleActiveLayoutValueChanged} value={activeLayout} chroming="borderless" class="oj-flex-item oj-sm-flex-initial oj-buttonset-width-auto" aria-label="Choose layout view.">
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
            <oj-list-view ref={listViewRef} id="listview" class="oj-sm-padding-1x" aria-label="list with card layout for items in group" data={dataProvider} display={activeLayout} drill-mode="none" group-header-position="static">
                    <template slot="itemTemplate" render={(item) => (
                            <>
                                {
                                            item.leaf ? (
                                              <>
                                                {
                                                              activeLayout == 'list' ? (
                                                                <>
                                                                  <li>
                                                                                    <oj-list-item-layout>
                                                                                                        <span class="oj-typography-body-md">{item.data.name}</span>
                                                                                                        <oj-avatar slot="leading" size="xs" src={item.data.image} />
                                                                                                        <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">{item.data.title}</span>
                                                                                                    </oj-list-item-layout>
                                                                                </li>
                                                                </>
                                                              ) : null
                                                            }
                                                {
                                                              activeLayout == 'card' ? (
                                                                <>
                                                                  <li class="demo-card">
                                                                                    <oj-action-card>
                                                                                                        <demo-profile-card-layout name={item.data.name} work-title={item.data.title} initials={item.data.initials} image={item.data.image} />
                                                                                                    </oj-action-card>
                                                                                </li>
                                                                </>
                                                              ) : null
                                                            }
                                              </>
                                            ) : null
                                          }
                                {
                                            !item.leaf ? (
                                              <>
                                                <span>{item.data.label}</span>
                                              </>
                                            ) : null
                                          }
                            </>
                          )} />
                </oj-list-view>
        </div>
    );
};

export default ListViewCardLayoutHierListView;
