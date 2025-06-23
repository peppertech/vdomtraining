define(["require", "exports", "preact/hooks", "../utils/utils"], function (require, exports, hooks_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCache = useCache;
    function useCache() {
        const cache = (0, hooks_1.useRef)(new Map());
        return (0, hooks_1.useCallback)((key, value, deps) => {
            if (isChanged(cache.current, key, deps)) {
                cache.current.set(key, { value, deps });
                return value;
            }
            return cache.current.get(key).value;
        }, []);
    }
    const isChanged = (cache, key, deps) => {
        if (!cache.has(key))
            return true;
        const oldDeps = cache.get(key).deps;
        return (oldDeps.length !== deps.length || oldDeps.some((value, index) => !isEquals(value, deps[index])));
    };
    const isEquals = (value1, value2) => {
        if (value1 === value2)
            return true;
        if (value1 instanceof Set && value2 instanceof Set) {
            return (0, utils_1.isSetEqual)(value1, value2);
        }
        return value1 === value2;
    };
});
