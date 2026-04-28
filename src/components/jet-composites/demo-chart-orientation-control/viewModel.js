define(['knockout', 'ojs/ojknockout'], function (ko) {
  function model (context) {
    this.verticalIcon = ko.pureComputed(function() {
      return {
        'oj-ux-ico-chart-area-v': context.properties.type === 'area' || context.properties.type === 'lineWithArea',
        'oj-ux-ico-chart-bar-v-alt': context.properties.type === 'bar' || context.properties.type === 'combo',
        'oj-ux-ico-chart-box-v': context.properties.type === 'boxPlot',
        'oj-ux-ico-chart-funnel-v': context.properties.type === 'funnel',
        'oj-ux-ico-chart-line-v': context.properties.type === 'line'
      }
    });
    this.horizontalIcon = ko.pureComputed(function() {
      return {
        'oj-ux-ico-chart-area-h': context.properties.type === 'area' || context.properties.type === 'lineWithArea',
        'oj-ux-ico-chart-bar-h-alt': context.properties.type === 'bar' || context.properties.type === 'combo',
        'oj-ux-ico-chart-box-h': context.properties.type === 'boxPlot',
        'oj-ux-ico-chart-funnel-h': context.properties.type === 'funnel',
        'oj-ux-ico-chart-line-h': context.properties.type === 'line'
      }
    });
  }
  return model;
})
