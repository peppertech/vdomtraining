define(['exports', 'preact/jsx-runtime', './ButtonLayout-64cb114c', './ChevronDown-d40e05a2', './Menu-4851dd92', './MenuItem-96f8014c', 'preact/hooks', 'preact', './Floating-d924078b', 'preact/compat', './TopLayerHost-06d05670', './mergeProps-7d608009', './logger-e130a3d8', 'css!./TooltipContentStyles.styles.css', 'module', './hooks/UNSAFE_useTooltip/themes/redwood/TooltipContentVariants.css', 'css!./IconStyle.styles.css', './SelectMenuGroupContext-3dbda9d7', './UNSAFE_Separator/themes/SeparatorStyles.css', 'css!./MenuSeparatorStyles.styles.css', 'module', './UNSAFE_Menu/themes/redwood/MenuSeparatorVariants.css', './useMenuAction-c69dedac', './BaseButton-0ad3564a'], (function(e,t,o,s,n,a,r,u,i,d,l,c,p,h,M,m,y,S,b,T,f,g,B,x){"use strict";const v=d.forwardRef((({children:e,label:a,suffix:i,variant:d="outlined",isDisabled:l=!1,isMenuOpen:p=!1,onToggleMenu:h,size:M="md",type:m="button",width:y,icon:S,testId:b,"aria-describedby":T,onBlur:f,onFocus:g,onMouseEnter:v,onMouseLeave:w,onTouchEnd:E,onTouchStart:F},A)=>{const I=r.useRef(null);r.useImperativeHandle(A,(()=>I.current),[I]);const{triggerProps:j,menuProps:C}=B.useMenuAction({isDisabled:l,onToggleMenu:h,isMenuOpen:p,anchorRef:I}),D={type:"button",buttonType:m},N={onBlur:f,onFocus:g,onMouseEnter:v,onMouseLeave:w,onTouchEnd:E,onTouchStart:F},L=t.jsx(x.BaseButton,{...c.mergeProps(j,N),styling:p?["min","active"]:["min"],elementDetails:D,isDisabled:l,variant:d,width:y,size:M,ref:I,testId:b,"aria-label":i?`${a} ${i}`:a,"aria-describedby":T,children:t.jsx(o.ButtonLayout,{display:"all",suffix:i,startIcon:S,endIcon:t.jsx(s.SvgChevronDown,{}),size:M,children:a})});return l?L:t.jsxs(u.Fragment,{children:[L,t.jsx(n.Menu,{...C,"aria-label":a,offsetValue:4,children:e})]})}));v.displayName="MenuButton",e.MenuButton=v}));
//# sourceMappingURL=MenuButton-8c392f09.js.map