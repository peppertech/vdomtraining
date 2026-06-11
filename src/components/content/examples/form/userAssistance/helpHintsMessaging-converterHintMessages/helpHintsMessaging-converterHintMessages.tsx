import { h, type ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ColorConverter = require('ojs/ojconverter-color');
import 'oj-c/input-text';
import 'ojs/ojcolor';
import 'ojs/ojformlayout';
export const HelpHintsMessagingConverterHintMessages = () => {
    const converter = useMemo(() => new ColorConverter({ format: 'hex' }), []);
    const ojCInputTextProps: Partial<ComponentProps<'oj-c-input-text'>> = { displayOptions: {
            converterHint: 'none'
        } };
    return (<div id="form-container">
            <oj-form-layout>
                    <oj-c-input-text id="inputtext" converter={converter} labelHint="Input text with color converter"/>
                    <oj-c-input-text id="inputtext2" converter={converter} labelHint="Hide converter hint" {...ojCInputTextProps}/>
                    <oj-c-input-text id="inputtext3" converter={converter} labelHint="Converter hint and placeholder" placeholder="the placeholder text"/>
                </oj-form-layout>
        </div>);
};
export default HelpHintsMessagingConverterHintMessages;
