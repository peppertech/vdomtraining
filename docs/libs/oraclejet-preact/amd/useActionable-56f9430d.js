define(['exports', './mergeProps-7d608009', './useHover-c613069f', './useActive-dfb7e815', './useFocus-9d062824', './usePress-80afb622'], (function(s,e,i,o,r,c){"use strict";const u={isDisabled:!1,isRepeat:!1};s.useActionable=function(s,t=u){const a={...u,...t},{pressProps:b}=c.usePress(s,a),{hoverProps:d,isHover:n}=i.useHover({isDisabled:a.isDisabled}),{focusProps:p,isFocus:v}=r.useFocus({isDisabled:a.isDisabled}),{activeProps:l,isActive:P}=o.useActive({isDisabled:a.isDisabled});return{actionableProps:e.mergeProps(b,d,l,p),isActive:P,isHover:n,isFocus:v}}}));
//# sourceMappingURL=useActionable-56f9430d.js.map