import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/dialog";

type DialogOpenedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-dialog">["onopenedChanged"]>
>[0];

export const DialogUserDefinedHeadercorepack = () => {
  const [opened, setOpened] = useState(false);

  const handleOpenedChanged = (event: DialogOpenedChangedEvent) => {
    setOpened(Boolean(event.detail.value));
  };

  return (
    <div id="dialogWrapper">
      <oj-c-dialog
        id="dialogWithUserDefinedHeader"
        aria-labelledby="dialogTitleId"
        opened={opened}
        launcher="#buttonOpener"
        onopenedChanged={handleOpenedChanged}
      >
        <div slot="header">
          <h1 id="dialogTitleId" class="oj-dialog-title">
            User Defined Header
            <span role="img" class="oj-ux-ico-information-s" />
          </h1>
        </div>
        <div slot="body">This dialog contains a user-defined header.</div>
        <div slot="footer">
          <oj-c-button id="okButton" onojAction={() => setOpened(false)} label="OK" />
        </div>
      </oj-c-dialog>
      <oj-c-button id="buttonOpener" onojAction={() => setOpened(true)} label="Open Dialog" />
    </div>
  );
};

export default DialogUserDefinedHeadercorepack;
