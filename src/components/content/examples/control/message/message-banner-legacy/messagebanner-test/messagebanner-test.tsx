import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojmessagebanner';
import { MessageBannerElement,MessageBannerItem } from 'ojs/ojmessagebanner';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojselectsingle';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
// import 'ojs/ojtextarea';

type DemoMessageBannerItem = MessageBannerItem & {
    id: string;
};

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const MessagebannerTest = () => {
  const initialData: DemoMessageBannerItem[] = [
      {
          id: 'error1',
          severity: 'error',
          summary: 'First Error',
          detail: 'I am the first error message',
          closeAffordance: 'off'
      },
      {
          id: 'warning1',
          severity: 'warning',
          summary: 'First Warning',
          detail: 'I am the first warning message',
          timestamp: new Date().toISOString()
      },
      {
          id: 'confirmation1',
          severity: 'confirmation',
          summary: 'First Confirmation',
          detail: 'I am the first confirmation message'
      }
  ];

  const messages = useMemo(() => new MutableArrayDataProvider(initialData, {
      keyAttributes: 'id'
  }), []);
  const [messageType, setMessageType] = useState<'page' | 'section'>('page');
  const [summary, setSummary] = useState<string | undefined>(undefined);
  const [detail, setDetail] = useState<string | undefined>(undefined);
  const [severity, setSeverity] = useState<string | undefined>(undefined);
  const [currentData, setCurrentData] = useState<string>(JSON.stringify(initialData, null, '  '));

  const severities = useMemo(() => new ArrayDataProvider([
      { value: 'error', label: 'error' },
      { value: 'warning', label: 'warning' },
      { value: 'confirmation', label: 'confirmation' },
      { value: 'info', label: 'info' },
      { value: 'none', label: 'none' }
  ], { keyAttributes: 'value' }), []);
  const [counter, setCounter] = useState(0);

  const handleMessageTypeValueChanged = (event: PropertyChangedEvent<'page' | 'section'>) => {
    setMessageType(event.detail.value);
  };

  const handleSummaryValueChanged = (event: PropertyChangedEvent<string>) => {
    setSummary(event.detail.value);
  };

  const handleDetailValueChanged = (event: PropertyChangedEvent<string>) => {
    setDetail(event.detail.value);
  };

  const handleSeverityValueChanged = (event: PropertyChangedEvent<string>) => {
    setSeverity(event.detail.value);
  };

  const handleCurrentDataValueChanged = (event: PropertyChangedEvent<string>) => {
    setCurrentData(event.detail.value);
  };

  const randomAddRemoveMessages = () => {
      const data1: DemoMessageBannerItem[] = [
          {
              id: 'error2',
              severity: 'error',
              summary: 'Second Error',
              detail: 'I am the second error message',
              closeAffordance: 'off'
          },
          {
              id: 'warning2',
              severity: 'warning',
              summary: 'Second Warning',
              detail: 'I am the second warning message',
              timestamp: new Date().toISOString()
          },
          {
              id: 'confirmation13',
              severity: 'confirmation',
              summary: 'Second Confirmation',
              detail: 'I am the second confirmation message'
          },
          {
              id: 'error21',
              severity: 'error',
              summary: 'Second Error',
              detail: 'I am the second error message',
              closeAffordance: 'off'
          },
          {
              id: 'warning22',
              severity: 'warning',
              summary: 'Second Warning',
              detail: 'I am the second warning message',
              timestamp: new Date().toISOString()
          },
          {
              id: 'confirmation131',
              severity: 'confirmation',
              summary: 'Second Confirmation',
              detail: 'I am the second confirmation message'
          }
      ];
      const data2 = data1.slice(0, 1);
      const data3: DemoMessageBannerItem[] = [
          {
              id: 'warning25',
              severity: 'warning',
              summary: 'Thrid Warning',
              detail: 'I am the third warning message',
              timestamp: new Date().toISOString()
          }
      ];
      setTimeout(() => (messages.data = data1), 1000);
      setTimeout(() => (messages.data = data2), 1050);
      setTimeout(() => (messages.data = data3), 1100);
      setTimeout(() => (messages.data = data1), 1150);
  };

  const closeMessage = (event: MessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
      let data = messages.data.slice() as DemoMessageBannerItem[];
      const closeMessageKey = event.detail.key;
      data = data.filter((message: DemoMessageBannerItem) => message.id !== closeMessageKey);
      messages.data = data;
  };

  const addMessage = () => {
      const currentSummary = summary;
      const currentDetail = detail;
      const currentSeverity = severity;
      const data = messages.data.slice() as DemoMessageBannerItem[];
      if (!(currentSummary && currentSeverity)) {
          alert('Fill in all the required fields');
          return;
      }
      const nextCounter = counter + 1;
      const newMessage = {
          id: `message${nextCounter}`,
          summary: currentSummary,
          detail: currentDetail,
          severity: currentSeverity
      } as DemoMessageBannerItem;
      data.unshift(newMessage);
      messages.data = data;
      setCounter(nextCounter);
      setSummary(undefined);
      setDetail(undefined);
      setSeverity(undefined);
  };

  const updateData = () => {
      const dataString = currentData;
      let data;
      try {
          if (!dataString)
              throw Error();
          data = JSON.parse(dataString);
      }
      catch {
          alert('Enter valid JSON for data');
          return;
      }
      messages.data = data;
  };

  return (
      <div id="containerDiv">
            <oj-message-banner data={messages} type={messageType} onojClose={closeMessage} />
            <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
                    <div class="oj-header-border oj-typography-subheading-md">Messages settings</div>
                    <div class="oj-flex oj-sm-padding-4x">
                              <div class="oj-flex-item oj-sm-padding-4x-horizontal">
                                          <oj-form-layout>
                                                        <oj-radioset onvalueChanged={handleMessageTypeValueChanged} value={messageType} label-hint="Message type">
                                                                        <oj-option value="page">Page</oj-option>
                                                                        <oj-option value="section">Section</oj-option>
                                                                    </oj-radioset>
                                                    </oj-form-layout>
                                          <oj-button onojAction={randomAddRemoveMessages}>Randomize Data</oj-button>
                                      </div>
                              <div class="oj-flex-item oj-sm-padding-4x-horizontal">
                                          <oj-form-layout>
                                                        <oj-input-text label-hint="Summary" onvalueChanged={handleSummaryValueChanged} value={summary} required />
                                                        <oj-text-area label-hint="Detail" onvalueChanged={handleDetailValueChanged} value={detail} />
                                                        <oj-select-single data={severities} label-hint="Severity" onvalueChanged={handleSeverityValueChanged} value={severity} required />
                                                    </oj-form-layout>
                                          <oj-button onojAction={addMessage}>Add Message</oj-button>
                                      </div>
                              <div class="oj-flex-item oj-sm-padding-4x-horizontal">
                                          <oj-form-layout>
                                                        <oj-text-area label-hint="Data" onvalueChanged={handleCurrentDataValueChanged} value={currentData} rows={11} required />
                                                    </oj-form-layout>
                                          <oj-button onojAction={updateData}>Update Data</oj-button>
                                      </div>
                          </div>
                </div>
        </div>
    );
};

export default MessagebannerTest;
