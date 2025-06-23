define(['exports', './useToggle-a29f97af'], (function(e,s){"use strict";e.useHover=function(e={isDisabled:!1}){const{bool:o,setTrue:u,setFalse:n}=s.useToggle(!1),{bool:t,setTrue:i,setFalse:r}=s.useToggle(!1),l=e.isDisabled?{}:{onTouchEnd:i,onMouseEnter:()=>{t?r():u()},onMouseLeave:n};return{isHover:!e.isDisabled&&o,hoverProps:l}}}));
//# sourceMappingURL=useHover-7964884c.js.map
