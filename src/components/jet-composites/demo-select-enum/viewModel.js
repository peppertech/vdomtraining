define(['ojs/ojarraydataprovider', 'ojs/ojselectsingle'],
  function (ArrayDataProvider) {
    function model (context) {
      this.dataProvider = new ArrayDataProvider(context.properties.enumValues.map(function(value) {return {label: value}}), {keyAttributes: 'label'});
    }
    return model;
  });
