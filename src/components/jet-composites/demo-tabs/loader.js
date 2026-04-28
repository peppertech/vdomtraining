define(['ojs/ojcomposite', 'text!./view.html', 'text!./component.json', 'css!./styles', 'ojs/ojnavigationlist', 'ojs/ojswitcher', 'ojs/ojknockout'],
  function(Composite, view, metadata) {
    Composite.register('demo-tabs', {
      view: view,
      metadata: JSON.parse(metadata)
    });
  }
);
