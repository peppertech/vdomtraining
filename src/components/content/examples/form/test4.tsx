import { h } from "preact";
import { useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "ojs/ojselectsingle";

const data = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
  { value: "SA", label: "Safari" },
];
const dataProvider = new MutableArrayDataProvider<any, any>(data, {
  keyAttributes: "value",
});

export function Test4() {
  const [data, setData] = useState();
  const [value, setValue] = useState();

  return (
    <div>
      <button
        onClick={() => {
          setData(dataProvider as any);
        }}
      >
        Set only provider
      </button>{" "}
      <button
        onClick={() => {
          setValue("CH" as any);
        }}
      >
        Set only value
      </button>{" "}
      <button
        onClick={() => {
          setData(dataProvider as any);
          setValue("CH" as any);
        }}
      >
        Set provider + value
      </button>
      <br />
      <br />
      {/* Set DP and value from state*/}
      <oj-select-single
        data={data}
        value={value}
        labelHint="Default browser"
      ></oj-select-single>
      <br />
      <br />
      {/* Set DP and value on first render */}
      <oj-select-single
        data={dataProvider}
        value={"CH"}
        labelHint="Default browser"
      ></oj-select-single>
    </div>
  );
}
