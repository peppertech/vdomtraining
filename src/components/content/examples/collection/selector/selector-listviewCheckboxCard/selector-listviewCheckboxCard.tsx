import 'css!./demo.css';
import { AllKeySetImpl,KeySet,KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojlistview';
import type { ojListView } from 'ojs/ojlistview';
import 'ojs/ojselector';
import type { SelectorElement } from 'ojs/ojselector';
import * as preact from 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useRef,useState } from 'preact/hooks';
import '../../../../../jet-composites/demo-profile-card-layout/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type CardEmployee = {
  id: string;
  name: string;
  title: string;
  initials: string;
  image: string;
};

type SelectedKeySet = KeySet<CardEmployee['id']>;
type ItemTemplateContext = ojListView.ItemTemplateContext<CardEmployee['id'], CardEmployee>;
type ListViewSelectedChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-list-view'>['onselectedChanged']>
>[0];

const createEmptySelection = () => new KeySetImpl<CardEmployee['id']>() as SelectedKeySet;

const getSelectionKeys = (selected: SelectedKeySet) => {
  if (selected.isAddAll()) {
    return Array.from((selected as AllKeySetImpl<CardEmployee['id']>).deletedValues());
  }

  return Array.from((selected as KeySetImpl<CardEmployee['id']>).values());
};

const getSelectionSignature = (selected: SelectedKeySet) =>
  `${selected.isAddAll() ? 'all' : 'keys'}:${getSelectionKeys(selected).sort().join('|')}`;

const getDisplayValue = (selected: SelectedKeySet) => {
  if (selected.isAddAll()) {
    const deletedValues = getSelectionKeys(selected);

    return deletedValues.length > 0
      ? `Everything selected except: ${JSON.stringify(deletedValues)}`
      : 'Everything selected';
  }

  return JSON.stringify(getSelectionKeys(selected));
};

export const SelectorListviewCheckboxCard = () => {
  const initialSelectedItems = useMemo(createEmptySelection, []);
  const [selectedDisplayValue, setSelectedDisplayValue] = useState(
    getDisplayValue(initialSelectedItems)
  );
  const listViewRef = useRef<HTMLElement | null>(null);
  const selectedItemsRef = useRef<SelectedKeySet>(initialSelectedItems);
  const selectedSignatureRef = useRef(getSelectionSignature(initialSelectedItems));
  const rawData = useMemo<CardEmployee[]>(
    () => [
      {
        id: 'Chris Black',
        name: 'Chris Black',
        title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
        initials: 'CB',
        image: '/styles/images/hcm/placeholder-male-01.png'
      },
      {
        id: 'Christine Cooper',
        name: 'Christine Cooper',
        title: 'Senior Principal Escalation Manager',
        initials: 'CC',
        image: '/styles/images/hcm/placeholder-female-01.png'
      },
      {
        id: 'Chris Benalamore',
        name: 'Chris Benalamore',
        title: 'Area Business Operations Director EMEA & JAPAC',
        initials: 'CJ',
        image: '/styles/images/hcm/placeholder-male-03.png'
      },
      {
        id: 'Chris Johnson',
        name: 'Chris Johnson',
        title: 'Vice-President HCM Application Development',
        initials: 'SC',
        image: '/styles/images/hcm/placeholder-male-04.png'
      },
      {
        id: 'Samire Christian',
        name: 'Samire Christian',
        title: 'Consulting Project Technical Manager',
        initials: 'SM',
        image: '/styles/images/hcm/placeholder-male-05.png'
      },
      {
        id: 'Kurt Marchris',
        name: 'Kurt Marchris',
        title: 'Customer Service Analyst',
        initials: 'KM',
        image: '/styles/images/hcm/placeholder-male-06.png'
      },
      {
        id: 'Zelda Cooperman',
        name: 'Zelda Cooperman',
        title: 'Senior Principal Escalation Manager',
        initials: 'ZC',
        image: '/styles/images/hcm/placeholder-female-02.png'
      },
      {
        id: 'Christian Wu',
        name: 'Christian Wu',
        title: 'Senior Principal Escalation Manager',
        initials: 'CW',
        image: '/styles/images/hcm/placeholder-male-07.png'
      }
    ],
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<CardEmployee['id'], CardEmployee>(rawData, {
        keyAttributes: 'id'
      }),
    [rawData]
  );
  const listViewItemConfig = useMemo(() => ({ enterKeyFocusBehavior: 'focusWithin' }), []);

  const syncRenderedSelectors = useCallback((selectedKeys: SelectedKeySet) => {
    listViewRef.current
      ?.querySelectorAll('oj-selector')
      .forEach((selector) => {
        (selector as SelectorElement<CardEmployee['id']>).selectedKeys = selectedKeys;
      });
  }, []);

  const updateSelectedItems = useCallback((nextSelectedItems: SelectedKeySet | null) => {
    const nextSelection = nextSelectedItems ?? createEmptySelection();
    const nextSignature = getSelectionSignature(nextSelection);

    if (nextSignature === selectedSignatureRef.current) {
      return;
    }

    selectedItemsRef.current = nextSelection;
    selectedSignatureRef.current = nextSignature;

    const listView = listViewRef.current as
      | (HTMLElement & { selected?: SelectedKeySet })
      | null;

    if (listView && listView.selected !== nextSelection) {
      listView.selected = nextSelection;
    }

    syncRenderedSelectors(nextSelection);
    setSelectedDisplayValue(getDisplayValue(nextSelection));
  }, [syncRenderedSelectors]);

  const handleSelectedChanged = useCallback((event: ListViewSelectedChangedEvent) => {
    updateSelectedItems(event.detail.value as SelectedKeySet | null);
  }, [updateSelectedItems]);

  const handleSelectorChanged = useCallback(
    (event: SelectorElement.selectedKeysChanged<CardEmployee['id']>) => {
      updateSelectedItems(event.detail.value as SelectedKeySet | null);
    },
    [updateSelectedItems]
  );

  const renderItemTemplate = useCallback((item: ItemTemplateContext) => (
    <li class="selector-card-item">
      <div class="selector-card-action oj-panel">
        {preact.h("demo-profile-card-layout", {
          name: item.data.name,
          workTitle: item.data.title,
          initials: item.data.initials,
          image: item.data.image,
        })}
      </div>
      <div class="selector-card-checkbox">
        <oj-selector
          aria-label={`Select ${item.data.name}`}
          data-oj-clickthrough="disabled"
          selectedKeys={selectedItemsRef.current}
          onselectedKeysChanged={handleSelectorChanged}
          rowKey={item.key}
          selectionMode="multiple"
        />
      </div>
    </li>
  ), [handleSelectorChanged]);

  return (
    <div id="listViewContainer">
      <oj-list-view
        id="listview"
        ref={listViewRef}
        aria-label="list to show selection features"
        class="selector-card-list-view oj-listview-item-padding-off oj-sm-padding-2x-bottom"
        display="card"
        data={dataProvider}
        selected={initialSelectedItems}
        onselectedChanged={handleSelectedChanged}
        selectionMode="multiple"
        item={listViewItemConfig}
      >
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-list-view>
      <div class="oj-label">
        <br />
        <label for="curr-selection">Current Selection</label>
        <div>{selectedDisplayValue}</div>
      </div>
    </div>
  );
};

export default SelectorListviewCheckboxCard;
