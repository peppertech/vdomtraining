define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Support for RJS modules listening & events.
     */
    class Listenable {
        constructor() {
            this._listeners = [];
        }
        /**
         * Returns an array of registred listeners.
         *
         * @returns {Object[]}
         */
        _getListeners() {
            return this._listeners.slice();
        }
        /**
         * Removes all registered listeners;
         */
        _removeListeners() {
            this._listeners.length = 0;
        }
        /**
         * Add a new listener.
         *
         * The listener is an object where keys are 'event type names'
         * and the values are the functions to be called when such event
         * type happens.
         *
         * Example:
         * anObject.addListener({
         *      pageAdded: function() {
         *          console.log('page added');
         *      }
         * });
         *
         * Or if you want to listen on any event types you may either
         * use 'any' {@code ListenerBuilder.ANY_EVENT} as the event type.
         *
         * @param {type} listener
         * @param {object} [self] You may pass an object which will be the current 'this' when the event handler is called.
         * @returns {undefined}
         */
        addListener(listener, self) {
            if (!listener) {
                throw new Error(Listenable._ERROR_MISSING_LISTENER_ARGUMENT);
            }
            this._listeners.push(listener);
            if (self) {
                listener[Listenable._LISTENER_HANDLER_THIS] = self;
            }
        }
        /**
         * Removes a listener.
         *
         * @param {type} listener
         * @returns {undefined}
         */
        removeListener(listener) {
            if (!listener) {
                throw new Error(Listenable._ERROR_MISSING_LISTENER_ARGUMENT);
            }
            const index = this._listeners.indexOf(listener);
            if (index >= 0) {
                this._listeners.splice(index, 1);
            }
        }
        /**
         * Fire an event.
         *
         * All registered listeners will be notified. If they have handler for the
         * given eventId or have general 'any' handler, registered action will be
         * performed.
         *
         * @param {string} eventId
         * @returns {undefined}
         */
        fireEvent(eventId) {
            const self = this;
            if (!eventId) {
                throw new Error(Listenable._ERROR_MISSING_ID);
            }
            // convert the array-like arguments object to normal array object
            const args = Array.prototype.slice.call(arguments);
            // remove the eventId itself, the rest are args to be passed to the event handler
            const handlerArgs = args.slice(1);
            let anyHandlerArgs;
            self._getListeners().forEach((listener) => {
                try {
                    // Decide what to use as 'this' for the handler function call
                    // If the second 'self' parameter was passed to the addListener() method,
                    // its value will be 'this' for the event handler, otherwise
                    // the object which calls the fireEvent method will be used.
                    const extraFunctionThis = listener[Listenable._LISTENER_HANDLER_THIS];
                    const functionThis = extraFunctionThis || self;
                    const handlerFunction = listener[eventId];
                    if (handlerFunction) {
                        handlerFunction.apply(functionThis, handlerArgs);
                    }
                    else {
                        const anyHandlerFunction = listener[Listenable.ANY_EVENT];
                        if (anyHandlerFunction) {
                            // for the benefit of any thing listening for "ANY_EVENT",
                            // include the id of the event as the last argument passed to
                            // the handler function
                            if (!anyHandlerArgs) {
                                anyHandlerArgs = handlerArgs.slice(0);
                                anyHandlerArgs.push(eventId);
                            }
                            anyHandlerFunction.apply(functionThis, anyHandlerArgs);
                        }
                    }
                }
                catch (err) {
                    // LOGGER.exception(err, 'Listener function failed.');
                }
            });
        }
    }
    exports.default = Listenable;
    ;
    // };
    Listenable.ANY_EVENT = '*';
    Listenable._ERROR_MISSING_LISTENER_ARGUMENT = 'You need to pass at least the listener function';
    Listenable._ERROR_MISSING_ID = 'You need to pass at least the eventId';
    Listenable._LISTENER_HANDLER_THIS = '__LISTENER_HANDLER_THIS';
});
