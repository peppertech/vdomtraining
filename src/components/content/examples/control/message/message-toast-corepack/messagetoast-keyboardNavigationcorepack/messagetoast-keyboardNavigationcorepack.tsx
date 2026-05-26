import { useMemo, useState } from "preact/hooks";
import type { MessageToastItem, CMessageToastElement } from "oj-c/message-toast";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { useToastContainerOffset } from "../useToastContainerOffset";
import "oj-c/message-toast";
import "oj-c/button";
import "oj-c/input-text";
import "oj-c/form-layout";

type DemoMessageToastItem = MessageToastItem & {
  id: string;
};

const initialMessages: DemoMessageToastItem[] = [];

export const MessagetoastKeyboardNavigationcorepack = () => {
  const [counter, setCounter] = useState(0);
  const toastOffset = useToastContainerOffset("containerDiv");
  const messages = useMemo(
    () =>
      new MutableArrayDataProvider<string, DemoMessageToastItem>(initialMessages, {
        keyAttributes: "id"
      }),
    []
  );

  const closeMessage = (event: CMessageToastElement.ojClose<string, DemoMessageToastItem>) => {
    messages.data = messages.data.filter((message) => message.id !== event.detail.key);
  };

  const updatePersonalInfo = () => {
    const nextCounter = counter + 1;
    setCounter(nextCounter);
    messages.data = [
      ...messages.data,
      {
        id: `message-${nextCounter}`,
        severity: "confirmation",
        summary: "Updated personal information"
      }
    ];
  };

  return (
    <div id="containerDiv">
      <oj-c-message-toast data={messages} offset={toastOffset} onojClose={closeMessage} />

      <div class="oj-web-padding" role="main">
        <div class="oj-typography-heading-md oj-sm-margin-5x-bottom">Personal Information</div>

        <oj-c-form-layout class="oj-sm-margin-5x-top" direction="row" maxColumns={1}>
          <oj-c-input-text labelHint="Employee Name" />
          <oj-c-input-text labelHint="Employee DOB" />
          <oj-c-input-text labelHint="Employee Email" />
        </oj-c-form-layout>

        <oj-c-button
          class="oj-sm-margin-4x-top"
          chroming="outlined"
          onojAction={updatePersonalInfo}
          label="Update"
        />
      </div>
    </div>
  );
};

export default MessagetoastKeyboardNavigationcorepack;
