define(["require", "exports", "ojs/ojcore", "ojs/ojresponsiveknockoututils", "ojs/ojresponsiveutils", "text!./../../../../../componentMapping.json", "text!./../../../../../cookbookThemes.json", "text!./../../../../../corepackCookbookThemes.json", "ojs/ojarraydataprovider", "knockout", "ojs/ojkeyset"], function (require, exports, oj, ResponsiveKnockoutUtils, ResponsiveUtils, cmpMapping, themeList, corepackThemeList, ArrayDataProvider, ko, keySet) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class State {
        constructor(hasCustomHeader, hasCustomRecipe, platformList, initialTheme, initialFormFactor, initialReadingDir, initialFontSize, initialDebugMode, initialTagMode, initialScale, initialDensity) {
            this.cmpMapping = JSON.parse(cmpMapping);
            this.themeList = JSON.parse(themeList);
            this.modifiedThemesList = [];
            for (var i = 0; i < this.themeList.length; i++) {
                this.modifiedThemesList[this.themeList[i]['id']] = this.themeList[i];
            }
            this.corepackThemeList = JSON.parse(corepackThemeList);
            this.modifiedCorepackThemesList = [];
            this.corepackThemes = [];
            for (var i = 0; i < this.corepackThemeList.length; i++) {
                this.modifiedCorepackThemesList[this.corepackThemeList[i]['id']] = this.corepackThemeList[i];
                this.corepackThemes[i] = this.corepackThemeList[i]['id'];
            }
            this.hasCustomHeader = hasCustomHeader;
            this.hasCustomRecipe = hasCustomRecipe;
            this.platformList = [
                {
                    id: "desktop",
                    label: "Desktop",
                    iconStyleClass: "oj-ux-ico-desktop ",
                    disabled: ko.observable(false)
                },
                {
                    id: "phone_portrait",
                    label: "Phone Portrait",
                    iconStyleClass: "oj-ux-ico-cell-phone ",
                    disabled: ko.observable(false)
                },
                {
                    id: "tab_portrait",
                    label: "Tab Portrait",
                    iconStyleClass: "oj-ux-ico-tablet-portrait ",
                    disabled: ko.observable(false)
                },
                {
                    id: "tab_landscape",
                    label: "Tab Landscape",
                    iconStyleClass: "oj-ux-ico-tablet-landscape ",
                    disabled: ko.observable(false)
                }
            ];
            this.jsDebugMode = {
                id: "jsDebugMode",
                title: "JS Debug Mode",
                buttonSet: [
                    { id: "min", label: "Minified" },
                    { id: "debug", label: "Debug" }
                ]
            };
            this.readingDir = {
                id: "readingDir",
                title: "Reading Direction",
                buttonSet: [
                    { id: "ltr", label: "LTR" },
                    { id: "rtl", label: "RTL" }
                ]
            };
            this.tagMode = {
                id: "tagMode",
                title: "Use notag.css file",
                help: "https://docs.oracle.com/pls/topic/lookup?ctx=jetlatest&id=GUID-A460304F-D0DE-4B32-8450-5AA888FDF2EC",
                buttonSet: [
                    { id: "default", label: "No" },
                    { id: "enabled", label: "Yes" }
                ]
            };
            this.density = {
                id: "density",
                title: "Density",
                buttonSet: [
                    { id: "standard", label: "Standard" },
                    { id: "compact", label: "Compact" }
                ]
            };
            this.scale = {
                id: "scale",
                title: "Scale",
                buttonSet: [
                    { id: "lg", label: "lg" },
                    { id: "md", label: "md" },
                    { id: "sm", label: "sm" }
                ]
            };
            let smOnlyQuery = ResponsiveUtils.getFrameworkQuery("sm-only");
            if (smOnlyQuery != null) {
                this.smOnly = ResponsiveKnockoutUtils.createMediaQueryObservable(smOnlyQuery);
            }
            let mdOnlyQuery = ResponsiveUtils.getFrameworkQuery("md-only");
            if (mdOnlyQuery != null) {
                this.mdOnly = ResponsiveKnockoutUtils.createMediaQueryObservable(mdOnlyQuery);
            }
            this.runtime = this._createDeferredObservable();
            this.frameAndTabClass = this._createDeferredObservable("demo-cook-demo-and-tabs oj-flex demo-body-min-height demo-portrait-web");
            this.isStackedMode = this._createDeferredObservable(false);
            this.descConfig = this._createDeferredObservable();
            this.demoUrl = this._createDeferredObservable("");
            this.recipeUrl = this._createDeferredObservable("");
            this.recipeConfig = this._createDeferredObservable();
            this.demoTitle = this._createDeferredObservable("");
            this.disableApply = this._createDeferredObservable(true);
            this.isComplexDemo = this._createDeferredObservable(false);
            this.isCorepack = this._createDeferredObservable(false);
            this.sourceFiles = this._createDeferredObservableArray();
            this.selectedTab = this._createObservable("nt_info"); // This should not be deferred otherwise it will render tab content after nanoscroll update.
            this.currentTab = this._createDeferredObservable();
            this.openFiles = this._createDeferredObservableArray();
            this.treeDataSource = this._createDeferredObservable();
            this.currentFile = this._createDeferredObservable();
            this.sourceEditorType = this._createDeferredObservable("");
            this.sourceContent = this._createDeferredObservable("");
            this.selectedTheme = this._createDeferredObservable(initialTheme);
            this.selectedPlatform = this._createDeferredObservable(initialFormFactor);
            this.selectedDebugMode = this._createDeferredObservable(initialDebugMode);
            this.selectedReadingDir = this._createDeferredObservable(initialReadingDir);
            this.selectedTagMode = this._createDeferredObservable(initialTagMode);
            this.selectedFontSize = this._createDeferredObservable(initialFontSize);
            this.selectedScale = this._createDeferredObservable(initialScale);
            this.selectedDensity = this._createDeferredObservable(initialDensity);
            this.seeAlsoList = this._createDeferredObservableArray();
            this.apiDocLinks = this._createDeferredObservableArray();
            this.uxSpecLinks = this._createDeferredObservableArray();
            this.displayName = this._createDeferredObservable("");
            this.name = this._createDeferredObservable("");
            this.unSupportedThemes = this._createDeferredObservableArray();
            this.deprecated = this._createDeferredObservable("");
            this.supersedes = this._createDeferredObservable(null);
            this.maintenance = this._createDeferredObservable(null);
            this.cmpUrl = this._createObservableArray();
            this.supersedesURLData = this._createObservableArray();
            this.maintenanceURLData = this._createObservableArray();
            this.supersedesDataLength = ko.observable(0);
            this.maintenanceDataLength = ko.observable(0);
            this.supersedesSince = ko.observable("");
            this.maintenanceSince = ko.observable("");
            this.displaySourceTabs = this._createDeferredObservable(true);
            this.displayToolbar = this._createDeferredObservable(true);
            this.hasDescription = this._createDeferredObservable(true);
            this.hasTypeSizeData = this._createDeferredObservable(false);
            this.shouldIncludeResInstrInDemo = this._createDeferredObservable(false);
            this.shouldIncludePreviewInstrInDemo = this._createDeferredObservable(false);
            this.isHybridDemo = this._createDeferredObservable(false);
            this.isWebDemo = this._createDeferredObservable(false);
            this.isPhoneDemo = this._createDeferredObservable(false);
            this.isTabletDemo = this._createDeferredObservable(false);
            this.downloadables = this._createDeferredObservable();
            this.baseUrl = this._createDeferredObservable();
            this.hasTSSource = this._createDeferredObservable(false);
            this.useTSSource = this._createDeferredObservable(true);
            this.infoTabModuleSettings = this._createDeferredObservable();
            this.infoAllTabModuleSettings = this._createDeferredObservable();
            this.expandAll = new keySet.ExpandAllKeySet();
            this.filesMap = this._createDeferredObservable();
            this.htmlFile = this._createObservable();
            this.cssFile = this._createObservable();
            this.jsFile = this._createObservable();
            this.tsFile = this._createObservable();
            this.wdtsFile = this._createObservable();
            this.isRedwoodAntipattern = this._createDeferredObservable(false);
            this.dataSource = ko.computed(() => {
                if (this.openFiles().length > 0) {
                    return new ArrayDataProvider(this.openFiles(), {
                        keyAttributes: "id"
                    });
                }
                return null;
            });
            this.selectedTabPane = ko.pureComputed(() => {
                return this.selectedTab() === "nt_info"
                    ? "info_tab"
                    : this.selectedTab() === "st_all"
                        ? "all_tab"
                        : "default_tab";
            });
            this.isRedwood = ko.computed(function () {
                return this.selectedTheme() === "redwood";
            }, this);
            // Checks if the selected legacy theme is also present in corepack themes and return the same, else defaults to redwood. 
            this.themeData = ko.computed(function () {
                if (this.isCorepack()) {
                    if (this.corepackThemes.includes(this.selectedTheme())) {
                        return this.selectedTheme();
                    }
                    else {
                        return "redwood";
                    }
                }
                else {
                    return this.selectedTheme();
                }
            }, this);
            this.isScaleEnabled = ko.computed(function () {
                if (this.isCorepack()) {
                    return this.modifiedCorepackThemesList[this.themeData()]['scale'];
                }
                else {
                    return this.modifiedThemesList[this.themeData()]['scale'];
                }
            }, this);
            this.hasNotagFile = ko.computed(function () {
                if (this.isCorepack()) {
                    return this.modifiedCorepackThemesList[this.themeData()]['notag'];
                }
                else {
                    return this.modifiedThemesList[this.themeData()]['notag'];
                }
            }, this);
            this.isAltaTheme = ko.computed(function () {
                return this.selectedTheme().includes("alta");
            }, this);
            //JET demo specific data
            this.hasAllTab = ko.observable("true");
        }
        _createObservable(value) {
            return ko.observable(value);
        }
        _createObservableArray(value) {
            return ko.observableArray(value);
        }
        _createDeferredObservable(value) {
            return ko.observable(value).extend({
                deferred: true
            });
        }
        _createDeferredObservableArray(value) {
            return ko.observableArray(value).extend({
                deferred: true
            });
        }
        // State update methods
        updateOpenFiles(openFiles) {
            this.openFiles(openFiles);
        }
        updateTabSelection(tabId) {
            this.selectedTab(tabId);
        }
        updateStatus(status) {
            this.isRedwoodAntipattern(status === "uxantipattern");
        }
        updateStackedMode(isStackedmode) {
            this.isStackedMode(isStackedmode);
        }
        updateDisableApplyBtn(disable) {
            this.disableApply(disable);
        }
        updateJETFilesMap(filesMap) {
            let map = this.filesMap();
            for (let key in filesMap) {
                map[key] = filesMap[key];
            }
        }
        updateFilesMap(fileId, file) {
            this.filesMap()[fileId] = file;
        }
        updateDownloadables(downloadables) {
            this.downloadables(downloadables);
        }
        updateTheme(theme) {
            this.selectedTheme(theme);
        }
        updatePlatForm(platform) {
            this.selectedPlatform(platform);
        }
        updateReadingDir(readingdir) {
            this.selectedReadingDir(readingdir);
        }
        updateTagMode(tagmode) {
            this.selectedTagMode(tagmode);
        }
        updateFontSize(fontSize) {
            this.selectedFontSize(fontSize);
        }
        updateScale(scale) {
            this.selectedScale(scale);
        }
        updateDensity(density) {
            this.selectedDensity(density);
        }
        updateDebugMode(debug) {
            this.selectedDebugMode(debug);
        }
        updateDemoState(state) {
            this.descConfig(state.descModuleCfg);
            this.demoUrl(state.demoUrl);
            this.demoTitle(state.demoTitle);
            this.isComplexDemo(state.isComplexDemo);
            this.isCorepack(state.isCorepack);
            this.sourceFiles(state.sourceFiles);
            this.apiDocLinks(state.apiDocLinks);
            this.uxSpecLinks(state.uxSpecLinks);
            this.unSupportedThemes(state.unSupportedThemes);
            this.deprecated(state.deprecated);
            this.supersedes(state.supersedes);
            this.maintenance(state.maintenance);
            this.displayName(state.displayName);
            this.name(state.name);
            this.seeAlsoList(state.seeAlsoList);
            this.displaySourceTabs(state.displaySourceTabs);
            this.displayToolbar(state.displayToolbar);
            this.hasDescription(state.hasDescription);
            this.openFiles(state.openFiles);
            this.treeDataSource(new oj.JsonTreeDataSource(state.sourceFiles));
            this.filesMap(state.filesMap);
            if (state.runtime === "vb") {
                this.recipeUrl(state.recipeUrl);
                this.recipeConfig(state.recipeConfig);
            }
            else {
                this.hasAllTab(state.hasAllTab);
                if (state.infoTabModuleSettings)
                    this.infoTabModuleSettings(state.infoTabModuleSettings);
                if (state.infoAllTabModuleSettings) {
                    this.infoAllTabModuleSettings(state.infoAllTabModuleSettings);
                    this.htmlFile(state.filesMap[state.htmlFilePath]);
                    this.jsFile(state.filesMap[state.jsFilePath]);
                    this.cssFile(state.filesMap[state.cssFilePath]);
                    this.tsFile(state.filesMap[state.tsFilePath]);
                    this.wdtsFile(state.filesMap[state.wdtsFilePath]);
                }
                this.hasTSSource(state.hasTSSource);
                this.baseUrl(state.baseUrl);
                this.hasTypeSizeData(state.hasTypeSizeData);
                this.isHybridDemo(state.isHybridDemo);
                this.isWebDemo(state.isWebDemo);
                this.isPhoneDemo(state.isPhoneDemo);
                this.isTabletDemo(state.isTablet);
                this.shouldIncludePreviewInstrInDemo(state.shouldIncludePreviewInstrInDemo);
                this.shouldIncludeResInstrInDemo(state.shouldIncludeResInstrInDemo);
                this.useTSSource(state.useTSSource);
            }
            this.runtime(state.runtime);
            this.updateDisableApplyBtn(true);
            this.supersedesURLData([]);
            this.maintenanceURLData([]);
            if (state.supersedes) {
                this.supersedesDataLength(state.supersedes.value.length);
                this.supersedesSince(state.supersedes.since);
                for (var i = 0; i < state.supersedes.value.length; i++) {
                    for (var j = 0; j < this.cmpMapping.length; j++) {
                        if (state.supersedes.value[i] === this.cmpMapping[j]['id']) {
                            this.supersedesURLData.push(this.cmpMapping[j]);
                        }
                    }
                }
            }
            else if (state.maintenance) {
                this.maintenanceDataLength(state.maintenance.value.length);
                this.maintenanceSince(state.maintenance.since);
                for (var i = 0; i < state.maintenance.value.length; i++) {
                    for (var j = 0; j < this.cmpMapping.length; j++) {
                        if (state.maintenance.value[i] === this.cmpMapping[j]['id']) {
                            this.maintenanceURLData.push(this.cmpMapping[j]);
                        }
                    }
                }
            }
        }
    }
    exports.default = State;
});
