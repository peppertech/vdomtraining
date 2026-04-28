define(['knockout', 'ojs/ojknockout'], function (ko) {
  function model (context) {
    this.unstackedIcon = ko.pureComputed(function() {
      return {
        'oj-ux-ico-chart-area-v': context.properties.type === 'area' || context.properties.type === 'lineWithArea',
        'oj-ux-ico-chart-bar-unstack': context.properties.type === 'bar' || context.properties.type === 'combo'
      }
    });
    this.stackedIcon = ko.pureComputed(function() {
      return {
        'oj-ux-ico-chart-area-stack': context.properties.type === 'area' || context.properties.type === 'lineWithArea',
        'oj-ux-ico-chart-bar-stack': context.properties.type === 'bar' || context.properties.type === 'combo'
      }
    });
  }
  return model;
})
