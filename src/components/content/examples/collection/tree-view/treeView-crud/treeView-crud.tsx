import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as jsonDataText from 'text!../../data/cookbook/dataprovider/bufferingTreeDataProvider/mutation/treeViewData.json';
import { MutableArrayTreeDataProvider } from 'ojs/ojmutablearraytreedataprovider';
import { addNode, findPathByData, removeNode as removeTreeNode, replaceNode } from 'ojs/ojimmutabletreedatautils';
import { AllKeySetImpl, KeySetImpl } from 'ojs/ojkeyset';
import 'css!./demo.css';
import 'ojs/ojtreeview';
import 'ojs/ojinputtext';
import 'ojs/ojtoolbar';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojlabel';

interface TreeviewItem {
  title: string;
  id: string;
  children?: Array<TreeviewItem>;
}

type TreeViewExpanded = NonNullable<ComponentProps<'oj-tree-view'>['expanded']>;
type TreeViewSelected = NonNullable<ComponentProps<'oj-tree-view'>['selected']>;
type TreeViewExpandedChangedEvent = Parameters<NonNullable<ComponentProps<'oj-tree-view'>['onexpandedChanged']>>[0];
type TreeViewSelectedChangedEvent = Parameters<NonNullable<ComponentProps<'oj-tree-view'>['onselectedChanged']>>[0];
type InputTextChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0];

type MutateMetadata = Iterable<{ key: string }>;
type MutateEventDetail = {
  add?: { metadata?: MutateMetadata };
  update?: { metadata?: MutateMetadata };
  remove?: { metadata?: MutateMetadata };
};
type RefreshEventDetail = { keys?: Iterable<string> };

const initialTreeData = JSON.parse(jsonDataText as string) as TreeviewItem[];

const getFirstKey = (value: TreeViewSelected) => {
  const iterator = (value as KeySetImpl<string>).values()[Symbol.iterator]();
  const next = iterator.next();
  return next.done ? undefined : (next.value as string);
};

const getMetadataKeys = (metadata?: MutateMetadata) => {
  if (!metadata) {
    return '';
  }
  return Array.from(metadata, (item) => item.key).join();
};

