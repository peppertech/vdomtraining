define(['knockout', 'require', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojmodule-element-utils', 'ojs/ojarraydataprovider', 'ojs/ojmodule-element', 'ojs/ojbutton', 'ojs/ojknockout', 'ojs/ojselectsingle', 'ojs/ojlabel'],
  function (ko, require, ResponsiveUtils, ResponsiveKnockoutUtils, ModuleElementUtils, ArrayDataProvider) {
    function ViewModel (context) {
      this.uniqueId = context.uniqueId;
      this.properties = context.properties;
      this.getDataProvider = function(options) {
        return new ArrayDataProvider(options, {keyAttributes: 'value'});
      };
      var mdQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      var medium = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
      this.moduleConfig = ko.pureComputed(function() {
        var viewPath = './module/views/' + (medium() ? 'desktop' : 'mobile') + '.html'
        return ModuleElementUtils.createView({viewPath: viewPath, require: require}).then(function(view) {
          return {view: view, viewModel: this}
        }.bind(this));
      }.bind(this));
    };
    return ViewModel;
  }
)
