define(["require", "exports", "jquery", "../common/Constants", "../common/Utils", "./JETDemoRenderer", "ojs/ojaccordion", "ojs/ojcollapsible", "ojs/ojmodule-element", "ojs/ojmodule", "ojs/ojarraytabledatasource", "ojs/ojjsontreedatasource", "ojs/ojconveyorbelt", "ojs/ojtreeview", "ojs/ojoffcanvas", "ojs/ojbutton"], function (require, exports, $, Constants_1, Utils_1, JETDemoRenderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class JETCommunityDemoRenderer extends JETDemoRenderer_1.default {
        constructor(vm, service) {
            super(vm, service);
        }
        fixFileUrl(fileId) {
            var demoId = this.getDemoId();
            if (fileId.indexOf(demoId) === -1 && fileId.indexOf('resources/') !== 0) {
                return "content/" + this.getDemoId() + '/' + fileId;
            }
            return fileId;
        }
        ;
        isModuleView(fileName) {
            return fileName.indexOf('views/') > -1;
        }
        ;
        isModuleViewModel(fileName) {
            return fileName.indexOf('viewModels/') > -1;
        }
        ;
        getModuleNameFromView(fileName) {
            let parts = Constants_1.default.JET_COMMUNITY_MODULE_VIEW_REG_EXP.exec(fileName);
            return parts && parts.length > 1 ? parts[1] : null;
        }
        ;
        getModuleNameFromViewModel(fileName) {
            let parts = Constants_1.default.JET_COMMUNITY_MODULE_VIEW_MODEL_REG_EXP.exec(fileName);
            return parts && parts.length > 1 ? parts[1] : null;
        }
        ;
        getHtmlReadOnlyLines() {
            return Constants_1.default.JET_COMMUNITY_HTML_READ_ONLY_LINES;
        }
        ;
        getHtmlFoldLines() {
            return Constants_1.default.JET_COMMUNITY_HTML_FOLD_LINES;
        }
        ;
        loadConfig(conf) {
            var service = this.getService(conf.version);
            return new Promise((function (res, rej) {
                $.getJSON(service.protocol + '//' + service.host + service.basePath + "content/" + conf.id + '/config.json', function (cfg) {
                    res(cfg);
                });
            }).bind(this));
        }
        ;
        _loadDesc(demoId) {
            var descViewPromise = this._getResourceManager()
                .getResource("content/" + this.getDemoId() + '/description' + this.getResourceType('description') + '.html').then(function (resource) {
                return resource.getContent();
            });
            return {
                view: descViewPromise
            };
        }
        ;
        getDemoUrl() {
            return "content/" + this.getDemoId() + '/demo.html';
        }
        getDemoLaunchUrl() {
            var demoId = Utils_1.default.getComponentAndOptionFromUID(this.getDemoId());
            return 'content/index.html?demo=' + demoId;
        }
        augmentAdditionalDemoUrlParams(url) {
            let hasJS = this._getCombinedOption('hasJS', false);
            let hasCSS = this._getCombinedOption('hasCSS', false);
            let hasTS = this._getCombinedOption('hasTS', false);
            let pageTitle = this._getCombinedOption('pageTitle', '');
            let demoUrl = url + (url.indexOf('?') > -1 ? '&' : '?') +
                'hasJS=' + hasJS +
                '&hasCSS=' + hasCSS +
                '&hasTS=' + hasTS +
                '&pageTitle=' + pageTitle;
            return demoUrl;
        }
        loadDemoResources(isTSDemo) {
            var hasCustomHeader = this._getCombinedOption('customHeader', false);
            var hasJS = this._getCombinedOption('hasJS', true);
            var hasCSS = this._getCombinedOption('hasCSS', false);
            var hasTS = this._getCombinedOption('hasTS', false);
            return this._loadSources(this.getDemoUrl(), hasCustomHeader, isTSDemo, hasJS, hasCSS, hasTS);
        }
        _loadSources(url, hasCustomHeader, isTSDemo, hasJS, hasCSS, hasTS) {
            const filesToLoad = [
                Constants_1.default.JET_COMMUNITY_MAIN_TEMPLATE_FILE,
                Constants_1.default.JET_COMMUNITY_INDEX_TEMPLATE_FILE,
                url
            ];
            let jsUrlIndex, cssUrlIndex, tsUrlIndex;
            if (hasJS) {
                jsUrlIndex = filesToLoad.length;
                filesToLoad.push(url.replace(".html", ".js"));
            }
            if (hasCSS) {
                cssUrlIndex = filesToLoad.length;
                filesToLoad.push(url.replace(".html", ".css"));
            }
            if (hasTS) {
                tsUrlIndex = filesToLoad.length;
                filesToLoad.push(url.replace(".html", ".ts"));
            }
            return this._getResourceManager().getResources(filesToLoad).then(((files) => {
                var mainJsTemplate = files[0].getContent(), htmlTemplate = files[1].getContent(), htmldata = files[2].getContent(), _js = jsUrlIndex ? files[jsUrlIndex].getContent() : '', _css = cssUrlIndex ? files[cssUrlIndex].getContent() : '', _ts = tsUrlIndex ? files[tsUrlIndex].getContent() : '';
                htmldata = Constants_1.default.HTML_INDENTATION + htmldata.split('\n').join('\n' + Constants_1.default.HTML_INDENTATION);
                var insertIndex = htmlTemplate.indexOf(Constants_1.default.HTML_INSERT_POINT_IN_DEMO_TEMPLATE);
                htmldata = htmlTemplate.substring(0, insertIndex) + '\n' + htmldata + '\n' + htmlTemplate.substring(insertIndex + Constants_1.default.HTML_INSERT_POINT_IN_DEMO_TEMPLATE.length);
                htmldata = htmldata.replace(Constants_1.default.HTML_CUSTOM_HEADER_MARKER + '\n', '');
                htmldata = {
                    readonlyLines: '0-' + this.getHtmlReadOnlyLines(),
                    foldLines: this.getHtmlFoldLines(),
                    data: htmldata
                };
                var filesData = this._createBasicDemoFiles(mainJsTemplate, htmldata, _js.length > 0 ? _js : null, _ts.length > 0 ? _ts : null, _css.length > 0 ? _css : null, null);
                return filesData;
            }));
        }
        ;
        getMainJSFilePath() {
            return Constants_1.default.JET_COMMUNITY_MAIN_JS_FILE;
        }
        ;
        getHtmlFilePath() {
            return Constants_1.default.JET_COMMUNITY_HTML_FILE;
        }
        ;
        getJsFilePath() {
            return Constants_1.default.JET_COMMUNITY_JS_FILE;
        }
        ;
        getTsFilePath() {
            return Constants_1.default.JET_COMMUNITY_TS_FILE;
        }
        ;
        getCssFilePath() {
            return Constants_1.default.JET_COMMUNITY_CSS_FILE;
        }
        ;
        getRecipeUrl() {
            return "content/" + this.getDemoId() + '/recipe' + '.html';
        }
        ;
        _isReadOnly(fileId) {
            return (fileId.indexOf('jet-composites') > 0 ||
                (fileId.indexOf('.json') > 0 && !this._isJsonResource(fileId)) ||
                fileId.indexOf('.scss') > 0 ||
                (fileId.indexOf('.css') > 0 && fileId.indexOf('/demo.css') === -1));
        }
        ;
    }
    exports.default = JETCommunityDemoRenderer;
});
