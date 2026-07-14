import "oj-c/button";
import "oj-c/dialog";
import "ojs/ojdefer";
import * as preact from 'preact';
import { type ComponentProps } from 'preact';
import { useEffect,useState } from "preact/hooks";

type DialogOpenedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-dialog">["onopenedChanged"]>
>[0];

type DeferredDialogBodyProps = {
  onClose: () => void;
  onRendered: () => void;
};

const DeferredDialogBody = ({ onClose, onRendered }: DeferredDialogBodyProps) => {
  useEffect(() => {
    onRendered();
  }, [onRendered]);

  return (
    <div>
      <p id="desc">Dialog content has been rendered.</p>
      <oj-c-button onojAction={onClose} label="Close" />
    </div>
  );
};

export const DialogDefercorepack = () => {
  const [opened, setOpened] = useState(false);
  const [closeButtonStatus, setCloseButtonStatus] = useState("close button has not been rendered");

  const handleOpenedChanged = (event: DialogOpenedChangedEvent) => {
    setOpened(Boolean(event.detail.value));
  };

  return (
    <div id="dialogWrapper">
      <oj-c-dialog
        id="dialog1"
        dialogTitle="Dialog with deferred content"
        aria-describedby="desc"
        opened={opened}
        launcher="#buttonOpener"
        onopenedChanged={handleOpenedChanged}
      >
        <div slot="body">
          {preact.h("oj-defer", null, (
            <DeferredDialogBody
              onClose={() => setOpened(false)}
              onRendered={() => setCloseButtonStatus("close button was rendered")}
            />
          ))}
        </div>
      </oj-c-dialog>
      <div class="oj-sm-margin-2x-bottom">{closeButtonStatus}</div>
      <oj-c-button id="buttonOpener" onojAction={() => setOpened(true)} label="Open Dialog" />
    </div>
  );
};

export default DialogDefercorepack;
