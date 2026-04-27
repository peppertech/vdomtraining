import { h } from "preact";
import "ojs/ojformlayout";
import "ojs/ojslider";
import {
  sliderConfirmationMessages,
  sliderDefinitionHints,
  sliderErrorMessages,
  sliderInfoMessages,
  sliderInstructionHelp,
  sliderSourceHints,
  sliderWarningMessages,
} from "./slider-shared";

export default function SliderStatesExample() {
  return (
    <div id="sliderStatesDemo">
      <h5 class="oj-sm-padding-2x-bottom">States</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-slider min={0} max={100} value={50} labelHint="Enabled" />
        <oj-slider
          min={0}
          max={100}
          value={50}
          labelHint="Disabled"
          disabled={true}
        />
      </oj-form-layout>

      <oj-form-layout maxColumns={3} direction="row">
        <oj-slider
          min={0}
          max={100}
          value={50}
          orientation="vertical"
          labelHint="Vertical Enabled"
        />
        <oj-slider
          min={0}
          max={100}
          value={50}
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
        <oj-slider
          min={0}
          max={100}
          value={50}
          labelHint="help.instruction"
          help={sliderInstructionHelp}
        />
        <oj-slider
          min={0}
          max={100}
          value={50}
          labelHint="help-hints.definition"
          helpHints={sliderDefinitionHints}
        />
        <oj-slider
          min={0}
          max={100}
          value={50}
          labelHint="help-hints.source"
          helpHints={sliderSourceHints}
        />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-slider
          min={0}
          max={100}
          value={50}
          labelHint="Error"
          messagesCustom={sliderErrorMessages}
        />
        <oj-slider
          min={0}
          max={100}
          value={50}
          labelHint="Warning"
          messagesCustom={sliderWarningMessages}
        />
        <oj-slider
          min={0}
          max={100}
          value={50}
          labelHint="Information"
          messagesCustom={sliderInfoMessages}
        />
        <oj-slider
          min={0}
          max={100}
          value={50}
          labelHint="Confirmation"
          messagesCustom={sliderConfirmationMessages}
        />
      </oj-form-layout>
    </div>
  );
}
