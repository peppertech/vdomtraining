define(["require", "exports", "jquery", "ojs/ojcontext", "./libs/cb/jet/JETDemoRenderer", "./libs/cb/vb/VBDemoRenderer", "./libs/cb/common/State", "./libs/cb/common/Constants", "./libs/cb/common/Utils", "./libs/cb/jet/JETCommunityDemoRenderer", "ojs/ojarraydataprovider", "knockout", "ojs/ojarraydataprovider", "./libs/jquery.nanoscroller", "ojs/ojoffcanvas", "ojs/ojmodule-element", "ojs/ojmodule", "ojs/ojjsontreedatasource", "ojs/ojnavigationlist", "ojs/ojbutton", "ojs/ojswitcher", "ojs/ojconveyorbelt", "ojs/ojtreeview", "ojs/ojtoolbar", "ojs/ojaccordion", "ojs/ojcollapsible", "ojs/ojselectsingle"], function (require, exports, $, Context, JETDemoRenderer_1, VBDemoRenderer_1, State_1, Constants_1, Utils_1, JETCommunityDemoRenderer_1, ArrayDataProvider, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ComponentModel {
        constructor(context) {
            this.demoOffCanvas = "#demoOffcanvasWrapper";
            this.isCorepackCookbook = false;
            //Component instance variables
            this.props = context.properties;
            this.element = context.element;
            this.uniqueId = context.uniqueId;
            this.$ele = $(this.element);
            this.updateFrameSrcNextTime = false; //Using flag to avoid multiple iframe reloads on initial visit
            //Member variables
            this.m_frameAndTabSize = null;
            this.m_prevScreenMode = null;
            this.isCorepackCookbook = this.props?.config?.iscorepack;
            //local variables
            var themeList = Utils_1.default._getThemes();
            var newplatformList = Utils_1.default._getModifiedThemes();
            var corepackThemeList = Utils_1.default._getCorepackThemes();
            var platformMap = Constants_1.default.PLATFORM_MAP;
            var platformList = [];
            for (var l = 0; l < themeList.length; l++) {
                platformList.push(platformMap[themeList[l]['id']]);
            }
            var corepackPlatformList = [];
            for (var l = 0; l < corepackThemeList.length; l++) {
                corepackPlatformList.push(platformMap[corepackThemeList[l]['id']]);
            }
            this.platformDataProvider = new ArrayDataProvider(themeList, {
                idAttribute: "id"
            });
            this.platformDataProviderCorepack = new ArrayDataProvider(corepackThemeList, {
                idAttribute: "id"
            });
            var metaSize = {
                'desktop': 1000,
                'phone_portrait': 385,
                'tab_portrait': 860,
                'tab_landscape': 1229
            };
            this.baseFontSize = {
                id: "baseFontSize",
                title: "Base Font Size",
                buttonSet: [
                    { id: "fontnone", label: "Default" },
                    { id: "12px", label: "12px" },
                    { id: "14px", label: "14px" },
                    { id: "16px", label: "16px" },
                    { id: "18px", label: "18px" }
                ]
            };
            // Bind variables
            var hasCustomHeader = !!context.slotCounts.customHeader;
            var hasCustomRecipe = !!context.slotCounts.recipeContent;
            this.state = new State_1.default(hasCustomHeader, hasCustomRecipe, newplatformList, this.props.theme, this.props.platform, this.props.direction, this.props.fontSize, this.props.debug, this.props.tag, this.props.scale, this.props.density);
            this.iconSizeDataProvider = new ArrayDataProvider(this.baseFontSize.buttonSet, {
                idAttribute: "id"
            });
            this.modifiedThemes = this.state.isCorepack() ? Utils_1.default._getModifiedCorepackThemes() : Utils_1.default._getModifiedThemes();
            this.themeMetaSize = [];
            for (var prop in this.modifiedThemes) {
                this.themeMetaSize[prop] = metaSize;
                if (this.modifiedThemes[prop]['id'] === 'alta-android') {
                    this.themeMetaSize[this.modifiedThemes[prop]] = metaSize;
                    this.themeMetaSize[this.modifiedThemes[prop]]['phone_portrait'] = 393;
                }
                if (this.modifiedThemes[prop]['id'] === 'alta-windows') {
                    this.themeMetaSize[this.modifiedThemes[prop]] = metaSize;
                    this.themeMetaSize[this.modifiedThemes[prop]]['phone_portrait'] = 461;
                }
            }
            this.themeMetaSize.codePanelMinWidth = 615;
            this.defaultBaseDir = "js/jet-composites/";
            this.jstsValues = [{ id: false, label: "JS" },
                { id: true, label: "TS" },
            ];
            //For toolbar
            this.settingsButtonValue = ko.observable(this.props.buttonSetting);
            // Event listeners
            this.listeners = {};
            this.listeners["handleTypeScriptFlagChange"] = (event) => {
                this.element.sourceType = event.detail.value
                    ? "typescript"
                    : "javascript";
            };
            this.listeners["onThemeChange"] = (event) => {
                this.element.theme = event.detail.value;
            };
            this.listeners["onPlatFormChange"] = (event) => {
                this.element.platform = event.detail.value;
            };
            this.listeners["onDirectionChange"] = (event) => {
                this.element.direction = event.detail.value;
            };
            this.listeners["onDebugChange"] = (event) => {
                this.element.debug = event.detail.value;
            };
            this.listeners["onTagChange"] = (event) => {
                this.element.tag = event.detail.value;
            };
            this.listeners["onFontSizeChange"] = (event) => {
                this.element.fontSize = event.detail.value;
            };
            this.listeners["onScaleChange"] = (event) => {
                this.element.scale = event.detail.value;
            };
            this.listeners["onDensityChange"] = (event) => {
                this.element.density = event.detail.value;
            };
            this.listeners["onOpenInNewWindow"] = () => {
                this.openInNewWindow(this.getDemoUrl(this.state.demoUrl(), true));
            };
            this.listeners["onApiDocLaunchBtnClick"] = () => {
                var apiLinks = this.state.apiDocLinks();
                this.element.dispatchEvent(new CustomEvent("apiDocSelection", {
                    bubbles: true,
                    detail: {
                        item: apiLinks[0]
                    }
                }));
            };
            this.listeners["onApiDocLaunchBtn"] = () => {
                var apiLinks = this.state.apiDocLinks();
                apiLinks[0].url = apiLinks[0].url + "#migration-section";
                this.element.dispatchEvent(new CustomEvent("apiDocSelection", {
                    bubbles: true,
                    detail: {
                        item: apiLinks[0]
                    }
                }));
            };
            this.listeners["onApiDocLaunchMenuClick"] = (event) => {
                var apiLinks = this.config.apiRef;
                var link = event.target.value;
                for (var i = 0; i < apiLinks.length; i++) {
                    if (apiLinks[i].url === link) {
                        this.element.dispatchEvent(new CustomEvent("apiDocSelection", {
                            bubbles: true,
                            detail: {
                                item: apiLinks[i]
                            }
                        }));
                        return;
                    }
                }
            };
            this.listeners["onUXSpecLaunchBtnClick"] = () => {
                var uxSpecLinks = this.state.uxSpecLinks();
                this.element.dispatchEvent(new CustomEvent("uxSpecSelection", {
                    bubbles: true,
                    detail: {
                        item: uxSpecLinks[0]
                    }
                }));
            };
            this.listeners["onUXSpecLaunchMenuClick"] = (event) => {
                var uxSpecLinks = this.state.uxSpecLinks();
                var link = event.target.value;
                for (var i = 0; i < uxSpecLinks.length; i++) {
                    if (uxSpecLinks[i].url === link) {
                        this.element.dispatchEvent(new CustomEvent("uxSpecSelection", {
                            bubbles: true,
                            detail: {
                                item: uxSpecLinks[i]
                            }
                        }));
                        return;
                    }
                }
            };
            this.listeners["onSeeAlsoMenuAction"] = (event) => {
                var seeAlsoList = this.config.seealso;
                var selectedItem = event.target.value;
                for (var i = 0; i < seeAlsoList.length; i++) {
                    if (seeAlsoList[i].url === selectedItem) {
                        this.element.dispatchEvent(new CustomEvent("seeAlsoItemSelection", {
                            bubbles: true,
                            detail: {
                                item: seeAlsoList[i]
                            }
                        }));
                    }
                }
            };
            this.listeners["applyBtnAction"] = () => {
                this.applySourceChanges();
            };
            this.listeners["onSettingsButtonClick"] = () => {
                this.settingsButtonValue(!this.settingsButtonValue());
                this.element.buttonSetting = this.settingsButtonValue();
            };
            this.listeners["onSourceTreeNodeSelection"] = (event) => {
                if (event.detail.value.length === 0) {
                    return;
                }
                var result = this.onTreeSelectionChange(this.state.openFiles(), event.detail.value);
                var hnavlist = document.getElementById(Constants_1.default.TABS_COMPONENT_ID);
                let renderer = this.getRenderer();
                if (renderer) {
                    renderer.handleTreeSelectionChange
                        .call(renderer, result, event)
                        .then(() => {
                        this.state.updateOpenFiles(result.openFiles);
                        if (hnavlist) {
                            Context.getContext(hnavlist)
                                .getBusyContext()
                                .whenReady()
                                .then(() => {
                                this.state.updateTabSelection(result.file.id);
                            });
                        }
                    });
                }
            };
            this.listeners["expandSourceTreePanel"] = (event) => {
                this.toggleSourceDrawer();
            };
            this.listeners["onSourceTabSelectionChange"] = (event) => {
                setTimeout(() => {
                    $("oj-sample-cookbook-editor:visible").each(function (index, ele) {
                        ele.refresh();
                    });
                    $("." + Constants_1.default.DEMO_SCROLL_CONTAINER_CLASS + ":visible").each((index, ele) => {
                        Utils_1.default.applyNanoScroll(ele, true);
                    });
                });
            };
            this.listeners["onSourceTabRemove"] = (event) => {
                var result = this.onSourceTabRemoveAction(event.detail, this.state.openFiles());
                this.state.updateOpenFiles(result.openFiles);
                var hnavlist = document.getElementById(Constants_1.default.TABS_COMPONENT_ID);
                if (hnavlist) {
                    Context.getContext(hnavlist)
                        .getBusyContext()
                        .whenReady()
                        .then(() => {
                        this.state.updateTabSelection(result.selectedTab);
                    });
                }
            };
            this.listeners["onSourceTabDeselect"] = (event) => {
                this.onSourceTabDeselection(event.detail);
            };
            this.listeners["onSourceSwitcherChange"] = () => {
                this.refreshTabContent();
            };
            this.listeners["onSourceContentChange"] = (e) => {
                let renderer = this.getRenderer();
                if (renderer) {
                    renderer.handleSourceChanged.call(renderer, e);
                }
            };
            //Methods
            this.functions = {};
            this.functions["resolveFile"] = (fileName) => {
                let renderer = this.getRenderer();
                if (renderer) {
                    return renderer.resolveFile.call(renderer, fileName);
                }
            };
            //Internal event handlers
            this.propertyChanged = (pcContext) => {
                if (pcContext.property === "config") {
                    // Only initiaize if the config is different
                    if (JSON.stringify(pcContext.value) !==
                        JSON.stringify(pcContext.previousValue)) {
                        this.initialize(pcContext.value);
                    }
                }
                else if (pcContext.property === "theme") {
                    this.state.updateTheme(pcContext.value);
                    this.reloadDemo(null, null, null, null, pcContext.value, null, null, null, null);
                }
                else if (pcContext.property === "platform") {
                    this.state.updatePlatForm(pcContext.value);
                }
                else if (pcContext.property === "debug") {
                    this.state.updateDebugMode(pcContext.value);
                    this.reloadDemo(null, null, pcContext.value, null, null, null, null, null, null);
                }
                else if (pcContext.property === "direction") {
                    this.state.updateReadingDir(pcContext.value);
                    this.reloadDemo(null, null, null, pcContext.value, null, null, null, null, null);
                }
                else if (pcContext.property === "tag") {
                    this.state.updateTagMode(pcContext.value);
                    this.reloadDemo(null, null, null, null, null, null, pcContext.value, null, null);
                }
                else if (pcContext.property === "fontSize") {
                    this.state.updateFontSize(pcContext.value);
                    this.reloadDemo(null, pcContext.value, null, null, null, null, null, null, null);
                }
                else if (pcContext.property === "scale") {
                    this.state.updateScale(pcContext.value);
                    this.reloadDemo(null, null, null, null, null, null, null, pcContext.value, null);
                }
                else if (pcContext.property === "density") {
                    this.state.updateDensity(pcContext.value);
                    this.reloadDemo(null, null, null, null, null, null, null, null, pcContext.value);
                }
                else if (pcContext.property === "settings") {
                    this.reloadDemo(null, null, null, null, pcContext.value, null, null, null, null);
                }
                else if (pcContext.property === "service") {
                    this._service = JSON.parse(JSON.stringify(pcContext.value));
                }
            };
            this.element.addEventListener("configChanged", () => {
                this.$ele
                    .find("oj-menu-button.oj-complete:visible oj-menu")
                    .each(function (index, item) {
                    item.refresh();
                });
            });
            this.element.addEventListener("sourceTypeChanged", (event) => {
                let renderer = this.getRenderer();
                if (renderer) {
                    renderer.handleSourceTypeChange.call(renderer, event.detail.value === "typescript");
                }
            });
            this._service = this.props.service;
            this.initialize(this.props.config);
        }
        hasUnsupportedTheme() {
            if (this.state.unSupportedThemes()) {
                if (this.state.unSupportedThemes().length > 0)
                    return true;
                else
                    return false;
            }
        }
        getUnSupportedThemeList() {
            if (this.state.unSupportedThemes()) {
                var result = "";
                var len = this.state.unSupportedThemes().length;
                for (var i = 0; i < len; i++) {
                    if (len - 1 === i)
                        result = result + this.state.unSupportedThemes()[i];
                    else
                        result = result + this.state.unSupportedThemes()[i] + ", ";
                }
                if (len > 1)
                    return result + " themes.";
                else
                    return result + " theme.";
            }
        }
        getDeprecatedMessage() {
            var result = "";
            if (this.state.deprecated()) {
                result = "deprecated since " + this.state.deprecated().since;
                //(this.state.deprecated.description) ? result = result + this.state.deprecated().description : result;
            }
            return result;
        }
        initRenderer(runtime, provider = "core") {
            let renderer;
            runtime = runtime || this.state.runtime();
            this.isNotJetRuntime =
                runtime === "jet" && provider === "core" ? false : true;
            if (runtime === "vb" && provider === "core") {
                renderer = new VBDemoRenderer_1.default(this, this.getService("vb"));
            }
            else if (runtime === "vb" && provider === "community") {
                renderer = new VBDemoRenderer_1.default(this, this.getService("vb", "community"));
            }
            else if (runtime === "jet" && provider === "core") {
                renderer = new JETDemoRenderer_1.default(this, this.getService("jet"));
            }
            else if (runtime === "jet" && provider === "community") {
                renderer = new JETCommunityDemoRenderer_1.default(this, this.getService("jet", "community"));
            }
            else {
                this._renderer = null;
                throw "Invalid Renderer";
            }
            this._renderer = renderer;
            return this._renderer;
        }
        getRenderer() {
            return this._renderer;
        }
        getService(runtime, provider = "core") {
            runtime = runtime || this.config.runtime;
            let serviceConfig = this._service[runtime];
            return serviceConfig ? serviceConfig[provider] : null;
        }
        getDemoType() {
            return this.config.runtime;
        }
        getDemoUrl(demoUrl, newWindow) {
            var url = Utils_1.default.addThemingParams.bind(this)(this.state.runtime(), demoUrl, null, null, null, null, null, null, null, null, newWindow);
            return url;
        }
        openInNewWindow(url) {
            // When the demo is loaded in a new window, it should behave like any other device's browser, 
            // so the platform parameter is removed from the url.
            window.open(Utils_1.default._removeURLParameter(url, 'platform'), "_blank");
        }
        hasTypeSize(config) {
            return !!Utils_1.default._getDemoOption(config, "targetAppType", null);
        }
        shouldIncludeResInstr(config) {
            return Utils_1.default._getDemoOption(config, "includeResponsiveInstructions", false);
        }
        shouldIncludePreviewInstr(config) {
            return Utils_1.default._getDemoOption(config, "status", null) === "preview";
        }
        isHybrid(config) {
            return Utils_1.default._getDemoOption(config, "targetAppType", null) === "hybrid";
        }
        isWeb(config) {
            return Utils_1.default._getDemoOption(config, "targetAppType", null) === "web";
        }
        isPhone(config) {
            return Utils_1.default._getDemoOption(config, "targetAppType", null) === "phone";
        }
        isTablet(config) {
            return Utils_1.default._getDemoOption(config, "targetAppType", null) === "tablet+";
        }
        getResourceType(config, file) {
            return config.jetDemoType === "widget"
                ? ""
                : config[file + "_element"]
                    ? "_element"
                    : "";
        }
        bindingsApplied() {
            var frame = document.querySelector(".demo-iframe");
            if (frame) {
                if (frame.src === "") {
                    frame.setAttribute("src", this.state.demoUrl());
                }
            }
            else {
                this.updateFrameSrcNextTime = true;
            }
        }
        onTabAnimateStart(event) {
            event.preventDefault();
            event.detail.endCallback();
        }
        initialize(conf) {
            if (!conf) {
                return;
            }
            //Create Renderer every time new demo is initialized.
            var renderer = this.initRenderer(conf.runtime, conf.provider);
            var init = (config) => {
                this.config = config;
                var dtrtDisposePromise = this.initDTRTConnection(renderer, config.id, config);
                renderer.goToDemo.call(renderer, config).then((state) => {
                    renderer.updateState.call(renderer, state);
                    this.state.selectedPlatform(Utils_1.default.platformFormfactorReset(this.state.platformList, config, this.state.selectedPlatform()));
                    dtrtDisposePromise.then(() => {
                        this._reloadIframe(true);
                    });
                });
            };
            var initExtendedConfig = function (config) {
                if (config.extends) {
                    renderer.loadConfig
                        .call(renderer, {
                        id: config.extends.component + "_" + config.extends.option,
                        version: config.version
                    })
                        .then((cfg) => {
                        init($.extend({}, cfg, conf, {
                            id: cfg.id,
                            label: cfg.label,
                            pageTitle: cfg.pageTitle,
                            extendedUid: config.uid,
                            parentDemoName: config.pageTitle ? config.pageTitle.split('-')[0] : ''
                        }));
                    });
                }
                else {
                    init(config);
                }
            }.bind(this);
            if (!conf.loadConfig) {
                initExtendedConfig(conf);
            }
            else {
                renderer.loadConfig.call(renderer, conf).then((cfg) => {
                    initExtendedConfig($.extend(cfg, conf));
                });
            }
        }
        updateSourceTreeView(showFolderViewByDefault) {
            if (this.state.isComplexDemo() && showFolderViewByDefault) {
                this._openDrawerWithoutAnimation();
            }
            else {
                this._closeDrawerWithoutAnimation();
            }
        }
        _fixNanScroll() {
            var i, itemsNeedRefresh = [];
            this.$ele.find(".nano").each(function (index, item) {
                var scrollHeight, clientHeight, nanoContent, heights;
                item = $(item);
                var iframeElement = item.find("iframe");
                if (iframeElement.length) {
                    var iframeHeight = iframeElement[0].clientHeight;
                    var contentHeight = iframeElement[0].contentWindow.document.body
                        ? iframeElement[0].contentWindow.document.body.offsetHeight
                        : 0;
                    if (iframeHeight != contentHeight) {
                        iframeElement[0].style.height = contentHeight + "px";
                    }
                }
                nanoContent = item.children().first();
                scrollHeight = nanoContent[0].scrollHeight;
                clientHeight = nanoContent[0].clientHeight;
                heights = nanoContent.data("PREV_NANO_HEIGHTS");
                if (!heights) {
                    heights = {};
                }
                if ((heights.prevScrollHeight &&
                    heights.prevScrollHeight !== scrollHeight) ||
                    (heights.prevClientHeight && heights.prevClientHeight !== clientHeight)) {
                    itemsNeedRefresh.push(item);
                }
                heights.prevScrollHeight = scrollHeight;
                heights.prevClientHeight = clientHeight;
                nanoContent.data("PREV_NANO_HEIGHTS", heights);
            });
            for (i = 0; i < itemsNeedRefresh.length; i++) {
                Utils_1.default.applyNanoScroll(itemsNeedRefresh[i], true);
            }
        }
        _isFlipScreen(baseTheme, platform) {
            var defaultMinWidth = this.themeMetaSize[baseTheme][platform], breakingPoint;
            breakingPoint = defaultMinWidth + this.themeMetaSize.codePanelMinWidth;
            return breakingPoint > this.m_frameAndTabSize;
        }
        _getDemoOption(demoObject, optionName, optionDefault) {
            var optionData = optionDefault;
            if (demoObject &&
                Object.prototype.hasOwnProperty.call(demoObject, optionName)) {
                optionData = demoObject[optionName];
            }
            return optionData;
        }
        _fixIframeSize(demoConfig, demoId, platform, theme, smOnly, mdOnly, prevScreenMode, iframeMetrics) {
            var defaultScreenMinHeight, minHeightPortrait, minHeightLandscape, maxHeightPortrait, maxHeightLandscape, minHeight, bodyHeight, maxHeight, isMaxMinSame, iFrameDemo, isStackedMode, demoFrameHeight, scrollFrame;
            iFrameDemo = this.$ele.find(".demo-iframe");
            scrollFrame = this.$ele.find(".demo-scroll-frame");
            if (iFrameDemo.length) {
                iFrameDemo.attr("scrolling", smOnly || platform !== "desktop" ? "yes" : "no");
                minHeightPortrait = Utils_1.default._getDemoOption(demoConfig, "minHeightPortrait", 690);
                minHeightLandscape = Utils_1.default._getDemoOption(demoConfig, "minHeightLandscape", 0); // In landscape mode height should be same as natual height of contents
                maxHeightPortrait = Utils_1.default._getDemoOption(demoConfig, "maxHeightPortrait", "none");
                maxHeightLandscape = Utils_1.default._getDemoOption(demoConfig, "maxHeightLandscape", "none");
                if (iframeMetrics.clientHeight) {
                    bodyHeight = iframeMetrics.clientHeight;
                    defaultScreenMinHeight = document.documentElement.clientHeight - 260; // 255.49 is equivalant to header/footer/breadcrumbs/padding around iframe
                    this.m_frameAndTabSize = this.$ele
                        .find(".demo-cook-demo-and-tabs")
                        .width();
                }
                isStackedMode = this._calculateStackedMode(demoConfig, platform, theme, smOnly, mdOnly);
                if (prevScreenMode != undefined && prevScreenMode !== isStackedMode) {
                    scrollFrame[0].style.height = "";
                    return isStackedMode;
                }
                if (isStackedMode) {
                    minHeight = minHeightLandscape;
                    maxHeight = maxHeightLandscape;
                }
                else {
                    minHeight = minHeightPortrait;
                    maxHeight = maxHeightPortrait;
                }
                isMaxMinSame = minHeight === maxHeight;
                if (platform === "desktop") {
                    if (bodyHeight) {
                        // recalculate minHeight and max height by considering maximum of screen height/minHeight/
                        if (isMaxMinSame) {
                            demoFrameHeight = Math.max(minHeight, defaultScreenMinHeight); // set Max of minHeight or screen height
                        }
                        else if (isStackedMode) {
                            demoFrameHeight =
                                bodyHeight > minHeightLandscape ? bodyHeight : minHeightLandscape; //  Set to natural demo height
                        }
                        else {
                            demoFrameHeight = Math.max(minHeight, bodyHeight); // Set max of demo height/min height , JET-51187 Removed defaultScreenMinHeight for larger screen iframeHeight calculation.
                            if (maxHeight !== "none" && demoFrameHeight > maxHeight) {
                                // Ensure that it never exceeds max height
                                demoFrameHeight = maxHeight;
                            }
                        }
                        scrollFrame[0].style.height = demoFrameHeight + "px";
                        this.$ele.find(".demo-scroll-container").each(function (index, item) {
                            if (isStackedMode) {
                                item.style.height = "100%";
                                Utils_1.default.unApplyNanoScroll(item);
                            }
                            else {
                                item.style.height = demoFrameHeight - 42 + "px"; // 120px roughly equivalant to tab height
                                Utils_1.default.applyNanoScroll(item);
                            }
                        }.bind(this));
                    }
                }
                else {
                    if (mdOnly || smOnly) {
                        if (isMaxMinSame) {
                            demoFrameHeight = Math.max(minHeight, defaultScreenMinHeight);
                        }
                        else {
                            demoFrameHeight =
                                bodyHeight > minHeightLandscape ? bodyHeight : minHeightLandscape; //  Set to natural demo height
                        }
                        scrollFrame[0].style.height = demoFrameHeight + "px";
                    }
                    else {
                        scrollFrame[0].style.height = "";
                    }
                    this.$ele.find(".demo-scroll-container").each(function (index, item) {
                        if (isStackedMode) {
                            item.style.height = "100%";
                            Utils_1.default.unApplyNanoScroll(item);
                        }
                        else {
                            item.style.height = ""; // default 73vh set in css will be applied
                            Utils_1.default.applyNanoScroll(item);
                        }
                    }.bind(this));
                }
            }
            return isStackedMode;
        }
        handleScheduledTimedEvent(demoConfig, demoId, platform, theme, smOnly, mdOnly, iframeMetrics) {
            this.m_prevScreenMode = this._fixIframeSize(demoConfig, demoId, platform, theme, smOnly, mdOnly, this.m_prevScreenMode, iframeMetrics);
            this._fixNanScroll();
            this.updateShell(demoConfig, platform, theme, smOnly, mdOnly, this.m_prevScreenMode);
            return this.m_prevScreenMode;
        }
        _reloadIframe(newConnection, baseTheme, platform, fontSize, debug, readingDir, settings, color, notagcss, tagMode, scale, density) {
            var frame = document.querySelector(".demo-iframe");
            var url, parent;
            if (frame && (frame.src !== "" || this.updateFrameSrcNextTime)) {
                if (!newConnection) {
                    this._rtConnection.resetConnection();
                }
                url = Utils_1.default.addThemingParams.bind(this)(this.state.runtime(), this.state.demoUrl(), baseTheme, platform, fontSize, debug, readingDir, settings, color, notagcss, tagMode, scale, density);
                var runtime = this.state.runtime.peek();
                url = url
                    .toString()
                    .replace("/?", runtime === "jet" ? "/jetCookbook.html?" : "/index.html?");
                //In order to change the content of the iframe without adding a URL in the browser history,
                //need to always remove and add the iframe node.
                parent = frame.parentElement;
                parent.removeChild(frame);
                frame.setAttribute("scrolling", "yes");
                frame.setAttribute("src", url);
                parent.appendChild(frame);
                this.updateFrameSrcNextTime = false;
            }
        }
        _calculateStackedMode(demoConfig, platform, baseTheme, smOnly, mdOnly) {
            if (smOnly ||
                mdOnly ||
                this._isFlipScreen(baseTheme, platform) ||
                platform === "tab_landscape" ||
                platform === "tab_portrait" ||
                platform === "phone_portrait") {
                return true;
            }
            return false;
        }
        updateShell(demoConfig, selectedPlatform, baseTheme, smOnly, mdOnly, stackedMode) {
            var commonCss = "demo-cook-demo-and-tabs oj-flex demo-body-min-height ";
            var isStackedmode = stackedMode != undefined
                ? stackedMode
                : this._calculateStackedMode(demoConfig, selectedPlatform, baseTheme, smOnly, mdOnly);
            if (isStackedmode) {
                commonCss += "demo-stacked-mode ";
            }
            this.state.updateStackedMode(isStackedmode);
            if (mdOnly ||
                smOnly ||
                (selectedPlatform === "desktop" &&
                    this._isFlipScreen(baseTheme, selectedPlatform))) {
                commonCss += "demo-landscape-web";
            }
            else {
                var deviceImage = this.modifiedThemes[baseTheme]['deviceImage'];
                var modifyPlatform = selectedPlatform.replace(/tab_|phone_/, "demo-");
                var isTabPlatform = selectedPlatform.includes("tab") ? " demo-device-tab" : "";
                commonCss += modifyPlatform + '-' + deviceImage + isTabPlatform;
            }
            this.$ele.find(".demo-cook-demo-and-tabs").attr("class", commonCss);
        }
        _findInTreeData(files, fileId) {
            var file;
            for (var i = 0; i < files.length; i++) {
                if (files[i].attr) {
                    file = files[i].attr;
                }
                else {
                    file = files[i];
                }
                if (file.id == fileId) {
                    return file;
                }
                else if (files[i].children) {
                    return this._findInTreeData(files[i].children, fileId);
                }
            }
            return null;
        }
        onTreeSelectionChange(openFiles, selection) {
            var fileId = selection[0];
            var toBeLoaded = false;
            if (!fileId || /.*\.(jpg|png|gif|bmp)/.test(fileId)) {
                return null;
            }
            var filePath = fileId.replace(new RegExp(Constants_1.default.ID_SEPARATOR, "g"), "/");
            var openFile = this._findInTreeData(openFiles, filePath);
            var file = {
                id: filePath,
                label: fileId.substring(fileId.lastIndexOf(Constants_1.default.ID_SEPARATOR) + 1),
                removable: true
            };
            if (!openFile) {
                toBeLoaded = true;
                openFiles = openFiles
                    .slice(0, 1)
                    .concat([file])
                    .concat(openFiles.slice(1));
            }
            return {
                openFiles: openFiles,
                file: file,
                toBeLoaded: toBeLoaded
            };
        }
        toggleSourceDrawer(model, event) {
            var offCanvas = this.$ele.find(".demo-sourcetab-outer-wrapper");
            var drawerOut = offCanvas.hasClass("demo-sourcetab-open");
            offCanvas.addClass("demo-sourcetab-animate-transition");
            // Before animation start
            if (!drawerOut) {
                offCanvas.addClass("demo-sourcetab-open");
            }
            setTimeout(() => {
                // Start animation
                if (drawerOut) {
                    offCanvas.removeClass("demo-sourcetab-transition-open");
                }
                else {
                    offCanvas.addClass("demo-sourcetab-transition-open");
                }
                this._onSourceTreeTransitionEnd(this.$ele.find(".demo-main-content"), () => {
                    offCanvas.removeClass("demo-sourcetab-animate-transition");
                    if (!offCanvas.hasClass("demo-sourcetab-transition-open")) {
                        offCanvas.removeClass("demo-sourcetab-open");
                    }
                    else {
                        this.$ele
                            .find(".demo-sourcetab-start")
                            .find("[tabindex=0]")
                            .focus();
                    }
                }, 500);
            });
        }
        _openDrawerWithoutAnimation() {
            var offCanvas = $(this.demoOffCanvas);
            if (!offCanvas.hasClass("demo-sourcetab-open")) {
                offCanvas.addClass("demo-sourcetab-open");
                offCanvas.addClass("demo-sourcetab-transition-open");
            }
        }
        _closeDrawerWithoutAnimation() {
            var offCanvas = $(this.demoOffCanvas);
            if (offCanvas.hasClass("demo-sourcetab-open")) {
                offCanvas.removeClass("demo-sourcetab-open");
                offCanvas.removeClass("demo-sourcetab-transition-open");
            }
        }
        _onSourceTreeTransitionEnd(target, handler, timeout) {
            var endEvents = "transitionend.demo webkitTransitionEnd.demo";
            var transitionTimer;
            var listener = function () {
                if (transitionTimer) {
                    clearTimeout(transitionTimer);
                    transitionTimer = undefined;
                }
                // remove handler
                target.off(endEvents, listener);
                handler(target);
            };
            // add transition end listener
            target.on(endEvents, listener);
            transitionTimer = setTimeout(listener, timeout);
        }
        /**
         *
         * @param {String} arg1
         * @return {String}
         */
        refreshTabContent(selectedTab) {
            this.$ele
                .find("oj-sample-cookbook-editor:visible")
                .each(function (index, editor) {
                editor.refresh();
            });
        }
        /**
         *
         * @param {String} tabToRemove
         * @return {String} openFiles
         */
        onSourceTabRemoveAction(tabToRemove, openFiles) {
            var i;
            let renderer = this.getRenderer();
            if (renderer) {
                renderer.handleSourceTabRemove.call(renderer, tabToRemove);
            }
            for (i = 0; i < openFiles.length; i++) {
                if (openFiles[i].id === tabToRemove.key) {
                    break;
                }
            }
            openFiles.splice(i, 1);
            return {
                selectedTab: "nt_info",
                openFiles: openFiles.slice(0)
            };
        }
        /**
         * Apply Source Changes
         */
        applySourceChanges() {
            let renderer = this.getRenderer();
            if (renderer) {
                renderer.applyChanges.call(renderer, this.state.selectedTab());
            }
        }
        /**
         *
         * @param {String} eventDetail
         * @return {String}
         */
        onSourceTabDeselection(eventDetail) {
            var tabDeselected = eventDetail.fromKey[0];
            let renderer = this.getRenderer();
            if (renderer) {
                renderer.handleSourceTabDeselection.call(renderer, tabDeselected);
            }
        }
        itemSelection(context) {
            return context.leaf;
        }
        initDTRTConnection(renderer, demoAppId, demoConfig) {
            return new Promise((resolve, reject) => {
                renderer.initResourceManager.call(renderer, demoConfig);
                if (window.parent === window && demoConfig) {
                    if (this._rtConnection) {
                        this._rtConnection.waitForConnection().then(() => {
                            let newConnection = () => {
                                this._rtConnection = renderer.newDTRTConnection.call(renderer, demoAppId, demoConfig);
                                resolve();
                            };
                            this._rtConnection.dispose().then(newConnection, newConnection);
                        });
                    }
                    else {
                        this._rtConnection = renderer.newDTRTConnection.call(renderer, demoAppId, demoConfig);
                        resolve();
                    }
                }
            });
        }
        refresh() { }
        // Lifecycle methods - uncomment and implement if necessary
        connected(context) {
            this.scheduledInterval = setInterval((() => {
                if (this.config) {
                    var rtConnection = this._rtConnection;
                    if (rtConnection) {
                        rtConnection.waitForConnection().then((url) => {
                            var frame = document.querySelector(".demo-iframe");
                            if (frame &&
                                this._getUrlPath(url) === this._getUrlPath(frame.src)) {
                                rtConnection
                                    .getIframeMetrics()
                                    .then(((iframeMetrics) => {
                                    if (iframeMetrics) {
                                        this.handleScheduledTimedEvent(this.config, this.config.id, this.state.selectedPlatform(), this.state.selectedTheme(), this.state.smOnly(), this.state.mdOnly(), iframeMetrics);
                                    }
                                }).bind(this))
                                    .catch(function (err) {
                                    console.log(err);
                                });
                            }
                        });
                    }
                }
            }).bind(this), 500);
        }
        _getUrlPath(url) {
            return url.substring(0, url.indexOf(".html") + 5);
        }
        disconnected(context) {
            clearInterval(this.scheduledInterval);
            if (this._rtConnection) {
                this._rtConnection.disposeChannel();
            }
        }
        reloadDemo(baseTheme, fontSize, debug, readingDir, settings, platform, tagMode, scale, density) {
            this._reloadIframe(false, baseTheme, fontSize, debug, readingDir, settings, platform, tagMode, scale, density);
        }
    }
    exports.default = ComponentModel;
});
