import "oj-c/button";
import "oj-c/dialog";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type DialogOpenedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-dialog">["onopenedChanged"]>
>[0];

export const DialogPercentcorepack = () => {
  const [opened, setOpened] = useState(false);

  const handleOpenedChanged = (event: DialogOpenedChangedEvent) => {
    setOpened(Boolean(event.detail.value));
  };

  return (
    <div id="dialogWrapper">
      <oj-c-dialog
        id="percentDialog"
        dialogTitle="Percent Dimensions Dialog"
        opened={opened}
        launcher="#buttonOpener"
        width="50vw"
        height="50vh"
        onopenedChanged={handleOpenedChanged}
      >
        <div slot="body">This dialog&apos;s width and height are set to 50% of the viewport.</div>
        <div slot="footer">
          <oj-c-button id="okButton" onojAction={() => setOpened(false)} label="OK" />
        </div>
      </oj-c-dialog>
      <oj-c-button id="buttonOpener" onojAction={() => setOpened(true)} label="Open Dialog" />
    </div>
  );
};

export default DialogPercentcorepack;
