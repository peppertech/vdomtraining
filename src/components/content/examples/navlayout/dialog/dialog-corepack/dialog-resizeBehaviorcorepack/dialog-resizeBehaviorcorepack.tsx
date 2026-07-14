import "oj-c/button";
import "oj-c/dialog";
import "oj-c/form-layout";
import "oj-c/radioset";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type DialogOpenedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-dialog">["onopenedChanged"]>
>[0];
type DialogResizeBehavior = NonNullable<ComponentProps<"oj-c-dialog">["resizeBehavior"]>;
type RadioOptions = NonNullable<ComponentProps<"oj-c-radioset">["options"]>;
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

const resizeBehaviorOptions = [
  { label: "resizable", value: "resizable" },
  { label: "none", value: "none" }
] as RadioOptions;

export const DialogResizeBehaviorcorepack = () => {
  const [resizeBehavior, setResizeBehavior] = useState<DialogResizeBehavior>("resizable");
  const [opened, setOpened] = useState(false);

  const handleResizeBehaviorChanged = (event: RadioValueChangedEvent) => {
    const nextValue = event.detail.value;
    if (nextValue === "resizable" || nextValue === "none") {
      setResizeBehavior(nextValue);
    }
  };

  const handleOpenedChanged = (event: DialogOpenedChangedEvent) => {
    setOpened(Boolean(event.detail.value));
  };

  return (
    <>
      <oj-c-form-layout maxColumns={1}>
        <oj-c-radioset
          id="dialogResizeBehavior"
          value={resizeBehavior}
          options={resizeBehaviorOptions}
          labelHint="Resize Behavior"
          labelEdge="inside"
          onvalueChanged={handleResizeBehaviorChanged}
        />
      </oj-c-form-layout>
      <div id="dialogWrapper">
        <oj-c-dialog
          id="dialog1"
          dialogTitle="Resize Behavior Options"
          resizeBehavior={resizeBehavior}
          opened={opened}
          launcher="#buttonOpener"
          onopenedChanged={handleOpenedChanged}
        >
          <div slot="body">
            <div>resizeBehavior: {resizeBehavior}</div>
          </div>
          <div slot="footer">
            <oj-c-button id="okButton" onojAction={() => setOpened(false)} label="OK" />
          </div>
        </oj-c-dialog>
        <oj-c-button id="buttonOpener" onojAction={() => setOpened(true)} label="Open Dialog" />
      </div>
    </>
  );
};

export default DialogResizeBehaviorcorepack;
