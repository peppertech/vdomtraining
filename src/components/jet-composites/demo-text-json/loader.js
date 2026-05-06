define(['ojs/ojcomposite', 'text!./view.html', 'text!./component.json'], function (
  Composite,
  view,
  metadata
) {
  Composite.register('demo-text-json', {
    view: view,
    metadata: JSON.parse(metadata)
  });
});
