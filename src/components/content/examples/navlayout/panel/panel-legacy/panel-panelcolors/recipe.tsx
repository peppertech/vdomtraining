// @ts-nocheck
import { h } from 'preact';

const lightBackgroundClasses = [
  'oj-bg-body',
  'oj-bg-neutral-30',
  'oj-bg-neutral-20',
  'oj-bg-neutral-10',
  'oj-bg-neutral-0',
  'oj-bg-brand-30',
  'oj-bg-brand-20',
  'oj-bg-brand-10',
  'oj-bg-danger-30',
  'oj-bg-danger-20',
  'oj-bg-danger-10',
  'oj-bg-warning-30',
  'oj-bg-warning-20',
  'oj-bg-warning-10',
  'oj-bg-success-30',
  'oj-bg-success-20',
  'oj-bg-success-10',
  'oj-bg-info-30',
  'oj-bg-info-20',
  'oj-bg-info-10'
];

const darkBackgroundClasses = [
  'oj-bg-neutral-200',
  'oj-bg-neutral-190',
  'oj-bg-neutral-180',
  'oj-bg-neutral-170'
];

const renderCodeList = (classNames: string[]) =>
  classNames.map((className, index) => (
    <>
      <code>{className}</code>
      {index < classNames.length - 1 ? ', ' : ''}
    </>
  ));

export const panelPanelcolorsRecipe = (
  <>
    <ul>
      <li>
        <code>oj-panel</code>
        : add this class to create the panel container.
      </li>
      <li>
        Light background colors: apply classes such as {renderCodeList(lightBackgroundClasses)} to change the panel background.
      </li>
      <li>
        Dark background colors: apply classes such as {renderCodeList(darkBackgroundClasses)} and add <code>oj-color-invert</code> for readable text.
      </li>
    </ul>
  </>
);
