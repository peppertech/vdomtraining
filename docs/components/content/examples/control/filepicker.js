define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojfilepicker"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const FilePicker = () => {
        const [accept, setAccept] = (0, hooks_1.useState)(["image/*"]);
        const [selectionMode, setSelectionMode] = (0, hooks_1.useState)("multiple");
        const [disabled, setDisabled] = (0, hooks_1.useState)(false);
        const [selectedFiles, setSelectedFiles] = (0, hooks_1.useState)();
        const selectListener = (event) => {
            const files = event.detail.files;
            setSelectedFiles(Array.from(files));
        };
        const invalidSelectListener = (event) => {
            const message = event.detail.messages;
            setSelectedFiles([]);
            alert(`${message[0].severity.charAt(0).toUpperCase() +
                message[0].severity.slice(1)} \n ${message[0].summary}`);
        };
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("oj-file-picker", { accept: accept, selectionMode: selectionMode, onojSelect: selectListener, disabled: disabled, onojInvalidSelect: invalidSelectListener }), (0, jsx_runtime_1.jsx)("div", { children: selectedFiles && selectedFiles.length > 0 && ((0, jsx_runtime_1.jsx)("ul", { children: selectedFiles.map((file, index) => ((0, jsx_runtime_1.jsxs)("li", { children: [`Name: ${file.name} (${file.type})`, (0, jsx_runtime_1.jsx)("br", {}), `Size: ${file.size} bytes`] }, index))) })) })] }));
    };
    exports.default = FilePicker;
});
