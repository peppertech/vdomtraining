import "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojoption";
import { ButtonsetManyElement } from "ojs/ojbutton";

const ButtonSetMany = () => {
  const [selectedValues, setSelectedValues] = useState(["bold", "italic"]);

  const handleChange = (event: ButtonsetManyElement.valueChanged) => {
    setSelectedValues(event.detail.value ? event.detail.value : []);
    console.log("ButtonSetMany Values: ", event.detail.value);
  };
  // const handleChange = (event: {
  // 	detail: { value: string[] | ((prevState: string[]) => string[]) };
  // }) => {
  // 	setSelectedValues(event.detail.value);
  // };

  return (
    <oj-buttonset-many
      id="formatsetMultipleButtons"
      value={selectedValues}
      onvalueChanged={handleChange}
      // on-oj-value-updated={handleChange}
      aria-label="Choose one or more format options.">
      <oj-option value="bold">Bold</oj-option>
      <oj-option value="italic">Italic</oj-option>
      <oj-option value="underline">Underline</oj-option>
    </oj-buttonset-many>
  );
};

export default ButtonSetMany;
