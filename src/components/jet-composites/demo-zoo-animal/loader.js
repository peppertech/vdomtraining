define(['ojs/ojcomposite', 'text!./view.html', 'text!./component.json', 'css!./styles', 'ojs/ojinputtext'],
  function(Composite, view, metadata) {
    Composite.register('demo-zoo-animal', {
      view: view,
      metadata: JSON.parse(metadata)
    });
  }
);
