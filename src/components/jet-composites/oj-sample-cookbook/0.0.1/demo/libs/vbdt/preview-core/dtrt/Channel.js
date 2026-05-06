define(["require", "exports", "./Command"], function (require, exports, Command_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * One way channel for communication between frames.
     *
     * Enables one to run commands to another frame and obtain results
     * via a result promise. The command handler can run both synchronous
     * or asynchronous tasks.
     *
     * @param {object} param
     * @param {string} param.identity - identity of the channel
     * @param {string} param.commandHandlers - array of implementations of
     * CommandHandler interface.
     * @param {string} param.iframeGetter - function which returns the peer
     * frame window
     */
    class Channel {
        constructor(param) {
            this.channelIdentity = param.identity;
            this.commandHandlers = param.commandHandlers;
            this.getIframeWindow = param.iframeGetter;
            this.tasks = {};
            this._receiveMessageHandler = this._receiveMessage.bind(this);
            window.addEventListener('message', this._receiveMessageHandler, false);
        }
        dispose() {
            window.removeEventListener('message', this._receiveMessageHandler, false);
        }
        getIdentity() {
            return this.channelIdentity;
        }
        _receiveMessage(event) {
            const data = event.data;
            if (data.channelIdentity) {
                if (data.channelIdentity === this.channelIdentity) {
                    if (data.response) {
                        this._handleCommandResponse(data);
                    }
                    else {
                        this._handleCommand(data, event);
                    }
                }
            }
        }
        /**
         * Handles response to a previously send command.
         * Resolves the promise corresponding to the command identity.
         *
         * @param {object} data
         * @returns {undefined}
         */
        _handleCommandResponse(data) {
            const taskInfo = this.tasks[data.identity];
            if (!taskInfo) {
                return;
                // throw new Error(`Got response to command ${JSON.stringify(data)} but the command's task is already resolved or discarded due to timeout.`);
            }
            delete this.tasks[data.identity];
            if (data.error) {
                taskInfo.reject(data.error);
            }
            else {
                taskInfo.fulfil(data.payload);
            }
        }
        /**
         * Handles received command.
         *
         * @param {Object} data - event data
         * @param {Event} event
         * @returns {undefined}
         */
        _handleCommand(data, event) {
            const self = this;
            const command = Command_1.default.fromData(data);
            let commandResult;
            for (let i = 0; i < self.commandHandlers.length; i++) {
                const commandHandler = self.commandHandlers[i];
                const result = commandHandler.handleCommand(command);
                if (result) {
                    commandResult = result; // first wins
                    break;
                }
            }
            if (!commandResult) {
                throw new Error(`Unknown command: ${JSON.stringify(data)}`);
            }
            return commandResult
                .then((result) => {
                const response = Channel._createCommandSuccessResponse(command, result);
                event.source.postMessage(response, '*');
                self._log(`command ${command.getCommandId()} [${command.getIdentity()}] finished`);
                return result;
            })
                .catch((error) => {
                console.error(error); // eslint-disable-line no-console
                const response = Channel._createCommandErrorResponse(command, error);
                event.source.postMessage(response, '*');
                self._log(`command ${command.getCommandId()} [${command.getIdentity()}] failed`);
            });
        }
        static _createCommandSuccessResponse(command, result) {
            return {
                channelIdentity: command.getChannelIdentity(),
                identity: command.getIdentity(),
                payload: result,
                response: true,
            };
        }
        static _createCommandErrorResponse(command, error) {
            return {
                channelIdentity: command.getChannelIdentity(),
                identity: command.getIdentity(),
                error: Channel._formatErrorForTransfer(error),
                response: true,
            };
        }
        static _formatErrorForTransfer(error) {
            return {
                stringified: JSON.stringify(error),
                stack: error.stack,
                message: error.message,
            };
        }
        _log(message) {
            // console.log(`%c[channel ${this.channelIdentity}] ${message}`, 'background: #222; color: #bada55'); // eslint-disable-line no-console
        }
        /**
         * Runs a Command in the peer frame.
         *
         * @param {string} commandId - id of the command to run
         * @param {string} payload - command payload (parameters)
         * @param {string} timeout - arbitrary parameter specifying custom command timeout
         * @returns {Promise} returns promise of the command result
         */
        run(commandId, payload, timeout) {
            let _timeout = timeout;
            const self = this;
            if (!_timeout) {
                _timeout = Channel.COMMAND_TIMEOUT;
            }
            const command = Command_1.default.create(this.channelIdentity, commandId, payload);
            const identity = command.getIdentity();
            return new Promise((fulfil, reject) => {
                self.getIframeWindow().postMessage(command, '*');
                self.tasks[identity] = {
                    fulfil,
                    reject,
                };
                // add command timeout handler
                self._runCommandTimeoutTask(command, _timeout, reject);
            });
        }
        _runCommandTimeoutTask(command, timeout, reject) {
            const self = this;
            const commandIdentity = command.getIdentity();
            setTimeout(() => {
                if (self.tasks[commandIdentity]) {
                    reject(`Command ${JSON.stringify(command)} out after ${Channel.COMMAND_TIMEOUT}ms`);
                    delete self.tasks[commandIdentity];
                }
            }, timeout);
        }
    }
    exports.default = Channel;
    Channel.COMMAND_TIMEOUT = 30000; // ms
});
