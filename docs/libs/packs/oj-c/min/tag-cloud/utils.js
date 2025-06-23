define(["require", "exports", "../tag-cloud-item/tag-cloud-item"], function (require, exports, tag_cloud_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformItem = transformItem;
    exports.executeLink = executeLink;
    function transformItem(dataItem) {
        const item = { ...tag_cloud_item_1.TagCloudItemDefaults, ...dataItem };
        return {
            color: item.color,
            accessibleLabel: item.shortDesc,
            value: item.value,
            label: item.label,
            id: item.key != null ? item?.key : item.id,
            role: (item.url ? 'link' : undefined)
        };
    }
    function executeLink(dest) {
        const newWindow = window.open(dest, '_blank');
        if (newWindow)
            newWindow.focus();
    }
});
