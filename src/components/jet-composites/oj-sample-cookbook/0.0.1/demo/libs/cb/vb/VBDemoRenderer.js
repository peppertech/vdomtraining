define(["require", "exports", "jquery", "ojs/ojcontext", "../common/File", "../common/Utils", "../common/Constants", "../RuntimeConnector", "./VBApplicationModel", "../common/ResourceManager"], function (require, exports, $, Context, File_1, Utils_1, Constants_1, RuntimeConnector_1, VBApplicationModel_1, ResourceManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VBDemoRenderer {
        constructor(vm, service) {
            this.vm = vm;
            this.service = service;
        }
        ;
        initResourceManager(config) {
            var service = this.getService(config.version);
            this._RM_INSTANCE = new ResourceManager_1.default(service.basePath, service.host, service.protocol);
        }
        getService(version) {
            return this.service[version];
        }
        newDTRTConnection(demoAppId, demoConfig) {
            this._rtConnection = new RuntimeConnector_1.default({
                iframeId: 'iFrameDemo',
                applicationModel: new VBApplicationModel_1.default(this._getResourceManager(), demoAppId, demoConfig)
            });
            return this._rtConnection;
        }
        _getResourceManager() {
            return this._RM_INSTANCE;
        }
        getRuntimeConnection() {
            return this._rtConnection;
        }
        applyChanges(selectedTab) {
            if (selectedTab !== 'nt_info') {
                let savedPromise = this._saveFileChanges(selectedTab);
                savedPromise.then((() => {
                    this.vm.reloadDemo();
                }));
            }
            this.vm.state.updateDisableApplyBtn(true);
            return {
                disableApplyBtn: true
            };
        }
        ;
        handleTreeSelectionChange(state, event) {
            return new Promise(((res, rej) => {
                if (state.toBeLoaded) {
                    this.loadTabSource(state.file)
                        .then(((fileData) => {
                        this.vm.state.updateFilesMap(state.file.id, new File_1.default(state.file.id, state.file.label, fileData.editorType, fileData.source, fileData.readOnlyEditor));
                        res();
                    }));
                }
                else {
                    res();
                }
            }));
        }
        ;
        handleSourceChanged(event) {
            this.vm.state.updateDisableApplyBtn(false);
            this.vm.element.dispatchEvent(new CustomEvent('sourceCodeChanged', {
                bubbles: true,
                detail: {
                    file: this.vm.state.selectedTab()
                }
            }));
        }
        ;
        handleSourceTabRemove(tabToRemove) {
            if (tabToRemove !== 'nt_info') {
                this._saveFileChanges(tabToRemove);
            }
        }
        ;
        handleSourceTabDeselection(tabDeselected) {
            if (tabDeselected !== 'nt_info') {
                this._saveFileChanges(tabDeselected);
            }
        }
        ;
        resolveFile(fileName) {
        }
        ;
        handleSourceTypeChange(useTS) {
        }
        ;
        loadTabSource(file) {
            return this._getResourceManager().getResource(file.id).then(((result) => {
                let source = result.getContent();
                //doing this only for app-flow.json as vb serves this file on the fly when vb zip run from vbcs instance
                //For now doing this only for app-flow.json file just to preserve the original formatting added by demo author
                if (file.id === 'app-flow.json') {
                    source = JSON.stringify(JSON.parse(source), null, 2);
                }
                return {
                    id: file.id,
                    removable: file.removable,
                    label: file.label,
                    source: source,
                    editorType: this._getEditorType(result.getType()),
                    readOnlyEditor: false
                };
            }));
        }
        ;
        _getEditorType(fileType) {
            switch (fileType) {
                case '.js':
                    return 'javascript';
                case '.css':
                    return 'css';
                case '.json':
                    return 'javascript';
                default:
                    return 'htmlmixed';
            }
        }
        ;
        _saveFileChanges(fileId) {
            var file = this.vm.state.filesMap()[fileId];
            if (file) {
                return this._getResourceManager().getResource(fileId).then(((result) => {
                    result.setModifiedContent(this.vm.state.filesMap()[fileId].editorSource());
                }));
            }
        }
        ;
        loadConfig(conf) {
            var service = this.getService(conf.version);
            return new Promise((function (res, rej) {
                $.getJSON(service.protocol + '//' + service.host + service.basePath + 'flows/' + conf.id + '/config.json', function (cfg) {
                    res(cfg);
                });
            }).bind(this));
        }
        ;
        goToDemo(config) {
            var service = this.getService(config.version);
            this.config = config;
            var demoOpenFiles = [], demoConfig = config, demoPageName = config.demoPageName ? config.demoPageName : 'demo', recipePageName = config.recipePageName ? config.recipePageName : 'recipe', selectedItem = demoConfig.id, isComplexDemo = Utils_1.default._getDemoOption(demoConfig, 'demoType', 'simple') === 'complex', vbversion = Utils_1.default._getDemoOption(demoConfig, 'vbversion', ''), showFolderViewByDefault = Utils_1.default._getDemoOption(demoConfig, 'folderView', 'show') === 'show', demoDependentFiles = ['app-flow.json',
                'app-flow.js',
                'index.html',
                'flows/' + selectedItem + '/' + selectedItem + '-flow.js',
                'flows/' + selectedItem + '/' + selectedItem + '-flow.json',
                'flows/' + selectedItem + '/pages/' + demoPageName + '-page.html',
                'flows/' + selectedItem + '/pages/' + demoPageName + '-page.json',
                'flows/' + selectedItem + '/pages/' + demoPageName + '-page.js',
                'pages/demoshell-page.json',
                'pages/demoshell-page.js',
                'pages/demoshell-page.html'
            ];
            if (demoConfig.otherFiles) {
                demoDependentFiles = demoDependentFiles.concat(Utils_1.default._getDemoOption(demoConfig, 'otherFiles', []));
            }
            demoOpenFiles = demoOpenFiles.concat(this._getDefaultOpenFiles(Utils_1.default._getDemoOption(demoConfig, 'openFiles', []), selectedItem, demoPageName, isComplexDemo));
            var descModuleCfg = this._loadDesc(selectedItem);
            var demoUrl = service.protocol + '//' + service.host + service.basePath +
                'index.html?page=demoshell&demoshell=' + selectedItem + '&' + selectedItem +
                '=' + demoPageName;
            if (vbversion) {
                demoUrl = demoUrl + '&vbversion=' + vbversion;
            }
            demoUrl = (Utils_1.default.addThemingParams.bind(this.vm))('vb', demoUrl, this.vm.state.selectedTheme());
            var recipeUrl = service.protocol + '//' + service.host + service.basePath +
                'flows/' + selectedItem + '/pages/' + recipePageName + '-page.html';
            var recipeConfig = new Promise(function (resolve, reject) {
                $.get(recipeUrl, function (recipeContent) {
                    var tmp = document.createElement('div');
                    tmp.innerHTML = '<oj-sample-cookbook-recipe><template slot="content">' + recipeContent + '</template></oj-sample-cookbook-recipe>';
                    resolve({
                        view: Array.prototype.slice.call(tmp.childNodes),
                        'view-model': {}
                    });
                });
            });
            var promises = [];
            for (var i = 0; i < demoOpenFiles.length; i++) {
                var file = demoOpenFiles[i];
                if (file.id !== 'nt_info') {
                    promises.push(this.loadTabSource(file));
                }
            }
            var fileMapPromise = Promise.all(promises).then((function (results) {
                var fileData, filesMap = {};
                for (var i = 0; i < results.length; i++) {
                    fileData = results[i];
                    filesMap[fileData.id] = new File_1.default(fileData.id, fileData.label, fileData.editorType, fileData.source, fileData.readOnlyEditor);
                }
                return filesMap;
            }).bind(this));
            return new Promise(((res, rej) => {
                fileMapPromise.then(((filesMap) => {
                    res({
                        filesMap: filesMap,
                        descModuleCfg: descModuleCfg,
                        showFolderViewByDefault: showFolderViewByDefault,
                        demoTitle: demoConfig.label,
                        sourceFiles: this._generateTreeData(demoDependentFiles, Constants_1.default.ID_SEPARATOR, ''),
                        selection: selectedItem,
                        demoUrl: demoUrl,
                        recipeUrl: recipeUrl,
                        recipeConfig: recipeConfig,
                        isComplexDemo: isComplexDemo,
                        selectedTab: 'nt_info',
                        runtime: 'vb',
                        openFiles: demoOpenFiles,
                        hasDescription: Utils_1.default._getDemoOption(demoConfig, 'description', 'true'),
                        apiDocLinks: Utils_1.default._getDemoOption(demoConfig, 'apiRef', []),
                        seeAlsoList: Utils_1.default._getDemoOption(demoConfig, 'seealso', []),
                        displaySourceTabs: Utils_1.default._getDemoOption(demoConfig, 'displaySourceTabs', true),
                        displayToolbar: Utils_1.default._getDemoOption(demoConfig, 'displayToolbar', true)
                    });
                }));
            }));
        }
        ;
        updateState(state) {
            this.vm.state.updateDemoState(state);
            this.vm.updateSourceTreeView(state.showFolderViewByDefault);
            setTimeout((() => {
                let navlist = document.getElementById('hnavlist');
                if (navlist) {
                    Context.getContext(navlist)
                        .getBusyContext()
                        .whenReady()
                        .then((() => {
                        this.vm.state.updateTabSelection(state.selectedTab);
                    }));
                }
            }));
        }
        ;
        _generateTreeData(files, idSeparator, idPrefix) {
            var treeData = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var fileParts = file.split('/');
                var dir = null;
                fileParts.forEach(((filePart) => {
                    var dirId, childFiles = null;
                    if (dir) {
                        dirId = dir.attr.id;
                        if (!dir.children) {
                            dir.children = [];
                        }
                        childFiles = dir.children;
                    }
                    else {
                        dirId = idPrefix;
                        childFiles = treeData;
                    }
                    dir = this._findOrAdd(childFiles, filePart, dirId, idSeparator);
                }));
            }
            return treeData;
        }
        ;
        _findOrAdd(siblingList, name, parentDirId, idSeparator) {
            for (var i = 0; i < siblingList.length; i++) {
                if (siblingList[i].attr.id === (parentDirId ? parentDirId + idSeparator + name : name)) {
                    return siblingList[i];
                }
            }
            var obj = {
                title: name,
                attr: {
                    label: name,
                    id: parentDirId ? parentDirId + idSeparator + name : name
                },
                data: {
                    attr: {
                        label: name
                    }
                }
            };
            siblingList.push(obj);
            return obj;
        }
        ;
        _loadDesc(selectedDemoItem) {
            var service = this.getService(this.config.version);
            var descViewPromise = new Promise(function (res, rej) {
                require(['text!' + service.protocol +
                        '//' + service.host +
                        service.basePath +
                        'flows/' + selectedDemoItem +
                        '/description.html'
                ], 
                // @ts-ignore
                function (data) {
                    res(data);
                });
            });
            return {
                view: descViewPromise
            };
        }
        ;
        _getDefaultOpenFiles(openFiles, selectedItem, demoPageName, isComplexDemo) {
            var demoOpenFiles = [{
                    id: 'nt_info',
                    label: 'Info'
                }, {
                    id: 'flows/' + selectedItem + '/pages/' + demoPageName + '-page.html',
                    label: demoPageName + '-page.html',
                    removable: isComplexDemo
                }, {
                    id: 'flows/' + selectedItem + '/pages/' + demoPageName + '-page.js',
                    label: demoPageName + '-page.js',
                    removable: isComplexDemo
                }, {
                    id: 'flows/' + selectedItem + '/pages/' + demoPageName + '-page.json',
                    label: demoPageName + '-page.json',
                    removable: isComplexDemo
                }];
            if (openFiles) {
                for (var i = 0; i < openFiles.length; i++) {
                    demoOpenFiles.push({
                        id: openFiles[i],
                        label: openFiles[i].lastIndexOf(Constants_1.default.FILE_SEPARATOR) > 0 ? openFiles[i].substring(openFiles[i].lastIndexOf(Constants_1.default.FILE_SEPARATOR) + 1) : openFiles[i],
                        removable: isComplexDemo
                    });
                }
            }
            return demoOpenFiles;
        }
        ;
    }
    exports.default = VBDemoRenderer;
});
