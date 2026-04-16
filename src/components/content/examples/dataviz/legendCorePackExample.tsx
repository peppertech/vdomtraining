/**
 * @license
 * Copyright (c) 2014, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h, ComponentProps } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';

import 'oj-c/legend';
import 'oj-c/legend-item';
import 'ojs/ojswitch';
import 'ojs/ojselectsingle';
import 'ojs/ojtoolbar';

import ArrayDataProvider = require('ojs/ojarraydataprovider');
import type { ojSwitch } from 'ojs/ojswitch';
import type { ojSelectSingle } from 'ojs/ojselectsingle';

type LegendProps = ComponentProps<'oj-c-legend'>;
type SelectSingleProps = ComponentProps<'oj-select-single'>;

type LegendItemData = {
  id: string;
  text: string;
  markerColor: string;
  markerShape?: ComponentProps<'oj-c-legend-item'>['markerShape'];
  shortDesc?: string;
  categories: string[];
};

type HighlightOption = {
  value: string;
  label: string;
};

const energyMixLegend: LegendItemData[] = [
  {
    id: 'solar',
    text: 'Solar',
    markerColor: '#F9A825',
    markerShape: 'circle',
    shortDesc: 'Solar generation share',
    categories: ['solar']
  },
  {
    id: 'wind',
    text: 'Wind',
    markerColor: '#1976D2',
    markerShape: 'circle',
    shortDesc: 'Wind generation share',
    categories: ['wind']
  },
  {
    id: 'hydro',
    text: 'Hydro',
    markerColor: '#26A69A',
    markerShape: 'circle',
    shortDesc: 'Hydroelectric generation share',
    categories: ['hydro']
  },
  {
    id: 'battery',
    text: 'Battery Storage',
    markerColor: '#8E24AA',
    markerShape: 'square',
    shortDesc: 'Grid-scale storage discharge',
    categories: ['battery']
  },
  {
    id: 'gas',
    text: 'Natural Gas',
    markerColor: '#EF6C00',
    markerShape: 'diamond',
    shortDesc: 'Gas peaker generation share',
    categories: ['gas']
  }
];

const highlightOptions: HighlightOption[] = energyMixLegend.map((item) => ({
  value: item.id,
  label: item.text
}));

export const LegendCorePackExample = () => {
  const [isHorizontal, setIsHorizontal] = useState<boolean>(false);
  const [isHideAndShowOn, setIsHideAndShowOn] = useState<boolean>(true);
  const [halign, setHalign] = useState<'start' | 'center' | 'end'>('start');
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);
  const [highlightedCategories, setHighlightedCategories] = useState<string[]>(['solar']);
  const [lastDrilledId, setLastDrilledId] = useState<string | null>(null);

  const legendDataProvider = useMemo(
    () => new ArrayDataProvider<string, LegendItemData>(energyMixLegend, { keyAttributes: 'id' }),
    []
  );

  const halignOptionsProvider = useMemo(
    () =>
      new ArrayDataProvider<string, { value: string; label: string }>(
        [
          { value: 'start', label: 'Start' },
          { value: 'center', label: 'Center' },
          { value: 'end', label: 'End' }
        ],
        { keyAttributes: 'value' }
      ),
    []
  );

  const highlightOptionsProvider = useMemo(
    () => new ArrayDataProvider<string, HighlightOption>(highlightOptions, { keyAttributes: 'value' }),
    []
  );

  const handleOrientationToggle = useCallback((event: ojSwitch.valueChanged) => {
    setIsHorizontal(event.detail.value as boolean);
  }, []);

  const handleHideAndShowToggle = useCallback(
    (event: ojSwitch.valueChanged) => {
      const nextValue = event.detail.value as boolean;
      setIsHideAndShowOn(nextValue);

      if (!nextValue) {
        setHiddenCategories([]);
      }
    },
    []
  );

  const handleHalignChanged = useCallback(
    (event: Parameters<NonNullable<SelectSingleProps['onvalueChanged']>>[0]) => {
      const value = event.detail.value as 'start' | 'center' | 'end' | null;
      if (value) {
        setHalign(value);
      }
    },
    []
  );

  const handleHighlightChanged = useCallback(
    (event: Parameters<NonNullable<SelectSingleProps['onvalueChanged']>>[0]) => {
      const value = event.detail.value as string | null;
      setHighlightedCategories(value ? [value] : []);
    },
    []
  );

  const handleHiddenCategoriesChanged = useCallback(
    (event: Parameters<NonNullable<LegendProps['onhiddenCategoriesChanged']>>[0]) => {
      setHiddenCategories(event.detail.value as string[]);
    },
    []
  );

  const handleHighlightedCategoriesChanged = useCallback(
    (event: Parameters<NonNullable<LegendProps['onhighlightedCategoriesChanged']>>[0]) => {
      setHighlightedCategories(event.detail.value as string[]);
    },
    []
  );

  const handleLegendDrill = useCallback(
    (event: Parameters<NonNullable<LegendProps['onojDrill']>>[0]) => {
      const id = event.detail.id;
      setLastDrilledId(typeof id === 'number' ? id.toString() : (id ?? null));
    },
    []
  );

  const hiddenSummary = hiddenCategories.length ? hiddenCategories.join(', ') : 'None';
  const highlightedSummary = highlightedCategories.length ? highlightedCategories.join(', ') : 'None';

  return (
    <section class="oj-panel oj-panel-alt1 oj-sm-margin-4x-vertical oj-sm-padding-4x">
      <header class="oj-sm-margin-0">
        <h2 class="oj-typography-heading-sm oj-sm-margin-0">Legend (Core Pack)</h2>
        <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-0 oj-sm-margin-1x-top">
          Demonstrates oj-c-legend with shaped data, hide and show interaction, and drill tracking inside a VDOM
          component.
        </p>
      </header>

      <oj-toolbar
        aria-label="Legend configuration controls"
        aria-controls="energyLegend"
        class="oj-sm-margin-3x-top"
      >
        <oj-switch
          id="legendOrientation"
          value={isHorizontal}
          labelHint="Horizontal layout"
          onvalueChanged={handleOrientationToggle}
          aria-label="Toggle legend orientation between vertical and horizontal"
        />
        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
        <oj-switch
          id="legendHideAndShow"
          value={isHideAndShowOn}
          labelHint="Hide and show"
          onvalueChanged={handleHideAndShowToggle}
          aria-label="Toggle hide and show behavior for legend categories"
        />
        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
        <oj-select-single
          id="legendHalign"
          labelHint="Horizontal align"
          value={halign}
          data={halignOptionsProvider}
          onvalueChanged={handleHalignChanged}
        />
        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
        <oj-select-single
          id="legendHighlight"
          labelHint="Highlight category"
          value={highlightedCategories[0] ?? null}
          data={highlightOptionsProvider}
          onvalueChanged={handleHighlightChanged}
        />
      </oj-toolbar>

      <oj-c-legend
        id="energyLegend"
        class="oj-sm-margin-3x-top"
        aria-label="Legend describing clean energy resource categories"
        data={legendDataProvider}
        orientation={isHorizontal ? 'horizontal' : 'vertical'}
        halign={halign}
        drilling="on"
        hoverBehavior="dim"
        hideAndShowBehavior={isHideAndShowOn ? 'on' : 'off'}
        hiddenCategories={hiddenCategories}
        highlightedCategories={highlightedCategories}
        onhiddenCategoriesChanged={handleHiddenCategoriesChanged}
        onhighlightedCategoriesChanged={handleHighlightedCategoriesChanged}
        onojDrill={handleLegendDrill}
      />

      <div class="oj-sm-margin-3x-top oj-typography-body-sm">
        <p class="oj-sm-margin-0">
          <strong>Hidden categories:</strong> {hiddenSummary}
        </p>
        <p class="oj-sm-margin-0">
          <strong>Highlighted categories:</strong> {highlightedSummary}
        </p>
        <p class="oj-sm-margin-0">
          <strong>Last drilled item:</strong> {lastDrilledId ?? 'Nothing drilled yet'}
        </p>
      </div>
    </section>
  );
};

