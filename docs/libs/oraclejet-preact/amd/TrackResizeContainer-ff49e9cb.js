define(['exports', 'preact/jsx-runtime', 'preact/hooks', './useSize-041f7764'], (function(e,i,t,h){"use strict";const r=({children:e,width:r,height:s})=>{const n=t.useRef(null),d=t.useRef({box:"border-box"}),c=h.useSize(n,d.current);return i.jsx("div",{ref:n,style:{width:r,height:s},children:c&&e(c.width,c.height)})},s=e=>e.endsWith("px")||"0"===e,n=e=>"0"===e?0:Number(e.substring(0,e.length-2));e.TrackResizeContainer=({children:e,width:t,height:h})=>s(t)&&s(h)?i.jsx("div",{style:{width:t,height:h},children:e(n(t),n(h))}):i.jsx(r,{width:t,height:h,children:e})}));
//# sourceMappingURL=TrackResizeContainer-ff49e9cb.js.map