import { ReferenceLine as PreactReferenceLine, Threshold as PreactThreshold } from '@oracle/oraclejet-preact/utils/UNSAFE_meterUtils';
export type ReferenceLine = {
    color?: PreactReferenceLine['color'];
    position?: PreactReferenceLine['position'];
    value: PreactReferenceLine['value'];
    label?: PreactReferenceLine['label'];
    style?: PreactReferenceLine['labelStyle'];
};
export type Threshold = {
    accessibleLabel?: PreactThreshold['accessibleLabel'];
    color?: PreactThreshold['color'];
    max: PreactThreshold['max'];
};
