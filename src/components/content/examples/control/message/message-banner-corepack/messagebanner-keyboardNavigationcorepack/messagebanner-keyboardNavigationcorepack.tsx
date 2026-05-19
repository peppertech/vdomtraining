import { h } from 'preact';
import { useMemo, useRef } from 'preact/hooks';
import { MessageBannerItem, CMessageBannerElement } from 'oj-c/message-banner';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'oj-c/message-banner';
import 'ojs/ojbutton';

type DemoMessageBannerItem = MessageBannerItem & {
    id: string;
};

export const MessagebannerKeyboardNavigationcorepack = () => {
  const initialData: DemoMessageBannerItem[] = [
      {
          id: 'warningMessage',
          severity: 'warning',
          summary: 'Warning message summary',
          detail: 'Warning message detail',
          timestamp: new Date().toISOString()
      }
  ];
  const counterRef = useRef(0);

  const messages = useMemo(() => new MutableArrayDataProvider<string, DemoMessageBannerItem>(initialData, {
      keyAttributes: 'id'
  }), []);
  const personalInformationMessages = useMemo(() => new MutableArrayDataProvider<string, DemoMessageBannerItem>([], {
      keyAttributes: 'id'
  }), []);
  const employmentInformationMessages = useMemo(() => new MutableArrayDataProvider<string, DemoMessageBannerItem>([], {
      keyAttributes: 'id'
  }), []);

  const closeMessage = (event: CMessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
      // remove the message from the data to close it
      let data = messages.data.slice();
      const closeMessageKey = event.detail.key;
      data = data.filter((message) => message.id !== closeMessageKey);
      messages.data = data;
  };

  const closePersonalInformationMessage = (event: CMessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
      // remove the message from the data to close it
      let data = personalInformationMessages.data.slice();
      const closeMessageKey = event.detail.key;
      data = data.filter((message) => message.id !== closeMessageKey);
      personalInformationMessages.data = data;
  };

  const closeEmploymentInformationMessage = (event: CMessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
      // remove the message from the data to close it
      let data = employmentInformationMessages.data.slice();
      const closeMessageKey = event.detail.key;
      data = data.filter((message) => message.id !== closeMessageKey);
      employmentInformationMessages.data = data;
  };

  const updatePersonalInfo = () => {
      // remove the message from the data to close it
      let data = personalInformationMessages.data.slice();
      data.push({
          id: `message-${++counterRef.current}`,
          severity: 'confirmation',
          summary: 'Updated personal information',
          detail: 'The provided personal information of the employee has been updated in the database.'
      });
      personalInformationMessages.data = data;
  };

  const updateEmploymentInfo = () => {
      // remove the message from the data to close it
      let data = employmentInformationMessages.data.slice();
      data.push({
          id: `message-${++counterRef.current}`,
          severity: 'confirmation',
          summary: 'Updated employment information',
          detail: 'The provided employment information of the employee has been updated in the database.'
      });
      employmentInformationMessages.data = data;
  };

  return (
      <div id="containerDiv">
            <header id="pageHeader" role="banner" class="oj-web-applayout-header">
                    <div class="oj-flex-bar oj-sm-align-items-center">
                              <div class="oj-flex-bar-middle oj-sm-align-items-baseline">
                                          <span role="img" class="oj-icon demo-oracle-icon" title="Oracle Logo" />
                                          <h1 class="oj-sm-only-hide oj-web-applayout-header-title" title="Application Name">Application Name</h1>
                                      </div>
                          </div>
                </header>
            <oj-c-message-banner data={messages} type="page" onojClose={closeMessage} />
            <div class="oj-web-padding" role="main">
                    <div class="oj-typography-heading-md oj-sm-margin-5x-bottom">Personal Information</div>
                    <oj-c-message-banner data={personalInformationMessages} type="section" onojClose={closePersonalInformationMessage} />
                    <oj-form-layout class="oj-sm-margin-5x-top" direction="row" maxColumns={3}>
                              <oj-input-text labelHint="Employee Name" required />
                              <oj-input-text labelHint="Employee DOB" required />
                              <oj-input-text labelHint="Employee Email" required />
                          </oj-form-layout>
                    <oj-button chroming="outlined" onojAction={updatePersonalInfo}>Update</oj-button>
                    <div class="oj-typography-heading-md oj-sm-margin-5x-vertical">Employment Information</div>
                    <oj-c-message-banner data={employmentInformationMessages} type="section" onojClose={closeEmploymentInformationMessage} />
                    <oj-form-layout class="oj-sm-margin-5x-top" direction="row" maxColumns={3}>
                              <oj-input-text labelHint="Job Title" />
                              <oj-input-text labelHint="Job Location" />
                              <oj-input-text labelHint="Department" />
                          </oj-form-layout>
                    <oj-button chroming="outlined" onojAction={updateEmploymentInfo}>Update</oj-button>
                </div>
        </div>
    );
};

export default MessagebannerKeyboardNavigationcorepack;
