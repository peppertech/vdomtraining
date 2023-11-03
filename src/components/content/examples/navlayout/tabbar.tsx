import "ojs/ojactioncard";
import { ActionCardElement } from "ojs/ojactioncard";
import "ojs/ojlabel";
import "preact";
import { useState } from "preact/hooks";

export const TabBar = () => {
  const [logMsg, setLogMsg] = useState<string>("none");

  const actionHandler = (event: ActionCardElement.ojAction) => {
    setLogMsg(
      "Action handler invoked - " + (event.currentTarget as HTMLElement).id
    );
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-oj-typography-bold">
        See the /examples/index.tsx file for oj-tab-bar code used above.
      </div>
    </div>
  );
};
