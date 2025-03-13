import { ComponentProps } from 'preact';
import type { InputText as PreactInputText } from '@oracle/oraclejet-preact/UNSAFE_InputText';
import type { InputTextProps } from './input-text';
type PreactInputTextProps = ComponentProps<typeof PreactInputText>;
export declare function useInputTextPreact<V>({ autocomplete, autofocus, clearIcon, converter, disabled, displayOptions, end, inputPrefix, inputSuffix, labelEdge, labelHint, labelStartWidth, length, messagesCustom, placeholder, readonly, required, requiredMessageDetail, start, textAlign, userAssistanceDensity, validators, value: propValue, virtualKeyboard, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }: InputTextProps<V>, addBusyState?: (desc?: string) => () => void): {
    methods: {
        reset: () => void;
        showMessages: () => void;
        validate: () => Promise<"valid" | "invalid">;
    };
    inputTextProps: PreactInputTextProps;
};
export {};
