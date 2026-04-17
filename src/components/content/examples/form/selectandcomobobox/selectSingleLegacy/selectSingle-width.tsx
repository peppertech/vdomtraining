import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojoption";
import "ojs/ojradioset";
import "ojs/ojselectsingle";
import { createBrowserDataProvider } from "./selectSingle-shared";

export default function SelectSingleLegacyWidthExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [labelEdge, setLabelEdge] = useState("inside");
  const [selectVal, setSelectVal] = useState("CH");

  const handleLabelEdgeChanged = useCallback((event: any) => {
    setLabelEdge(event.detail.value);
  }, []);

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value);
  }, []);

  return (
    <div id="form-container">
      <h6>Options To Control the Form Controls Below</h6>
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-form-layout id="legacyFormLayoutOptions" maxColumns={4} direction="row">
          <oj-radioset
            value={labelEdge}
            labelHint="Label Edge"
            aria-controls="legacyFormLayoutOptions"
            onvalueChanged={handleLabelEdgeChanged}
          >
            <oj-option value="inside">inside</oj-option>
            <oj-option value="start">start</oj-option>
            <oj-option value="top">top</oj-option>
          </oj-radioset>
        </oj-form-layout>
      </div>

      <h6>no width or max-width</h6>
      <oj-select-single
        id="legacyWidthDefault"
        labelEdge={labelEdge as any}
        labelHint="width and max-width attributes are not defined"
        help={{ instruction: "The width and max-width are 100% by default" }}
        data={dataProvider}
        value={selectVal}
        itemText="label"
        onvalueChanged={handleValueChanged}
      ></oj-select-single>

      <h6>max-width class</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-select-single
          id="legacyWidthMaxMedium"
          labelEdge={labelEdge as any}
          labelHint="Max width medium"
          class="oj-form-control-max-width-md"
          data={dataProvider}
          value={selectVal}
          itemText="label"
          onvalueChanged={handleValueChanged}
        ></oj-select-single>
      </div>

      <h6>custom width</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-select-single
          id="legacyWidthCustom"
          labelEdge={labelEdge as any}
          labelHint="Width 50% MaxWidth 400px"
          style={{ width: "50%", maxWidth: "400px" }}
          data={dataProvider}
          value={selectVal}
          itemText="label"
          onvalueChanged={handleValueChanged}
        ></oj-select-single>
      </div>

      <h6>Inside oj-form-layout, no width or max-width</h6>
      <oj-form-layout>
        <oj-select-single
          id="legacyWidthFormLayout"
          labelEdge={labelEdge as any}
          labelHint="width and max-width attributes are not defined"
          help={{ instruction: "The width is driven by the oj-form-layout column width" }}
          data={dataProvider}
          value={selectVal}
          itemText="label"
          onvalueChanged={handleValueChanged}
        ></oj-select-single>
      </oj-form-layout>
    </div>
  );
}
