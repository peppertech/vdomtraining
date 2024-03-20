/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["ojs/ojcore-base","ojs/ojset","ojs/ojeventtarget","ojs/ojobservable","ojs/ojmap","ojs/ojdataprovider","ojs/ojkeyset"],function(t,e,s,i,a,r,n){"use strict";t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t,e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e,a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a;
/**
     * @preserve Copyright 2013 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
class h{constructor(t,e){var s;this.dataProvider=t,this.options=e,this._cacheInstantiated=!1,this._createAddItem=(t,e)=>{const s=t.key,i=t.parentKey,a=null===this.getChildDataProvider(s);let r=0;if(null!=i){r=this._getItemByKey(i).metadata.treeDepth+1}const n=this._getInsertIndexFromParent(r,e);return this._updateItemMetadata(new this.Item(this,t.metadata,t.data),i,r,n,a)},this._unshiftAddToCache=t=>{let e=this._createAddItem(t,0);return this._cache.unshift(e),this._incrementIndexFromParent(1,e.metadata.treeDepth),this._incrementIteratorOffset(0),e},this._pushAddToCache=t=>{let e=this._createAddItem(t,this._cache.length);return this._cache.push(e),this._incrementIteratorOffset(this._cache.length-1),e},this._spliceAddToCache=(t,e)=>{let s=this._createAddItem(t,e);return this._cache.splice(e,0,s),this._incrementIndexFromParent(e+1,s.metadata.treeDepth),this._incrementIteratorOffset(e),s},this.AsyncIterable=(s=class{constructor(t,e){this._parent=t,this._asyncIterator=e,this[Symbol.asyncIterator]=()=>this._asyncIterator,this._clientId=Symbol(),this._parent._mapClientIdToIteratorInfo.set(this._clientId,0)}},Symbol.asyncIterator,s),this.AsyncIterator=class{constructor(t,e,s){this._parent=t,this._nextFunc=e,this._params=s}next(){return this._nextFunc(this._params)}},this.AsyncIteratorYieldResult=class{constructor(t,e){this._parent=t,this.value=e,this.value=e,this.done=!1}},this.AsyncIteratorReturnResult=class{constructor(t,e){this._parent=t,this.value=e,this.value=e,this.done=!0}},this.Item=class{constructor(t,e,s){this._parent=t,this.metadata=e,this.data=s,this.metadata=e,this.data=s}},this.FlattenedTreeItemMetadata=class{constructor(t,e,s,i,a,r){this._parent=t,this.key=e,this.parentKey=s,this.indexFromParent=i,this.treeDepth=a,this.isLeaf=r,this.key=e,this.parentKey=s,this.indexFromParent=i,this.treeDepth=a,this.isLeaf=r}},this.FetchListResult=class{constructor(t,e,s,i){this._parent=t,this.fetchParameters=e,this.data=s,this.metadata=i,this.fetchParameters=e,this.data=s,this.metadata=i}},this.FetchByOffsetParameters=class{constructor(t,e,s,i,a,r){this._parent=t,this.offset=e,this.size=s,this.sortCriteria=i,this.filterCriterion=a,this.attributes=r,this.offset=e,this.size=s,this.sortCriteria=i,this.filterCriterion=a,this.attributes=r}},this.FetchByOffsetResults=class{constructor(t,e,s,i){this._parent=t,this.fetchParameters=e,this.results=s,this.done=i,this.fetchParameters=e,this.results=s,this.done=i}},this.FetchByKeysResults=class{constructor(t,e,s){this._parent=t,this.fetchParameters=e,this.results=s,this.fetchParameters=e,this.results=s}},this.DataProviderMutationEventDetail=class{constructor(t,e,s,i){this._parent=t,this.add=e,this.remove=s,this.update=i,this.add=e,this.remove=s,this.update=i}},this.DataProviderRefreshEventDetail=class{constructor(t){this.disregardAfterKey=t,this.disregardAfterKey=t}},this.DataProviderOperationEventDetail=class{constructor(t,e,s,i,a,r){this._parent=t,this.keys=e,this.metadata=s,this.data=i,this.indexes=a,this.transient=r,this.keys=e,this.metadata=s,this.data=i,this.indexes=a,this.transient=r}},this.DataProviderAddOperationEventDetail=class{constructor(t,e,s,i,a,r,n){this._parent=t,this.keys=e,this.afterKeys=s,this.addBeforeKeys=i,this.metadata=a,this.data=r,this.indexes=n,this.keys=e,this.afterKeys=s,this.addBeforeKeys=i,this.metadata=a,this.data=r,this.indexes=n}},null==this.options&&(this.options={}),this.options.expanded||(this.options.expanded=new n.KeySetImpl([])),this._expandedObservable=new i.BehaviorSubject(this._getExpandedObservableValue(this.options.expanded,Promise.resolve())),this.dataProvider.addEventListener("mutate",this._handleUnderlyingMutation.bind(this)),this.dataProvider.addEventListener("refresh",this._handleUnderlyingRefresh.bind(this)),this._cache=[],this._mapClientIdToIteratorInfo=new Map,this._fetchQueue=[],this._notDoneKeyMap=new a,this._notDoneKeyMap.set(null,!0)}_getChildrenFromCacheByParentKey(t){return this._cache.filter(e=>e.metadata.parentKey===t)}sortedIndex(t,e){var s=0,i=t.length;if(null===e.index)return i;for(;s<i;){var a=s+i>>>1;null!==t[a].index&&t[a].index<e.index?s=a+1:i=a}return s}_processAddEvent(t){let e=[],s=0;if(t.keys.forEach(function(i){e.push({key:i,parentKey:t.parentKeys[s],beforeKey:t.addBeforeKeys?.[s],index:t.indexes?.[s],data:t.data?.[s],metadata:t.metadata?.[s]}),s++}),this._cacheSortCriteria){let t=0;for(;e.length!==t;){t=e.length;for(let t=e.length-1;t>=0;t--){const s=e[t],i=s.key,a=s.parentKey;if((null===a||this._isExpanded(a)&&this._containsKey(a))&&!this._containsKey(i)&&(!this._currentFilterCriteria||this._currentFilterCriteria&&this._currentFilterCriteria.filter(s.data))){const i=this._getChildrenFromCacheByParentKey(a),n=r.SortUtils.getNaturalSortCriteriaComparator(this._cacheSortCriteria);let h=!1;for(let a=0;a<i.length;a++)if(n(s.data,i[a].data)<0){this._spliceAddToCache(s,this._getItemIndexByKey(i[a].metadata.key)),h=!0,e.splice(t,1);break}if(!h&&this._isKeyDone(a))if(null===a)this._pushAddToCache(s),e.splice(t,1);else{const i=this._getItemIndexByKey(a)+this._getLocalDescendentCount(a)+1;this._spliceAddToCache(s,i),e.splice(t,1)}}}}}else if(t?.addBeforeKeys?.length>0){let t=0;for(;e.length!==t;){t=e.length;for(let t=e.length-1;t>=0;t--){const s=e[t],i=s.key,a=s.parentKey,r=this._getItemIndexByKey(a);if((null===a||this._isExpanded(a)&&-1!==r)&&!this._containsKey(i)&&(!this._currentFilterCriteria||this._currentFilterCriteria&&this._currentFilterCriteria.filter(s.data))){const i=s.beforeKey;if(null!=i){const a=this._getItemIndexByKey(i);-1!==a&&(this._spliceAddToCache(s,a),e.splice(t,1))}else if(this._isKeyDone(a))if(null===a)this._pushAddToCache(s),e.splice(t,1);else{const i=r+this._getLocalDescendentCount(a)+1;this._spliceAddToCache(s,i),e.splice(t,1)}}}}}else if(t?.indexes?.length>0){let t=Array.from(e.reduce((t,e)=>{const s=e.parentKey;if(t.has(s)){let i=t.get(s);i.splice(this.sortedIndex(i,e),0,e)}else t.set(s,[e]);return t},new Map).entries()),s=0;for(;t.length!==s;){s=t.length;for(let e=0;e<t.length;){const s=t[e],i=s[0],a=this._getItemIndexByKey(i);if(null===i||this._isExpanded(i)&&-1!==a){const r=this._getChildrenFromCacheByParentKey(i);s[1].forEach(t=>{const e=t.key;if(!this._containsKey(e)&&(!this._currentFilterCriteria||this._currentFilterCriteria&&this._currentFilterCriteria.filter(t.data))){const e=t.index;let s;if(0===e)s=null===i?this._unshiftAddToCache(t):this._spliceAddToCache(t,a+1),r.unshift(s);else if(null===e||e>r.length){if(this._isKeyDone(i)){if(null===i)s=this._pushAddToCache(t);else{const e=a+this._getLocalDescendentCount(i)+1;s=this._spliceAddToCache(t,e)}r.push(s)}}else{const i=this._getItemIndexByKey(r[e-1].metadata.key)+this._getLocalDescendentCount(r[e-1].metadata.key)+1;s=this._spliceAddToCache(t,i),r.splice(e,0,s)}}}),t.splice(e,1)}else e++}}}else e.forEach(t=>{const e=t.parentKey,s=t.key;if((null===e||this._isExpanded(e)&&this._containsKey(e))&&!this._containsKey(s)&&(!this._currentFilterCriteria||this._currentFilterCriteria&&this._currentFilterCriteria.filter(t.data)&&this._isKeyDone(e)))if(null===e)this._pushAddToCache(t);else{const s=this._getItemIndexByKey(e)+this._getLocalDescendentCount(e)+1;this._spliceAddToCache(t,s)}})}_incrementIndexFromParent(t,e){const s=this._getLastItemIndex();for(let i=t;i<=s;i++){let t=this._getItem(i);if(null!=t){const s=t.metadata.treeDepth;if(s===e)t.metadata.indexFromParent+=1;else if(s<e)return}}}_decrementIndexFromParent(t,e){const s=this._getLastItemIndex();for(let i=t;i<=s;i++){let t=this._getItem(i);if(null!=t){const s=t.metadata.treeDepth;if(s===e)t.metadata.indexFromParent-=1;else if(s<e)return}}}_handleUnderlyingMutation(t){let e=null,s=null,i=null;const a=t.detail.add;if(a&&a.data&&a.data.length){const t=[],s=[],i=[],r=[],n=[],h=new Set,d=new Set;this._processAddEvent(a),a.keys.forEach(e=>{const{index:a,item:h}=this._getItemAndIndexByKey(e);null!=h&&(s.push(h.data),t.push(h.metadata),i.push(a),n.push(h.metadata.parentKey),d.add(e),r.push(this._getKeyByIndex(a+1)))}),d.size>0&&(e=new this.DataProviderAddOperationEventDetail(this,d,h,r,t,s,i))}const n=t.detail.remove;if(n&&n.data&&n.data.length){const t=n.metadata.map(t=>t.key),e=[],i=[],a=[],r=new Set;t.forEach((t,s)=>{const n=this._getItemIndexByKey(t);if(-1!=n){const s=this._getLocalDescendentCount(t)+1;this._decrementIndexFromParent(n,this._cache[n].metadata.treeDepth);this._cache.splice(n,s).forEach((t,s)=>{r.add(t.metadata.key),e.push(t.metadata),i.push(t.data),a.push(n+s),this._decrementIteratorOffset(n),this._notDoneKeyMap.delete(t.metadata.key)})}}),r.size>0&&(s=new this.DataProviderOperationEventDetail(this,r,e,i,a))}const h=t.detail.update;if(h&&h.data&&h.data.length){const t=[],e=[],s=[],a=new Set;h.metadata.forEach((i,r)=>{const n=this._getItemByKey(i.key);if(null!=n){const d=this._getItemIndexByKey(i.key),o=h.data[r],c=new this.FlattenedTreeItemMetadata(this,h.metadata[r].key,n.metadata.parentKey,n.metadata.indexFromParent,n.metadata.treeDepth,null===this.getChildDataProvider(h.metadata[r].key));this._cache.splice(d,1,new this.Item(this,c,o)),a.add(h.metadata[r].key),t.push(c),e.push(o),s.push(d)}}),a.size>0&&(i=new this.DataProviderOperationEventDetail(this,a,t,e,s))}if(e||s||i){const t=new this.DataProviderMutationEventDetail(this,e,s,i);this.dispatchEvent(new r.DataProviderMutationEvent(t))}}_handleUnderlyingRefresh(t){if(t?.detail?.keys){const e=t.detail.keys;for(let t=0;t<this._cache.length;t++){const s=this._cache[t];if(e.has(s.metadata.key)){this._notDoneKeyMap.set(s.metadata.key,!0),this._markParentsAsNotDone(s);const e=new r.DataProviderRefreshEvent(new this.DataProviderRefreshEventDetail(s.metadata.key));this._cache.splice(t+1,this._cache.length).forEach(e=>{this._decrementIteratorOffset(t+1),this._notDoneKeyMap.delete(e.metadata.key)}),this.dispatchEvent(e);break}}}else this._fetchSize=null,this._clearCaches(),this.dispatchEvent(new r.DataProviderRefreshEvent)}_markParentsAsNotDone(t){const e=t.metadata.parentKey;this._notDoneKeyMap.set(e,!0),null!==e&&this._markParentsAsNotDone(this._getItemByKey(e))}_getExpandedObservableValue(t,e){return{value:t,completionPromise:e}}getChildDataProvider(t){return this.dataProvider.getChildDataProvider(t)}containsKeys(t){return this.dataProvider.containsKeys(t)}fetchByKeys(t){const e=new a;return t.keys.forEach(s=>{const i=this._getItemByKey(s);i&&(e.set(s,i),t.keys.delete(s))}),0===t.keys.size?Promise.resolve(new this.FetchByKeysResults(this,t,e)):this.dataProvider.fetchByKeys(t).then(t=>(t.results.forEach((t,s)=>{e.set(s,t)}),new this.FetchByKeysResults(this,t.fetchParameters,e)))}fetchByOffset(t){const e=null!=t?.size?t.size:-1;null==this._fetchSize&&(this._fetchSize=e);const s=null!=t?.offset&&t.offset>0?t.offset:0,i=Object.assign({},t);if(i.size=e,i.offset=s,this._isSameCriteria(i.sortCriteria,i.filterCriterion)){if(this._currentSortCriteria=i.sortCriteria,this._currentFilterCriteria=i.filterCriterion,this._doesCacheSatisfyParameters(i))return Promise.resolve(this._getFetchByOffsetResultsFromCache(i))}else this._clearCaches(),this._currentSortCriteria=i.sortCriteria,this._currentFilterCriteria=i.filterCriterion;return this._fetchByOffset(i)}fetchFirst(t){this._fetchSize=null!=t?t.size:-1,this._isSameCriteria(t?.sortCriteria,t?.filterCriterion)||this._clearCaches(),this._currentSortCriteria=t?.sortCriteria,this._currentFilterCriteria=t?.filterCriterion;const e=()=>{const e=this._mapClientIdToIteratorInfo.get(s._clientId),i=Object.assign({},t);return i.offset=e,i.size=this._fetchSize,this.fetchByOffset(i).then(t=>{const i=t.results,a=i.map(t=>t.data),r=i.map(t=>t.metadata),n=0===a.length,h=Object.assign({},t.fetchParameters);return delete h.offset,this._mapClientIdToIteratorInfo.set(s._clientId,e+r.length),n?new this.AsyncIteratorReturnResult(this,new this.FetchListResult(this,h,a,r)):new this.AsyncIteratorYieldResult(this,new this.FetchListResult(this,h,a,r))})},s=new this.AsyncIterable(this,new this.AsyncIterator(this,e,t));return s}getCapability(t){if("fetchByOffset"===t){return{caching:"visitedByCurrentIterator",implementation:"randomAccess"}}if("fetchFirst"===t){return{caching:"visitedByCurrentIterator",iterationSpeed:"delayed"}}return this.dataProvider.getCapability(t)}getTotalSize(){return Promise.resolve(-1)}isEmpty(){return this.dataProvider.isEmpty()}_isSameCriteria(t,e){if(t){if(!this._currentSortCriteria||t[0].attribute!=this._currentSortCriteria[0].attribute||t[0].direction!=this._currentSortCriteria[0].direction)return!1}else if(this._currentSortCriteria)return!1;if(e){if(!this._currentFilterCriteria)return!1;for(const t in this._currentFilterCriteria)if(!this._filterCompare(this._currentFilterCriteria,e,t))return!1;for(const t in e)if(!this._filterCompare(this._currentFilterCriteria,e,t))return!1}else if(this._currentFilterCriteria)return!1;return!0}_filterCompare(t,e,s){return!(!t[s]||!e[s]||t[s]!==e[s])}_doesCacheSatisfyParameters(t,e=!1,s=0){return-1===t.size?this._isDone():e?s>=t.size:this._cache.length>=t.offset+t.size}_getFetchByOffsetResultsFromCache(t){let e,s=this._isDone();return-1===t.size?e=this._cache.slice(t.offset,void 0):(e=this._cache.slice(t.offset,t.offset+t.size),s=s&&t.offset+t.size>=this._cache.length),t.sortCriteria=this._cacheSortCriteria,t.filterCriterion=this._cacheFilterCriteria,new this.FetchByOffsetResults(this,t,e,s)}_clearCaches(){this._cache=[],this._cacheSortCriteria=null,this._cacheFilterCriteria=null,this._cacheInstantiated=!1,this._notDoneKeyMap.clear(),this._notDoneKeyMap.set(null,!0)}_isDone(){return 0===this._notDoneKeyMap.size}_isCacheEmpty(){return 0===this._cache.length}_getFetchDetails(t=0,e=null,s=0,i=this._cache.length,a=!1,r=0){return{parentKey:e,level:s,levelOffset:t,cacheOffset:i,isExpand:a,ancestorsAddedCount:r}}async _fetchByOffset(t){let e=0;if(!this._isCacheEmpty()){const s=await this._fetchChildrenByOffsetFromAncestors(t,this._getLastItem());if(s.paramsSatisfied)return this._getFetchByOffsetResultsFromCache(t);e=s.ancestor.metadata.indexFromParent+1}const s=this._getFetchDetails(e);return await this._fetchChildrenByOffsetFromDataProvider(this.dataProvider,t,s),this._getFetchByOffsetResultsFromCache(t)}async _fetchChildrenByOffsetFromAncestors(t,e,s=0){let i,a=!1;const r=e.metadata.key,n=e.metadata.parentKey;if(!e.metadata.isLeaf&&this._isExpanded(r)&&!this._isKeyDone(r)){const n=this.getChildDataProvider(r),h=this._getFetchDetails(s,r,e.metadata.treeDepth+1);if(i=await this._fetchChildrenByOffsetFromDataProvider(n,t,h),a=i.paramsSatisfied,a)return{paramsSatisfied:a,ancestor:e}}if(null===n)return{paramsSatisfied:a,ancestor:e};const h=this._getItemByKey(n),d=e.metadata.indexFromParent+1;return i=await this._fetchChildrenByOffsetFromAncestors(t,h,d),a=i.paramsSatisfied,{paramsSatisfied:a,ancestor:i.ancestor}}async _fetchChildrenByOffsetFromDataProvider(t,e,s){const{parentKey:i,level:a,levelOffset:r,cacheOffset:n,isExpand:h,ancestorsAddedCount:d}=s,o=this._getModifiedFetchParameters(e,s),c=await t.fetchByOffset(o),l=c.results;this._cacheInstantiated||(this._cacheSortCriteria=c.fetchParameters.sortCriteria,this._cacheFilterCriteria=c.fetchParameters.filterCriterion,this._cacheInstantiated=!0);let f=!1,_=0,u=!0;for(let t=0;t<l.length;t++){const s=l[t],o=s.metadata.key,c=this.getChildDataProvider(o),y=null==c,m=this._isExpanded(o),p=!(!!y||"yes"===c.isEmpty())&&m;p&&this._notDoneKeyMap.set(o,!0);const I=this._updateItemMetadata(s,i,a,r+t,y);if(this._cache.splice(n+_,0,I),_++,u=t===l.length-1,f=this._doesCacheSatisfyParameters(e,h,_+d),f)break;if(p){let t=this._getFetchDetails(0,o,a+1,n+_,h,_),s=await this._fetchChildrenByOffsetFromDataProvider(c,e,t);if(_+=s.descendentsAddedCount,f=s.paramsSatisfied,f)break}}return u&&c.done&&this._notDoneKeyMap.delete(i),{paramsSatisfied:f,descendentsAddedCount:_}}_isKeyDone(t){return!this._notDoneKeyMap.has(t)}_isExpanded(t){return this.options.expanded?.has(t)}_getModifiedFetchParameters(t,e){let s,i=Object.assign({},t),a=e.levelOffset;return s=e.isExpand?t.size-e.ancestorsAddedCount:-1===t.size?-1:t.offset+t.size-this._cache.length,i.offset=a,i.size=s,i}setExpanded(t){const e=this.createOptimizedKeySet(),s=this.createOptimizedKeySet();this._oldExpanded=this.options.expanded,this.options.expanded=t;const i=this._oldExpanded,a=this.options.expanded;if(a.isAddAll()||i.isAddAll()){if(!a.isAddAll()||!i.isAddAll())return this._clearCaches(),this.dispatchEvent(new r.DataProviderRefreshEvent),void this.getExpandedObservable().next(this._getExpandedObservableValue(this.options.expanded,Promise.resolve()));{const t=a.deletedValues(),r=i.deletedValues();t.forEach(t=>{i.has(t)&&s.add(t)}),r.forEach(t=>{a.has(t)&&e.add(t)})}}else{const t=a.values(),r=i.values();t.forEach(t=>{i.has(t)||e.add(t)}),r.forEach(t=>{a.has(t)||s.add(t)})}const n=this._expand(e),h=this._collapse(s),d=new Promise(t=>{n.then(e=>{const s=e.operationAddEventDetail,i=e.disregardAfterItem,a=e.disregardAfterDescendentsAddedCount;if(null!=i){const t=i.metadata.key,e=this._getItemIndexByKey(t),s=this._cache.splice(e+a+1,this._cache.length);this._markParentsAsNotDone(i),s.forEach(t=>{this._notDoneKeyMap.delete(t.metadata.key)});for(let t=0;t<s.length;t++)this._decrementIteratorOffset(e+1)}if(s?.keys?.size>0||h?.keys?.size>0){const t=new this.DataProviderMutationEventDetail(this,s,h,null);this.dispatchEvent(new r.DataProviderMutationEvent(t))}if(null!=i){const t=new r.DataProviderRefreshEvent(new this.DataProviderRefreshEventDetail(i.metadata.key));this.dispatchEvent(t)}t()})});this.getExpandedObservable().next(this._getExpandedObservableValue(this.options.expanded,d))}getExpandedObservable(){return this._expandedObservable}_updateItemMetadata(t,e,s,i,a){return new this.Item(this,new this.FlattenedTreeItemMetadata(this,t.metadata.key,e,i,s,a),t.data)}_containsKey(e){return this._cache.some(s=>t.Object.compareValues(s.metadata.key,e))}_getItemByKey(e){return this._cache.find(s=>t.Object.compareValues(s.metadata.key,e))}_getItemIndexByKey(e){return this._cache.findIndex(s=>t.Object.compareValues(s.metadata.key,e))}_getItemAndIndexByKey(e){let s=-1,i=this._cache.find((i,a)=>(s=a,t.Object.compareValues(i.metadata.key,e)));return null==i&&(s=-1),{item:i,index:s}}_getPreviousSibling(t){return this._cache[this._getLastItemIndex()]}_getLastItem(){return this._cache[this._getLastItemIndex()]}_getItem(t){return this._cache[t]}_getLastItemIndex(){return this._cache.length-1}_getLocalDescendentCount(t){if(null===t)return this._cache.length;const e=this._getItemByKey(t);let s=0;if(null!=e){const i=this._getItemIndexByKey(t),a=e.metadata.treeDepth,r=this._getLastItemIndex();for(let t=i+1;t<=r;t++){if(!(this._getItem(t).metadata.treeDepth>a))return s;s+=1}}return s}_getInsertIndexFromParent(t,e){for(let s=e-1;s>=0;s--){const e=this._getItem(s),i=e.metadata.treeDepth;if(i===t)return e.metadata.indexFromParent+1;if(i<t)return 0}return 0}async _expand(t){const e=this._filterAndSortKeysByIndex(t);let s;const i=this.createOptimizedKeySet(),a=this.createOptimizedKeySet(),r=[],n=[],h=[],d=[];let o;for(let t=0;t<e.length;t++){const c=e[t],l=this._getItemIndexByKey(c),f=this.getChildDataProvider(c);if(null==f)continue;const _=this._getItem(l),u=l+1,y=new this.FetchByOffsetParameters(this,0,this._fetchSize,this._currentSortCriteria,this._currentFilterCriteria,null),m=this._getFetchDetails(0,c,_.metadata.treeDepth+1,u,!0);this._notDoneKeyMap.set(c,!0);let{descendentsAddedCount:p}=await this._fetchChildrenByOffsetFromDataProvider(f,y,m);if(!this._isKeyDone(c)){s=_,o=p;break}let I=c;this._cache.slice(u,u+p).forEach((t,e)=>{i.add(t.metadata.key),a.add(I),n.push(t.metadata),h.push(t.data),d.push(u+e),r.push(this._getKeyByIndex(u+e+1)),I=t.metadata.key,this._incrementIteratorOffset(u)})}return{operationAddEventDetail:i.size>0?new this.DataProviderAddOperationEventDetail(this,i,a,r,n,h,d):null,disregardAfterItem:s,disregardAfterDescendentsAddedCount:o}}_getKeyByIndex(t){return this._cache[t]?.metadata?.key?this._cache[t].metadata.key:null}_filterAndSortKeysByIndex(t){return[...t].reduce((t,e)=>{let s=this._getItemIndexByKey(e);return-1!=s&&t.push({key:e,index:s}),t},[]).sort((t,e)=>t.index-e.index).map(t=>t.key)}_collapse(t){const e=[],s=[],i=[],a=this.createOptimizedKeySet();return t.forEach(t=>{const r=this._getLocalDescendentCount(t);if(this._notDoneKeyMap.delete(t),r>0){const n=this._getItemIndexByKey(t);this._cache.splice(n+1,r).forEach((t,r)=>{this._notDoneKeyMap.delete(t.metadata.key),a.add(t.metadata.key),e.push(t.metadata),s.push(t.data),i.push(n+r+1),this._decrementIteratorOffset(n+1)})}}),new this.DataProviderOperationEventDetail(this,a,e,s,i,!0)}_decrementIteratorOffset(t){this._mapClientIdToIteratorInfo.forEach((e,s)=>{t<e&&this._mapClientIdToIteratorInfo.set(s,e-1)})}_incrementIteratorOffset(t){this._mapClientIdToIteratorInfo.forEach((e,s)=>{t<e&&this._mapClientIdToIteratorInfo.set(s,e+1)})}createOptimizedKeySet(t){return this.dataProvider.createOptimizedKeySet?this.dataProvider.createOptimizedKeySet(t):new e(t)}createOptimizedKeyMap(t){if(this.dataProvider.createOptimizedKeyMap)return this.dataProvider.createOptimizedKeyMap(t);if(t){const e=new a;return t.forEach((t,s)=>{e.set(s,t)}),e}return new a}}return t._registerLegacyNamespaceProp("FlattenedTreeDataProviderView",h),s.EventTargetMixin.applyMixin(h),h});
//# sourceMappingURL=ojflattenedtreedataproviderview.js.map