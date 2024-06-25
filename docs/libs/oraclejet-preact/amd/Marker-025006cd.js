define(['exports', 'preact/jsx-runtime'], (function(t,e){"use strict";const s=({cx:t,cy:s,rx:i,ry:r,scaleX:a,scaleY:c,tx:l,ty:o,fill:n,stroke:h,strokeWidth:d=1,dataInfo:x,isInteractive:f})=>e.jsx("ellipse",{...x,cx:t+l,cy:s+o,rx:i*a,ry:r*c,fill:n,stroke:h,strokeWidth:d,cursor:f?"pointer":void 0,vectorEffect:"non-scaling-stroke"}),i=({scaleX:t,scaleY:s,tx:i,ty:r,fill:a,stroke:c,strokeWidth:l=1,width:o,height:n,isInteractive:h,dataInfo:d})=>{const x=t*o/100,f=s*n/100;return e.jsx("path",{...d,fill:a,stroke:c,strokeWidth:l,vectorEffect:"non-scaling-stroke",cursor:h?"pointer":void 0,transform:`translate(${i-o/2} ${r-n/2}) scale(${x} ${f})`,d:"M 49.973566845209916 0 C 35.487299168442284 0 23.71094058258365 12.495019801980108 23.71094058258365 27.90841584158416 C   23.71094058258365 43.32181188118821 35.487299168442284 55.81683168316832 49.973566845209916 55.81683168316832 C 64.4599001785434   55.81683168316832 76.23619310783617 43.32181188118821 76.23619310783617 27.90841584158416 C 76.23619310783617 12.495019801980108   64.4599001785434 0 49.973566845209916 0 z M 19.607405229048297 50.541460396039604 C 10.737203208846282 57.250371287128864   -3.3723927507496847 73.51485148514851 0.7311426027856692 89.17079207920791 C 23.783162804806032 103.5633663366335 68.33114260278562   105.4951732673267 100.03669815834124 88.31992574257426 C 101.26447593611908 71.04665841584145 91.18619310783609 58.7152227722771   79.51902139066446 50.541460396039604 C 64.74629411793718 75.89591584158418 36.02154664318971 70.79344059405938 19.607405229048297 50.541460396039604 z"})},r=[-50,-11.22,-16.69,-17.94,0,-47.55,16.69,-17.94,50,-11.22,26.69,13.8,30.9,47.56,0,33.42,-30.9,47.56,-26.69,13.8],a=({type:t,scaleX:s,scaleY:i,tx:a,ty:c,height:l,width:o,fill:n,stroke:h,strokeWidth:d=1,dataInfo:x,isInteractive:f})=>{let k;const y=Math.min(o,l),I=y/2,g=y/6;switch(t){case"star":k=r;break;case"triangleUp":k=[0-I,0+I,0,0-I,0+I,0+I];break;case"triangleDown":k=[0-I,0-I,0,0+I,0+I,0-I];break;case"diamond":k=[0-I,0,0,0-I,0+I,0,0,0+I];break;case"plus":k=[0-I,0-g,0-g,0-g,0-g,0-I,0+g,0-I,0+g,0-g,0+I,0-g,0+I,0+g,0+g,0+g,0+g,0+I,0-g,0+I,0-g,0+g,0-I,0+g];break;default:k=[]}return e.jsx("polygon",{...x,fill:n,stroke:h,strokeWidth:d,cursor:f?"pointer":void 0,vectorEffect:"non-scaling-stroke",transform:`translate(${a} ${c}) scale(${s} ${i})`,points:k.join(" ")})},c=({x:t,y:s,width:i,height:r,scaleX:a,scaleY:c,tx:l,ty:o,fill:n,stroke:h,strokeWidth:d=1,dataInfo:x,isInteractive:f})=>e.jsx("rect",{x:t+l,y:s+o,width:i*a,height:r*c,fill:n,stroke:h,cursor:f?"pointer":void 0,strokeWidth:d,...x,vectorEffect:"non-scaling-stroke"});t.MARKER_PADDING=3,t.Marker=({scale:t,type:r,height:l=100,width:o=100,fill:n,stroke:h,outerStroke:d,tx:x,ty:f,preserveRectAspectRatio:k,isInteractive:y=!1,dataInfo:I,outerStrokeWidth:g=3,innerStrokeWidth:u=1})=>{const p="human"===r?.8*t*.9:t,v="rectangle"===r&&k?t/1.62:"human"===r?.9*t:t,j=null!=x?x:(1-p)*o/2,W=null!=f?f:(1-v)*l/2,w=l/2*("ellipse"===r&&k?1/1.62:1);switch(r){case"human":return d?e.jsxs("g",{children:[e.jsx(i,{type:"human",tx:j,ty:W,fill:n,stroke:d,strokeWidth:g,width:o,height:l,scaleX:p,scaleY:v}),e.jsx(i,{type:"human",tx:j,ty:W,fill:n,stroke:h,strokeWidth:u,width:o,height:l,scaleX:p,scaleY:v,isInteractive:y,dataInfo:I})]}):e.jsx(i,{type:"human",tx:j,ty:W,fill:n,stroke:h,width:o,height:l,scaleX:p,scaleY:v,isInteractive:y,dataInfo:I});case"rectangle":case"square":{const t=-o/2*p,s=-l/2*v;return d?e.jsxs("g",{children:[e.jsx(c,{x:t,y:s,width:o-g,height:l-g,scaleX:p,scaleY:v,fill:n,stroke:d,strokeWidth:g,tx:j+g/2,ty:W+g/2}),e.jsx(c,{x:t,y:s,width:o-g,height:l-g,scaleX:p,scaleY:v,fill:n,stroke:h,strokeWidth:u,tx:j+g/2,ty:W+g/2,isInteractive:y,dataInfo:I})]}):e.jsx(c,{x:t,y:s,width:o-2*g,height:l-2*g,scaleX:p,scaleY:v,fill:n,stroke:h,tx:j+g,ty:W+g,isInteractive:y,dataInfo:I})}case"circle":case"ellipse":return d?e.jsxs("g",{children:[e.jsx(s,{cx:0,cy:0,scaleX:p,scaleY:v,fill:n,stroke:d,strokeWidth:g,rx:o/2-g,ry:w-g,tx:j,ty:W,isInteractive:y,dataInfo:I}),e.jsx(s,{cx:0,cy:0,scaleX:p,scaleY:v,fill:n,stroke:h,strokeWidth:u,rx:o/2-g,ry:w-g,tx:j,ty:W,isInteractive:y,dataInfo:I})]}):e.jsx(s,{cx:0,cy:0,scaleX:p,scaleY:v,fill:n,stroke:h,rx:o/2-g,ry:w-g,tx:j,ty:W,isInteractive:y,dataInfo:I});default:return d?e.jsxs("g",{children:[e.jsx(a,{fill:n,stroke:d,strokeWidth:g,type:r,scaleX:p,scaleY:t,tx:j,ty:W,height:l-g,width:o-g,isInteractive:y,dataInfo:I}),e.jsx(a,{fill:n,stroke:h,strokeWidth:u,type:r,scaleX:p,scaleY:t,tx:j,ty:W,height:l-g,width:o-g,isInteractive:y,dataInfo:I})]}):e.jsx(a,{fill:n,stroke:h,type:r,scaleX:p,scaleY:t,tx:j,ty:W,height:l-2*g,width:o-2*g,isInteractive:y,dataInfo:I})}}}));
//# sourceMappingURL=Marker-025006cd.js.map