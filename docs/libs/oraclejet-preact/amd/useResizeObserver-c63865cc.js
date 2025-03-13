define(['exports', 'preact/hooks'], (function(e,r){"use strict";e.useResizeObserver=(e,s,t)=>{const{box:o,isDisabled:n=!1}=t||{};r.useLayoutEffect((()=>{if(!e?.current||n)return;const r=e.current,t=new ResizeObserver((e=>{for(const r of e)s(r)}));return t.observe(r,{box:o}),()=>t.disconnect()}),[e,s,o,n])}}));
//# sourceMappingURL=useResizeObserver-c63865cc.js.map
