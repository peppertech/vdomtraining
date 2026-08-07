import 'oj-c/input-text';
import 'ojs/ojformlayout';
import 'preact';
import { type ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];
type InputTextValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>>[0];
export default function HelpHintsMessagingHelpTitle() {
    const [text, setText] = useState<InputTextValue>('');
    const handleValueChanged = (event: InputTextValueChangedEvent) => {
        setText((event.detail.value as InputTextValue | null | undefined) ?? '');
    };
    const ojCInputTextProps: Partial<ComponentProps<'oj-c-input-text'>> = { helpHints: {
            definition: 'custom help definition text'
        } };
    const ojCInputTextProps2: Partial<ComponentProps<'oj-c-input-text'>> = { helpHints: {
            source: 'https://www.oracle.com',
            definition: 'custom help definition text'
        } };
    const ojCInputTextProps3: Partial<ComponentProps<'oj-c-input-text'>> = { helpHints: {
            source: 'https://www.oracle.com',
            sourceText: 'More info.',
            definition: 'custom help definition text'
        } };
    const ojCInputTextProps4: Partial<ComponentProps<'oj-c-input-text'>> = { help: {
            instruction: 'enter at least 3 alphanumeric characters'
        } };
    const ojCInputTextProps5: Partial<ComponentProps<'oj-c-input-text'>> = { help: {
            instruction: 'this instruction takes precedence over hints'
        }, helpHints: {
            definition: 'custom help definition text'
        } };
    const ojCInputTextProps6: Partial<ComponentProps<'oj-c-input-text'>> = { help: {
            instruction: 'this instruction works with help-hints source'
        }, helpHints: {
            source: 'https://www.oracle.com',
            sourceText: 'More info.'
        } };
    return (<oj-form-layout id="form-container">
            <h5 class="oj-header-border">Help Definition</h5>
            <oj-c-input-text onvalueChanged={handleValueChanged} value={text} labelHint="Help definition" {...ojCInputTextProps}/>
            <oj-c-input-text onvalueChanged={handleValueChanged} value={text} labelHint="Help source and definition" {...ojCInputTextProps2}/>
            <oj-c-input-text onvalueChanged={handleValueChanged} value={text} labelHint="Custom source text" {...ojCInputTextProps3}/>
            <p />
            <h5 class="oj-header-border">Help Instruction</h5>
            <oj-c-input-text autocomplete="off" onvalueChanged={handleValueChanged} value={text} labelHint="Instruction only" {...ojCInputTextProps4}/>
            <oj-c-input-text autocomplete="off" onvalueChanged={handleValueChanged} value={text} labelHint="Instruction and definition" {...ojCInputTextProps5}/>
            <oj-c-input-text autocomplete="off" onvalueChanged={handleValueChanged} value={text} labelHint="Instruction and source" {...ojCInputTextProps6}/>
        </oj-form-layout>);
}
