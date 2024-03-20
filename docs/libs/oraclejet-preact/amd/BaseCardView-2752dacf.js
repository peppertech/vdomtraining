define(['exports', 'preact/jsx-runtime', 'preact', 'preact/compat', 'preact/hooks', './mergeProps-7d608009', './keys-123d62b0', './collectionUtils-e7261bcb', './useCurrentKey-7c221c70', './useCollectionFocusRing-d3bea583', './useTabbableModeSet-44947df5', './useSelection-b137b39f', './Selector-f5524178', './LoadMoreCollection-7b33bf5e', './PRIVATE_BaseCardView/themes/CardGridStyles.css', './classNames-2e65b3b3', './refUtils-9ddc9039', './logger-e130a3d8', './tabbableUtils-b4353985', './useId-bea76214', './useAnimation-71f423d8', './useResizeObserver-b70bb2bf', './TabbableModeContext-8858ed6b', './FocusTrap-bc72d6c0', './Grid-e814f511', './Flex-d0cc2f6e', './Skeleton-957111dc'], (function(e,t,o,n,a,r,i,s,l,c,d,u,y,h,b,f,m,g,x,p,C,v,S,w,k,A,R){"use strict";const j="[data-oj-key]";const F=e=>({animationStates:{slideUp:{from:{translateY:"50px"},to:{translateY:"0px"},options:{duration:300,delay:50*e,easing:[0,0,.2,1]}},slideDown:{from:{translateY:"-50px"},to:{translateY:"0"},options:{duration:300,delay:50*e,easing:[0,0,.2,1]}}},isAnimatedOnMount:!0}),K=e=>({animationStates:{opacity:{from:{opacity:0},to:{opacity:1},options:{duration:150,delay:50*e,easing:"linear"}}},isAnimatedOnMount:!0}),M=n.memo((function({children:e,context:o,isTabbable:n,isFocused:r,isFocusRingVisible:i,isSelected:s,selectionMode:l,focusBehavior:c,setIsFocusBehaviorValid:d,initialAnimation:u,isGridLayout:y,updateCardSize:h}){const k=a.useRef(null),A=o.metadata.key,R=o.index,j=r&&i,M=b.multiVariantStyles({itemFocused:"card"===c&&j?"isItemFocused":"isNotItemFocused",itemInitialOpacity:u?"isTransparent":"isNotTransparent",itemInGridLayout:y?"isInGridLayout":"isNotInGridLayout"}),T=f.classNames([b.styles.itemStyle,M]),L=a.useCallback((e=>{h?.(e.contentRect.width,e.contentRect.height)}),[h]),B=a.useRef(null);v.useResizeObserver({ref:h?k:B,callback:L}),a.useLayoutEffect((()=>{if("content"===c&&j){const e=k.current?.firstElementChild?.firstElementChild,t=x.allTabbableElements(e,!0,!0);0===t.length||t.length>1?(g.warn(`${t.length} focusable elements are detected in the card. 'content' focusBehavior is intended only for use when the card has single focusable element. Please specify one focusable element in the card or switch the focusBehavior to 'card'.`),d?.(!1)):t[0].focus()}}),[c,j,d]);const{nodeRef:E}=C.useAnimation(u||"none",F(R)),{nodeRef:I}=C.useAnimation(u?"opacity":"none",K(R)),P=a.useMemo((()=>void 0===u?m.mergeRefs(k):m.mergeRefs(k,E,I)),[k,E,I,u]);return t.jsx("div",{id:p.useId(),ref:P,class:T,role:"gridcell","data-oj-key":A,onKeyDown:e=>{"card"!==c||!n||"ArrowDown"!==e.key&&"ArrowUp"!==e.key&&"ArrowLeft"!==e.key&&"ArrowRight"!==e.key||e.stopPropagation()},"aria-selected":"none"===l?void 0:s,..."number"==typeof A&&{"data-oj-key-type":"number"},children:t.jsx(S.TabbableModeContext.Provider,{value:{isTabbable:n},children:t.jsx(w.FocusTrap,{isDisabled:!n,restoreFocusRef:!1,children:e(o)})})})}),((e,t)=>!(!e||!t)&&(e.children===t.children&&e.isTabbable===t.isTabbable&&e.isFocused===t.isFocused&&e.isFocusRingVisible===t.isFocusRingVisible&&e.isSelected===t.isSelected&&e.initialAnimation===t.initialAnimation&&e.focusBehavior===t.focusBehavior&&s.compareListItemContext(e.context,t.context))));function T({children:e,layout:o,gap:n,columns:a}){return"grid"===o?a<1?null:t.jsx(k.Grid,{gridTemplateColumns:`repeat(${a}, 1fr)`,gap:n,children:e}):t.jsx(A.Flex,{wrap:"wrap",gap:n,children:e})}const L=(e,o=25,n,a,r=!0)=>{const i=n||("flex"===e?"60x":"100%"),s=a||"70x";return[...Array(o)].map(((e,o)=>t.jsx(R.Skeleton,{width:i,height:s},r&&`${o}${(new Date).getTime()}`)))},B=e=>t.jsx(o.Fragment,{children:L(e.layout)}),E=e=>{const n=[t.jsx("div",{class:h.LOADMORE_STYLE_CLASS,children:L(e.layout,1)}),...L(e.layout,24)];return t.jsx(o.Fragment,{children:n})},I=()=>t.jsx("div",{class:h.LOADMORE_STYLE_CLASS}),P=e=>{if(e.colCount<1||null==e.cardWidth||null==e.cardHeight)return t.jsx(I,{});{const n=[],a=e.colCount-e.totalCount%e.colCount,r=a===e.colCount,i=`calc(${e.cardWidth}px)`,s=e.cardHeight?`calc(${e.cardHeight}px)`:"70x",l="flex"===e.layout?i:"100%",c="flex"===e.layout||r?s:"100%",d=t.jsx("div",{class:h.LOADMORE_STYLE_CLASS,children:L(e.layout,1,l,c)});return n.push(d),n.push(L(e.layout,a-1,l,c)),r||n.push(L(e.layout,e.colCount,l,s)),t.jsx(o.Fragment,{children:n})}},D={all:!1,keys:new Set},V={xs:12,sm:16,md:24,lg:48,xl:64},N=n.forwardRef((({children:e,data:n,onLoadMore:f=(()=>{}),hasMore:m=!1,getRowKey:g,currentKey:x,onCurrentKeyChange:p,selectionMode:C="none",selectedKeys:v=D,onSelectionChange:S,viewportConfig:w,focusBehavior:k="card","aria-label":A,"aria-labelledby":R,initialAnimation:F="slideUp",gutterSize:K="sm",columns:L,layout:I,cardSize:N,updateCardSize:O},z)=>{const G=a.useRef(null);a.useImperativeHandle(z,(()=>G.current),[G]);const U=a.useRef(),Y=a.useRef(),_=(e=>V[e||"sm"]/4+"x")(K),$=V[K],H={layout:I,columns:L,gap:_},W=a.useRef(!0);a.useEffect((()=>{null!=N.height&&null!=N.width&&(W.current=!1)}),[N]);const X="none"===C?void 0:"multiple"===C,q=m||!n||L<1?-1:Math.ceil(n?.length/L),J=L<1?-1:L,[Q,Z]=a.useState(!0),ee=Q?k:"card",[te,oe]=d.useTabbableModeSet(G,(e=>s.keyExtractor(e,j)),x,p),{currentKeyProps:ne}=l.useCurrentKey((e=>s.keyExtractor(e,j)),"multiple"!==C,(()=>s.getPrevNextKeyByCount(n,g,x,-L)),(()=>s.getPrevNextKeyByCount(n,g,x,L)),(()=>s.getPrevNextKeyByCount(n,g,x,-1)),(()=>s.getPrevNextKeyByCount(n,g,x,1)),x,p),[ae,re]=c.useCollectionFocusRing(G,["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);a.useEffect((()=>{if(null!=x&&G.current){const e=s.findElementByKey(G.current,x,j);if(e&&(e.scrollIntoView({block:"nearest"}),"card"===ee)){const t=e.closest("[role=gridcell]");t&&G.current.setAttribute("aria-activedescendant",t.id)}}}),[x,n,ee]);const ie=a.useCallback((e=>{S&&(!1===e.value.all&&e.value.keys.size>0&&(U.current=Array.from(e.value.keys.values()).pop()),S(e))}),[U,S]),se=a.useCallback((e=>{if(n&&S){const t=s.handleSelectionRange(e,n,g);Array.isArray(t)&&S({value:{all:!1,keys:new Set(t)},target:null})}}),[n,S,g]),{selectionProps:le}=u.useSelection((e=>e===G.current?void 0===x?null:x:s.keyExtractor(e,j)),v,C,!1,"replace",!1,ie,U.current,x,((e,t)=>()=>s.getPrevNextKeyByCount(n,g,e,t?-L:L)),((e,t)=>()=>s.getPrevNextKeyByCount(n,g,e,t?-1:1)),(e=>{if(G.current){const t=s.findElementByKey(G.current,e,j);t&&t.scrollIntoView({block:"nearest"})}}),se),ce=a.useCallback((e=>{const o=g(e.data),n="multiple"===C?()=>t.jsx(y.Selector,{onChange:S,rowKey:o,selectedKeys:v}):void 0;return{index:e.index,data:e.data,metadata:{key:o},selector:n,isSelected:i.containsKey(v,o)}}),[C,v,S,g]),de=n&&!n.length&&m?t.jsx(E,{layout:I}):t.jsx(P,{layout:I,colCount:L,totalCount:n?.length||0,cardWidth:N.width,cardHeight:N.height});w=s.getViewportConfig(G,w);const ue=t.jsx("div",{role:"row",children:t.jsx(T,{...H,children:t.jsx(h.LoadMoreCollection,{data:n,hasMore:m,onLoadMore:f,loadMoreIndicator:de,loadMoreThreshold:$+4,viewportConfig:w,children:o=>{const n=ce(o),a=te(n.metadata.key),r=x===n.metadata.key&&!a,i=r&&ae,s=n.isSelected;return(o=>t.jsx(M,{context:o,isTabbable:a,isFocused:r,isFocusRingVisible:i,isGridLayout:"grid"===I,isSelected:s,selectionMode:C,focusBehavior:ee,..."content"===k&&{setIsFocusBehaviorValid:Z},...W.current&&{initialAnimation:F},...0===n.index&&!N.width&&{updateCardSize:O},children:e},n.metadata.key))(n)}})})}),ye=t.jsx(T,{...H,children:t.jsx(B,{layout:I})});return t.jsx("div",{...r.mergeProps(ne,re,le,{onFocus:()=>{if(!i.isKeyDefined(x)&&p&&te(void 0)&&G.current){const e=Y.current||s.getFirstVisibleKey(G.current,j);i.isKeyDefined(e)&&p({value:e})}},onPointerDown:e=>{const t=s.keyExtractor(e.target,j);i.isKeyDefined(t)&&(Y.current=t)},onKeyDown:e=>{"content"===ee&&"Tab"===e.key&&G.current?.focus({preventScroll:!0})}},{..."card"===ee&&oe}),ref:G,role:"grid",class:b.styles.baseStyle,tabIndex:0,"aria-label":A,"aria-labelledby":R,"aria-multiselectable":X,"aria-rowcount":q,"aria-colcount":J,children:n?n.length||m?ue:t.jsx(o.Fragment,{}):ye})}));e.BaseCardView=N,e.getColCount=(e,t,o)=>{if(!t||!o)return 0;const n=Math.floor((o+e)/(e+t));return Math.max(1,n)},e.gutterSizeToPX=V}));
//# sourceMappingURL=BaseCardView-2752dacf.js.map