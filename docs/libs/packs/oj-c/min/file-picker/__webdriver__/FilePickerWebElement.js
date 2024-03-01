"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilePickerWebElement = void 0;
var FilePickerWebElementBase_1 = require("./FilePickerWebElementBase");
var fs = require("fs");
var path = require("path");
/**
 * The component WebElement for [oj-c-file-picker](../../../oj-c/docs/oj.FilePicker.html).
 * Do not instantiate this class directly, instead, use
 * [findFilePicker](../functions/findFilePicker.html).
 */
class FilePickerWebElement extends FilePickerWebElementBase_1.FilePickerWebElementBase {
    /**
     * Takes an Array of objects containing file paths + types.
     * These files will be read from the local filesystem and then sent
     * to the oj-file-picker to simulate user file selection. Only the basename of
     * the file will be sent, not the entire path to make it consistent with how
     * the browser sets the value.
     * @param files An array of objects containing the path and type of selected files
     */
    async doSelect(files) {
        await this.whenReady();
        const dataList = [];
        let file;
        for (let i = 0; i < files.length; i++) {
            const fileInfo = files[i];
            const filePath = fileInfo.path;
            const fileType = fileInfo.type;
            const data = fs.readFileSync(filePath);
            if (data) {
                file = { bytes: Array.from(data), path: path.basename(filePath), type: fileType };
                dataList.push(file);
            }
        }
        await this.whenBusyContextReady();
        await this.getDriver().executeAsyncScript(`const fileList = [];
      const list = arguments[1];
      for(var i = 0; i < list.length; i++) {
      const data = list[i];
      fileList.push(new File([Uint8Array.from(data.bytes)], data.path, {type: data.type}));
      }
      fileList.item = function(i){return fileList[i];}
      arguments[0]._doSelectHelper(fileList).then(arguments[2]);`, this, dataList);
    }
}
exports.FilePickerWebElement = FilePickerWebElement;
//# sourceMappingURL=FilePickerWebElement.js.map