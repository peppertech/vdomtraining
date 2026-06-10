// @ts-nocheck
import { h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import 'ojs/ojbutton';
import 'ojs/ojradioset';
import 'ojs/ojcheckboxset';
import 'css!./demo.css';

const joinClasses = (...classes: Array<string | false>) => classes.filter(Boolean).join(' ');

type ButtonsetWidthClass = 'default' | 'auto' | 'equal';
type ButtonsetItem = {
  id: string;
};
type ValueChangedEvent<T> = CustomEvent<{
  value?: T;
  updatedFrom?: string;
}>;

const items: ButtonsetItem[] = [{ id: 'Home' }, { id: 'Guide' }, { id: 'Library' }];

export const ToggleButtonsButtonsetWidth = () => {
  const [buttonsetWidthClass, setButtonsetWidthClass] = useState<ButtonsetWidthClass>('default');
  const [buttonWidth, setButtonWidth] = useState<string[]>([]);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const smQuery =
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY) || '(max-width: 599px)';

    const updateSmallState = () => {
      setIsSmall(window.matchMedia(smQuery).matches);
    };

    updateSmallState();
    window.addEventListener('resize', updateSmallState);

    return () => {
      window.removeEventListener('resize', updateSmallState);
    };
  }, []);

  const itemLabels = useMemo(
    () => (isSmall ? ['Home', 'Guide', 'Lib'] : ['Home', 'Reference Guide', 'Library']),
    [isSmall]
  );
  const itemIcons = useMemo(
    () =>
      isSmall
        ? [{}, {}, {}]
        : [
            { start: 'oj-ux-ico-home' },
            { start: 'oj-ux-ico-education' },
            { start: 'oj-ux-ico-library' }
          ],
    [isSmall]
  );
  const buttonsetClass = joinClasses(
    buttonsetWidthClass === 'auto' && 'oj-buttonset-width-auto',
    buttonsetWidthClass === 'equal' && 'oj-buttonset-width-equal',
    buttonWidth.includes('true') && 'demo-max-width-400'
  );

  const handleWidthClassChanged = (event: ValueChangedEvent<ButtonsetWidthClass>) => {
    if (event.detail.updatedFrom === 'internal') {
      setButtonsetWidthClass(event.detail.value ?? 'default');
    }
  };

  const handleButtonWidthChanged = (event: ValueChangedEvent<string[]>) => {
    if (event.detail.updatedFrom === 'internal') {
      setButtonWidth(event.detail.value ?? []);
    }
  };

  return (
    <div id="buttonset-container">
      <div class="oj-sm-margin-4x-bottom">
        <oj-radioset
          value={buttonsetWidthClass}
          onvalueChanged={handleWidthClassChanged}
          labelHint="Classes to apply to the buttonset:"
          labelEdge="inside"
        >
          <oj-option id="default" value="default">
            None (Allow theme defaults to apply.)
          </oj-option>
          <oj-option id="autoWidth" value="auto">
            .oj-buttonset-width-auto (Optional. Override any theme defaults to make Buttonset Buttons&apos;
            widths fit their contents.)
          </oj-option>
          <oj-option id="equalWidth" value="equal">
            .oj-buttonset-width-equal (Optional. Override any theme defaults to make Buttonset Buttons&apos;
            widths equal.)
          </oj-option>
        </oj-radioset>
      </div>

      <div class="oj-sm-margin-2x-bottom">
        <div>
          <oj-checkboxset
            id="buttonwidth"
            value={buttonWidth}
            onvalueChanged={handleButtonWidthChanged}
            labelHint="Optional Buttonset Width Control"
            labelEdge="inside"
          >
            <oj-option value="true">Set max-width to 400px</oj-option>
          </oj-checkboxset>
        </div>
      </div>

      <div class="oj-sm-margin-4x-bottom">
        <p class="oj-typography-bold">Borderless Buttonset</p>
        <p class="borderlessSetDefault">Theme Default:</p>
        <oj-buttonset-many
          id="borderlessSet"
          chroming="borderless"
          display="all"
          value={['Home', 'Library']}
          class={buttonsetClass}
        >
          {items.map((item: ButtonsetItem, index: number) => (
            <oj-option key={item.id} value={item.id} id={`borderless${item.id}`}>
              {itemIcons[index].start ? <span slot="startIcon" class={itemIcons[index].start} /> : null}
              <span>{itemLabels[index]}</span>
            </oj-option>
          ))}
        </oj-buttonset-many>
      </div>

      <p class="oj-typography-bold">Outlined Buttonset</p>
      <p class="outlinedSetDefault">Theme Default:</p>
      <oj-buttonset-many
        id="outlinedSet"
        chroming="outlined"
        value={['Home', 'Library']}
        class={buttonsetClass}
      >
        {items.map((item: ButtonsetItem, index: number) => (
          <oj-option key={item.id} value={item.id} id={`outlined${item.id}`}>
            {itemIcons[index].start ? <span slot="startIcon" class={itemIcons[index].start} /> : null}
            <span>{itemLabels[index]}</span>
          </oj-option>
        ))}
      </oj-buttonset-many>
    </div>
  );
};

export default ToggleButtonsButtonsetWidth;
