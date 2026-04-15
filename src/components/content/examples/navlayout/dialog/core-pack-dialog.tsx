import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/dialog";
import "oj-c/form-layout";
import "oj-c/input-text";

type CButtonProps = ComponentProps<"oj-c-button">;
type CDialogProps = ComponentProps<"oj-c-dialog">;
type InputTextProps = ComponentProps<"oj-c-input-text">;

type ButtonActionEvent = Parameters<NonNullable<CButtonProps["onojAction"]>>[0];
type DialogOpenedChangedEvent = Parameters<
  NonNullable<CDialogProps["onopenedChanged"]>
>[0];
type InputTextValueChangedEvent = Parameters<
  NonNullable<InputTextProps["onvalueChanged"]>
>[0];

export const CorePackDialog = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [formValues, setFormValues] = useState({
    textVal1: "",
    textVal2: "",
  });

  const open = useCallback((_event: ButtonActionEvent) => {
    setIsOpened(true);
  }, []);

  const close = useCallback((_event?: ButtonActionEvent) => {
    setIsOpened(false);
  }, []);

  const handleOpenedChanged = useCallback(
    (event: DialogOpenedChangedEvent) => {
      setIsOpened(event.detail.value);
    },
    [],
  );

  const handleTextChanged = useCallback(
    (field: "textVal1" | "textVal2") =>
      (event: InputTextValueChangedEvent) => {
        setFormValues((current) => ({
          ...current,
          [field]: event.detail.value ?? "",
        }));
      },
    [],
  );

  return (
    <div
      id="dialogWrapper"
      class="oj-web-applayout-max-width oj-web-applayout-content"
    >
      <oj-c-dialog
        id="modalDialog1"
        opened={isOpened}
        dialogTitle="Modal Dialog"
        aria-describedby="desc"
        launcher="#buttonOpener"
        onopenedChanged={handleOpenedChanged}
      >
        <div slot="body">
          <p id="desc">
            This is the dialog content. User can change dialog resize behavior,
            cancel behavior and drag behavior by setting attributes. Default
            attribute value depends on the theme.
          </p>
        </div>
        <div slot="footer">
          <oj-c-button id="okButton" onojAction={close} label="OK"></oj-c-button>
        </div>
      </oj-c-dialog>

      <oj-c-button
        id="buttonOpener"
        onojAction={open}
        label="Open Modal Dialog"
      ></oj-c-button>

      <div class="oj-sm-padding-4x-top" id="form-container">
        <oj-c-form-layout direction="row" maxColumns={1}>
          <oj-c-input-text
            value={formValues.textVal1}
            onvalueChanged={handleTextChanged("textVal1")}
            labelHint="Address 1"
          ></oj-c-input-text>
          <oj-c-input-text
            value={formValues.textVal2}
            onvalueChanged={handleTextChanged("textVal2")}
            labelHint="Address 2"
          ></oj-c-input-text>
        </oj-c-form-layout>
      </div>
    </div>
  );
};
