define(["require", "exports", "jquery", "knockout", "ojs/ojcontext", "ojs/ojmodule-element-utils", "../common/File", "../common/Utils", "../common/Constants", "../RuntimeConnector", "./JETApplicationModel", "../common/ResourceManager", "./Pre710DemoVersionHandler", "./DefaultDemoVersionHandler", "ojs/ojaccordion", "ojs/ojcollapsible", "ojs/ojmodule-element", "ojs/ojmodule", "ojs/ojarraytabledatasource", "ojs/ojjsontreedatasource", "ojs/ojconveyorbelt", "ojs/ojtreeview", "ojs/ojoffcanvas", "ojs/ojbutton"], function (require, exports, $, ko, Context, moduleUtils, File_1, Utils_1, Constants_1, RuntimeConnector_1, JETApplicationModel_1, ResourceManager_1, Pre710DemoVersionHandler_1, DefaultDemoVersionHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class JETDemoRenderer {
        constructor(vm, service) {
            // constants
            this._getSearchParams = function (k) {
                var p = {};
                location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, key, v) {
                    p[key] = v;
                    return '';
                });
                return k ? p[k] : p;
            };
            // state variables
            this.state = {};
            this.codeChangeTracker = {};
            // parent state
            this.service = service;
            this.application = vm;
            this.element = this.application.element;
            //---listeners
            this.listeners = {};
            this.listeners.sourceChanged = ((event) => {
                var tabId = this.application.state.selectedTab();
                if (tabId === Constants_1.default.ALL_TAB_ID) {
                    var editorId = $(event.target).attr('id');
                    if (editorId === Constants_1.default.ALL_TAB_HTML_EDITOR_ID) {
                        tabId = this.getHtmlFilePath();
                    }
                    else if (editorId === Constants_1.default.ALL_TAB_JS_EDITOR_ID) {
                        tabId = this.getJsFilePath();
                    }
                    else if (editorId === Constants_1.default.ALL_TAB_TS_EDITOR_ID) {
                        tabId = this.getTsFilePath();
                    }
                    else if (editorId === Constants_1.default.ALL_TAB_CSS_EDITOR_ID) {
                        tabId = this.getCssFilePath();
                    }
                    else if (editorId === Constants_1.default.ALL_TAB_WD_TS_EDITOR_ID) {
                        tabId = this.getWdTsFilePath();
                    }
                }
                if (tabId !== Constants_1.default.ALL_TAB_ID && tabId !== Constants_1.default.INFO_TAB_ID) {
                    this.codeChangeTracker[tabId] = this.application.state.filesMap()[tabId];
                }
                this.element.dispatchEvent(new CustomEvent('sourceCodeChanged', {
                    bubbles: true,
                    detail: {
                        file: tabId
                    }
                }));
                this.application.state.updateDisableApplyBtn(false);
            });
            // ---------------------Bounded functions
            this.functions = {};
            this.functions.refreshCodeEditor = (function (target) {
                const element = $(target)[0];
                element.refresh();
            }).bind(this);
            this.functions.getHtmlFile = (() => {
                var filesMap = this.application.state.filesMap();
                return filesMap ? filesMap[this.getHtmlFilePath()] : false;
            });
            this.functions.getCssFile = (() => {
                var filesMap = this.application.state.filesMap();
                return filesMap ? filesMap[this.getCssFilePath()] : false;
            });
            this.functions.getJsFile = (() => {
                var filesMap = this.application.state.filesMap();
                return filesMap ? filesMap[this.getJsFilePath()] : false;
            });
            this.functions.getTsFile = (() => {
                var filesMap = this.application.state.filesMap();
                return filesMap ? filesMap[this.getTsFilePath()] : false;
            });
            this.functions.getWDSpecFile = (() => {
                var filesMap = this.application.state.filesMap();
                return filesMap ? filesMap[this.getWdTsFilePath()] : false;
            });
            this.handleTreeSelectionChange = function (state, e) {
                return new Promise(((res, rej) => {
                    var fileId = e.detail.value[0];
                    if (/.*\.(jpg|png|gif|bmp)/.test(fileId) || !fileId) {
                        return;
                    }
                    var filePath = fileId.replace(new RegExp(Constants_1.default.ID_SEPARATOR, 'g'), '/');
                    if (!this.application.state.filesMap()[filePath]) {
                        this._loadResource(fileId).then(((filesMap) => {
                            this.application.state.updateJETFilesMap(filesMap);
                            res();
                        }));
                    }
                    else {
                        res();
                    }
                }));
            };
            this.applyCodeChanges = function () {
                var useTS = this.useTSSource;
                // Create artifacts needed reload
                var artifacts = this._getArtifacts(this.codeChangeTracker, this.application.state.filesMap());
                var promise = this.getRuntimeConnection().applyChanges({
                    artifacts: artifacts,
                    useTS: useTS
                });
                promise.then((() => {
                    this._resetChangeTracking();
                }), function (reason) {
                    //console.log(reason);
                });
            };
            this.applyChanges = function (selectedTab) {
                this.applyCodeChanges();
            };
            this.resetCodeChanges = function (useTS) {
                // Create artifacts needed reload
                var filesToLoad = [], fileName, files = this._filesList, filesMap, i;
                for (i = 0; i < files.length; i++) {
                    fileName = files[i];
                    if (!(fileName === 'demo/demo.html' ||
                        fileName === 'js/main.js' ||
                        fileName === 'js/demo.js' ||
                        fileName === 'js/demo.ts' ||
                        fileName === 'css/demo.css' ||
                        fileName === 'js/cookbook-ui-wd.spec.ts')) {
                        filesToLoad.push(fileName);
                    }
                }
                this._loadResources(filesToLoad).then(((filesData) => {
                    filesMap = this.application.state.filesMap();
                    filesData.forEach(((data) => {
                        this.application.state.updateJETFilesMap(data);
                    }));
                    var codeChangeTracker = {};
                    var keys = Object.keys(filesMap);
                    var key;
                    for (i = 0; i < keys.length; i++) {
                        key = keys[i];
                        codeChangeTracker[key] = filesMap[key];
                    }
                    var promise = this.getRuntimeConnection().applyChanges({
                        artifacts: this._getArtifacts(codeChangeTracker, filesMap),
                        useTS: useTS
                    });
                    promise.then((() => {
                        this._resetChangeTracking();
                    }), (reason) => {
                        //console.log(reason);
                    });
                }));
            };
        }
        ;
        initResourceManager(config) {
            var version = config.version;
            var service = this.getService(version);
            this._RM_INSTANCE = new ResourceManager_1.default(service.basePath, service.host, service.protocol);
        }
        ;
        getService(version) {
            return this.service[version];
        }
        newDTRTConnection(demoAppId, demoConfig) {
            this._rtConnection = new RuntimeConnector_1.default({
                iframeId: 'iFrameDemo',
                applicationModel: new JETApplicationModel_1.default(this._getResourceManager(), demoAppId, demoConfig)
            });
            return this._rtConnection;
        }
        ;
        _getResourceManager() {
            return this._RM_INSTANCE;
        }
        ;
        getRuntimeConnection() {
            return this._rtConnection;
        }
        ;
        handleSourceTypeChange(useTS) {
            this.useTSSource = useTS;
            // var tabId = this.application.state.selectedTab();
            //TODOUPDATE
            var files = this.application.state.filesMap();
            var key, keys = Object.keys(files);
            for (var i = 0; i < keys.length; i++) {
                key = keys[i];
                files[key].resetEditorSource();
                if ((files[key].fileId.indexOf('.ts') > -1) && !(files[key].fileId.indexOf('.spec.ts') > -1)) {
                    files[key].setReadOnly(!useTS);
                }
                else if (files[key].fileId.indexOf('.js') > -1) {
                    files[key].setReadOnly(useTS);
                }
            }
            this.resetCodeChanges(useTS);
            this._cleanTabsOnSourceChange(useTS);
        }
        ;
        resolveFile(fileName) {
            var fileNameParts = fileName.split('/');
            var fileId = 'nt_st' + Constants_1.default.ID_SEPARATOR + fileNameParts.join(Constants_1.default.ID_SEPARATOR);
            var fileObj = this.application.state.filesMap()[fileId];
            return fileObj ? fileObj.editorSource() : null;
        }
        ;
        handleSourceChanged(event) {
            this.listeners.sourceChanged(event);
        }
        handleSourceTabRemove(tabToRemove) {
        }
        ;
        handleSourceTabDeselection(tabDeselected) { }
        ;
        getDemoVersionHandler(version) {
            let handler;
            if (!version && this.config) {
                version = this.config.version;
            }
            if (version === undefined || Utils_1.default.compareVersion(version, "7.1.0") === -1) {
                handler = new Pre710DemoVersionHandler_1.default();
            }
            else {
                handler = new DefaultDemoVersionHandler_1.default();
            }
            return handler;
        }
        loadConfig(conf) {
            return new Promise(((res, rej) => {
                var demoIdParts = Utils_1.default.getComponentAndOptionFromUID(conf.id);
                let demoConfigUrlSuffix = this.getDemoVersionHandler(conf.version).getDemoConfigUrlSuffix(demoIdParts[0], demoIdParts[1], conf?.isCorepack);
                $.getJSON(this.getServiceBaseUrl(conf.version) + demoConfigUrlSuffix, function (cfg) {
                    res(cfg);
                });
            }));
        }
        _loadDesc(selectedDemoItem) {
            var demoIdParts = Utils_1.default.getComponentAndOptionFromUID(selectedDemoItem);
            let demoDescUrlSuffix = this.getDemoVersionHandler().getDemoDescUrlSuffix(demoIdParts[0], demoIdParts[1], this.getResourceType('description'), this.config?.isCorepack);
            var descViewPromise = this._getResourceManager()
                .getResource(demoDescUrlSuffix).then(function (resource) {
                return resource.getContent();
            });
            return {
                view: descViewPromise
            };
        }
        ;
        getServiceBaseUrl(version) {
            var service = this.getService(version);
            return service.protocol + '//' + service.host + service.basePath;
        }
        ;
        augmentAdditionalDemoUrlParams(url) {
            //do nothing
            return url;
        }
        goToDemo(config) {
            this.defaultBaseDir = this.application.defaultBaseDir;
            this.config = config;
            var baseUrl = this.getServiceBaseUrl(config.version);
            this.baseUrl = baseUrl;
            var hasDescription = Utils_1.default._getDemoOption(config, 'description', false);
            var descriptionModule = hasDescription ? this._loadDesc(config.extendedUid ? config.extendedUid : config.uid ? config.uid : config.id) : null;
            var allPromises = [];
            var isComplexDemo = this._getCombinedOption('demoType', 'simple') === 'complex';
            var isCorepack = this._getCombinedOption('isCorepack', false) === true;
            var composites = this._getCombinedOption('composites', []);
            var modules = this._getCombinedOption('modules', []);
            var otherfiles = this._getCombinedOption('otherFiles', []);
            var defaultTabs = this._getCombinedOption('defaultTabs', []);
            var isTSDemo = this._getCombinedOption('source', 'javascript') === 'typescript';
            var useTSSource = this.element.sourceType === 'typescript' && isTSDemo;
            const jetVersion = Utils_1.default._getDemoOption(config, 'jetversion', '');
            this.useTSSource = useTSSource;
            var sourceFiles;
            var showFolderViewByDefault = this._getCombinedOption('folderView', 'show') === 'show';
            var loadSourcesPromise = this.loadDemoResources(isTSDemo);
            var stateObj = {};
            allPromises.push(loadSourcesPromise.then(((data) => {
                var filesMap = {}, initTabPromise;
                data.files.forEach(function (file) {
                    filesMap[file.fileId] = file;
                });
                sourceFiles = this._regenerateTreeData(data.css, data.js, data.ts, data.wdts, composites, modules, otherfiles);
                initTabPromise = this._loadInitialTabs(useTSSource, !isComplexDemo, data.css, data.js, data.ts, data.wdts, defaultTabs);
                return initTabPromise.then(((td) => {
                    var selectedTab = this._getInitialTabSelection(this.application.state.selectedTab(), useTSSource, filesMap, !isComplexDemo);
                    stateObj.selectedTab = selectedTab;
                    stateObj.tabData = {
                        filesMap: $.extend(filesMap, td.filesMap)
                    };
                    stateObj.openFiles = td.initialTabs;
                }));
            })));
            allPromises.push(this._getInfoTabModuleSettings().then((function (result) {
                stateObj.infoTabModuleSettings = result;
            }).bind(this)));
            if (!isComplexDemo) {
                allPromises.push(this._getAllTabModuleSettings().then((function (result) {
                    stateObj.infoAllTabModuleSettings = result;
                }).bind(this)));
            }
            var apiDocLinks = Utils_1.default._getDemoOption(config, 'apiRef', []);
            if (apiDocLinks.length === undefined) {
                apiDocLinks = [apiDocLinks];
            }
            var uxSpecLinks = Utils_1.default._isPublicSite() ? [] : Utils_1.default._getDemoOption(config, 'uxSpecLinks', []);
            if (uxSpecLinks.length === undefined) {
                uxSpecLinks = [uxSpecLinks];
            }
            var unSupportedThemes = Utils_1.default._getDemoOption(config, 'unSupportedThemes', []);
            if (unSupportedThemes.length === undefined) {
                unSupportedThemes = [unSupportedThemes];
            }
            var demoUrl = this.getServiceBaseUrl(config.version) + this.getDemoLaunchUrl();
            if (jetVersion) {
                demoUrl = demoUrl + (demoUrl.indexOf('?') > -1 ? '&' : '?') + 'jetVersion=' + jetVersion;
            }
            demoUrl = this.augmentAdditionalDemoUrlParams(demoUrl);
            demoUrl = (Utils_1.default.addThemingParams.bind(this.application))('jet', demoUrl, this.application.state.selectedTheme());
            var showTabs = Utils_1.default._getDemoOption(config, 'displaySourceTabs', true) && Utils_1.default._getDemoOption(config, 'sourceTabs', true);
            //var useTSSource = this.element.sourceType === 'typescript';
            return Promise.all(allPromises).then((() => {
                return {
                    apiDocLinks: apiDocLinks,
                    uxSpecLinks: uxSpecLinks,
                    displayName: config.parentDemoName ? config.parentDemoName : Utils_1.default._getDemoOption(config, 'displayName', null),
                    name: Utils_1.default._getDemoOption(config, 'name', null),
                    unSupportedThemes: unSupportedThemes,
                    deprecated: Utils_1.default._getDemoOption(config, 'deprecated', null),
                    supersedes: Utils_1.default._getDemoOption(config, 'supersedes', null),
                    maintenance: Utils_1.default._getDemoOption(config, 'maintenance', null),
                    demoUrl: demoUrl,
                    seeAlsoList: Utils_1.default._getDemoOption(config, 'seealso', []),
                    status: Utils_1.default._getDemoOption(config, 'status', null),
                    demoTitle: config.label,
                    descModuleCfg: descriptionModule,
                    displaySourceTabs: showTabs,
                    displayToolbar: Utils_1.default._getDemoOption(config, 'displayToolbar', true) && Utils_1.default._getDemoOption(config, 'formFactors', true),
                    hasDescription: hasDescription,
                    hasTypeSizeData: this.application.hasTypeSize(config),
                    isHybridDemo: this.application.isHybrid(config),
                    isWebDemo: this.application.isWeb(config),
                    isPhoneDemo: this.application.isPhone(config),
                    isTablet: this.application.isTablet(config),
                    shouldIncludePreviewInstrInDemo: this.application.shouldIncludePreviewInstr(config),
                    shouldIncludeResInstrInDemo: this.application.shouldIncludeResInstr(config),
                    useTSSource: useTSSource,
                    sourceFiles: sourceFiles,
                    showFolderViewByDefault: showFolderViewByDefault,
                    baseUrl: baseUrl,
                    isComplexDemo: isComplexDemo,
                    isCorepack: isCorepack,
                    hasAllTab: !isComplexDemo,
                    hasTSSource: isTSDemo,
                    filesMap: stateObj.tabData.filesMap,
                    openFiles: stateObj.openFiles,
                    selectedTab: stateObj.selectedTab,
                    infoTabModuleSettings: stateObj.infoTabModuleSettings,
                    infoAllTabModuleSettings: stateObj.infoAllTabModuleSettings,
                    htmlFilePath: this.getHtmlFilePath(),
                    cssFilePath: this.getCssFilePath(),
                    jsFilePath: this.getJsFilePath(),
                    tsFilePath: this.getTsFilePath(),
                    wdtsFilePath: this.getWdTsFilePath(),
                    runtime: this.application.getDemoType()
                };
            }));
        }
        ;
        updateState(state) {
            this.application.state.updateStatus(state.status);
            this.application.state.updateDemoState(state);
            this._resetChangeTracking();
            this.application.updateSourceTreeView(state.showFolderViewByDefault);
            setTimeout((() => {
                let hnavList = document.getElementById('hnavlist');
                if (hnavList) {
                    Context.getContext(hnavList)
                        .getBusyContext()
                        .whenReady()
                        .then((() => {
                        this.application.state.updateTabSelection(state.selectedTab);
                    }));
                }
            }));
        }
        ;
        // -----------------------Private methods
        _resetChangeTracking() {
            this.codeChangeTracker = {};
            this.application.state.updateDisableApplyBtn(true);
        }
        ;
        _addArtifactFile(artifactsMap, type, id, file, source, modified) {
            if (!artifactsMap[id]) {
                artifactsMap[id] = {
                    type: type,
                    id: id
                };
            }
            if (!artifactsMap[id][file]) {
                artifactsMap[id][file] = {};
            }
            artifactsMap[id][file].modified = modified;
            artifactsMap[id][file].source = source;
        }
        ;
        _isJsonResource(fileId) {
            return fileId.indexOf('.json') > 0 && fileId.indexOf('cookbook') > -1;
        }
        ;
        isModuleView(fileName) {
            return fileName.indexOf('js' + Constants_1.default.FILE_SEPARATOR + 'views') > -1;
        }
        ;
        isModuleViewModel(fileName) {
            return fileName.indexOf('js' + Constants_1.default.FILE_SEPARATOR + 'viewModels') > -1;
        }
        ;
        getModuleNameFromView(fileName) {
            let parts = Constants_1.default.MODULE_VIEW_REG_EXP.exec(fileName);
            return parts && parts.length > 1 ? parts[1] : null;
        }
        ;
        getModuleNameFromViewModel(fileName) {
            let parts = Constants_1.default.MODULE_VIEW_MODEL_REG_EXP.exec(fileName);
            return parts && parts.length > 1 ? parts[1] : null;
        }
        ;
        _getArtifacts(changeTracker, files) {
            var artifactsMap = {}, isTSSource, key, keys, module, i;
            keys = Object.keys(changeTracker);
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                isTSSource = Constants_1.default.EDITOR_TYPES.ts === changeTracker[key].editorType;
                if (key.indexOf('demo.html') > 0) {
                    this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_FILE_TYPE_HTML, changeTracker[key].editorSource(), true);
                }
                else if (key.indexOf('demo.js') > 0) {
                    this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_FILE_TYPE_JS, changeTracker[key].editorSource(), true);
                }
                else if (key.indexOf('demo.ts') > 0) {
                    this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_FILE_TYPE_TS, changeTracker[key].editorSource(), true);
                }
                else if (key.indexOf('demo.css') > 0) {
                    this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_FILE_TYPE_CSS, changeTracker[key].editorSource(), true);
                }
                else if (key.indexOf('cookbook-ui-wd.spec.ts') > 0) {
                    this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_WD_TS, Constants_1.default.ARTIFACT_TYPE_WD_TS, Constants_1.default.ARTIFACT_FILE_TYPE_WD_TS, changeTracker[key].editorSource(), true);
                }
                else if (this.isModuleView(key)) {
                    module = this.getModuleNameFromView(key);
                    // module = module.split(Constants.FILE_SEPARATOR).join('/');
                    this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_MODULE, module, Constants_1.default.ARTIFACT_FILE_TYPE_VIEW, changeTracker[key].editorSource(), true);
                }
                else if (this.isModuleViewModel(key)) {
                    module = this.getModuleNameFromViewModel(key);
                    // module = module.split(Constants.ID_SEPARATOR).join('/');
                    this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_MODULE, module, isTSSource ? Constants_1.default.ARTIFACT_FILE_TYPE_VIEW_MODEL_TS : Constants_1.default.ARTIFACT_FILE_TYPE_VIEW_MODEL, changeTracker[key].editorSource(), true);
                }
                else if (this._isJsonResource(key)) {
                    var fileId = key; //.substring(this._GEN_FILE_ID_INDEX_OFFSET).split(Constants.ID_SEPARATOR).join('/');
                    this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_JSON, fileId, fileId, changeTracker[key].editorSource(), true);
                }
                else if (key.indexOf('jet-composites') > 0) {
                    // TODO: handle composites
                }
            }
            if (!artifactsMap.demo) {
                artifactsMap.demo = {
                    type: Constants_1.default.ARTIFACT_TYPE_DEMO,
                    id: Constants_1.default.ARTIFACT_TYPE_DEMO
                };
            }
            keys = Object.keys(artifactsMap);
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                if (key === 'demo') {
                    if (!artifactsMap[key][Constants_1.default.ARTIFACT_FILE_TYPE_HTML]) {
                        this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_FILE_TYPE_HTML, files[this.getHtmlFilePath()].editorSource(), false);
                    }
                    if (!artifactsMap[key][Constants_1.default.ARTIFACT_FILE_TYPE_JS] && files[this.getJsFilePath()]) {
                        this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_FILE_TYPE_JS, files[this.getJsFilePath()].editorSource(), false);
                    }
                    if (!artifactsMap[key][Constants_1.default.ARTIFACT_FILE_TYPE_TS] && files[this.getTsFilePath()]) {
                        this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_FILE_TYPE_TS, files[this.getTsFilePath()].editorSource(), false);
                    }
                    if (!artifactsMap[key][Constants_1.default.ARTIFACT_FILE_TYPE_CSS] && files[this.getCssFilePath()]) {
                        this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_TYPE_DEMO, Constants_1.default.ARTIFACT_FILE_TYPE_CSS, files[this.getCssFilePath()].editorSource(), false);
                    }
                }
                else if (key === 'webdriver') {
                    if (!artifactsMap[key][Constants_1.default.ARTIFACT_FILE_TYPE_WD_TS]) {
                        this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_WD_TS, Constants_1.default.ARTIFACT_TYPE_WD_TS, Constants_1.default.ARTIFACT_FILE_TYPE_WD_TS, files[this.getWdTsFilePath()].editorSource(), false);
                    }
                }
                else {
                    if (!artifactsMap[key][Constants_1.default.ARTIFACT_FILE_TYPE_VIEW]) {
                        this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_MODULE, key, Constants_1.default.ARTIFACT_FILE_TYPE_VIEW, null, false);
                    }
                    if (!artifactsMap[key][Constants_1.default.ARTIFACT_FILE_TYPE_VIEW_MODEL]) {
                        this._addArtifactFile(artifactsMap, Constants_1.default.ARTIFACT_TYPE_MODULE, key, Constants_1.default.ARTIFACT_FILE_TYPE_VIEW_MODEL, null, false);
                    }
                }
            }
            return artifactsMap;
        }
        ;
        _loadInitialTabs(isTSDemo, showAllTab, hasCSS, hasJS, hasTS, hasWDTS, defaultTabs) {
            var isComplexDemo = !showAllTab;
            return new Promise(((resolve, reject) => {
                var initialTabs = [{
                        label: 'Info',
                        id: Constants_1.default.INFO_TAB_ID,
                        removable: false
                    }], filesToLoad = [];
                if (defaultTabs.length > 0) {
                    for (var i = 0; i < defaultTabs.length; i++) {
                        if (defaultTabs[i] === 'demo.html') {
                            initialTabs.push({
                                label: 'demo.html',
                                id: this.getHtmlFilePath(),
                                removable: isComplexDemo
                            });
                        }
                        else if (defaultTabs[i] === 'demo.js' && !isTSDemo) {
                            if (hasJS) {
                                initialTabs.push({
                                    label: 'demo.js',
                                    id: this.getJsFilePath(),
                                    removable: isComplexDemo
                                });
                            }
                        }
                        else if ((defaultTabs[i] === 'demo.ts' || defaultTabs[i] === 'demo.js') && isTSDemo) {
                            if (hasTS) {
                                initialTabs.push({
                                    label: 'demo.ts',
                                    id: this.getTsFilePath(),
                                    removable: isComplexDemo
                                });
                            }
                        }
                        else if (defaultTabs[i] === 'demo.css') {
                            if (hasCSS) {
                                initialTabs.push({
                                    label: 'demo.css',
                                    id: this.getCssFilePath(),
                                    removable: isComplexDemo
                                });
                            }
                        }
                        else if (defaultTabs[i] === 'cookbook-ui-wd.spec.ts' && hasWDTS) {
                            initialTabs.push({
                                label: 'cookbook-ui-wd.spec.ts',
                                id: this.getWdTsFilePath(),
                                removable: isComplexDemo
                            });
                        }
                        else {
                            var tabNameParts = defaultTabs[i].split('/');
                            var fileName = tabNameParts[tabNameParts.length - 1];
                            var tabId = tabNameParts.join(Constants_1.default.FILE_SEPARATOR);
                            if (isTSDemo && tabId.indexOf('js' + Constants_1.default.ID_SEPARATOR + 'viewModels') > -1) {
                                tabId = tabId.replace('.js', '.ts');
                                fileName = fileName.replace('.js', '.ts');
                            }
                            filesToLoad.push(tabId);
                            initialTabs.push({
                                label: fileName,
                                id: tabId,
                                removable: isComplexDemo
                            });
                        }
                    }
                }
                else {
                    initialTabs.push({
                        label: 'demo.html',
                        id: this.getHtmlFilePath(),
                        removable: isComplexDemo
                    });
                    if (hasJS && !isTSDemo) {
                        initialTabs.push({
                            label: 'demo.js',
                            id: this.getJsFilePath(),
                            removable: isComplexDemo
                        });
                    }
                    if (hasTS && isTSDemo) {
                        initialTabs.push({
                            label: 'demo.ts',
                            id: this.getTsFilePath(),
                            removable: isComplexDemo
                        });
                    }
                    if (hasCSS) {
                        initialTabs.push({
                            label: 'demo.css',
                            id: this.getCssFilePath(),
                            removable: isComplexDemo
                        });
                    }
                    if (hasWDTS) {
                        initialTabs.push({
                            label: 'cookbook-ui-wd.spec.ts',
                            id: this.getWdTsFilePath(),
                            removable: isComplexDemo
                        });
                    }
                }
                if (showAllTab) {
                    initialTabs.push({
                        label: 'All',
                        id: Constants_1.default.ALL_TAB_ID,
                        removable: false
                    });
                }
                this._loadResources(filesToLoad).then(function (filesData) {
                    var filesMap = {};
                    filesData.forEach(function (data) {
                        $.extend(filesMap, data);
                    });
                    resolve({
                        initialTabs: initialTabs,
                        filesMap: filesMap
                    });
                });
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
                label: name,
                attr: {
                    title: name,
                    label: name,
                    id: (parentDirId ? parentDirId + idSeparator + name : name)
                },
                data: {
                    attr: {
                        label: name,
                        title: name
                    }
                }
            };
            siblingList.push(obj);
            return obj;
        }
        ;
        _isReadOnly(fileId) {
            return (fileId.indexOf('jet-composites') > 0 ||
                (fileId.indexOf('.json') > 0 && !this._isJsonResource(fileId)) ||
                fileId.indexOf('.scss') > 0 ||
                fileId.indexOf('.spec.ts') > 0 ||
                fileId.indexOf('samples') > 0);
        }
        ;
        _getArtifactType(fileId) {
            if (fileId.indexOf('jet-composites') > 0) {
                return Constants_1.default.ARTIFACT_TYPE_COMPOSITE;
            }
            else if (fileId.indexOf('js' + Constants_1.default.ID_SEPARATOR + 'views') > 0 ||
                fileId.indexOf('js' + Constants_1.default.ID_SEPARATOR + 'viewModels') > 0) {
                return Constants_1.default.ARTIFACT_TYPE_MODULE;
            }
            else if (this._isJsonResource(fileId)) {
                return Constants_1.default.ARTIFACT_TYPE_JSON;
            }
            return Constants_1.default.ARTIFACT_TYPE_OTHER;
        }
        ;
        _loadResource(fileId) {
            var fileName = fileId;
            var fileType = fileId.substring(fileId.indexOf('.') + 1);
            fileName = fileName.split(Constants_1.default.ID_SEPARATOR).join('/');
            var filePath = this.fixFileUrl(fileName);
            var fileLabel = fileId.substring(fileId.lastIndexOf(Constants_1.default.ID_SEPARATOR) + 1);
            return this._getResourceManager().getResource(filePath).then(((resource) => {
                var content = resource.getContent();
                var artifactType = this._getArtifactType(fileId);
                var filesMap = {};
                filesMap[fileName] = new File_1.default(fileName, fileLabel, Constants_1.default.EDITOR_TYPES[fileType], content, this._isReadOnly(fileName) || (fileName.indexOf('.js') > -1 && fileName.indexOf('.json') === -1 ? this.useTSSource : (fileName.indexOf('.ts') > -1 ? !this.useTSSource : false)), '', '', artifactType);
                return filesMap;
            }));
        }
        ;
        fixFileUrl(fileId) {
            return fileId;
        }
        ;
        _loadResources(fileIds) {
            var promises = [];
            for (var i = 0; i < fileIds.length; i++) {
                promises.push(this._loadResource(fileIds[i]));
            }
            return Promise.all(promises);
        }
        ;
        getMainJSFilePath() {
            return Constants_1.default.MAIN_JS_FILE;
        }
        ;
        getWdTsFilePath() {
            return Constants_1.default.WD_TS_FILE;
        }
        getHtmlFilePath() {
            return Constants_1.default.HTML_FILE;
        }
        ;
        getJsFilePath() {
            return Constants_1.default.JS_FILE;
        }
        ;
        getTsFilePath() {
            return Constants_1.default.TS_FILE;
        }
        ;
        getCssFilePath() {
            return Constants_1.default.CSS_FILE;
        }
        ;
        _createBasicDemoFiles(mainJsTemplate, htmldata, jsdata, tsdata, cssdata, wdtsdata) {
            var files = [];
            var useTs = this.useTSSource;
            files.push(new File_1.default(this.getMainJSFilePath(), 'main.js', Constants_1.default.EDITOR_TYPES.js, mainJsTemplate, true, '', '', Constants_1.default.ARTIFACT_TYPE_CONFIG));
            files.push(new File_1.default(this.getHtmlFilePath(), 'demo.html', Constants_1.default.EDITOR_TYPES.html, htmldata.data, false, htmldata.readonlyLines, htmldata.foldLines, Constants_1.default.ARTIFACT_TYPE_DEMO));
            if (cssdata) {
                files.push(new File_1.default(this.getCssFilePath(), 'demo.css', Constants_1.default.EDITOR_TYPES.css, cssdata, false, '', '', Constants_1.default.ARTIFACT_TYPE_DEMO));
            }
            if (jsdata) {
                files.push(new File_1.default(this.getJsFilePath(), 'demo.js', Constants_1.default.EDITOR_TYPES.js, jsdata, useTs, '', '', Constants_1.default.ARTIFACT_TYPE_DEMO));
            }
            if (tsdata) {
                files.push(new File_1.default(this.getTsFilePath(), 'demo.ts', Constants_1.default.EDITOR_TYPES.ts, tsdata, !useTs, '', '', Constants_1.default.ARTIFACT_TYPE_DEMO));
            }
            if (wdtsdata) {
                files.push(new File_1.default(this.getWdTsFilePath(), 'cookbook-ui-wd.spec.ts', Constants_1.default.EDITOR_TYPES.ts, wdtsdata, true, '', '', Constants_1.default.ARTIFACT_TYPE_WD_TS));
            }
            return {
                files: files,
                css: !!cssdata,
                js: !!jsdata,
                ts: !!tsdata,
                wdts: !!wdtsdata
            };
        }
        ;
        _loadSources(url, hasCustomHeader, isTSDemo, hasJS, hasCSS, hasTS, hasWDTS) {
            let filesToLoad = [
                Constants_1.default.MAIN_TEMPLATE_FILE,
                Constants_1.default.INDEX_TEMPLATE_FILE,
                url
            ], tsIndex = -1, jsIndex = -1, cssIndex = -1, wdtsIndex = -1, fileIndex = 2;
            const demoVersionHandler = this.getDemoVersionHandler();
            const isSingleDemoFile = demoVersionHandler.isSingleDemoFile();
            if (!isSingleDemoFile) {
                if (hasJS) {
                    filesToLoad.push(url.replace('.html', '.js'));
                    jsIndex = ++fileIndex;
                }
                if (hasCSS) {
                    filesToLoad.push(url.replace('.html', '.css'));
                    cssIndex = ++fileIndex;
                }
                if (hasTS) {
                    filesToLoad.push(url.replace('.html', '.ts'));
                    tsIndex = ++fileIndex;
                }
                if (hasWDTS) {
                    filesToLoad.push(url.replace('demo.html', 'cookbook-ui-wd.spec.ts'));
                    wdtsIndex = ++fileIndex;
                }
            }
            return this._getResourceManager().getResources(filesToLoad).then(((files) => {
                var mainJsTemplate = files[0].getContent(), htmlTemplate = files[1].getContent(), content = files[2].getContent(), jsContent = jsIndex > -1 ? files[jsIndex].getContent() : undefined, cssContent = cssIndex > -1 ? files[cssIndex].getContent() : undefined, tsContent = tsIndex > -1 ? files[tsIndex].getContent() : undefined, wdtsContent = wdtsIndex > -1 ? files[wdtsIndex].getContent() : undefined;
                // bug 26725743
                var htmldata, title;
                if (isSingleDemoFile) {
                    let $demoHtml = $($.parseHTML('<div>' + content + '</div>', null, true));
                    let _demoData, _js, _ts, _css;
                    _demoData = $demoHtml.find('#' + Constants_1.default.COMPONENT_DEMO_NAME);
                    _ts = $($(_demoData)[0]).find("script[type='text/typescript']").remove();
                    _js = $($(_demoData)[0]).find('script').not("[type='text/html']").remove();
                    _css = $($(_demoData)[0]).find('style').remove();
                    jsContent = _js.length > 0 ? _js.html() : null;
                    tsContent = _ts.length > 0 ? _ts.html() : null;
                    cssContent = _css.length > 0 ? _css.html() : null;
                    htmldata = $demoHtml.find('#codemirror-markup-example').html();
                    htmldata = htmldata.replace(/&lt;/g, '<');
                    htmldata = htmldata.replace(/&gt;/g, '>');
                    htmldata = htmldata.replace(/&quot;/g, '"');
                    htmldata = htmldata.split('\n').join('\n' + Constants_1.default.HTML_INDENTATION);
                }
                else {
                    title = content.substring(content.indexOf(Constants_1.default.HTML_DEMO_TITLE_PREFIX) + Constants_1.default.HTML_DEMO_TITLE_PREFIX.length, content.indexOf(Constants_1.default.HTML_DEMO_TITLE_SUFFIX));
                    htmldata = content.substring(content.indexOf(Constants_1.default.HTML_DEMO_CODE_PREFIX) + Constants_1.default.HTML_DEMO_CODE_PREFIX.length, content.indexOf(Constants_1.default.HTML_DEMO_CODE_SUFFIX));
                    htmldata = Constants_1.default.HTML_INDENTATION + htmldata.split('\n').join('\n' + Constants_1.default.HTML_INDENTATION);
                }
                let altaLink = this.config?.isCorepack ? '' : '<link rel="stylesheet" id="altacss" href="https://www.oracle.com/webfolder/technetwork/jet/css/libs/oj/20.0.0/alta/oj-alta-min.css">';
                // update demo content
                var insertIndex = htmlTemplate.indexOf(Constants_1.default.HTML_INSERT_POINT_IN_DEMO_TEMPLATE);
                htmldata = htmlTemplate.substring(0, insertIndex) + htmldata + htmlTemplate.substring(insertIndex + Constants_1.default.HTML_INSERT_POINT_IN_DEMO_TEMPLATE.length);
                //insertAltaLink if non-corepack
                insertIndex = htmldata.indexOf(Constants_1.default.DEMO_ALTA_LINK_INSERT_POINT);
                htmldata = htmldata.substring(0, insertIndex) + altaLink + htmldata.substring(insertIndex + Constants_1.default.DEMO_ALTA_LINK_INSERT_POINT.length);
                // update demo title
                insertIndex = htmldata.indexOf(Constants_1.default.DEMO_TITLE_INSERT_POINT);
                htmldata = htmldata.substring(0, insertIndex) + title + htmldata.substring(insertIndex + Constants_1.default.DEMO_TITLE_INSERT_POINT.length);
                if (hasCustomHeader) {
                    var customHeader = content.substring(content.indexOf(Constants_1.default.HTML_CUSTOM_HEADER_PREFIX) + Constants_1.default.HTML_CUSTOM_HEADER_PREFIX.length, content.indexOf(Constants_1.default.HTML_CUSTOM_HEADER_SUFFIX));
                    customHeader = customHeader.trim();
                    customHeader = Constants_1.default.HTML_CUSTOM_HEADER_INDENTATION + customHeader.split('\n').join('\n' + Constants_1.default.HTML_CUSTOM_HEADER_INDENTATION);
                    var customHeaderLines = customHeader.split('\n').length;
                    insertIndex = htmldata.indexOf(Constants_1.default.HTML_CUSTOM_HEADER_MARKER) + Constants_1.default.HTML_CUSTOM_HEADER_MARKER.length;
                    htmldata = htmldata.substring(0, htmldata.indexOf(Constants_1.default.HTML_CUSTOM_HEADER_MARKER)) + customHeader + htmldata.substring(insertIndex);
                    htmldata = {
                        readonlyLines: '0-' + (this.getHtmlReadOnlyLines() + customHeaderLines),
                        foldLines: this.getHtmlFoldLines(),
                        data: htmldata
                    };
                }
                else {
                    htmldata = htmldata.replace(Constants_1.default.HTML_CUSTOM_HEADER_MARKER + '\n', '');
                    htmldata = {
                        readonlyLines: '0-' + this.getHtmlReadOnlyLines(),
                        foldLines: this.getHtmlFoldLines(),
                        data: htmldata
                    };
                }
                var filesData = this._createBasicDemoFiles(mainJsTemplate, htmldata, jsContent ? jsContent : null, tsContent ? tsContent : null, cssContent ? cssContent : null, wdtsContent ? wdtsContent : null);
                return filesData;
            }));
        }
        ;
        getHtmlReadOnlyLines() {
            return Constants_1.default.HTML_READ_ONLY_LINES;
        }
        ;
        getHtmlFoldLines() {
            return Constants_1.default.HTML_FOLD_LINES;
        }
        ;
        _cleanTabsOnSourceChange(useTS) {
            var defaultTabs = this._getCombinedOption('defaultTabs', []), hnavlist = document.getElementById(Constants_1.default.TABS_COMPONENT_ID), selectedTab = this.application.state.selectedTab(), filesMap = this.application.state.filesMap();
            this._loadInitialTabs(useTS, this.application.state.hasAllTab(), !!filesMap[this.getCssFilePath()], !!filesMap[this.getJsFilePath()], !!filesMap[this.getTsFilePath()], !!filesMap[this.getWdTsFilePath()], defaultTabs).then(((data) => {
                this.application.state.updateJETFilesMap(data.filesMap);
                this.application.state.updateOpenFiles(data.initialTabs);
                if (hnavlist) {
                    Context.getContext(hnavlist)
                        .getBusyContext()
                        .whenReady()
                        .then((() => {
                        selectedTab = this._getInitialTabSelection(selectedTab, useTS, this.application.state.filesMap(), this.application.state.hasAllTab());
                        if (!(selectedTab.indexOf('.spec.ts') > -1))
                            selectedTab = useTS ? selectedTab.replace('.js', '.ts') : selectedTab.replace('.ts', '.js');
                        this.application.state.selectedTab(selectedTab);
                        this.application.state.currentTab(selectedTab);
                        if (hnavlist) {
                            hnavlist.focus();
                        }
                    }));
                }
            }));
        }
        ;
        _getInitialTabSelection(currentTab, isTSDemo, filesMap, hasAllTab) {
            var selectedTab;
            if (currentTab === this.getHtmlFilePath() && filesMap[this.getHtmlFilePath()]) {
                selectedTab = this.getHtmlFilePath();
            }
            if (currentTab === this.getWdTsFilePath() && filesMap[this.getWdTsFilePath()]) {
                selectedTab = this.getWdTsFilePath();
            }
            else if ((currentTab === this.getJsFilePath() || currentTab === this.getTsFilePath()) && (filesMap[this.getJsFilePath()] || filesMap[this.getTsFilePath()])) {
                selectedTab = isTSDemo ? this.getTsFilePath() : this.getJsFilePath();
            }
            else if (currentTab === this.getCssFilePath() && filesMap[this.getCssFilePath()]) {
                selectedTab = this.getCssFilePath();
            }
            else if (currentTab === Constants_1.default.ALL_TAB_ID && hasAllTab) {
                selectedTab = Constants_1.default.ALL_TAB_ID;
            }
            else {
                selectedTab = Constants_1.default.INFO_TAB_ID;
            }
            return selectedTab;
        }
        ;
        _prepareDownloadables(files) {
            if (Utils_1.default.isIOS()) {
                this.application.state.updateDownloadables(null);
            }
            else {
                var downloadMap = {};
                var allDownload = {
                    zipFileName: 'Demo',
                    displayTitle: 'All',
                    base: '',
                    files: []
                };
                files.forEach(((file) => {
                    var compositeIndex = file.indexOf(this.defaultBaseDir);
                    if (compositeIndex > -1) {
                        compositeIndex += this.defaultBaseDir.length;
                        var compositeName = file.substring(compositeIndex, file.indexOf('/', compositeIndex));
                        if (!downloadMap[compositeName]) {
                            downloadMap[compositeName] = {
                                zipFileName: compositeName,
                                displayTitle: compositeName,
                                files: [],
                                base: this.defaultBaseDir
                            };
                        }
                        var dependentFiles = downloadMap[compositeName].files;
                        dependentFiles.push(file.substring(compositeIndex));
                    }
                    allDownload.files.push(file);
                }));
                var downloadables = [];
                var keys = Object.keys(downloadMap);
                var key;
                for (var i = 0; i < keys.length; i++) {
                    key = keys[i];
                    downloadables.push(downloadMap[key]);
                }
                // TODO: uncomment this to enable download for all files
                // TODO: Also ensure that customHeader.html content is properly injected in to demo html file
                // TODO: It is responsibility of the component owner to list all files(incl images) in metadata.
                // TODO: need to change all 3.1.0 references to 4.0.0 before release and also cdn urls
                //          downloadables.push(allDownload);
                this.application.state.updateDownloadables(downloadables);
            }
        }
        ;
        loadDemoResources(isTSDemo) {
            var hasCustomHeader = this._getCombinedOption('customHeader', false);
            var hasJS = this._getCombinedOption('hasJS', false);
            var hasCSS = this._getCombinedOption('hasCSS', false);
            var hasTS = this._getCombinedOption('hasTS', false);
            var hasWDTS = this._getCombinedOption('hasWDTS', false);
            return this._loadSources(this.getDemoUrl(), hasCustomHeader, isTSDemo, hasJS, hasCSS, hasTS, hasWDTS);
        }
        ;
        getDemoId() {
            return this.config.uid ? this.config.uid : this.config.id;
        }
        ;
        getDemoUrl() {
            var demoId = Utils_1.default.getComponentAndOptionFromUID(this.getDemoId());
            return this.getDemoVersionHandler().getDemoUrl(demoId[0], demoId[1], this.getResourceType('demo'), this.config?.isCorepack);
        }
        ;
        getDemoLaunchUrl() {
            return this.getDemoUrl();
        }
        getDemoType() {
            return this.config.demo_element ? '_element' : '';
        }
        ;
        getResourceType(file) {
            var config = this.config;
            return config.jetDemoType === 'widget' ? '' : (config[file + '_element'] ? '_element' : '');
        }
        ;
        getRecipeType() {
            return this.config.recipe_element ? '_element' : '';
        }
        ;
        getRecipeUrl() {
            var demoId = Utils_1.default.getComponentAndOptionFromUID(this.getDemoId());
            return this.getDemoVersionHandler().getRecipeUrl(demoId[0], demoId[1], this.getResourceType('demo'), this.config?.isCorepack);
        }
        ;
        _regenerateTreeData(css, js, ts, wdts, composites, modules, otherfiles) {
            var files = [
                this.getHtmlFilePath(), // generated
                this.getMainJSFilePath() // static using cdn
            ];
            if (css) {
                files.push(this.getCssFilePath());
            } // generated
            if (js) {
                files.push(this.getJsFilePath());
            } // generated
            if (ts) {
                files.push(this.getTsFilePath());
            } // generated
            if (wdts) {
                files.push(this.getWdTsFilePath());
            } // generated
            this._addCompositeFiles(files, composites);
            this._addModuleFiles(files, modules);
            this._addOtherDependentFiles(files, otherfiles);
            this._filesList = files;
            this._prepareDownloadables(files);
            return this._generateTreeData(files, Constants_1.default.ID_SEPARATOR, '');
        }
        ;
        _addCompositeFiles(files, composites) {
            composites.forEach(function (composite) {
                files.push(composite);
            });
        }
        ;
        _addModuleFiles(files, modules) {
            modules.forEach(function (module) {
                files.push(module);
            });
        }
        ;
        _addOtherDependentFiles(files, otherfiles) {
            otherfiles.forEach(function (file) {
                files.push(file);
            });
        }
        ;
        _getCombinedOption(optionName, optionDefault) {
            // default level
            var optionData = optionDefault;
            var optionObject = this.config;
            // option level
            if (optionObject && Object.prototype.hasOwnProperty.call(optionObject, optionName)) {
                optionData = optionObject[optionName];
            }
            return optionData;
        }
        ;
        _getInfoTabModuleSettings() {
            var masterPromise = Promise.all([
                moduleUtils.createView({
                    viewPath: '../templates/spaInfoTab.html',
                    require
                })
            ]);
            return masterPromise.then(((values) => {
                return {
                    view: values[0],
                    viewModel: {
                        vm: this,
                        state: this.state,
                        application: this.application,
                        element: values[0],
                        connected: (() => {
                            var recipe = this._getCombinedOption('recipe', false);
                            if (recipe) {
                                this._getResourceManager()
                                    .getResource(this.getRecipeUrl()).then(((resource) => {
                                    this._loadInfoTabRecipe(resource.getContent());
                                }));
                            }
                            else {
                                this._loadInfoTabRecipe('');
                            }
                            var scrollElement = $(values[0]).closest('.' + Constants_1.default.DEMO_SCROLL_CONTAINER_CLASS)[0];
                            ko.utils.domNodeDisposal.addDisposeCallback(scrollElement, (function () {
                                Utils_1.default.unApplyNanoScroll(scrollElement);
                            }).bind(this));
                        })
                    }
                };
            }), function (reason) { });
        }
        ;
        _loadInfoTabRecipe(responseText) {
            if (responseText.trim() === '') {
                $('#recipeHeader').hide();
                $('#recipeDivider').hide();
                $('#recipeInfo').hide();
            }
            else {
                $('#recipeHeader').show();
                $('#recipeDivider').show();
                $('#recipeInfo').show();
            }
            $('#recipeInfo').empty()
                .append(responseText);
            // $('#seeAlsoLi').ojMenu('refresh');
        }
        ;
        _loadAllTabRecipe(responseText) {
            var i, idsToChange = [];
            if (responseText.trim() === '') {
                $('#recipeHeaderAll').hide();
            }
            else {
                $('#recipeHeaderAll').show();
            }
            $('<div>' + responseText + '</div>').find('*[id]').each(function (index, item) {
                idsToChange.push(item.id);
            });
            for (i = 0; i < idsToChange.length; i++) {
                responseText = responseText.replace(new RegExp(idsToChange[i], 'g'), idsToChange[i] + '-All');
            }
            $('#recipeAll').empty()
                .append(responseText);
        }
        ;
        _getAllTabModuleSettings() {
            var masterPromise = Promise.all([
                moduleUtils.createView({
                    viewPath: '../templates/spaAllTab.html',
                    require
                })
            ]);
            return masterPromise.then(((values) => {
                return {
                    view: values[0],
                    viewModel: {
                        vm: this,
                        functions: this.functions,
                        listeners: this.listeners,
                        state: this.state,
                        application: this.application,
                        element: values[0],
                        sourceChanged: this.listeners.sourceChanged,
                        connected: (() => {
                            var recipe = this._getCombinedOption('recipe', false);
                            if (recipe) {
                                this._getResourceManager()
                                    .getResource(this.getRecipeUrl()).then(((resource) => {
                                    this._loadAllTabRecipe(resource.getContent());
                                }).bind(this));
                            }
                            else {
                                this._loadAllTabRecipe('');
                            }
                            var scrollElement = $(values[0]).closest('.' + Constants_1.default.DEMO_SCROLL_CONTAINER_CLASS)[0];
                            ko.utils.domNodeDisposal.addDisposeCallback(scrollElement, (function () {
                                Utils_1.default.unApplyNanoScroll(scrollElement);
                            }).bind(this));
                        })
                    }
                };
            }), function (reason) { });
        }
        ;
    }
    exports.default = JETDemoRenderer;
});
