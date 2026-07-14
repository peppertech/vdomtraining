import 'oj-c/input-number';
import 'ojs/ojformlayout';
import 'preact';
import { type ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
type InputNumberValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-c-input-number'>['onvalueChanged']>>[0];
export const HelpHintsMessagingHintsMessagesTitle = () => {
    const [inputValue, setInputValue] = useState<number | null>(null);
    const ojCInputNumberProps: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: 'this is help instruction, it takes precedence over hints'
        }, helpHints: {
            definition: 'custom help text'
        } };
    const ojCInputNumberProps2: Partial<ComponentProps<'oj-c-input-number'>> = { helpHints: {
            source: 'https://www.oracle.com',
            definition: 'custom help text'
        } };
    return (<oj-form-layout id="form-container">
            <h5 class="oj-header-border">Default Display of Messages, Hints, Help Instruction</h5>
            <oj-c-input-number id="field1" autocomplete="off" required={true} min={0} max={100} onvalueChanged={(event: InputNumberValueChangedEvent) => setInputValue((event.detail.value as number | null | null | undefined) ?? null)} value={inputValue} labelHint="input number" {...ojCInputNumberProps}/>
            <h5 class="oj-header-border">Default Display of Messages, Hints, with No Help Instruction</h5>
            <oj-c-input-number id="field2" required={true} min={0} max={100} onvalueChanged={(event: InputNumberValueChangedEvent) => setInputValue((event.detail.value as number | null | null | undefined) ?? null)} value={inputValue} placeholder="custom placeholder text" labelHint="input number" {...ojCInputNumberProps2}/>
            <h5 class="oj-header-border">Show Messages and Hide Hints</h5>
            <oj-c-input-number id="field3" required={true} min={0} max={100} onvalueChanged={(event: InputNumberValueChangedEvent) => setInputValue((event.detail.value as number | null | null | undefined) ?? null)} value={inputValue} displayOptions={{ converterHint: 'none', validatorHint: 'none' }} placeholder="custom placeholder text" labelHint="input number"/>
        </oj-form-layout>);
};
export default HelpHintsMessagingHintsMessagesTitle;
