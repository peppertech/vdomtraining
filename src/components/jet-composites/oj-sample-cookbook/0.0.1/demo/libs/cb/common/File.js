define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class File {
        constructor(fileId, label, editorType, editorSource, readOnly, readOnlyLines, foldLines, artifactType) {
            this.fileId = fileId;
            this.label = label;
            this.editorType = editorType;
            this.origSource = editorSource;
            this.editorSource = ko.observable(editorSource);
            this.readOnly = ko.observable(readOnly);
            this.readOnlyLines = readOnlyLines;
            this.foldLines = foldLines;
            this.artifactType = artifactType;
        }
        setReadOnly(readOnly) {
            this.readOnly(readOnly);
        }
        resetEditorSource() {
            this.editorSource(this.origSource);
        }
    }
    exports.default = File;
});
