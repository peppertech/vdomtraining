define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Command {
        constructor(channelIdentity, identity, commandId, payload) {
            this.channelIdentity = channelIdentity;
            this.identity = identity;
            this.commandId = commandId;
            this.payload = payload;
        }
        static create(channelIdentity, commandId, payload) {
            return new Command(channelIdentity, Command.identityCounter++, commandId, payload);
        }
        static fromData(data) {
            return new Command(data.channelIdentity, data.identity, data.commandId, data.payload);
        }
        getChannelIdentity() {
            return this.channelIdentity;
        }
        getCommandId() {
            return this.commandId;
        }
        getPayload() {
            return this.payload;
        }
        getIdentity() {
            return this.identity;
        }
    }
    exports.default = Command;
    Command.identityCounter = 0;
});
