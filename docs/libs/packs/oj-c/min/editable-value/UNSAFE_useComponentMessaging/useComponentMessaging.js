define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useUncontrolledState", "preact/hooks", "../utils/utils"], function (require, exports, UNSAFE_useUncontrolledState_1, hooks_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useComponentMessaging = void 0;
    function useComponentMessaging({ messagesCustom: messagesCustomProp = [], onMessagesCustomChanged }) {
        const [messagesCustom, setMessagesCustom] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(messagesCustomProp, onMessagesCustomChanged);
        const [componentMessages, setComponentMessages] = (0, hooks_1.useState)([]);
        const [deferredComponentMessages, setDeferredComponentMessages] = (0, hooks_1.useState)([]);
        const prevMessagesCustomPropRef = (0, hooks_1.useRef)(messagesCustomProp);
        const addComponentMessage = (0, hooks_1.useCallback)((...messages) => {
            setComponentMessages((prevMessages) => [...prevMessages, ...messages]);
        }, []);
        const addDeferredComponentMessage = (0, hooks_1.useCallback)((message) => {
            setComponentMessages((prevMessages) => [...prevMessages, message]);
        }, []);
        const clearAllComponentMessages = (0, hooks_1.useCallback)(() => {
            setComponentMessages([]);
            setDeferredComponentMessages([]);
        }, []);
        const clearDeferredComponentMessages = (0, hooks_1.useCallback)(() => {
            setDeferredComponentMessages([]);
        }, []);
        const clearAllMessages = (0, hooks_1.useCallback)(() => {
            setComponentMessages([]);
            setDeferredComponentMessages([]);
            setMessagesCustom([]);
        }, []);
        const hasCustomErrorMessages = (0, hooks_1.useCallback)(() => {
            return messagesCustom.some((message) => message.severity === 'error');
        }, [messagesCustom]);
        const hasNoErrorMessages = (0, hooks_1.useCallback)(() => {
            return (componentMessages.length === 0 &&
                deferredComponentMessages.length === 0 &&
                hasCustomErrorMessages() === false);
        }, [componentMessages, deferredComponentMessages, hasCustomErrorMessages]);
        const hasHiddenMessages = (0, hooks_1.useCallback)(() => {
            return deferredComponentMessages.length !== 0;
        }, [deferredComponentMessages]);
        const showHiddenMessages = (0, hooks_1.useCallback)(() => {
            setComponentMessages((prevMessages) => [...prevMessages, ...deferredComponentMessages]);
            setDeferredComponentMessages([]);
        }, [deferredComponentMessages]);
        (0, hooks_1.useEffect)(() => {
            if (prevMessagesCustomPropRef.current === messagesCustomProp) {
                return;
            }
            prevMessagesCustomPropRef.current = messagesCustomProp;
            if ((0, utils_1.isShallowEqual)(messagesCustom, messagesCustomProp)) {
                return;
            }
            setMessagesCustom(messagesCustomProp);
        }, [messagesCustom, messagesCustomProp]);
        return (0, hooks_1.useMemo)(() => ({
            componentMessages,
            deferredComponentMessages,
            messagesCustom,
            visibleMessages: [...messagesCustom, ...componentMessages],
            addComponentMessage,
            addDeferredComponentMessage,
            clearAllComponentMessages,
            clearAllMessages,
            clearDeferredComponentMessages,
            hasCustomErrorMessages,
            hasHiddenMessages,
            hasNoErrorMessages,
            setComponentMessages,
            setDeferredComponentMessages,
            showHiddenMessages
        }), [
            componentMessages,
            deferredComponentMessages,
            messagesCustom,
            hasCustomErrorMessages,
            hasHiddenMessages,
            hasNoErrorMessages,
            showHiddenMessages
        ]);
    }
    exports.useComponentMessaging = useComponentMessaging;
});
