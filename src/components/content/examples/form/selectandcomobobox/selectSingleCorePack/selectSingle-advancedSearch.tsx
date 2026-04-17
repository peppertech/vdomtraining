import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/select-single";
import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  renderEmployeeItemTemplate,
} from "./selectSingle-shared";

const getTimestamp = () => {
  const date = new Date();
  return `timestamp: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
};

export default function SelectSingleAdvancedSearchExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<number | null>(null);
  const [eventLog, setEventLog] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value ?? null);
  }, []);

  const handleAdvancedSearchAction = useCallback((event: any) => {
    setEventLog(JSON.stringify(event.detail));
    setTimestamp(getTimestamp());
  }, []);

  return (
    <div id="container">
      <oj-c-select-single
        id="selectSingleAdvancedSearch"
        labelHint="Employees"
        labelEdge="inside"
        maxWidth="md"
        advancedSearch="on"
        data={dataProvider}
        itemText={getEmployeeItemText}
        value={selectVal}
        onvalueChanged={handleValueChanged}
        onojAdvancedSearchAction={handleAdvancedSearchAction}
      >
        <template slot="itemTemplate" render={renderEmployeeItemTemplate}></template>
      </oj-c-select-single>

      <div class="oj-sm-margin-4x-top">
        <div>Advanced search action</div>
        <div id="actionlog">
          <div>{eventLog}</div>
          <div>{timestamp}</div>
        </div>
      </div>
    </div>
  );
}
