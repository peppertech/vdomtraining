import 'preact';

export default function SelectSingleLegacyAddToListExample() {
  return (
    <div class="oj-panel oj-panel-alt2 oj-sm-padding-4x">
      <h5 class="oj-typography-heading-sm oj-sm-margin-0">
        Add to List Is Not Supported
      </h5>
      <p class="oj-sm-margin-2x-top oj-sm-margin-0-bottom">
        The legacy <code>oj-select-single</code> component does not expose the
        Core Pack <code>addToList</code> capability or an{" "}
        <code>ojAddToListAction</code> event.
      </p>
    </div>
  );
}
