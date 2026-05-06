/**
  Copyright (c) 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['ojs/ojcontext', 'ojs/ojresponsiveknockoututils', 'knockout'], function (Context, ResponsiveKnockoutUtils, ko) {
    function ScreenRangeDetectorComponentModel(context) {
        this.element = context.element;
        var busyContext = Context.getContext(context.element).getBusyContext();
        var options = {"description": "Screensize Detector - Waiting for Media Query callback"};
        this.busyResolve = busyContext.addBusyState(options);

        this.properties = context.properties;
        this.isVBCSDT = ko.observable(this._detectDTMode(context.element));
    };

    ScreenRangeDetectorComponentModel.prototype.bindingsApplied = function(context) {
        this.screenRangeDetector = ResponsiveKnockoutUtils.createScreenRangeObservable();
        this.screenRangeDetector.subscribe(this._updateRange.bind(this));
        this._updateRange(this.screenRangeDetector());
    };

    ScreenRangeDetectorComponentModel.prototype._updateRange = function(range) {
        if (range !== undefined) {
            this.properties.setProperty('value', range);
            //this.properties.value = range;
            if (this.busyResolve) {
                this.busyResolve();
                delete this.busyResolve;
            }
        }
    }
    ScreenRangeDetectorComponentModel.prototype.refresh = function() {
        this.isVBCSDT(this._detectDTMode(this.element));
    }

    ScreenRangeDetectorComponentModel.prototype._detectDTMode = function (component) {
        if (component.getAttribute('data-vbdt-component')) {
            return true;
        }
        else {
            return false;
        }
    };

    return ScreenRangeDetectorComponentModel;
});
