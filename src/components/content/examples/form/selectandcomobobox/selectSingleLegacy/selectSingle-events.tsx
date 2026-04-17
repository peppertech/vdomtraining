import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectsingle";
import { createBrowserDataProvider } from "./selectSingle-shared";

const getTimestamp = () => {
  const date = new Date();
  return `timestamp: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
};

export default function SelectSingleLegacyEventsExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [selectVal, setSelectVal] = useState("CH");
  const [valueChangedLog, setValueChangedLog] = useState("");
  const [valueActionLog, setValueActionLog] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value);
    setValueChangedLog(JSON.stringify(event.detail));
  }, []);

  const handleValueAction = useCallback((event: any) => {
    setValueActionLog(JSON.stringify(event.detail));
    setTimestamp(getTimestamp());
  }, []);

  return (
    <div id="container">
      <oj-select-single
        id="selectSingleLegacyEvents"
        labelHint="Select Single"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        data={dataProvider}
        itemText="label"
        value={selectVal}
        onvalueChanged={handleValueChanged}
        onojValueAction={handleValueAction}
      ></oj-select-single>

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
