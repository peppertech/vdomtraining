import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { FilePicker as PreactFilePicker } from '@oracle/oraclejet-preact/UNSAFE_FilePicker';
import { ComponentMessageItem } from '@oracle/oraclejet-preact/UNSAFE_ComponentMessage';
import { ComponentProps } from 'preact';
import { Action, CancelableAction, ObservedGlobalProps, Slot } from 'ojs/ojvcomponent';
import 'css!oj-c/file-picker/file-picker-styles.css';
type PreactFilePickerProps = ComponentProps<typeof PreactFilePicker>;
type Props = ObservedGlobalProps<'aria-label'> & {
    accept?: string[];
    capture?: PreactFilePickerProps['capture'];
    disabled?: boolean;
    primaryText?: string | (() => string);
    secondaryText?: string | ((fileOptions: {
        selectionMode: 'multiple' | 'single';
    }) => string);
    selectionMode?: PreactFilePickerProps['selectionMode'];
    trigger?: Slot;
    onOjBeforeSelect?: CancelableAction<BeforeDetail>;
    onOjInvalidSelect?: Action<InvalidDetail>;
    onOjSelect?: Action<SelectDetail>;
};
type BeforeDetail = {
    files: FileList;
};
type InvalidDetail = {
    messages: ComponentMessageItem[];
    until: Promise<void> | null;
};
type SelectDetail = {
    files: FileList;
};
export declare const FilePicker: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<Props>>;
export {};
export interface CFilePickerElement extends JetElement<CFilePickerElementSettableProperties>, CFilePickerElementSettableProperties {
    addEventListener<T extends keyof CFilePickerElementEventMap>(type: T, listener: (this: HTMLElement, ev: CFilePickerElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CFilePickerElementSettableProperties>(property: T): CFilePickerElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CFilePickerElementSettableProperties>(property: T, value: CFilePickerElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CFilePickerElementSettableProperties>): void;
    setProperties(properties: CFilePickerElementSettablePropertiesLenient): void;
    _doSelectHelper: (fileList: FileList) => void;
    blur: () => void;
    focus: () => void;
}
export namespace CFilePickerElement {
    interface ojBeforeSelect extends CustomEvent<BeforeDetail & {
        accept: (param: Promise<void>) => void;
    }> {
    }
    interface ojInvalidSelect extends CustomEvent<InvalidDetail & {}> {
    }
    interface ojSelect extends CustomEvent<SelectDetail & {}> {
    }
    type acceptChanged = JetElementCustomEventStrict<CFilePickerElement['accept']>;
    type captureChanged = JetElementCustomEventStrict<CFilePickerElement['capture']>;
    type disabledChanged = JetElementCustomEventStrict<CFilePickerElement['disabled']>;
    type primaryTextChanged = JetElementCustomEventStrict<CFilePickerElement['primaryText']>;
    type secondaryTextChanged = JetElementCustomEventStrict<CFilePickerElement['secondaryText']>;
    type selectionModeChanged = JetElementCustomEventStrict<CFilePickerElement['selectionMode']>;
}
export interface CFilePickerElementEventMap extends HTMLElementEventMap {
    'ojBeforeSelect': CFilePickerElement.ojBeforeSelect;
    'ojInvalidSelect': CFilePickerElement.ojInvalidSelect;
    'ojSelect': CFilePickerElement.ojSelect;
    'acceptChanged': JetElementCustomEventStrict<CFilePickerElement['accept']>;
    'captureChanged': JetElementCustomEventStrict<CFilePickerElement['capture']>;
    'disabledChanged': JetElementCustomEventStrict<CFilePickerElement['disabled']>;
    'primaryTextChanged': JetElementCustomEventStrict<CFilePickerElement['primaryText']>;
    'secondaryTextChanged': JetElementCustomEventStrict<CFilePickerElement['secondaryText']>;
    'selectionModeChanged': JetElementCustomEventStrict<CFilePickerElement['selectionMode']>;
}
export interface CFilePickerElementSettableProperties extends JetSettableProperties {
    accept?: ComponentProps<typeof FilePicker>['accept'];
    capture?: ComponentProps<typeof FilePicker>['capture'];
    disabled?: ComponentProps<typeof FilePicker>['disabled'];
    primaryText?: ComponentProps<typeof FilePicker>['primaryText'];
    secondaryText?: ComponentProps<typeof FilePicker>['secondaryText'];
    selectionMode?: ComponentProps<typeof FilePicker>['selectionMode'];
}
export interface CFilePickerElementSettablePropertiesLenient extends Partial<CFilePickerElementSettableProperties> {
    [key: string]: any;
}
export interface FilePickerIntrinsicProps extends Partial<Readonly<CFilePickerElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojBeforeSelect?: (value: CFilePickerElementEventMap['ojBeforeSelect']) => void;
    onojInvalidSelect?: (value: CFilePickerElementEventMap['ojInvalidSelect']) => void;
    onojSelect?: (value: CFilePickerElementEventMap['ojSelect']) => void;
    onacceptChanged?: (value: CFilePickerElementEventMap['acceptChanged']) => void;
    oncaptureChanged?: (value: CFilePickerElementEventMap['captureChanged']) => void;
    ondisabledChanged?: (value: CFilePickerElementEventMap['disabledChanged']) => void;
    onprimaryTextChanged?: (value: CFilePickerElementEventMap['primaryTextChanged']) => void;
    onsecondaryTextChanged?: (value: CFilePickerElementEventMap['secondaryTextChanged']) => void;
    onselectionModeChanged?: (value: CFilePickerElementEventMap['selectionModeChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-file-picker': FilePickerIntrinsicProps;
        }
    }
}
