define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Resource {
        constructor(id, content) {
            this._id = id;
            this._type = id.substring(id.lastIndexOf('.'));
            this._modifiedContent = null;
            this._content = content;
        }
        ;
        getType() {
            return this._type;
        }
        ;
        getContent() {
            return this._modifiedContent ? this._modifiedContent : this.getOrigContent();
        }
        ;
        getOrigContent() {
            return this._content;
        }
        ;
        isModified() {
            return !this._modifiedContent;
        }
        ;
        setModifiedContent(content) {
            this._modifiedContent = content;
        }
        ;
    }
    exports.default = Resource;
});
