define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reducer = reducer;
    exports.addComponentMessage = addComponentMessage;
    exports.clearAllMessages = clearAllMessages;
    exports.showHiddenMessages = showHiddenMessages;
    exports.updateComponentMessages = updateComponentMessages;
    exports.updateCustomMessages = updateCustomMessages;
    exports.updateDisplayValue = updateDisplayValue;
    exports.updateHiddenMessages = updateHiddenMessages;
    exports.updatePreviousConverter = updatePreviousConverter;
    exports.updatePreviousDeferredValidators = updatePreviousDeferredValidators;
    exports.updatePreviousDisabled = updatePreviousDisabled;
    exports.updatePreviousReadonly = updatePreviousReadonly;
    exports.updatePreviousValidators = updatePreviousValidators;
    exports.updatePreviousValue = updatePreviousValue;
    exports.updateTransientValue = updateTransientValue;
    exports.updateValidStatus = updateValidStatus;
    exports.updateValue = updateValue;
    function reducer(state, action) {
        const customMsgs = state.customMessages ?? [];
        const hiddenMsgs = state.hiddenMessages;
        const componentMsgs = state.componentMessages;
        const shownMsgs = state.shownMessages;
        switch (action.type) {
            case 'UPDATE_DISPLAY_VALUE':
                return {
                    ...state,
                    displayValue: action.payload
                };
            case 'UPDATE_VALID':
                return {
                    ...state,
                    valid: action.payload
                };
            case 'UPDATE_VALUE':
                return {
                    ...state,
                    value: action.payload
                };
            case 'UPDATE_TRANSIENT_VALUE':
                return {
                    ...state,
                    transientValue: action.payload
                };
            case 'UPDATE_PREVIOUS_CONVERTER':
                return {
                    ...state,
                    previousConverter: action.payload
                };
            case 'UPDATE_PREVIOUS_DEFERRED_VALIDATORS':
                return {
                    ...state,
                    previousDeferredValidators: action.payload
                };
            case 'UPDATE_PREVIOUS_DISABLED':
                return {
                    ...state,
                    previousDisabled: action.payload
                };
            case 'UPDATE_PREVIOUS_READONLY':
                return {
                    ...state,
                    previousReadonly: action.payload
                };
            case 'UPDATE_PREVIOUS_VALIDATORS':
                return {
                    ...state,
                    previousValidators: action.payload
                };
            case 'UPDATE_PREVIOUS_VALUE':
                return {
                    ...state,
                    previousValue: action.payload
                };
            case 'UPDATE_COMPONENT_MESSAGES':
                return {
                    ...state,
                    componentMessages: action.payload,
                    shownMessages: [...customMsgs, ...action.payload]
                };
            case 'UPDATE_HIDDEN_MESSAGES':
                return {
                    ...state,
                    hiddenMessages: action.payload
                };
            case 'UPDATE_CUSTOM_MESSAGES':
                return {
                    ...state,
                    customMessages: action.payload,
                    shownMessages: [...action.payload, ...componentMsgs]
                };
            case 'CLEAR_ALL_MESSAGES':
                return {
                    ...state,
                    shownMessages: [],
                    hiddenMessages: [],
                    customMessages: [],
                    componentMessages: []
                };
            case 'ADD_COMPONENT_MESSAGE':
                return {
                    ...state,
                    componentMessages: [...componentMsgs, action.payload],
                    shownMessages: [...shownMsgs, action.payload]
                };
            case 'SHOW_HIDDEN_MESSAGES':
                return hiddenMsgs.length === 0
                    ? state
                    : {
                        ...state,
                        hiddenMessages: [],
                        shownMessages: [...customMsgs, ...componentMsgs, ...hiddenMsgs]
                    };
            default:
                return state;
        }
    }
    function updateDisplayValue(dispatch, displayValue, { onRawValueChanged }) {
        dispatch({ type: 'UPDATE_DISPLAY_VALUE', payload: displayValue });
        onRawValueChanged?.(displayValue);
    }
    function updateValidStatus(dispatch, state, { onValidChanged }) {
        dispatch({ type: 'UPDATE_VALID', payload: state });
        onValidChanged?.(state);
    }
    function updateValue(dispatch, value, { onValueChanged }) {
        dispatch({ type: 'UPDATE_VALUE', payload: value });
        onValueChanged?.(value);
    }
    function updateTransientValue(dispatch, transientValue, { onTransientValueChanged }) {
        dispatch({ type: 'UPDATE_TRANSIENT_VALUE', payload: transientValue });
        onTransientValueChanged?.(transientValue);
    }
    function updateComponentMessages(dispatch, messages) {
        dispatch({ type: 'UPDATE_COMPONENT_MESSAGES', payload: messages });
    }
    function updateHiddenMessages(dispatch, messages) {
        dispatch({ type: 'UPDATE_HIDDEN_MESSAGES', payload: messages });
    }
    function updateCustomMessages(dispatch, messages) {
        dispatch({ type: 'UPDATE_CUSTOM_MESSAGES', payload: messages });
    }
    function updatePreviousValue(dispatch, value) {
        dispatch({ type: 'UPDATE_PREVIOUS_VALUE', payload: value });
    }
    function updatePreviousConverter(dispatch, converter) {
        dispatch({ type: 'UPDATE_PREVIOUS_CONVERTER', payload: converter });
    }
    function updatePreviousDeferredValidators(dispatch, validators) {
        dispatch({ type: 'UPDATE_PREVIOUS_DEFERRED_VALIDATORS', payload: validators });
    }
    function updatePreviousDisabled(dispatch, disabled) {
        dispatch({ type: 'UPDATE_PREVIOUS_DISABLED', payload: disabled });
    }
    function updatePreviousReadonly(dispatch, readonly) {
        dispatch({ type: 'UPDATE_PREVIOUS_READONLY', payload: readonly });
    }
    function updatePreviousValidators(dispatch, validators) {
        dispatch({ type: 'UPDATE_PREVIOUS_VALIDATORS', payload: validators });
    }
    function clearAllMessages(dispatch, _value, { onMessagesCustomChanged }) {
        dispatch({ type: 'CLEAR_ALL_MESSAGES' });
        onMessagesCustomChanged?.([]);
    }
    function showHiddenMessages(dispatch) {
        dispatch({ type: 'SHOW_HIDDEN_MESSAGES' });
    }
    function addComponentMessage(dispatch, message) {
        dispatch({ type: 'ADD_COMPONENT_MESSAGE', payload: message });
    }
});
