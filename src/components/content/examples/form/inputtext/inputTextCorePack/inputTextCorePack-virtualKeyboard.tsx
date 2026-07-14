import "oj-c/form-layout";
import "oj-c/input-text";
import 'preact';

export default function InputTextCorePackVirtualKeyboardExample() {
  return (
    <oj-c-form-layout id="fl1">
      <oj-c-input-text
        labelHint='virtual-keyboard="auto" (default)'
      ></oj-c-input-text>
      <oj-c-input-text
        virtualKeyboard="email"
        labelHint='virtual-keyboard="email"'
      ></oj-c-input-text>
      <oj-c-input-text
        virtualKeyboard="number"
        labelHint='virtual-keyboard="number"'
      ></oj-c-input-text>
      <oj-c-input-text
        virtualKeyboard="search"
        labelHint='virtual-keyboard="search"'
      ></oj-c-input-text>
      <oj-c-input-text
        virtualKeyboard="tel"
        labelHint='virtual-keyboard="tel"'
      ></oj-c-input-text>
      <oj-c-input-text
        virtualKeyboard="text"
        labelHint='virtual-keyboard="text"'
      ></oj-c-input-text>
      <oj-c-input-text
        virtualKeyboard="url"
        labelHint='virtual-keyboard="url"'
      ></oj-c-input-text>
    </oj-c-form-layout>
  );
}
