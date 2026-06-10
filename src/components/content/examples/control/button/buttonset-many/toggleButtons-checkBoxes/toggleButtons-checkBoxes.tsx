import { h, type ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import 'ojs/ojbutton';

type FormatValue = 'bold' | 'italic' | 'underline';
type ButtonsetManyValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-buttonset-many'>['onvalueChanged']>
>[0];

export const ToggleButtonsCheckBoxes = () => {
  const [formats, setFormats] = useState<FormatValue[]>(['bold', 'underline']);
  const classes = useMemo(() => formats.join(' '), [formats]);
  const bold = formats.includes('bold');
  const formattedText = bold ? 'This text is bold' : 'This text is NOT bold';

  const handleFormatsChanged = (event: ButtonsetManyValueChangedEvent) => {
    if (event.detail.updatedFrom === 'internal') {
      setFormats(event.detail.value ?? []);
    }
  };

  const toggleAll = () => {
    setFormats((current: FormatValue[]) => (current.length === 3 ? [] : ['bold', 'italic', 'underline']));
  };

  const toggleBold = () => {
    setFormats((current: FormatValue[]) =>
      current.includes('bold') ? current.filter((value: FormatValue) => value !== 'bold') : [...current, 'bold']
    );
  };

  return (
    <div id="buttons-container">
      <div class="oj-sm-margin-4x-bottom">
        <oj-buttonset-many
          id="formatset"
          value={formats}
          onvalueChanged={handleFormatsChanged}
          aria-label="Choose one or more format options."
        >
          <oj-option value="bold">Bold</oj-option>
          <oj-option value="italic">Italic</oj-option>
          <oj-option value="underline">Underline</oj-option>
        </oj-buttonset-many>
      </div>

      <p>
        <a id="formattedText" href="#" class={classes}>
          {formattedText}
        </a>
      </p>

      <p>
        <oj-button onojAction={toggleBold}>Toggle bold</oj-button>
      </p>
      <oj-button onojAction={toggleAll}>Toggle all 3 (same value for all)</oj-button>
    </div>
  );
};

export default ToggleButtonsCheckBoxes;
