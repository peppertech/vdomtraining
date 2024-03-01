import { ComponentMessageItem } from '@oracle/oraclejet-preact/UNSAFE_ComponentMessage';
import { ConverterError, ValidatorError } from 'ojs/ojvalidation-error';
export declare function createMessageFromError(error: Error | ValidatorError | ConverterError): ComponentMessageItem;
export declare function treatNull<T>(value?: T | null, defaultValue?: T): T | undefined;
export declare function normalizeValue<T>(value?: T): T | null | undefined;
export declare const isShallowEqual: <T>(a: T[], b: T[]) => boolean;
