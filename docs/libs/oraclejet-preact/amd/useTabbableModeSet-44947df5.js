define(['exports', 'preact/hooks', './keys-123d62b0', './collectionUtils-e7261bcb'], (function(e,t,a,l){"use strict";e.useTabbableModeSet=function(e,n,c,r,s,u){const[o,i]=t.useState(),b=t.useCallback(((e,t)=>u?u(e,t):e===t),[u]),k=t.useCallback(((t,a=!1)=>{i(void 0),l.getElementContainsFunc(e.current,!0)(t)&&a&&e.current?.focus()}),[e,i]),g=t.useCallback((e=>{i(e),r&&!b(e,c)&&r({value:e})}),[c,b,r,i]),d=t.useCallback((e=>b(e,o)),[o,b]),C=t.useCallback((()=>o),[o]),f={onFocus:t=>{if(t.target===e.current)d(void 0)||k(t.target);else{const e=n(t.target);a.isKeyDefined(e)&&!d(e)&&g(e)}},onBlur:t=>{t.relatedTarget&&l.getElementContainsFunc(e.current,!0)(t.relatedTarget)||k(t.relatedTarget)},onKeyDown:t.useCallback((e=>{null==c||null!=s&&!s(c)||("F2"===e.key?d(c)?k(e.target,!0):g(c):"Esc"!==e.key&&"Escape"!==e.key||k(e.target,!0))}),[c,k,g,s,d])};return[d,f,C,i]}}));
//# sourceMappingURL=useTabbableModeSet-44947df5.js.map