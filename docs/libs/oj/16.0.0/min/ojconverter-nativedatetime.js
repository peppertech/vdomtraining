/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["exports","ojs/ojconfig","@oracle/oraclejet-preact/UNSAFE_IntlDateTime","ojs/ojlogger","@oracle/oraclejet-preact/UNSAFE_IntlFormatParse"],function(t,e,r,s,a){"use strict";class o{constructor(t){this.intlFormatter=null,this.pattern=null;const r=o._processOptions(t),s=r.opts;this.locale=s.locale??e.getLocale(),this.intlFormatter=new Intl.DateTimeFormat(this.locale,s),this.resOptions=this.intlFormatter.resolvedOptions(),this.resOptions.isoStrFormat=s.isoStrFormat||"auto",this.resOptions.twoDigitYearStart=s.twoDigitYearStart||1950,this.resOptions.lenientParse=s.lenientParse||"full",this.formatTokens=r.formatTokens,this.pattern=t.pattern,this.timeZone=this.resOptions.timeZone}format(t){const e=r.normalizeIsoString(this.timeZone,t);var s=new Date(e);return this.intlFormatter.formatToParts(s).map(({type:t,value:e})=>{if("literal"!==t){const r=this.formatTokens.tokensIndexes[t];void 0!==r&&(this.formatTokens.tokensArray[r]=e)}}),this._formatTimeZoneTokens(e,this.timeZone),this.formatTokens.tokensArray.join("")}parse(t){if(null==t||""===t)throw new a.FormatParseError("The parse value cannot be empty.",{cause:{code:"emptyParseValue"}});const e=r.CalendarUtils.getCalendar(this.locale,this.resOptions.calendar),o=r.NativeParserImpl.parseImpl(t,this.pattern,this.resOptions,e),n=o.value;return n&&o.warning&&s.warn("The value "+t+" was leniently parsed to represent a date "+n),n}resolvedOptions(){return this.resOptions.patternFromOptions||(this.resOptions.patternFromOptions=this.pattern),this.resOptions}static _processOptions(t){const e=o._getOptionsFromPattern(t.pattern);return t.timeZone&&(e.opts.timeZone=t.timeZone),t.hour12&&(e.opts.hour12=t.hour12),e.opts.numberingSystem="latn",e.opts.calendar="gregory",e.opts.isoStrFormat=t.isoStrFormat||"auto",e.opts.twoDigitYearStart=t.twoDigitYearStart||1950,e.opts.lenientParse=t.lenientParse||"full",e}_formatTimeZoneTokens(t,e){const s=this.formatTokens;for(var a=0;a<s.tzOffsetsArray.length;a++){const n=s.tzOffsetsArray[a],i=s.tokensIndexes[n];if("tzid"===n){s.tokensArray[i]=e;continue}const l=r.DateTimeUtils.IsoStrParts(t),h={year:l[0],month:l[1],date:l[2],hours:l[3],minutes:l[4]},p=r.getISODateOffset(h,this.resOptions.timeZone);var o="";if(0!==p){switch(n){case"tzhm":o=(p<0?"-":"+")+r.DateTimeUtils.padZeros(Math.floor(Math.abs(p/60)),2)+r.DateTimeUtils.padZeros(Math.floor(Math.abs(p%60)),2);break;case"tzhsepm":o=(p<0?"-":"+")+r.DateTimeUtils.padZeros(Math.floor(Math.abs(p/60)),2)+":"+r.DateTimeUtils.padZeros(Math.floor(Math.abs(p%60)),2);break;case"tzh":o=(p<0?"-":"+")+r.DateTimeUtils.padZeros(Math.floor(Math.abs(p/60)),2)}s.tokensArray[i]=o}else s.tokensArray[i]="Z"}}static _appendPreOrPostMatch(t,e,r){let s=0,a=!1;for(var o=0,n=t.length;o<n;o++){var i=t.charAt(o);switch(i){case"'":a?(r.push("'"),e.count++):s+=1,a=!1;break;case"\\":a&&(r.push("\\"),e.count++),a=!a;break;default:r.push(i),a=!1,e.count++}}return s}static _getOptionsFromPattern(t){let e=0,s={count:0},a=0,n={},i=[],l={},h=[];for(r.NativeDateTimeConstants._TOKEN_REGEXP.lastIndex=0;;){let p=r.NativeDateTimeConstants._TOKEN_REGEXP.lastIndex;const c=r.NativeDateTimeConstants._TOKEN_REGEXP.exec(t),m=t.slice(p,c?c.index:t.length);if(e+=o._appendPreOrPostMatch(m,s,i),!c)break;if(e%2)i.push(c[0]),s.count++;else{i.push(null);let t=c[0];if(void 0===r.NativeDateTimeConstants._PROPERTIES_MAP[t])break;{const e=r.NativeDateTimeConstants._PROPERTIES_MAP[t].key,o=r.NativeDateTimeConstants._PROPERTIES_MAP[t].type;void 0!==e&&("millisecond"===e?(l[r.NativeDateTimeConstants.FRACTIONAL_SECOND_MAP[t].key]=r.NativeDateTimeConstants.FRACTIONAL_SECOND_MAP[t].value,n[r.NativeDateTimeConstants.FRACTIONAL_SECOND_MAP[t].token]=s.count++):"tzOffset"===o?(h[a]=e,n[e]=s.count++,a++):(l[e]=r.NativeDateTimeConstants._PROPERTIES_MAP[t].value,n[e]=s.count++)),"KK"===t||"K"===t?l.hourCycle="h11":"kk"===t||"k"===t?l.hourCycle="h24":"HH"===t||"H"===t?l.hourCycle="h23":"hh"!==t&&"h"!==t||(l.hourCycle="h12")}}}return{opts:l,formatTokens:{tokensArray:i,tzOffsetsArray:h,tokensIndexes:n}}}}Object.defineProperty(t,"NativeParserImpl",{enumerable:!0,get:function(){return r.NativeParserImpl}}),Object.defineProperty(t,"getISODateOffset",{enumerable:!0,get:function(){return r.getISODateOffset}}),Object.defineProperty(t,"FormatParseError",{enumerable:!0,get:function(){return a.FormatParseError}}),t.NativeDateTimeConverter=class{constructor(t){let s=t??{};s.locale=s.locale??e.getLocale();const{format:a,parse:o,resolvedOptions:n}=r.getFormatParse(s);this.formatterFunc=a,this.parserFunc=o,this.resOptions=n}format(t){return this.formatterFunc(t)}parse(t){return this.parserFunc(t)}resolvedOptions(){return this.resOptions}},t.NativeDateTimePatternConverter=o,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=ojconverter-nativedatetime.js.map