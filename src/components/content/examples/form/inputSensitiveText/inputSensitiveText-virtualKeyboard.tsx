import { h } from "preact";
import "oj-c/form-layout";
import "oj-c/input-sensitive-text";

export default function InputSensitiveTextVirtualKeyboardVdomExample() {
  return (
    <div id="inputSensitiveTextVirtualKeyboardVdom">
      <oj-c-form-layout id="fl1">
        <oj-c-input-sensitive-text
          labelHint='virtual-keyboard="auto" (default)'
        />
        <oj-c-input-sensitive-text
          virtualKeyboard="email"
          labelHint='virtual-keyboard="email"'
        />
        <oj-c-input-sensitive-text
          virtualKeyboard="number"
          labelHint='virtual-keyboard="number"'
        />
        <oj-c-input-sensitive-text
          virtualKeyboard="search"
          labelHint='virtual-keyboard="search"'
        />
        <oj-c-input-sensitive-text
          virtualKeyboard="tel"
          labelHint='virtual-keyboard="tel"'
        />
        <oj-c-input-sensitive-text
          virtualKeyboard="text"
          labelHint='virtual-keyboard="text"'
        />
        <oj-c-input-sensitive-text
          virtualKeyboard="url"
          labelHint='virtual-keyboard="url"'
        />
      </oj-c-form-layout>
    </div>
  );
}

