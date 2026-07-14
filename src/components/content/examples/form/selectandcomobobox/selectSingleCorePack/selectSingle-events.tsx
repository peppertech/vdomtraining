import "oj-c/select-single";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { createBrowserDataProvider } from "./selectSingle-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-single">["onvalueChanged"]>
>[0];
type ValueActionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-single">["onojValueAction"]>
>[0];
const getTimestamp = () => {
  const date = new Date();
  return `timestamp: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
};

export default function SelectSingleEventsExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [selectVal, setSelectVal] = useState("CH");
  const [valueChangedLog, setValueChangedLog] = useState("");
  const [valueActionLog, setValueActionLog] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as string));
    setValueChangedLog(JSON.stringify(event.detail));
  }, []);

  const handleValueAction = useCallback((event: ValueActionEvent) => {
    setValueActionLog(JSON.stringify(event.detail));
    setTimestamp(getTimestamp());
  }, []);

  return (
    <div id="container">
      <oj-c-select-single
        id="selectSingleEvents"
        labelHint="Select Single"
        labelEdge="inside"
        maxWidth="md"
        data={dataProvider}
        itemText="label"
        value={selectVal}
        onvalueChanged={handleValueChanged}
        onojValueAction={handleValueAction}
      ></oj-c-select-single>

      <div class="oj-sm-margin-4x-top">
        <div>Value change</div>
        <span id="changelog">{valueChangedLog}</span>
      </div>
      <div class="oj-sm-margin-4x-top">
        <div>Value action</div>
        <div id="actionlog">
          <div>{valueActionLog}</div>
          <div>{timestamp}</div>
        </div>
      </div>
    </div>
  );
}
