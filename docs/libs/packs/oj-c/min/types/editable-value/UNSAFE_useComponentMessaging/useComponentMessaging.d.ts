import { ComponentMessageItem } from '@oracle/oraclejet-preact/UNSAFE_ComponentMessage';
import { StateUpdater } from 'preact/hooks';
export type ComponentMessagingState = {
    componentMessages: ComponentMessageItem[];
    deferredComponentMessages: ComponentMessageItem[];
    messagesCustom: ComponentMessageItem[];
    visibleMessages: ComponentMessageItem[];
    addComponentMessage: (message: ComponentMessageItem) => void;
    addDeferredComponentMessage: (message: ComponentMessageItem) => void;
    clearAllComponentMessages: () => void;
    clearAllMessages: () => void;
    clearDeferredComponentMessages: () => void;
    hasCustomErrorMessages: () => boolean;
    hasHiddenMessages: () => boolean;
    hasNoErrorMessages: () => boolean;
    setComponentMessages: StateUpdater<ComponentMessageItem[]>;
    setDeferredComponentMessages: StateUpdater<ComponentMessageItem[]>;
    showHiddenMessages: () => void;
};
export type UseComponentMessagingProps = {
    messagesCustom?: ComponentMessageItem[];
    onMessagesCustomChanged?: (messagesCustom?: ComponentMessageItem[]) => void;
};
export declare function useComponentMessaging({ messagesCustom: messagesCustomProp, onMessagesCustomChanged }: UseComponentMessagingProps): ComponentMessagingState;
