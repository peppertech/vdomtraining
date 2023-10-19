define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojconverter-number", "ojs/ojconverterutils-i18n", "ojs/ojmutablearraydataprovider", "text!./data/peopleData.json", "ojs/ojbutton", "ojs/ojcheckboxset", "ojs/ojformlayout", "ojs/ojinputtext", "ojs/ojdatetimepicker", "ojs/ojselectsingle", "ojs/ojdialog"], function (require, exports, jsx_runtime_1, hooks_1, NumberConverter, ConverterUtilsI18n, MutableArrayDataProvider, peopleData) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const buyers = [];
    JSON.parse(peopleData).map((item) => {
        buyers.push({ id: item.id, value: item.name, label: item.name });
    });
    const buyerData = new MutableArrayDataProvider(buyers, {
        keyAttributes: "value",
    });
    const hintDefinition = {
        definition: "cost of a single item",
    };
    const placeholder = "Enter item cost";
    const lblHint = "Item Cost";
    const eurNumberConverter = new NumberConverter.IntlNumberConverter({
        style: "currency",
        currency: "EUR",
        currencyDisplay: "symbol",
    });
    let value = "598.42";
    let name = "Kopi Luwak beans (2 lbs)";
    let valDateTime = ConverterUtilsI18n.IntlConverterUtils.dateToLocalIso(new Date());
    const FormElements = () => {
        const [formData, setFormData] = (0, hooks_1.useState)({
            itemName: name,
            itemBuyer: "",
            itemCost: value,
            salesDate: valDateTime,
        });
        const [isDisabled, setIsDisabled] = (0, hooks_1.useState)(true);
        const [density, setDensity] = (0, hooks_1.useState)("efficient");
        const dialogRef = (0, hooks_1.useRef)(null);
        const onChange = (event) => {
            setFormData(Object.assign(Object.assign({}, formData), { [event.currentTarget.id]: event.detail.value }));
        };
        const onSubmit = (event) => {
            event.preventDefault();
            dialogRef.current.open();
            console.log("formData: " + JSON.stringify(formData));
        };
        const close = () => {
            dialogRef.current.close();
        };
        const handleAgreement = (event) => {
            event.detail.value.length < 1 ? setIsDisabled(true) : setIsDisabled(false);
        };
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("oj-form-layout", Object.assign({ userAssistanceDensity: density, labelEdge: "inside", columns: 1, class: "oj-md-margin-4x-horizontal" }, { children: [(0, jsx_runtime_1.jsx)("oj-input-text", Object.assign({ id: "itemName", value: formData.itemName, labelHint: "Name", onvalueChanged: onChange }, { children: (0, jsx_runtime_1.jsx)("span", { slot: "end", class: "oj-text-field-start-end-icon oj-ux-ico-coffee oj-sm-margin-4x-end", role: "presentation" }) })), (0, jsx_runtime_1.jsx)("oj-input-text", { id: "itemCost", value: formData.itemCost, placeholder: placeholder, labelHint: lblHint, helpHints: hintDefinition, onvalueChanged: onChange, converter: eurNumberConverter }), (0, jsx_runtime_1.jsx)("oj-input-date-time", { id: "salesDate", value: formData.salesDate, labelHint: "Purchase date", onvalueChanged: onChange }), (0, jsx_runtime_1.jsx)("oj-select-single", { id: "itemBuyer", labelHint: "Buyer", data: buyerData, value: formData.itemBuyer, onvalueChanged: onChange }), (0, jsx_runtime_1.jsx)("oj-checkboxset", Object.assign({ id: "checkboxSetAgreeId", labelHint: "Everything is correct?", labelEdge: "inside", onvalueChanged: handleAgreement }, { children: (0, jsx_runtime_1.jsx)("oj-option", Object.assign({ value: "agree" }, { children: "I Agree" })) })), (0, jsx_runtime_1.jsx)("oj-button", Object.assign({ onojAction: onSubmit, disabled: isDisabled }, { children: "Send this stuff" }))] })), (0, jsx_runtime_1.jsxs)("oj-dialog", Object.assign({ ref: dialogRef, dialogTitle: "Form Data Submitted" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ slot: "body" }, { children: (0, jsx_runtime_1.jsxs)("oj-form-layout", Object.assign({ id: "desc" }, { children: [(0, jsx_runtime_1.jsx)("oj-input-text", { id: "finalName", readonly: true, value: formData.itemName, labelHint: "Name" }), (0, jsx_runtime_1.jsx)("oj-input-text", { id: "finalPrice", readonly: true, value: formData.itemCost, labelHint: "Price", converter: eurNumberConverter }), (0, jsx_runtime_1.jsx)("oj-input-date-time", { id: "salesDate", value: formData.salesDate, labelHint: "Purchase date", readonly: true })] })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ slot: "footer" }, { children: (0, jsx_runtime_1.jsx)("oj-button", Object.assign({ id: "okButton", onojAction: close }, { children: "OK" })) }))] }))] }));
    };
    exports.default = FormElements;
});
