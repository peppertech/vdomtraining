import 'ojs/ojcheckboxset';
import type { ItemContext } from 'ojs/ojcommontypes';
import type { DataProvider } from 'ojs/ojdataprovider';
import 'ojs/ojinputsearch';
import type { InputSearchElement } from 'ojs/ojinputsearch';
import 'ojs/ojoption';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import DemoDelayingDataProvider from './DemoDelayingDataProvider';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type InputSearchValue = ComponentProps<'oj-input-search'>['value'];
type InputSearchValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-search'>['onvalueChanged']>
>[0];
type InputSearchRawValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-search'>['onrawValueChanged']>
>[0];
type CheckboxsetValue = ComponentProps<'oj-checkboxset'>['value'];
type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>
>[0];
type Suggestion = {
  value: string;
  label: string;
};
type InputSearchValueActionEvent = InputSearchElement.ojValueAction<string, Suggestion>;
type TrimmedItemContext = {
  key: ItemContext<string, Suggestion>['key'];
  data: ItemContext<string, Suggestion>['data'];
  metadata?: {
    key: NonNullable<ItemContext<string, Suggestion>['metadata']>['key'];
  };
};

const trimItemContext = (itemContext?: ItemContext<string, Suggestion> | null): string => {
  if (!itemContext) {
    return '';
  }

  const searchItemContext: TrimmedItemContext = {
    key: itemContext.key,
    data: itemContext.data
  };

  if (itemContext.metadata) {
    searchItemContext.metadata = {
      key: itemContext.metadata.key
    };
  }

  return JSON.stringify(searchItemContext);
};

const getCurrentTime = (): string => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
};

export const InputSearchSuggestions = () => {
  const [value, setValue] = useState<InputSearchValue>(undefined);
  const [rawValue, setRawValue] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [searchItemContext, setSearchItemContext] = useState<string>('');
  const [previousSearchTerm, setPreviousSearchTerm] = useState<string | undefined>(undefined);
  const [searchTimeStamp, setSearchTimeStamp] = useState<string>('');
  const [isDelayed, setIsDelayed] = useState<CheckboxsetValue>([]);
  const suggestions = useMemo<Suggestion[]>(
    () => [
      { value: 'IE', label: 'Internet Explorer' },
      { value: 'FF', label: 'Firefox' },
      { value: 'CH', label: 'Chrome' },
      { value: 'OP', label: 'Opera' },
      { value: 'SA', label: 'Safari' }
    ],
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<string, Suggestion>(suggestions, {
        keyAttributes: 'value'
      }),
    [suggestions]
  );
  const suggestionsDP = useMemo<DataProvider<string, Suggestion>>(() => {
    return isDelayed?.[0] === 'delay'
      ? new DemoDelayingDataProvider<string, Suggestion>(dataProvider, 1000)
      : dataProvider;
  }, [dataProvider, isDelayed]);

  const handleValueChanged = (event: InputSearchValueChangedEvent) => {
    setValue(event.detail.value);
  };

  const handleRawValueChanged = (event: InputSearchRawValueChangedEvent) => {
    setRawValue(event.detail.value);
  };

  const handleValueAction = (event: InputSearchValueActionEvent) => {
    setSearchTerm(event.detail.value);
    setSearchItemContext(trimItemContext(event.detail.itemContext));
    setPreviousSearchTerm(event.detail.previousValue);
    setSearchTimeStamp(getCurrentTime());
  };

  const handleDelayChanged = (event: CheckboxsetValueChangedEvent) => {
    setIsDelayed(event.detail.value ?? []);
  };

  return (
    <div id="containerDiv">
      <div class="oj-sm-margin-4x-bottom">
        <div>Value: {value ?? ''}</div>
        <div>Raw value: {rawValue ?? ''}</div>
        <div>ValueAction event search term: {searchTerm ?? ''}</div>
        <div>ValueAction event item context: {searchItemContext}</div>
        <div>ValueAction event previous search term: {previousSearchTerm ?? ''}</div>
        <div>ValueAction event last received: {searchTimeStamp}</div>
        <oj-checkboxset aria-label="Simulate Fetch Delay" value={isDelayed} onvalueChanged={handleDelayChanged}>
          <oj-option value="delay">Simulate Fetch Delay</oj-option>
        </oj-checkboxset>
      </div>
      <div>
        <oj-input-search
          id="search1"
          class="oj-form-control-max-width-md"
          suggestions={suggestionsDP}
          value={value}
          onvalueChanged={handleValueChanged}
          onrawValueChanged={handleRawValueChanged}
          onojValueAction={handleValueAction}
          placeholder="Search..."
          aria-label="My search field"
        />
      </div>
    </div>
  );
};

export default InputSearchSuggestions;
