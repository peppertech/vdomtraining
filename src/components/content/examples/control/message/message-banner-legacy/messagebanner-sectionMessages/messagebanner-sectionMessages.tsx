import { h } from 'preact';
import { useMemo, useRef } from 'preact/hooks';
import { MessageBannerItem, MessageBannerElement } from 'ojs/ojmessagebanner';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojmessagebanner';
import 'ojs/ojbutton';

type DemoMessageBannerItem = MessageBannerItem & {
    id: string;
};

export const MessagebannerSectionMessages = () => {
  const initialPersonalSectionData: DemoMessageBannerItem[] = [
      {
          id: 'message',
          severity: 'confirmation',
          summary: 'Updated personal information',
          detail: 'The provided personal information of the employee has been updated in the database.',
          timestamp: new Date().toISOString()
      }
  ];
  const initialEmploymentSectionData: DemoMessageBannerItem[] = [
      {
          id: 'message',
          severity: 'confirmation',
          summary: 'Updated employment information',
          detail: 'The provided employment information of the employee has been updated in the database.',
          timestamp: new Date().toISOString()
      }
  ];
  const counterRef = useRef(0);

  const personalInformationMessages = useMemo(() => new MutableArrayDataProvider<string, DemoMessageBannerItem>(initialPersonalSectionData, {
      keyAttributes: 'id'
  }), []);
  const employmentInformationMessages = useMemo(() => new MutableArrayDataProvider<string, DemoMessageBannerItem>(initialEmploymentSectionData, {
      keyAttributes: 'id'
  }), []);

  const closePersonalInformationMessage = (event: MessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
      // remove the message from the data to close it
      let data = personalInformationMessages.data.slice();
      const closeMessageKey = event.detail.key;
      data = data.filter((message) => message.id !== closeMessageKey);
      personalInformationMessages.data = data;
  };

  const closeEmploymentInformationMessage = (event: MessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
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
            <div class="oj-typography-heading-md oj-sm-margin-5x-bottom">Personal Information</div>
            <oj-message-banner data={personalInformationMessages} type="section" onojClose={closePersonalInformationMessage} />
            <oj-form-layout class="oj-sm-margin-5x-top" direction="row" maxColumns={3}>
                    <oj-input-text labelHint="Employee Name" required />
                    <oj-input-text labelHint="Employee DOB" required />
                    <oj-input-text labelHint="Employee Email" required />
                </oj-form-layout>
            <oj-button chroming="outlined" onojAction={updatePersonalInfo}>Update</oj-button>
            <div class="oj-typography-heading-md oj-sm-margin-5x-vertical">Employment Information</div>
            <oj-message-banner data={employmentInformationMessages} type="section" onojClose={closeEmploymentInformationMessage} />
            <oj-form-layout class="oj-sm-margin-5x-top" direction="row" maxColumns={3}>
                    <oj-input-text labelHint="Job Title" />
                    <oj-input-text labelHint="Job Location" />
                    <oj-input-text labelHint="Department" />
                </oj-form-layout>
            <oj-button chroming="outlined" onojAction={updateEmploymentInfo}>Update</oj-button>
        </div>
    );
};

export default MessagebannerSectionMessages;
