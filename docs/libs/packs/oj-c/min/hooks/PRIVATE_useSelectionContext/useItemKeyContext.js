define(["require", "exports", "preact/hooks", "./ItemKeyContext"], function (require, exports, hooks_1, ItemKeyContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useItemKeyContext = useItemKeyContext;
    function useItemKeyContext() {
        return (0, hooks_1.useContext)(ItemKeyContext_1.ItemKeyContext);
    }
});
