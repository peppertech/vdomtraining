import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import {
  createEmailDataProvider,
  emailValidator,
} from "./comboBoxOne-shared";

export default function ComboboxOneValidatorExample() {
  const dataProvider = useMemo(() => createEmailDataProvider(), []);
  const [value, setValue] = useState("");

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? "");
  }, []);

  return (
    <div id="comboboxOneValidator">
      <oj-combobox-one
        value={value}
        required
        labelHint="Email address"
        labelEdge="inside"
        options={dataProvider}
        validators={[emailValidator] as any}
        class="oj-form-control-max-width-xl"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-one>
    </div>
  );
}
