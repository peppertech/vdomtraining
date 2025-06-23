import { ComponentProps } from 'preact';
import type { InputSensitiveText as PreactInputSensitiveText } from '@oracle/oraclejet-preact/UNSAFE_InputSensitiveText';
import type { InputSensitiveTextProps } from './input-sensitive-text';
type PreactInputSensitiveTextProps = ComponentProps<typeof PreactInputSensitiveText>;
export declare function useInputSensitiveTextPreact<V extends string = string>({ autofocus, clearIcon, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, length, maskIcon, maskIconLabel, messagesCustom, placeholder, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, virtualKeyboard, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }: InputSensitiveTextProps<V>, addBusyState?: (desc?: string) => () => void): {
    methods: {
        reset: () => void;
        showMessages: () => void;
        validate: () => Promise<"valid" | "invalid">;
    };
    inputSensitiveTextProps: PreactInputSensitiveTextProps;
};
export {};
