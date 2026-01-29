import { h, ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import "ojs/ojformlayout";
import Message = require("ojs/ojmessaging");
import { InputSearchElement } from "ojs/ojinputsearch";
import { ItemContext } from "ojs/ojcommontypes";
import "ojs/ojinputsearch";

const error: Message[] = [
  { summary: "summary", detail: "detail", severity: "error" },
];
const warning: Message[] = [
  { summary: "summary", detail: "detail", severity: "warning" },
];
const info: Message[] = [
  { summary: "summary", detail: "detail", severity: "info" },
];
const confirmation: Message[] = [
  { summary: "summary", detail: "detail", severity: "confirmation" },
];

const InputSearch = () => {
  const [value, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchItemContext, setItemContext] = useState("");
  const [previousSearchTerm, setPreviousSearchTerm] = useState("");
  const [searchTimeStamp, setSearchTermTimeStamp] = useState("");

  const _getCurrentTime = () => {
    var date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
  };

  const _trimItemContext = (itemContext: ItemContext<null, null>) => {
    let searchItemContext = null;
    if (itemContext) {
      searchItemContext = {
        key: itemContext.key,
        data: itemContext.data,
      };

      if (itemContext.metadata) {
        // searchItemContext.metadata = {
        //   key: itemContext.metadata.key,
        // };
      }
    }
    return searchItemContext ? JSON.stringify(searchItemContext) : "";
  };

  const handleValueAction = (
    event: InputSearchElement.ojValueAction<null, null>
  ) => {
    var detail = event.detail;
    setSearchValue(detail.value as any);
    var eventTime = _getCurrentTime();

    setSearchTerm(detail.value as any);
    console.log(detail.itemContext);
    setItemContext(_trimItemContext(detail.itemContext as any));
    console.log(detail.previousValue);
    setPreviousSearchTerm(detail.previousValue as any);
    console.log(eventTime);
    setSearchTermTimeStamp(eventTime);
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6 class="oj-typography-heading-sm"> Input Search (Basic) </h6>
      <div class="oj-sm-margin-4x-bottom">
        <div>Value: {value}</div>
        {/* <div>Raw value: {rawValue}</div> */}
        <div>Search term: {searchTerm}</div>
        <div>Search Item Context: {searchItemContext}</div>
        <div>Previous search item: {previousSearchTerm}</div>
        <div>Previous time stamp: {searchTimeStamp}</div>
        <div>Search time stamp: {searchTimeStamp}</div>
      </div>
      <oj-form-layout
        userAssistanceDensity={"efficient"}
        columns={3}
        labelEdge="inside"
        class="oj-md-margin-4x-horizontal"
        maxColumns={3}
        direction="row"
      >
        <oj-input-search
          id="searchBox"
          class="oj-form-control-max-width-md"
          value={value}
          onvalueChanged={handleValueAction as any}
          placeholder="Search..."
          aria-label="My search field"
        ></oj-input-search>
      </oj-form-layout>
    </div>
  );
};

export default InputSearch;
