import "ojs/ojselectcombobox";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { createBrowserDataProvider,formatEventDetail } from "./selectMany-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-select-many">["onvalueChanged"]>
>[0];
type ValueOptionsEvent = Parameters<
  NonNullable<ComponentProps<"oj-select-many">["onvalueOptionsChanged"]>
>[0];
export default function SelectManyEventsExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [value, setValue] = useState<string[]>(["Chrome", "Safari"]);
  const [valueLog, setValueLog] = useState("");
  const [valueOptionsLog, setValueOptionsLog] = useState("");

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string[] | null | undefined) ?? []);
    setValueLog(formatEventDetail(event.detail));
  }, []);

  const handleValueOptionsChanged = useCallback((event: ValueOptionsEvent) => {
    setValueOptionsLog(formatEventDetail(event.detail));
  }, []);

  return (
    <div id="selectManyEvents">
      <oj-select-many
        value={value}
        labelHint="Select Many events"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged}
        onvalueOptionsChanged={handleValueOptionsChanged}
      ></oj-select-many>

      <pre class="oj-sm-margin-4x-top">{valueLog}</pre>
      <pre>{valueOptionsLog}</pre>
    </div>
  );
}
