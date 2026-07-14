import "oj-c/checkboxset";
import "oj-c/file-picker";
import { CFilePickerElement } from "oj-c/file-picker";
import "oj-c/text-area";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";

type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-checkboxset">["onvalueChanged"]>
>[0];
type TextAreaValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-text-area">["onvalueChanged"]>
>[0];
type FilePickerSelectionMode = NonNullable<ComponentProps<"oj-c-file-picker">["selectionMode"]>;

const selectionTypeOptions: Array<{ value: "multiple"; label: string }> = [
  { value: "multiple", label: "Select Multiple" }
];

const selectionStateOptions: Array<{ value: "disable"; label: string }> = [
  { value: "disable", label: "Disable" }
];

export const FilePickerRestrictFileTypescorepack = () => {
  const [multiple, setMultiple] = useState<Array<"multiple">>(["multiple"]);
  const [disabled, setDisabled] = useState<Array<"disable">>([]);
  const [acceptStr, setAcceptStr] = useState("image/*");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [invalidMessage, setInvalidMessage] = useState("");

  const selectionMode = useMemo<FilePickerSelectionMode>(
    () => (multiple.includes("multiple") ? "multiple" : "single"),
    [multiple]
  );

  const acceptArr = useMemo(
    () =>
      acceptStr
        .split(",")
        .map((value) => value.trim())
        .filter((value) => value.length > 0),
    [acceptStr]
  );

  const handleMultipleChanged = (event: CheckboxsetValueChangedEvent) => {
    setMultiple(((event.detail.value as Array<"multiple"> | null) ?? []).filter(Boolean));
  };

  const handleDisabledChanged = (event: CheckboxsetValueChangedEvent) => {
    setDisabled(((event.detail.value as Array<"disable"> | null) ?? []).filter(Boolean));
  };

  const handleAcceptChanged = (event: TextAreaValueChangedEvent) => {
    setAcceptStr((event.detail.value as string | null) ?? "");
  };

  const handleInvalidSelect = (event: CFilePickerElement.ojInvalidSelect) => {
    setFileNames([]);
    const firstMessage = event.detail.messages[0];

    if (firstMessage) {
      setInvalidMessage(
        `{severity: '${firstMessage.severity}', summary: '${firstMessage.summary}'}`
      );
    } else {
      setInvalidMessage("");
    }

    event.detail.until?.then(() => {
      setInvalidMessage("");
    });
  };

  const handleSelect = (event: CFilePickerElement.ojSelect) => {
    setInvalidMessage("");
    setFileNames(Array.from(event.detail.files, (file) => file.name));
  };

  return (
    <div id="file-picker-demo-container">
      <div>
        <oj-c-file-picker
          accept={acceptArr}
          selectionMode={selectionMode}
          onojSelect={handleSelect}
          onojInvalidSelect={handleInvalidSelect}
          disabled={disabled.includes("disable")}
        />
      </div>
      <div class="oj-sm-padding-1x-top" />

      <oj-c-checkboxset
        labelHint="Selection Type"
        labelEdge="none"
        options={selectionTypeOptions}
        value={multiple}
        onvalueChanged={handleMultipleChanged}
      />
      <div class="oj-sm-padding-1x-top" />

      <oj-c-checkboxset
        labelHint="Selection State"
        labelEdge="none"
        options={selectionStateOptions}
        value={disabled}
        onvalueChanged={handleDisabledChanged}
      />

      <oj-c-text-area
        rows={3}
        value={acceptStr}
        labelHint="Accept"
        labelEdge="top"
        onvalueChanged={handleAcceptChanged}
      />

      <div class="oj-sm-padding-1x-top">Selected files: {fileNames.join(", ")}</div>

      <div class="oj-sm-padding-1x-top">Invalid Message Content: {invalidMessage}</div>
    </div>
  );
};

export default FilePickerRestrictFileTypescorepack;
