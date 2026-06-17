define(['knockout', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojarraydataprovider', 'text!./module/views/desktop.html', 'text!./module/views/mobile.html', 'ojs/ojmodule-element', 'ojs/ojbutton', 'ojs/ojknockout', 'ojs/ojselectsingle', 'ojs/ojlabel'],
  function (ko, ResponsiveUtils, ResponsiveKnockoutUtils, ArrayDataProvider, desktopView, mobileView) {
    function ViewModel (context) {
      this.uniqueId = context.uniqueId;
      this.properties = context.properties;
      this.getDataProvider = function(options) {
        return new ArrayDataProvider(options, {keyAttributes: 'value'});
      };
      var mdQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      var medium = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
      this.moduleConfig = ko.pureComputed(function() {
        return {
          view: ko.utils.parseHtmlFragment(medium() ? desktopView : mobileView),
          viewModel: this
        };
      }.bind(this));
    };
    return ViewModel;
  }
)
