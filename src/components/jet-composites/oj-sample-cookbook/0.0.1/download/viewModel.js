define(["require", "exports", "knockout", "jquery", "ojs/ojlogger", "./libs/jszip/jszip", "./libs/jszip/jszip-utils", "./libs/jszip/FileSaver"], function (require, exports, ko, $, Logger, JSZip, util) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Model {
        constructor(context) {
            var ele = context.element;
            this.SINGLE = 'SINGLE';
            this.NONE = 'NONE';
            this.MULTIPLE = 'MULTIPLE';
            this.downloadType = ko.observable(this.NONE);
            ele.addEventListener('downloadablesChanged', (event) => {
                var newValue = event.detail.value;
                this._updateDownloadType(newValue);
                this.downloadables = newValue;
            });
            this._updateDownloadType = (newValue) => {
                if (Array.isArray(newValue) && newValue.length > 0) {
                    if (newValue.length === 1) {
                        this.downloadType(this.SINGLE);
                    }
                    else {
                        this.downloadType(this.MULTIPLE);
                    }
                }
                else {
                    this.downloadType(this.NONE);
                }
            };
            if (context.properties.downloadables) {
                var downloadables = context.properties.downloadables;
                this.downloadables = downloadables;
                this.fileResolver = context.properties.resolveFile;
                this._updateDownloadType(downloadables);
            }
            this.baseUrl = context.properties.baseUrl || '';
            this.defaultBaseDir = context.properties.defaultBaseDir || '';
            this.onArtifactBtnSelection = (event) => {
                this.downloadArtifact(this.downloadables[0]);
            };
            this.onArtifactMenuSelection = (event) => {
                var item = $(event.target);
                let index = item.attr('data-index');
                if (index) {
                    this.downloadArtifact(this.downloadables[index]);
                }
            };
            this.downloadArtifact = (downloadable) => {
                var base = this.baseUrl + (downloadable.base === undefined ? this.defaultBaseDir : downloadable.base);
                this.download(downloadable.zipFileName, downloadable.files, base, downloadable.base).then(function () {
                    // DO nothing on success
                }, function () {
                    Logger.error('Failed to create downloadable.');
                });
            };
            this.download = (fileName, files, base, downloadFilePrefix) => {
                return new Promise((downloadResolve, downloadReject) => {
                    // require(['./libs/jszip/jszip', './libs/jszip/jszip-utils', './libs/jszip/FileSaver'], function (JSZip, util) {
                    var errorHandler = function (error) {
                        downloadReject(error);
                    };
                    var zip = new JSZip();
                    var promises = [];
                    files.forEach((file) => {
                        promises.push(new Promise((resolvePromise, rejectPromise) => {
                            var cachedFileContent = null;
                            if (this.fileResolver) {
                                cachedFileContent = this.fileResolver(downloadFilePrefix + file);
                            }
                            if (!cachedFileContent) {
                                util.getBinaryContent(base + file, function (err, data) {
                                    if (err) {
                                        rejectPromise(zip);
                                    }
                                    else {
                                        zip.file(file, data, { binary: true });
                                        resolvePromise(zip);
                                    }
                                });
                            }
                            else {
                                zip.file(file, cachedFileContent, { binary: true });
                                resolvePromise(zip);
                            }
                        }));
                    });
                    Promise.all(promises).then(function () {
                        zip.generateAsync({ type: 'blob' })
                            .then(function (blob) {
                            window.saveAs(blob, fileName + '.zip');
                            downloadResolve(zip);
                        }, errorHandler);
                    }, errorHandler);
                });
            };
        }
        connected() {
        }
    }
    exports.default = Model;
});
