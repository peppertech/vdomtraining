import { ComponentProps } from 'preact';
import type { TextArea as PreactTextArea } from '@oracle/oraclejet-preact/UNSAFE_TextArea';
import type { TextArea } from 'oj-c/text-area';
type PreactTextAreaProps = ComponentProps<typeof PreactTextArea>;
type TextAreaProps = ComponentProps<typeof TextArea>;
export declare function useTextAreaPreact<V>({ autocomplete, autofocus, converter, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, length, messagesCustom, placeholder, readonly, required, requiredMessageDetail, resizeBehavior, rows, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValueChanged, onValidChanged, ...otherProps }: TextAreaProps, addBusyState?: (desc?: string) => () => void): {
    methods: {
        reset: () => void;
        showMessages: () => void;
        validate: () => Promise<"valid" | "invalid">;
    };
    textAreaProps: PreactTextAreaProps;
};
export {};
