import { h } from "preact";
import "ojs/ojformlayout";
import "ojs/ojinputtext";

export default function InputTextLegacyVirtualKeyboardExample() {
  return (
    <oj-form-layout>
      <oj-input-text
        labelHint='virtual-keyboard="auto" (default)'
      ></oj-input-text>
      <oj-input-text
        virtualKeyboard="email"
        labelHint='virtual-keyboard="email"'
      ></oj-input-text>
      <oj-input-text
        virtualKeyboard="number"
        labelHint='virtual-keyboard="number"'
      ></oj-input-text>
      <oj-input-text
        virtualKeyboard="search"
        labelHint='virtual-keyboard="search"'
      ></oj-input-text>
      <oj-input-text
        virtualKeyboard="tel"
        labelHint='virtual-keyboard="tel"'
      ></oj-input-text>
      <oj-input-text
        virtualKeyboard="text"
        labelHint='virtual-keyboard="text"'
      ></oj-input-text>
      <oj-input-text
        virtualKeyboard="url"
        labelHint='virtual-keyboard="url"'
      ></oj-input-text>
    </oj-form-layout>
  );
}
