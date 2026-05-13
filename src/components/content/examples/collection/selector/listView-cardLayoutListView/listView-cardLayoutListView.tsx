// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import 'ojs/ojactioncard';
import 'jet-composites/demo-profile-card-layout/loader';
import 'ojs/ojlistview';
import 'ojs/ojbutton';
import 'ojs/ojswitch';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import 'ojs/ojbuttonsetone';
import 'ojs/ojoption';

interface Data {
    id: number;
    name: string;
    title: string;
    phone: number;
    initials: string;
    image: string;
}

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

const createMediaQueryObservable = (query: string) => {
  const [matches, setMatches] = useState<boolean>(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [query]);
  return () => matches;
};
export const ListViewCardLayoutListView = () => {
  const [activeLayout, setActiveLayout] = useState<any>('card');
  const [prevActiveLayout, setPrevActiveLayout] = useState<any>('card');

  const rawData = useMemo(() => [
      {
          id: 1,
          name: 'Chris Black',
          title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
          phone: 14184556091,
          initials: 'CB',
          image: '../images/hcm/placeholder-male-01.png'
      },
      {
          id: 2,
          name: 'Christine Cooper',
          title: 'Senior Principal Escalation Manager',
          phone: 16195668098,
          initials: 'CC',
          image: '../images/hcm/placeholder-female-01.png'
      },
      {
          id: 3,
          name: 'Chris Benalamore',
          title: 'Area Business Operations Director EMEA & JAPAC',
          phone: 16194559090,
          initials: 'CJ',
          image: '../images/hcm/placeholder-male-03.png'
      },
      {
          id: 4,
          name: 'Christopher Johnson',
          title: 'Vice-President HCM Application Development',
          phone: 13037662355,
          initials: 'SC',
          image: '../images/hcm/placeholder-male-04.png'
      },
      {
          id: 5,
          name: 'Samire Christian',
          title: 'Consulting Project Technical Manager',
          phone: 16195647455,
          initials: 'SM',
          image: '../images/hcm/placeholder-male-05.png'
      },
      {
          id: 6,
          name: 'Kurt Marchris',
          title: 'Customer Service Analyst',
          initials: 'KM',
          image: '../images/hcm/placeholder-male-06.png'
      },
      {
          id: 7,
          name: 'Zelda Christian Cooperman',
          title: 'Senior Principal Escalation Manager',
          phone: 16195668098,
          initials: 'ZC',
          image: '../images/hcm/placeholder-female-02.png'
      },
      {
          id: 8,
          name: 'Christian Wu',
          title: 'Senior Principal Escalation Manager',
          phone: 16195668098,
          initials: 'CW',
          image: '../images/hcm/placeholder-male-07.png'
      },
      {
          id: 9,
          name: 'Jennifer Christy',
          title: 'Area Business Operations Director EMEA & JAPAC',
          phone: 16194559090,
          initials: 'JC',
          image: '../images/hcm/placeholder-female-03.png'
      },
      {
          id: 10,
          name: 'Christine Ellis',
          title: 'Vice-President HCM Application Development',
          phone: 13037662355,
          initials: 'CE',
          image: '../images/hcm/placeholder-female-04.png'
      },
      {
          id: 11,
          name: 'Patrick Chrismon',
          title: 'Consulting Project Technical Manager',
          phone: 16195647455,
          initials: 'PC',
          image: '../images/hcm/placeholder-male-08.png'
      },
      {
          id: 12,
          name: 'Alfred Marchris',
          title: 'Principal Developer',
          phone: 16195668098,
          initials: 'AM',
          image: '../images/hcm/placeholder-male-13.png'
      }
  ], []);
  const layoutViewRadios = useMemo(() => [
      { id: 'card', icon: 'oj-ux-ico-grid-view-small' },
      { id: 'list', icon: 'oj-ux-ico-list-round' }
  ], []);
  const dataProvider = useMemo(() => new ArrayDataProvider<Data['id'], Data>(rawData, {
      keyAttributes: 'id'
  }), [rawData]);
  const smQuery: any = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);

  const handleActiveLayoutValueChanged = (event: PropertyChangedEvent<any>) => {
    setActiveLayout(event.detail.value);
  };

  const isSmall = () => {
      const smallScreen = createMediaQueryObservable(smQuery);
      if (smallScreen()) {
          setPrevActiveLayout(activeLayout);
          setActiveLayout('list');
      }
      else {
          setActiveLayout(prevActiveLayout);
      }
      return smallScreen();
  };

  return (
      <div id="listviewContainer">
            {
                  !isSmall() ? (
                    <>
                      <div class="oj-flex oj-sm-justify-content-flex-end">
                                <oj-buttonset-one display="icons" onvalueChanged={handleActiveLayoutValueChanged} value={activeLayout} chroming="borderless" class="oj-flex-item oj-sm-flex-initial oj-buttonset-width-auto" aria-label="Choose layout view.">
                                            {
                                                        (layoutViewRadios ?? []).map(($current, index) => (
                                                          <>
                                                            <oj-option value={$current.data.id} id={$current.data.id}>
                                                                              <span slot="startIcon" class={$current.data.icon} />
                                                                              <span>{$current.data.id}</span>
                                                                          </oj-option>
                                                          </>
                                                        ))
                                                      }
                                        </oj-buttonset-one>
                            </div>
                    </>
                  ) : null
                }
            <div class="demo-card-container">
                    <oj-list-view id="listview" aria-label="list with card layout" data={dataProvider} display={activeLayout} class={{ 'oj-listview-item-padding-off': 'true', 'oj-sm-padding-2x-bottom': activeLayout() === 'card' || false }}>
                              <template slot="itemTemplate" render={(item) => (
                                        <>
                                            {
                                                          activeLayout.peek() == 'list' ? (
                                                            <>
                                                              <oj-list-item-layout>
                                                                                <span class="oj-typography-body-md">{item.item.data.name}</span>
                                                                                <oj-avatar slot="leading" size="xs" src={item.item.data.image} />
                                                                                <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">{item.item.data.title}</span>
                                                                            </oj-list-item-layout>
                                                            </>
                                                          ) : null
                                                        }
                                            {
                                                          activeLayout.peek() == 'card' ? (
                                                            <>
                                                              <li class="demo-card">
                                                                                <oj-action-card>
                                                                                                    <demo-profile-card-layout name={item.item.data.name} work-title={item.item.data.title} initials={item.item.data.initials} image={item.item.data.image} />
                                                                                                </oj-action-card>
                                                                            </li>
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

export default ListViewCardLayoutListView;
