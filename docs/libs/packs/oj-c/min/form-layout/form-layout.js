var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact", "@oracle/oraclejet-preact/UNSAFE_FormLayout", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "ojs/ojvcomponent-binding", "ojs/ojvcomponent", "ojs/ojcontext"], function (require, exports, jsx_runtime_1, translationBundle_1, preact_1, UNSAFE_FormLayout_1, Layout_1, ojvcomponent_binding_1, ojvcomponent_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FormLayout = void 0;
    let FormLayout = class FormLayout extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render({ columnSpan, ...props }) {
            let preactColumns = props.maxColumns;
            let preactColumnBehavior = 'responsive';
            if (props.columns && props.columns > 0) {
                preactColumns = props.columns;
                preactColumnBehavior = 'fixed';
            }
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_FormLayout_1.FormLayout, { columns: preactColumns, columnBehavior: preactColumnBehavior, direction: props.direction, isFullWidth: props.fullWidth, labelEdge: props.labelEdge, labelStartWidth: props.labelStartWidth, labelWrapping: props.labelWrapping, isReadonly: props.readonly, userAssistanceDensity: props.userAssistanceDensity, children: props.children }) }));
        }
    };
    exports.FormLayout = FormLayout;
    FormLayout.defaultProps = {
        columns: 0,
        columnSpan: 1,
        direction: 'row',
        fullWidth: false,
        labelEdge: 'inside',
        labelStartWidth: '33%',
        labelWrapping: 'wrap',
        maxColumns: 1,
        userAssistanceDensity: 'efficient'
    };
    FormLayout._metadata = { "slots": { "": {} }, "properties": { "columns": { "type": "number" }, "columnSpan": { "type": "number" }, "direction": { "type": "string", "enumValues": ["row", "column"] }, "fullWidth": { "type": "boolean" }, "labelEdge": { "type": "string", "enumValues": ["start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" }, "provide": [{ "name": "containerLabelEdge" }, { "name": "labelEdge" }] } }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" }, "provide": [{ "name": "labelStartWidth" }, { "name": "labelWidth" }] } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" }, "provide": [{ "name": "labelWrapping" }] } }, "maxColumns": { "type": "number" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" }, "provide": [{ "name": "containerReadonly", "default": false }, { "name": "readonly" }] } }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" }, "provide": [{ "name": "containerUserAssistanceDensity", "default": "efficient" }, { "name": "userAssistanceDensity", "default": "efficient" }] } } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["id"] } };
    FormLayout._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    exports.FormLayout = FormLayout = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-form-layout')
    ], FormLayout);
});
