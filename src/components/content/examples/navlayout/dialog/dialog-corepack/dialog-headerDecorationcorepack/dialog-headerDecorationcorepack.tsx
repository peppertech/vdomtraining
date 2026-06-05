import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/dialog";
import "oj-c/form-layout";
import "oj-c/radioset";

type DialogHeaderDecoration = NonNullable<ComponentProps<"oj-c-dialog">["headerDecoration"]>;
type DialogOpenedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-dialog">["onopenedChanged"]>
>[0];
type RadioOptions = NonNullable<ComponentProps<"oj-c-radioset">["options"]>;
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

const headerDecorationOptions = [
  { label: "off", value: "off" },
  { label: "on", value: "on" }
] as RadioOptions;

export const DialogHeaderDecorationcorepack = () => {
  const [headerDecoration, setHeaderDecoration] = useState<DialogHeaderDecoration>("on");
  const [opened, setOpened] = useState(false);

  const handleHeaderDecorationChanged = (event: RadioValueChangedEvent) => {
    const nextValue = event.detail.value;
    if (nextValue === "off" || nextValue === "on") {
      setHeaderDecoration(nextValue);
    }
  };

  const handleOpenedChanged = (event: DialogOpenedChangedEvent) => {
    setOpened(Boolean(event.detail.value));
  };

  return (
    <>
      <oj-c-form-layout maxColumns={1}>
        <oj-c-radioset
          id="dialogHeaderDecoration"
          value={headerDecoration}
          options={headerDecorationOptions}
          labelHint="Header Decoration"
          labelEdge="inside"
          onvalueChanged={handleHeaderDecorationChanged}
        />
      </oj-c-form-layout>
      <div id="dialogWrapper">
        <oj-c-dialog
          id="dialog1"
          dialogTitle="Header Decoration Options"
          headerDecoration={headerDecoration}
          opened={opened}
          launcher="#buttonOpener"
          onopenedChanged={handleOpenedChanged}
        >
          <div slot="body">
            <div>headerDecoration: {headerDecoration}</div>
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

export default DialogHeaderDecorationcorepack;
