define(['ojs/ojcomposite', 'text!./view.html', 'text!./component.json', 'css!./styles', 'oj-c/input-text', 'oj-c/labelled-link'],
  function (Composite, view, metadata) {
    Composite.register('demo-input-email', {
      view: view,
      metadata: JSON.parse(metadata)
    });
  }
);
