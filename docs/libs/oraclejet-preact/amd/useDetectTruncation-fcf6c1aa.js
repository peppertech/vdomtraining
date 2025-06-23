define(['exports', './useResizeObserver-c63865cc', 'preact/hooks'], (function(e,t,r){"use strict";e.useDetectTruncation=()=>{const e=r.useRef(null),[s,c]=r.useState(!1),u=r.useCallback((()=>{e.current&&c(e.current.scrollWidth>e.current.offsetWidth)}),[]);t.useResizeObserver(e,u);return{detectTruncationProps:{ref:e},isTextTruncated:s}}}));
//# sourceMappingURL=useDetectTruncation-fcf6c1aa.js.map
