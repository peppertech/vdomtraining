import { ComponentProps } from 'preact';
import type { InputPassword as PreactInputPassword } from '@oracle/oraclejet-preact/UNSAFE_InputPassword';
import type { InputPassword } from 'oj-c/input-password';
type PreactInputPasswordProps = ComponentProps<typeof PreactInputPassword>;
type InputPasswordProps = ComponentProps<typeof InputPassword>;
export declare function useInputPasswordPreact({ autocomplete, autofocus, clearIcon, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, maskIcon, messagesCustom, placeholder, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }: InputPasswordProps, addBusyState?: (desc?: string) => () => void): {
    methods: {
        reset: () => void;
        showMessages: () => void;
        validate: () => Promise<"valid" | "invalid">;
    };
    inputPasswordProps: PreactInputPasswordProps;
};
export {};
