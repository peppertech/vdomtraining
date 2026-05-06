/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'ojs/ojknockout'],
    function(ko) {

        function SampleCardModel(context) {
            var self = this;
            this.initials = null;

            //At the start of your viewModel constructor
            var busyContext = oj.Context.getContext(context.element).getBusyContext();
            var options = { "description": "card startup - Waiting for data" };
            self.busyResolve = busyContext.addBusyState(options);
            self.hover = ko.observable(false);
            self.focus = ko.observable(false);
            self.active = ko.observable(false);
            self.tabIndex = ko.observable(0);
            self.default = ko.computed(function() {
                return !self.active() && !self.hover() && !self.focus();
            })
            self.panelShadowSm = ko.observable(false);
            self.panelShadowMd = ko.observable(false);
            self.panelShadowLg = ko.observable(false);
            self.panelShadowSmState = ko.computed(function() {
                return !self.active() && !self.hover() && !self.focus();
            })
            self.panelShadowMdState = ko.computed(function() {
                return self.active();
            });
            self.panelShadowLgState = ko.computed(function() {
                return (self.hover() || self.focus()) && !self.active();
            });


            self.manageClass = function(state, aClass) {
                if (state) {
                    context.element.classList.add(aClass);
                } else {
                    context.element.classList.remove(aClass);
                }
            }

            self.manageClasses = function() {
                self.manageClass(self.panelShadowSmState(), 'oj-panel-shadow-sm');
                self.manageClass(self.panelShadowMdState(), 'oj-panel-shadow-md');
                self.manageClass(self.panelShadowLgState(), 'oj-panel-shadow-lg');
                self.manageClass(self.default(), 'oj-default');
                self.manageClass(self.hover(), 'oj-hover');
                self.manageClass(self.focus(), 'oj-focus');
                self.manageClass(self.active(), 'oj-active');
            }

            this.addClasses = function() {
                context.element.classList.add('oj-panel');
                context.element.classList.add('oj-sample-card');
            }

            this.setAttribute = function() {
                context.element.setAttribute("tabIndex", 0);
            }

            this.addListener = function() {
                context.element.addEventListener('mouseenter', this.mouseenter);
                context.element.addEventListener('mouseleave', this.mouseleave);
                context.element.addEventListener('focus', this.focusFn);
                context.element.addEventListener('blur', this.blur);
                context.element.addEventListener('mousedown', this.mousedown);
                context.element.addEventListener('mouseup', this.mouseup);
            };

            self.properties = context.properties;

            this.mouseenter = function(event) {
                self.hover(true);
                self.manageClasses();
            }

            this.mouseleave = function(event) {
                self.hover(false);
                self.manageClasses();
            }

            this.focusFn = function(event) {
                self.focus(true);
                self.manageClasses();
            }

            this.blur = function(event) {
                self.focus(false);
                self.manageClasses();
            }

            this.mousedown = function(event) {
                self.active(true);
                self.hover(false);
                self.manageClasses();
            }

            this.mouseup = function(event) {
                self.active(false);
                self.hover(true);
                self.manageClasses();
            }

            //Once all startup and async activities have finished, relocate if there are any async activities
            self.busyResolve();
        };

        //    var lifecycle_methods = ["initialize", "activated", "connected", "bindingsApplied", "disconnected"];
        SampleCardModel.prototype.connected = function(context) {
            var self = this;

            this.addListener();
            this.addClasses();
            this.manageClasses();
            this.setAttribute();

            if (context.properties.classOptions) {
                var classArray = context.properties.classOptions.split(" ");
                for (var i = 0, len = classArray.length; i < len; i++) {
                    context.element.classList.add(classArray[i]);
                }
            }
            if (context.properties.styleOptions) {
                context.element.cssText += context.properties.styleOptions;
            }

        };

        return SampleCardModel;
    });