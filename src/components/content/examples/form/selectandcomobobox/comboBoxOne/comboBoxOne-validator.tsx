import { h, type ComponentProps } from 'preact';
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";

import {
  createEmailDataProvider,
  emailValidator,
} from "./comboBoxOne-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueChanged"]>
>[0];
export default function ComboboxOneValidatorExample() {
  const dataProvider = useMemo(() => createEmailDataProvider(), []);
  const [value, setValue] = useState("");

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string | null | undefined) ?? "");
  }, []);

  return (
    <div id="comboboxOneValidator">
      <oj-combobox-one
        value={value}
        required
        labelHint="Email address"
        labelEdge="inside"
        options={dataProvider}
        validators={[emailValidator] as ComponentProps<'oj-combobox-one'>['validators']}
        class="oj-form-control-max-width-xl"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-one>
    </div>
  );
}
