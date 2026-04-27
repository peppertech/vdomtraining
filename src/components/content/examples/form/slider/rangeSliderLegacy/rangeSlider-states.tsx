import { h } from "preact";
import "ojs/ojformlayout";
import "ojs/ojslider";
import {
  rangeSliderConfirmationMessages,
  rangeSliderDefinitionHints,
  rangeSliderErrorMessages,
  rangeSliderInfoMessages,
  rangeSliderInstructionHelp,
  rangeSliderSourceHints,
  rangeSliderWarningMessages,
} from "./rangeSlider-shared";

const rangeValue = { start: 30, end: 70 };

export default function RangeSliderStatesExample() {
  return (
    <div id="rangeSliderStatesDemo">
      <h5 class="oj-sm-padding-2x-bottom">States</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-range-slider
          min={0}
          max={100}
          value={rangeValue}
          labelHint="Enabled"
        />
        <oj-range-slider
          min={0}
          max={100}
          value={rangeValue}
          labelHint="Disabled"
          disabled={true}
        />
      </oj-form-layout>

      <oj-form-layout maxColumns={3} direction="row">
        <oj-range-slider
          min={0}
          max={100}
          value={rangeValue}
          orientation="vertical"
          labelHint="Vertical Enabled"
        />
        <oj-range-slider
          min={0}
          max={100}
          value={rangeValue}
          orientation="vertical"
          labelHint="Vertical Disabled"
          disabled={true}
        />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Help</h5>
      <oj-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-range-slider
          min={0}
          max={100}
          value={rangeValue}
          labelHint="help.instruction"
          help={rangeSliderInstructionHelp}
        />
        <oj-range-slider
          min={0}
          max={100}
          value={rangeValue}
          labelHint="help-hints.definition"
          helpHints={rangeSliderDefinitionHints}
        />
        <oj-range-slider
          min={0}
          max={100}
          value={rangeValue}
          labelHint="help-hints.source"
          helpHints={rangeSliderSourceHints}
        />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-range-slider
          min={0}
          max={100}
          value={rangeValue}
          labelHint="Error"
          messagesCustom={rangeSliderErrorMessages}
        />
        <oj-range-slider
          min={0}
          max={100}
          value={rangeValue}
          labelHint="Warning"
          messagesCustom={rangeSliderWarningMessages}
        />
        <oj-range-slider
          min={0}
          max={100}
          value={rangeValue}
          labelHint="Information"
          messagesCustom={rangeSliderInfoMessages}
        />
        <oj-range-slider
          min={0}
          max={100}
          value={rangeValue}
          labelHint="Confirmation"
          messagesCustom={rangeSliderConfirmationMessages}
        />
      </oj-form-layout>
    </div>
  );
}
