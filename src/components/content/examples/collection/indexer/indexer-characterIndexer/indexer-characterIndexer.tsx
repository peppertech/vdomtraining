import { useMemo, useRef } from 'preact/hooks';
import { ojListView } from 'ojs/ojlistview';
import { IndexerModel } from 'ojs/ojindexer';
import IndexerModelTreeDataProvider = require('ojs/ojindexermodeltreedataprovider');
import * as contactsText from 'text!./contacts.json';
import 'ojs/ojindexer';
import 'ojs/ojlistview';
import 'css!./demo.css';

type Contact = {
  id: string;
  first: string;
  last: string;
};

type GroupData = {
  id?: string | null;
  label?: string;
};

type ListRow = Contact | GroupData | string;

const contacts = JSON.parse(contactsText) as Contact[];

const isContact = (value: ListRow): value is Contact => {
  return typeof value !== 'string' && 'first' in value && 'last' in value;
};

const isGroupData = (value: ListRow): value is GroupData => {
  return typeof value !== 'string' && !('first' in value);
};

export const IndexerCharacterIndexer = () => {
  const listViewRef = useRef<ojListView<string, ListRow> | null>(null);
  const dataProviderRef = useRef<IndexerModelTreeDataProvider<string, ListRow> | null>(null);

  const findAvailableSection = (section: IndexerModel.Section): IndexerModel.Section | null => {
    const dataProvider = dataProviderRef.current;
    if (!dataProvider) {
      return null;
    }

    const missingSections = dataProvider.getMissingSections();
    if (missingSections.indexOf(section) > -1) {
      const sections = dataProvider.getIndexableSections();
      const index = sections.indexOf(section);
      if (index + 1 < sections.length) {
        return findAvailableSection(sections[index + 1]);
      }

      return null;
    }

    return section;
  };

  const handleSectionClick = (section: IndexerModel.Section): Promise<IndexerModel.Section> => {
    return new Promise((resolve) => {
      const availableSection = findAvailableSection(section);
      if (availableSection != null && typeof availableSection === 'string' && listViewRef.current) {
        listViewRef.current.scrollPosition = { key: availableSection };
        resolve(availableSection);
        return;
      }

      resolve(section);
    });
  };

  const dataProvider = useMemo(() => {
    const provider = new IndexerModelTreeDataProvider<string, ListRow>(contacts, {
      keyAttributes: 'id',
      groupingAttribute: 'last',
      sectionChangeHandler: handleSectionClick
    });

    dataProviderRef.current = provider;
    return provider;
  }, []);

  const itemTemplateRenderer = (item: ojListView.ItemTemplateContext<string, ListRow>) => {
    if (item.leaf && isContact(item.data)) {
      return (
        <>
          <span>{item.data.first}</span>
          <span> </span>
          <span class="oj-typography-bold">{item.data.last}</span>
        </>
      );
    }

    if (typeof item.data === 'string') {
      return <span>{item.data}</span>;
    }

    if (isGroupData(item.data) && item.data.id != null) {
      return <span>{item.data.label ?? ''}</span>;
    }

    if (isGroupData(item.data)) {
      return <span>{item.data.label ?? ''}</span>;
    }

    return <span />;
  };

  return (
    <div id="container">
      <div id="listviewcontainer" class="oj-flex oj-sm-flex-wrap-nowrap demo-listview-container">
        <oj-list-view
          id="listview"
          ref={listViewRef}
          aria-label="list of contacts"
          data={dataProvider}
          drillMode="none"
          class="oj-flex-item"
        >
          <template slot="itemTemplate" render={itemTemplateRenderer} />
        </oj-list-view>
        <oj-indexer
          id="indexer"
          aria-label="indexer"
          aria-controls="listview"
          data={dataProvider}
          class="oj-sm-flex-initial oj-flex-item"
        />
      </div>
    </div>
  );
};

export default IndexerCharacterIndexer;
