import "oj-c/form-layout";
import "oj-c/radioset";
import "oj-c/select-single";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

import {
  createBrowserDataProvider,
  labelEdgeOptions,
} from "./selectSingle-shared";

type LabelEdgeEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];
type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-single">["onvalueChanged"]>
>[0];
export default function SelectSingleWidthExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [labelEdge, setLabelEdge] = useState("inside");
  const [selectVal, setSelectVal] = useState("CH");

  const handleLabelEdgeChanged = useCallback((event: LabelEdgeEvent) => {
    setLabelEdge((event.detail.value as string));
  }, []);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as string));
  }, []);

  return (
    <div id="form-container">
      <h6>Options To Control the Form Controls Below</h6>
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-form-layout id="formLayoutOptions" maxColumns={4} direction="row">
          <oj-c-radioset
            value={labelEdge}
            labelHint="Label Edge"
            aria-controls="formLayoutOptions"
            options={labelEdgeOptions}
            onvalueChanged={handleLabelEdgeChanged}
          ></oj-c-radioset>
        </oj-c-form-layout>
      </div>

      <h6>no width or max-width</h6>
      <oj-c-select-single
        id="id1"
        labelEdge={labelEdge as ComponentProps<'oj-c-select-single'>['labelEdge']}
        labelHint="width and max-width attributes are not defined"
        help={{ instruction: "The width and max-width are 100% by default" }}
        userAssistanceDensity="efficient"
        data={dataProvider}
        value={selectVal}
        itemText="label"
        onvalueChanged={handleValueChanged}
      ></oj-c-select-single>

      <h6>max-width attribute</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-select-single
          id="id2"
          labelEdge={labelEdge as ComponentProps<'oj-c-select-single'>['labelEdge']}
          labelHint="Max width medium"
          maxWidth="md"
          data={dataProvider}
          value={selectVal}
          itemText="label"
          onvalueChanged={handleValueChanged}
        ></oj-c-select-single>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-select-single
          id="id3"
          labelEdge={labelEdge as ComponentProps<'oj-c-select-single'>['labelEdge']}
          labelHint="Max width small"
          maxWidth="sm"
          data={dataProvider}
          value={selectVal}
          itemText="label"
          onvalueChanged={handleValueChanged}
        ></oj-c-select-single>
      </div>

      <h6>width attribute</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-select-single
          id="id4"
          labelEdge={labelEdge as ComponentProps<'oj-c-select-single'>['labelEdge']}
          labelHint="Width medium"
          width="md"
          data={dataProvider}
          value={selectVal}
          itemText="label"
          onvalueChanged={handleValueChanged}
        ></oj-c-select-single>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-select-single
          id="id5"
          labelEdge={labelEdge as ComponentProps<'oj-c-select-single'>['labelEdge']}
          labelHint="Width small"
          width="sm"
          data={dataProvider}
          value={selectVal}
          itemText="label"
          onvalueChanged={handleValueChanged}
        ></oj-c-select-single>
      </div>

      <h6>custom width and max-width</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-select-single
          id="id6"
          labelEdge={labelEdge as ComponentProps<'oj-c-select-single'>['labelEdge']}
          labelHint="Width 50% MaxWidth 400px"
          width="50%"
          maxWidth="400px"
          data={dataProvider}
          value={selectVal}
          itemText="label"
          onvalueChanged={handleValueChanged}
        ></oj-c-select-single>
      </div>

      <h6>Inside oj-c-form-layout, no width or max-width</h6>
      <oj-c-form-layout>
        <oj-c-select-single
          id="id7"
          labelEdge={labelEdge as ComponentProps<'oj-c-select-single'>['labelEdge']}
          labelHint="width and max-width attributes are not defined"
          help={{ instruction: "The width is driven by the oj-c-form-layout column width" }}
          data={dataProvider}
          value={selectVal}
          itemText="label"
          onvalueChanged={handleValueChanged}
        ></oj-c-select-single>
      </oj-c-form-layout>
    </div>
  );
}
