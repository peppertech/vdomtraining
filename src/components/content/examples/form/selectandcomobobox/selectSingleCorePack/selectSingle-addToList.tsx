import { h, type ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/select-single";
import { createBrowserDataProvider } from "./selectSingle-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-single">["onvalueChanged"]>
>[0];
type AddToListActionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-single">["onojAddToListAction"]>
>[0];
const getTimestamp = () => {
  const date = new Date();
  return `timestamp: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
};

export default function SelectSingleAddToListExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [selectVal, setSelectVal] = useState("CH");
  const [eventLog, setEventLog] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as string));
  }, []);

  const handleAddToListAction = useCallback((event: AddToListActionEvent) => {
    setEventLog(JSON.stringify(event.detail));
    setTimestamp(getTimestamp());
  }, []);

  return (
    <div id="container">
      <oj-c-select-single
        id="selectSingleAddToList"
        labelHint="Select Single"
        labelEdge="inside"
        maxWidth="md"
        addToList="on"
        data={dataProvider}
        itemText="label"
        value={selectVal}
        onvalueChanged={handleValueChanged}
        onojAddToListAction={handleAddToListAction}
      ></oj-c-select-single>

      <div class="oj-sm-margin-4x-top">
        <div>Add to list action</div>
        <div id="actionlog">
          <div>{eventLog}</div>
          <div>{timestamp}</div>
        </div>
      </div>
    </div>
  );
}
