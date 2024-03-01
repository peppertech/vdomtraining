import { ReferenceLine as PreactReferenceLine, Threshold as PreactThreshold } from '@oracle/oraclejet-preact/utils/UNSAFE_meterUtils';
export type ReferenceLine = {
    color?: PreactReferenceLine['color'];
    position?: PreactReferenceLine['position'];
    value: PreactReferenceLine['value'];
};
export type Threshold = {
    accessibleLabel?: PreactThreshold['accessibleLabel'];
    color?: PreactThreshold['color'];
    max: PreactThreshold['max'];
};