export const TreeViewCrud = () => {
  const [addEvtDisabled, setAddEvtDisabled] = useState(false);
  const [removeEvtDisabled, setRemoveEvtDisabled] = useState(true);
  const [eventStatus, setEventStatus] = useState('');
  const [expanded, setExpanded] = useState<TreeViewExpanded>(new AllKeySetImpl<string>());
  const [selected, setSelected] = useState<TreeViewSelected>(new KeySetImpl<string>());
  const [selectedNodeTitle, setSelectedNodeTitle] = useState('');
  const [, setTreeVersion] = useState(0);

  const immutableDataRef = useRef<TreeviewItem[]>(initialTreeData);
  const newNodeCounterRef = useRef(0);
  const mutateListenerRef = useRef<(event: Event) => void>();
  const refreshListenerRef = useRef<(event: Event) => void>();

  const mutableATDP = useMemo(
    () =>
      new MutableArrayTreeDataProvider<string, TreeviewItem>(immutableDataRef.current, 'id', {
        keyAttributeScope: 'global',
        childrenAttribute: 'children'
      }),
    []
  );

  if (!mutateListenerRef.current) {
    mutateListenerRef.current = (event: Event) => {
      const detail = (event as CustomEvent<MutateEventDetail>).detail;
      const lines: string[] = [`\tEvent 'mutate' triggered:`];
      if (detail?.add) {
        lines.push(`\t\t'add' with key: ${getMetadataKeys(detail.add.metadata)}.`);
      }
      if (detail?.update) {
        lines.push(`\t\t'update' with key: ${getMetadataKeys(detail.update.metadata)}.`);
      }
      if (detail?.remove) {
        lines.push(`\t\t'remove' with key: ${getMetadataKeys(detail.remove.metadata)}.`);
      }
      setEventStatus((current) => `${current}${lines.join('\n')}\n`);
    };
  }

  if (!refreshListenerRef.current) {
    refreshListenerRef.current = (event: Event) => {
      const detail = (event as CustomEvent<RefreshEventDetail>).detail;
      const keys = detail?.keys ? Array.from(detail.keys) : [];
      const suffix = keys.length > 0 ? ` with key: ${keys.join()}` : '';
      setEventStatus((current) => `${current}\tEvent 'refresh' triggered${suffix}.\n`);
    };
  }

  const selectedKey = getFirstKey(selected);
  const treeIsEmpty = immutableDataRef.current.length === 0;
  const addSiblingLabel = treeIsEmpty ? 'Add Node' : 'Add Sibling';

  const syncProviderData = () => {
    mutableATDP.data = immutableDataRef.current;
    setTreeVersion((value) => value + 1);
  };

  const fetchNodeById = async (id: string) => {
    const result = await mutableATDP.fetchByKeys({ keys: new Set<string>([id]) });
    return result.results.get(id)?.data;
  };

  const handleSelectedNodeTitleValueChanged = (event: InputTextChangedEvent) => {
    setSelectedNodeTitle(event.detail.value ?? '');
  };

  const handleExpandedExpandedChanged = (event: TreeViewExpandedChangedEvent) => {
    setExpanded(event.detail.value as TreeViewExpanded);
  };

  const updateNode = async () => {
    if (!selectedKey) {
      return;
    }

    const nodeData = await fetchNodeById(selectedKey);
    if (!nodeData) {
      return;
    }

    const path = findPathByData(immutableDataRef.current, nodeData);
    const updatedNode: TreeviewItem = { ...nodeData, title: selectedNodeTitle };
    immutableDataRef.current = replaceNode(immutableDataRef.current, path, updatedNode);
    setEventStatus((current) => `${current}\nUpdate at '${selectedKey}':\n`);
    syncProviderData();
  };

  const addChildNode = async () => {
    if (!selectedKey) {
      return;
    }

    const nodeData = await fetchNodeById(selectedKey);
    if (!nodeData) {
      return;
    }

    newNodeCounterRef.current += 1;
    const newNode: TreeviewItem = {
      title: selectedNodeTitle,
      id: newNodeCounterRef.current.toString()
    };
    const path = findPathByData(immutableDataRef.current, nodeData);
    path.push(0);
    immutableDataRef.current = addNode(immutableDataRef.current, path, newNode);
    setEventStatus((current) => `${current}\nAdd Child under '${selectedKey}':\n`);
    syncProviderData();
  };

  const addSiblingNode = async () => {
    newNodeCounterRef.current += 1;
    const newNode: TreeviewItem = {
      title: selectedNodeTitle,
      id: newNodeCounterRef.current.toString()
    };

    if (treeIsEmpty) {
      immutableDataRef.current = [newNode];
      setSelected(new KeySetImpl<string>().add([newNode.id]));
      setEventStatus((current) => `${current}\nAdd root node '${newNode.id}':\n`);
      syncProviderData();
      return;
    }

    if (!selectedKey) {
      return;
    }

    const nodeData = await fetchNodeById(selectedKey);
    if (!nodeData) {
      return;
    }

    const path = findPathByData(immutableDataRef.current, nodeData);
    immutableDataRef.current = addNode(immutableDataRef.current, path, newNode);
    setEventStatus((current) => `${current}\nAdd Sibling next to '${selectedKey}':\n`);
    syncProviderData();
  };

  const removeNode = async () => {
    if (!selectedKey) {
      return;
    }

    const nodeData = await fetchNodeById(selectedKey);
    if (!nodeData) {
      return;
    }

    const path = findPathByData(immutableDataRef.current, nodeData);
    immutableDataRef.current = removeTreeNode(immutableDataRef.current, path);
    setSelected(new KeySetImpl<string>());
    setSelectedNodeTitle('');
    setEventStatus((current) => `${current}\nRemove '${selectedKey}':\n`);
    syncProviderData();
  };

  const toggleEvents = (action: 'add' | 'remove') => {
    if (action === 'add') {
      mutableATDP.addEventListener('mutate', mutateListenerRef.current!);
      mutableATDP.addEventListener('refresh', refreshListenerRef.current!);
      setAddEvtDisabled(true);
      setRemoveEvtDisabled(false);
      setEventStatus((current) => `${current}Event listeners for 'mutate' and 'refresh' are added.\n`);
      return;
    }

    mutableATDP.removeEventListener('mutate', mutateListenerRef.current!);
    mutableATDP.removeEventListener('refresh', refreshListenerRef.current!);
    setAddEvtDisabled(false);
    setRemoveEvtDisabled(true);
    setEventStatus((current) => `${current}Event listeners for 'mutate' and 'refresh' are removed.\n`);
  };

  const selectedChanged = (event: TreeViewSelectedChangedEvent) => {
    const nextSelected = event.detail.value as TreeViewSelected;
    setSelected(nextSelected);
    const id = getFirstKey(nextSelected);

    if (!id) {
      setSelectedNodeTitle('');
      return;
    }

    void fetchNodeById(id).then((nodeData) => {
      setSelectedNodeTitle(nodeData?.title ?? '');
    });
  };

  return (
    <div id="treeview-container">
      <div class="oj-flex">
        <div class="oj-flex-item">
          <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-2x">
            <h6 id="h1">Options To Control The CRUD Operations Below</h6>
            <oj-toolbar
              id="demoToolBar"
              aria-label="Editing Toolbar"
              aria-controls="controlled"
              chroming="outlined"
            >
              <oj-button
                id="buttonSibling"
                onojAction={addSiblingNode}
                disabled={!treeIsEmpty && !selectedKey}
              >
                <span>{addSiblingLabel}</span>
              </oj-button>
              <oj-button id="buttonChild" onojAction={addChildNode} disabled={!selectedKey}>
                Add Child
              </oj-button>
              <oj-button id="buttonRemove" onojAction={removeNode} disabled={!selectedKey}>
                Remove
              </oj-button>
              <oj-button id="buttonUpdate" onojAction={updateNode} disabled={!selectedKey}>
                Update
              </oj-button>
            </oj-toolbar>
            <oj-label for="inputItem">New Node Text:</oj-label>
            <oj-input-text
              id="inputItem"
              onvalueChanged={handleSelectedNodeTitleValueChanged}
              value={selectedNodeTitle}
              labelHint="Node Text"
            />
          </div>
          <oj-tree-view
            id="treeview"
            selected={selected}
            data={mutableATDP}
            selectionMode="single"
            onexpandedChanged={handleExpandedExpandedChanged}
            expanded={expanded}
            onselectedChanged={selectedChanged}
            aria-label="Tree View Mutation Demo"
          >
            <template
              slot="itemTemplate"
              render={(row: { data: TreeviewItem }) => (
                <>
                  <span class="oj-treeview-item-icon" />
                  <span class="oj-treeview-item-text">{row.data.title}</span>
                </>
              )}
            />
          </oj-tree-view>
        </div>
        <div class="oj-flex-item oj-panel oj-bg-neutral-30 oj-sm-margin-2x">
          <div>
            <oj-button id="addEventsButton" onojAction={() => toggleEvents('add')} disabled={addEvtDisabled}>
              Add Event Listeners
            </oj-button>
            <oj-button
              id="removeEventsButton"
              onojAction={() => toggleEvents('remove')}
              disabled={removeEvtDisabled}
            >
              Remove Event Listeners
            </oj-button>
          </div>
          <oj-text-area
            id="eventStatus"
            labelHint="Event status"
            readonly={true}
            maxRows={-1}
            class="oj-sm-web-padding-vertical"
            value={eventStatus}
          />
          <oj-form-layout readonly={false} colspanWrap="wrap" maxColumns={1} direction="row" />
        </div>
      </div>
    </div>
  );
};

export default TreeViewCrud;
