define(['exports', 'preact/hooks', './useToggle-4d231fba'], (function(e,r,n){"use strict";e.useSpinning=({isStepDownDisabled:e,isStepUpDisabled:t,onSpin:o,onSpinComplete:u,onStep:c})=>{const{bool:a,setTrue:s,setFalse:l}=n.useToggle(!1),{bool:i,setTrue:p,setFalse:f}=n.useToggle(!1),P=r.useRef(null),d=r.useRef(null),w=r.useRef("increase"),k=r.useRef(!1),D=r.useCallback((r=>{"ArrowDown"!==r.key&&"ArrowUp"!==r.key||(r.preventDefault(),r.stopPropagation(),a||"ArrowDown"===r.key&&e||"ArrowUp"===r.key&&t||(w.current="ArrowDown"===r.key?"decrease":"increase",s(),c?.({direction:w.current})))}),[a,c,e,t,s]),g=r.useCallback((e=>{"ArrowDown"!==e.key&&"ArrowUp"!==e.key||(i&&(k.current=!0),l(),f(),e.stopPropagation())}),[i,l,f]),b=r.useCallback((e=>{e.stopPropagation(),e.preventDefault(),t||(w.current="increase",s(),c?.({direction:w.current}))}),[c,t,s]),y=r.useCallback((r=>{r.stopPropagation(),r.preventDefault(),e||(w.current="decrease",s(),c?.({direction:w.current}))}),[c,e,s]),C=r.useCallback((e=>{i&&(k.current=!0),l(),f(),e.stopPropagation()}),[i,l,f]);r.useEffect((()=>(a&&!P.current&&(P.current=setTimeout((()=>{p()}),500)),()=>{P.current&&(clearTimeout(P.current),P.current=null)})),[a,p]),r.useEffect((()=>(i?d.current||(d.current=setInterval((()=>{"increase"===w.current&&t||"decrease"===w.current&&e?(f(),k.current=!0):o?.({direction:w.current})}),40)):d.current&&(clearInterval(d.current),d.current=null),()=>{d.current&&(clearInterval(d.current),d.current=null)})),[i,e,t,o,f]),r.useEffect((()=>{!i&&k.current&&(k.current=!1,u?.())}),[i,u]);return{keyboardHandlerProps:{onKeyDown:D,onKeyUp:g},pointerIncreaseHandlerProps:{onPointerDown:b,onPointerUp:C,onPointerOut:C,onPointerCancel:C},pointerDecreaseHandlerProps:{onPointerDown:y,onPointerUp:C,onPointerOut:C,onPointerCancel:C}}}}));
//# sourceMappingURL=useSpinning-be35520e.js.map