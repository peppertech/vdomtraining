define(['exports', 'preact/jsx-runtime', 'preact/hooks', './Flex-56ecdf4c', './usePress-a9ed1488', './UNSAFE_Selector/themes/SelectorStyles.css', './StyledCheckbox-9006dc18', './mergeProps-bcfa6a92', './useActive-7bb6fdc1', './useFocus-4194fc59', './useTestId-3a316499', './useTooltip-6a5fedfa', './useHover-7964884c', './logger-0f873e29', './LayerHost-e95c5f30', 'preact/compat', 'css!./TooltipContentStyles.styles.css', 'module', './hooks/UNSAFE_useTooltip/themes/redwood/TooltipContentVariants.css', './tooltipUtils-3b34c2bc', './useTranslationBundle-516b1b83'], (function(e,s,t,o,l,a,r,c,i,n,d,u,p,b,h,y,f,v,S,T,g){"use strict";const A=e=>{"Enter"==e.key&&e.stopPropagation()};e.SelectorAll=function({"aria-label":e,"aria-labelledby":b,selected:h,onChange:y,showTooltip:f="disabled",testId:v}){const S=t.useRef(null),{isActive:T,activeProps:k}=i.useActive(),{isFocus:x,focusProps:P}=n.useFocus(),{pressProps:C}=l.usePress((e=>{y?.("none"==h||"partial"==h?{value:{all:!0,deletedKeys:new Set},target:e.target}:{value:{all:!1,keys:new Set},target:e.target})})),{isHover:F,hoverProps:m}=p.useHover(),j="partial"===h||"partial-all"===h?"partial":"all"===h?"checked":"unchecked",w=d.useTestId(v),H=g.useTranslationBundle("@oracle/oraclejet-preact"),U="none"===h||"partial"===h?H.selectorAll_selectAll():H.selectorAll_deselectAll(),{tooltipContent:_,tooltipProps:E}=u.useTooltip({text:U,isDisabled:"disabled"===f}),B=e||b?void 0:U;return s.jsx("div",{class:a.styles.container,...c.mergeProps({onClick:()=>{S.current?.focus()}},C,E),...w,children:s.jsx("div",{class:a.styles.base,...k,...m,children:s.jsxs(o.Flex,{align:"center",justify:"center",children:[s.jsx(r.StyledCheckbox,{ref:S,isHover:F,isChecked:j,isActive:T,isFocusRingShown:x,"aria-label":e||B,"aria-labelledby":b,onKeyDown:A,onKeyUp:A,...P}),_]})})})}}));
//# sourceMappingURL=SelectorAll-53efae22.js.map
