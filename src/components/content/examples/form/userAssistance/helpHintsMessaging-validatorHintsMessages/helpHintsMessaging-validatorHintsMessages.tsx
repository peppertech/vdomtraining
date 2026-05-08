import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import 'ojs/ojformlayout';
import 'oj-c/input-number';
type InputNumberValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-c-input-number'>['onvalueChanged']>>[0];
export const HelpHintsMessagingValidatorHintsMessages = () => {
    const [decimal, setDecimal] = useState<number | null>(null);
    const [decimal2, setDecimal2] = useState<number | null>(null);
    const ojCInputNumberProps: Partial<ComponentProps<'oj-c-input-number'>> = { helpHints: {
            definition: 'custom help-hints definition text'
        } };
    const ojCInputNumberProps2: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: 'help.instruction text takes precedence over hints'
        } };
    return (<div id="form-container">
            <oj-form-layout>
                    <h5 class="oj-header-border">Validator Hints</h5>
                    <oj-c-input-number id="currency1" required={true} min={10000} max={50000.45} onvalueChanged={(event: InputNumberValueChangedEvent) => setDecimal(event.detail.value ?? null)} value={decimal} labelHint="min, max attributes" {...ojCInputNumberProps}/>
                    <oj-c-input-number id="currency2" required={true} min={10000} max={50000.45} onvalueChanged={(event: InputNumberValueChangedEvent) => setDecimal2(event.detail.value ?? null)} value={decimal2} labelHint="min, max, and help.instruction set" {...ojCInputNumberProps2}/>
                </oj-form-layout>
        </div>);
};
export default HelpHintsMessagingValidatorHintsMessages;
