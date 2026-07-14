import 'ojs/ojavatar';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import { KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import DemoDelayingTreeDataProvider from '../../../shared/DemoDelayingTreeDataProvider';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

interface Data {
    id: string;
    label: string;
    children: Array<Contact>;
}

interface Contact {
    id: number;
    name: string;
    title: string;
    image: string;
}

type InputNumberProps = ComponentProps<'oj-input-number'>;
type InputNumberValueChangedEvent = Parameters<NonNullable<InputNumberProps['onvalueChanged']>>[0];
type ContactsDataProvider = DemoDelayingTreeDataProvider<Data['id'], Data>;

export const ListViewProgressiveLoadHierListView = () => {
  const [delay, setDelay] = useState(2000);
  const [childDelay, setChildDelay] = useState(2000);

  const data = useMemo(() => [
      {
          id: 'a',
          label: 'A',
          children: [
              {
                  id: 1,
                  name: 'Alfred Marchris',
                  title: 'Principal Developer',
                  image: '/styles/images/hcm/placeholder-male-13.png'
              },
              {
                  id: 11,
                  name: 'Andrew Chrismon',
                  title: 'Consulting Project Technical Manager',
                  image: '/styles/images/hcm/placeholder-male-08.png'
              },
              {
                  id: 12,
                  name: 'Annett Christy',
                  title: 'Area Business Operations Director EMEA & JAPAC',
                  image: '/styles/images/hcm/placeholder-female-03.png'
              },
              {
                  id: 13,
                  name: 'Arthur Christian',
                  title: 'Consulting Project Technical Manager',
                  image: '/styles/images/hcm/placeholder-male-05.png'
              },
              {
                  id: 14,
                  name: 'Ashton Marchris',
                  title: 'Customer Service Analyst',
                  image: '/styles/images/hcm/placeholder-male-06.png'
              },
              {
                  id: 15,
                  name: 'Ava Christy',
                  title: 'Area Business Operations Director EMEA & JAPAC',
                  image: '/styles/images/hcm/placeholder-female-03.png'
              }
          ]
      },
      {
          id: 'b',
          label: 'B',
          children: [
              {
                  id: 2,
                  name: 'Brie Christian Cooperman',
                  title: 'Senior Principal Escalation Manager',
                  image: '/styles/images/hcm/placeholder-female-02.png'
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
                  image: '/styles/images/hcm/placeholder-female-01.png'
              },
              {
                  id: 31,
                  name: 'Chris Benalamore',
                  title: 'Area Business Operations Director EMEA & JAPAC',
                  image: '/styles/images/hcm/placeholder-male-03.png'
              },
              {
                  id: 32,
                  name: 'Christopher Johnson',
                  title: 'Vice-President HCM Application Development',
                  image: '/styles/images/hcm/placeholder-male-04.png'
              }
          ]
      }
  ], []);
  const [dataProvider, setDataProvider] = useState<ContactsDataProvider>(() => new DemoDelayingTreeDataProvider(new ArrayTreeDataProvider<Data['id'], Data>(data, {
      keyAttributes: 'id'
  }), delay, childDelay));
  const expanded = useMemo(() => new KeySetImpl(), []);

  const handleDelayValueChanged = (event: InputNumberValueChangedEvent) => {
    setDelay(event.detail.value ?? 2000);
  };

  const handleChildDelayValueChanged = (event: InputNumberValueChangedEvent) => {
    setChildDelay(event.detail.value ?? 2000);
  };

  const applyDelay = () => {
      setDataProvider(new DemoDelayingTreeDataProvider(new ArrayTreeDataProvider(data, { keyAttributes: 'id' }), delay, childDelay));
  };

  return (
      <div id="listviewContainer">
            <oj-form-layout max-columns={3} direction="row">
                <oj-input-number
                    id="fetch-delay-input"
                    min={0}
                    step={1000}
                    onvalueChanged={handleDelayValueChanged} value={delay} labelHint="Fetch delay (ms)" />
                <oj-input-number
                    id="fetch-child-delay-input"
                     min={0}
                     step={1000}
                    onvalueChanged={handleChildDelayValueChanged} value={childDelay} labelHint="Fetch delay for expanding a node (ms)" />
                    <oj-button class="oj-button-lg" onojAction={applyDelay}>Apply</oj-button>
                </oj-form-layout>
            <h5>Contacts</h5>
            <oj-list-view id="listview" aria-label="contacts list" data={dataProvider} expanded={expanded} group-header-position="static" class="oj-listview-item-padding-off" {...{ 'item.enter-key-focus-behavior': "focusWithin" }}>
                    <template slot="itemTemplate" render={(item) => (
                            <>
                                {
                                            item.leaf ? (
                                              <>
                                                <oj-list-item-layout>
                                                                <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
                                                                <span slot="secondary" class="oj-typography-body-xs oj-text-color-secondary">{item.data.title}</span>
                                                                <oj-avatar slot="leading" size="xs" src={item.data.image} />
                                                            </oj-list-item-layout>
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

export default ListViewProgressiveLoadHierListView;
