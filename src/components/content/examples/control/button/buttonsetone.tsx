import "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojoption";
import { ButtonsetOneElement } from "ojs/ojbutton";

const ButtonSetOne = () => {
  const formatValues = [
    { id: "bold", label: "Bold" },
    { id: "italic", label: "Italic" },
    { id: "underline", label: "Underline" },
  ];

  const [selectedValue, setSelectedValue] = useState("bold");
  const changeHandler = (event: ButtonsetOneElement.valueChanged) => {
    setSelectedValue(event.detail.value);
    console.log("Format value: ", event.detail.value);
  };

  return (
    <oj-buttonset-one
      id="setMultipleButtons"
      value={selectedValue}
      aria-label="Choose only one format"
      onvalueChanged={changeHandler}>
      {formatValues.map((format) => (
        <oj-option value={format.id} key={format.id}>
          {format.label}
        </oj-option>
      ))}
    </oj-buttonset-one>
  );
};

export default ButtonSetOne;
