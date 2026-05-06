define(["require", "exports", "jquery", "text!./../../../../../cookbookThemes.json", "text!./../../../../../corepackCookbookThemes.json"], function (require, exports, $, themeList, corepackThemeList) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Utils {
        static cleanParams(location, params) {
            var startIndex;
            for (var i = 0; i < params.length; i++) {
                startIndex = location.indexOf(params[i] + "=");
                if (startIndex > -1) {
                    location =
                        location.substring(0, startIndex) +
                            (location.indexOf("&", startIndex) > -1
                                ? location.substring(location.indexOf("&", startIndex) + 1)
                                : "");
                }
            }
            while (location.endsWith("?") || location.endsWith("&")) {
                location = location.substring(0, location.length - 1);
            }
            return location;
        }
        static addThemingParams(runtime, location, themeParam, fontSize, debug, readingDir, settings, platform, color, newWindow, tagMode, scale, density) {
            var theme, param = false;
            settings = settings || {};
            location = Utils.cleanParams(location, [
                "theme",
                "platform",
                "cssVars",
                "debug",
                "dir",
                "fontSize",
                "color",
                "notagcss",
                "scale",
                "density",
                "vbdt:editModeComChannelIdentity",
                "vbdt:editModeComChannelClass"
            ]);
            param = location.indexOf("?") > -1;
            if (this.props.theme === "ocean")
                themeParam = "ocean";
            theme = themeParam || this.props.theme;
            if (theme) {
                if (param) {
                    location += "&theme=" + theme;
                }
                else {
                    location += "?theme=" + theme;
                    param = true;
                }
            }
            if (runtime === "vb") {
                if (!newWindow) {
                    //this is needed for vb dt 19.3.1 and all previous vb versions just ignore this. It should be added only when accessed in side iframe.
                    location =
                        location +
                            "&vbdt:editModeComChannelIdentity=iFrameDemo&vbdt:editModeComChannelClass=vbdt/preview-core/rt/DtRuntimeEnvironment";
                }
                return location;
            }
            var platform = platform || this.props.platform;
            var cssVars = settings.cssvars || this.props.settings
                ? this.props.settings.cssvars
                : null;
            var color = color || this.props.settings ? this.props.settings.color : null;
            var notagcss = settings.notagcss || this.props.settings
                ? this.props.settings.notagcss
                : null;
            var debug = debug || this.props.debug;
            var fontSize = fontSize || this.props.fontSize;
            var dir = readingDir || this.props.direction;
            var notagcss = tagMode || this.props.tag;
            var scale = scale || this.props.scale;
            var density = density || this.props.density;
            if (platform) {
                if (param) {
                    location += "&platform=" + platform;
                }
                else {
                    location += "?platform=" + platform;
                    param = true;
                }
            }
            if (cssVars) {
                if (param) {
                    location += "&cssVars=" + cssVars;
                }
                else {
                    location += "?cssVars=" + cssVars;
                    param = true;
                }
            }
            if (debug) {
                if (param) {
                    location += "&debug=" + debug;
                }
                else {
                    location += "?debug=" + debug;
                    param = true;
                }
            }
            if (dir) {
                if (param) {
                    location += "&dir=" + dir;
                }
                else {
                    location += "?dir=" + dir;
                    param = true;
                }
            }
            if (fontSize) {
                if (param) {
                    location += "&fontSize=" + fontSize;
                }
                else {
                    location += "?fontSize=" + fontSize;
                    param = true;
                }
            }
            if (color) {
                if (param) {
                    location += "&color=" + color;
                }
                else {
                    location += "?color=" + color;
                    param = true;
                }
            }
            if (notagcss) {
                if (param) {
                    location += "&notagcss=" + notagcss;
                }
                else {
                    location += "?notagcss=" + notagcss;
                    param = true;
                }
            }
            if (scale) {
                if (param) {
                    location += "&scale=" + scale;
                }
                else {
                    location += "?scale=" + scale;
                    param = true;
                }
            }
            if (density) {
                if (param) {
                    location += "&density=" + density;
                }
                else {
                    location += "?density=" + density;
                    param = true;
                }
            }
            return location;
        }
        static _getThemes() {
            return JSON.parse(themeList);
        }
        static _getModifiedThemes() {
            var themesList = this._getThemes();
            var modifiedThemesList = [];
            for (var i = 0; i < themesList.length; i++) {
                modifiedThemesList[themesList[i]['id']] = themesList[i];
            }
            return modifiedThemesList;
        }
        static _getCorepackThemes() {
            return JSON.parse(corepackThemeList);
        }
        static _getModifiedCorepackThemes() {
            var corepackThemeList = this._getCorepackThemes();
            var modifiedThemesList = [];
            for (var i = 0; i < corepackThemeList.length; i++) {
                modifiedThemesList[corepackThemeList[i]['id']] = corepackThemeList[i];
            }
            return modifiedThemesList;
        }
        static _getDemoOption(demoObject, optionName, optionDefault) {
            var optionData = optionDefault;
            if (demoObject &&
                Object.prototype.hasOwnProperty.call(demoObject, optionName)) {
                optionData = demoObject[optionName];
            }
            return optionData;
        }
        static _isPublicSite() {
            // This is replaced at build time using the --publicsite value
            var ispublic = "false";
            return ispublic === "true";
        }
        static applyNanoScroll(element, forceRefresh) {
            var $element = $(element);
            if (!$element.hasClass("nano")) {
                $element
                    .children()
                    .first()
                    .addClass("nano-content");
                $element.addClass("nano");
                $element.nanoScroller({
                    tabIndex: -1,
                    preventPageScrolling: true
                });
            }
            else if (forceRefresh) {
                $element.nanoScroller({
                    tabIndex: -1,
                    preventPageScrolling: true
                });
            }
        }
        static unApplyNanoScroll(element) {
            var $element = $(element);
            if ($element.hasClass("nano")) {
                $element.nanoScroller({
                    destroy: true
                });
                $element
                    .children()
                    .first()
                    .removeClass("nano-content");
                $element.removeClass("nano");
            }
        }
        /**
         * Retrieve the component and the option from a uid.
         * Component and option are always the last 2 segment of the uid.
         * Returns an array where the first element is the component and the second is the option.
         */
        static getComponentAndOptionFromUID(uid) {
            if (uid === "home") {
                // if it is home link demo child router should point to 'all' instead of 'web'.
                return ["home", "all"];
            }
            var items = uid.split("_");
            // only keep the last 2 elements
            items.splice(0, items.length - 2);
            return items;
        }
        /**
         * Return current pattern id or empty string
         */
        static getCurrentPatternId(obj) {
            if (!obj &&
                !Object.prototype.hasOwnProperty.call(obj, "targetDisplaySize") &&
                !Object.prototype.hasOwnProperty.call(obj, "targetAppType"))
                return false;
            return (obj.targetAppType || "") + (obj.targetDisplaySize || "");
        }
        static platformFormfactorReset(data, obj, currentFormFactor) {
            var platformFormfactorRules = {
                web: [],
                hybrid: ["desktop"],
                phone: ["desktop", "tab_portrait", "tab_landscape"],
                "tablet+": ["phone_portrait"],
                webphone: ["desktop", "tab_portrait", "tab_landscape"],
                "webtablet+": ["phone_portrait"],
                hybridphone: ["desktop", "tab_portrait", "tab_landscape"],
                "hybridtablet+": ["desktop", "phone_portrait"]
            }, propertyName = "disabled", currentRuleId, firstEnabled, disabledList;
            currentRuleId = Utils.getCurrentPatternId(obj);
            disabledList = currentRuleId ? platformFormfactorRules[currentRuleId] : [];
            data.forEach(function (item) {
                if (currentRuleId && disabledList.indexOf(item.id) > -1) {
                    item[propertyName](true);
                }
                else {
                    if (!firstEnabled) {
                        firstEnabled = item.id;
                    }
                    item[propertyName](false);
                }
            });
            return disabledList.indexOf(currentFormFactor) > -1
                ? firstEnabled
                : currentFormFactor;
        }
        static isIOS() {
            var userAgent = navigator.userAgent.toLowerCase();
            return userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1;
        }
        static compareVersion(v1, v2) {
            var v1parts = v1.split("."), v2parts = v2.split(".");
            while (v1parts.length < v2parts.length)
                v1parts.push("0");
            while (v2parts.length < v1parts.length)
                v2parts.push("0");
            for (var i = 0; i < v1parts.length; ++i) {
                if (parseInt(v1parts[i]) == parseInt(v2parts[i])) {
                    continue;
                }
                else if (parseInt(v1parts[i]) > parseInt(v2parts[i])) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            if (v1parts.length != v2parts.length) {
                return -1;
            }
            return 0;
        }
        /**
         * Remove param from url
         */
        static _removeURLParameter(url, parameter) {
            var urlArrya = url.split('?');
            if (urlArrya.length >= 2) {
                var prefix = encodeURIComponent(parameter) + '=';
                var params = urlArrya[1].split(/[&;]/g);
                for (var i = 0; i < params.length; i++) {
                    if (params[i].lastIndexOf(prefix, 0) !== -1) {
                        params.splice(i, 1);
                        break;
                    }
                }
                url = urlArrya[0] + '?' + params.join('&');
                return url;
            }
            else {
                return url;
            }
        }
    }
    exports.default = Utils;
});
