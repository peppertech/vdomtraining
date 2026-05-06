define(['ojs/ojcomposite', 'text!./view.html', './viewModel', 'text!./component.json'], function (
  Composite,
  view,
  viewModel,
  metadata
) {
  Composite.register('demo-indicator', {
    view: view,
    viewModel: viewModel,
    metadata: JSON.parse(metadata)
  });
});
