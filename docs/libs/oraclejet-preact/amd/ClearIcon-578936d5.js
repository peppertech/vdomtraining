define(['exports', 'preact/jsx-runtime', 'preact/hooks', './usePress-80afb622', './useTranslationBundle-d999fb18', 'css!./ClearIconStyles.styles.css', './classNames-2e65b3b3', './useComponentTheme-f77b756d', './UNSAFE_ButtonLayout/themes/redwood/ButtonLayoutTheme'], (function(e,s,t,o,n,r,l,a,c){"use strict";const u=()=>{};e.ClearIcon=function({onClick:e}){const r=t.useCallback((e=>{e.preventDefault()}),[]),{pressProps:d}=o.usePress(e??u),i=n.useTranslationBundle("@oracle/oraclejet-preact").formControl_clear(),{baseTheme:m}=a.useComponentTheme(c.ButtonLayoutRedwoodTheme),h=l.classNames([m,"ClearIconStyles_clearIconStyles__8wwy0m0"]);return s.jsx("span",{"aria-hidden":"true",class:h,tabIndex:-1,onMouseDown:r,title:i,...d,children:s.jsx("svg",{height:"1em",viewBox:"0 0 24 24",width:"1em",xmlns:"http://www.w3.org/2000/svg",children:s.jsx("path",{d:"m12 1c6.065 0 11 4.935 11 11s-4.935 11-11 11-11-4.935-11-11 4.935-11 11-11zm3.4979817 6-3.4979817 3.498-3.49798173-3.498-1.50201827 1.50201827 3.498 3.49798173-3.498 3.4979817 1.50201827 1.5020183 3.49798173-3.498 3.4979817 3.498 1.5020183-1.5020183-3.498-3.4979817 3.498-3.49798173z",fill:"currentcolor","fill-rule":"evenodd"})})})}}));
//# sourceMappingURL=ClearIcon-578936d5.js.map