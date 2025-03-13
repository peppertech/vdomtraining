import { ComponentProps } from 'preact';
import type { TextAreaAutosize } from '@oracle/oraclejet-preact/UNSAFE_TextAreaAutosize';
import type { TextArea } from 'oj-c/text-area';
type PreactTextAreaAutosizeProps = ComponentProps<typeof TextAreaAutosize>;
type TextAreaProps = ComponentProps<typeof TextArea>;
export declare function useTextAreaAutosizePreact<V>({ autocomplete, autofocus, converter, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, length, maxRows, messagesCustom, placeholder, readonly, required, requiredMessageDetail, resizeBehavior, rows, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }: TextAreaProps, addBusyState?: (desc?: string) => () => void): {
    methods: {
        reset: () => void;
        showMessages: () => void;
        validate: () => Promise<"valid" | "invalid">;
    };
    textAreaProps: PreactTextAreaAutosizeProps;
};
export {};
