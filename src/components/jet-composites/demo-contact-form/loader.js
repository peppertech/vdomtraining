define(['ojs/ojcomposite', 'text!./view.html', 'text!./component.json', 'css!./styles',
  'ojs/ojinputtext', 'ojs/ojknockout'],
  function(Composite, view, metadata) {
    Composite.register('demo-contact-form', {
      view: view,
      metadata: JSON.parse(metadata)
    });
  }
);
