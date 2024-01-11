var J=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var i=(s,t,e)=>(J(s,t,"read from private field"),e?e.call(s):t.get(s)),h=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)},n=(s,t,e,r)=>(J(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e);var d=(s,t,e)=>(J(s,t,"access private method"),e);import{aj as mt,ak as X,al as Ct,am as ct,an as lt,ao as Ot,ap as Et,aq as St,ar as dt,as as bt,r as m,at as Qt}from"./index-aff0d65e.js";var p,a,F,f,E,T,g,A,x,P,S,Q,O,U,I,M,L,Y,k,Z,B,$,j,tt,K,et,V,st,W,it,_,Rt,yt,Ut=(yt=class extends mt{constructor(t,e){super();h(this,I);h(this,L);h(this,k);h(this,B);h(this,j);h(this,K);h(this,V);h(this,W);h(this,_);h(this,p,void 0);h(this,a,void 0);h(this,F,void 0);h(this,f,void 0);h(this,E,void 0);h(this,T,void 0);h(this,g,void 0);h(this,A,void 0);h(this,x,void 0);h(this,P,void 0);h(this,S,void 0);h(this,Q,void 0);h(this,O,void 0);h(this,U,void 0);n(this,a,void 0),n(this,F,void 0),n(this,f,void 0),n(this,U,new Set),n(this,p,t),this.options=e,n(this,g,null),this.bindMethods(),this.setOptions(e)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(i(this,a).addObserver(this),ft(i(this,a),this.options)?d(this,I,M).call(this):this.updateResult(),d(this,j,tt).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return rt(i(this,a),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return rt(i(this,a),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,d(this,K,et).call(this),d(this,V,st).call(this),i(this,a).removeObserver(this)}setOptions(t,e){const r=this.options,y=i(this,a);if(this.options=i(this,p).defaultQueryOptions(t),X(r,this.options)||i(this,p).getQueryCache().notify({type:"observerOptionsUpdated",query:i(this,a),observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=r.queryKey),d(this,W,it).call(this);const u=this.hasListeners();u&&pt(i(this,a),y,this.options,r)&&d(this,I,M).call(this),this.updateResult(e),u&&(i(this,a)!==y||this.options.enabled!==r.enabled||this.options.staleTime!==r.staleTime)&&d(this,L,Y).call(this);const o=d(this,k,Z).call(this);u&&(i(this,a)!==y||this.options.enabled!==r.enabled||o!==i(this,O))&&d(this,B,$).call(this,o)}getOptimisticResult(t){const e=i(this,p).getQueryCache().build(i(this,p),t),r=this.createResult(e,t);return wt(this,r)&&(n(this,f,r),n(this,T,this.options),n(this,E,i(this,a).state)),r}getCurrentResult(){return i(this,f)}trackResult(t){const e={};return Object.keys(t).forEach(r=>{Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:()=>(i(this,U).add(r),t[r])})}),e}getCurrentQuery(){return i(this,a)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const e=i(this,p).defaultQueryOptions(t),r=i(this,p).getQueryCache().build(i(this,p),e);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,e))}fetch(t){return d(this,I,M).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),i(this,f)))}createResult(t,e){var ut;const r=i(this,a),y=this.options,u=i(this,f),o=i(this,E),l=i(this,T),w=t!==r?t.state:i(this,F),{state:c}=t;let{error:q,errorUpdatedAt:at,fetchStatus:D,status:C}=c,ht=!1,R;if(e._optimisticResults){const b=this.hasListeners(),G=!b&&ft(t,e),vt=b&&pt(t,r,e,y);(G||vt)&&(D=St(t.options.networkMode)?"fetching":"paused",c.dataUpdatedAt||(C="pending")),e._optimisticResults==="isRestoring"&&(D="idle")}if(e.select&&typeof c.data<"u")if(u&&c.data===(o==null?void 0:o.data)&&e.select===i(this,A))R=i(this,x);else try{n(this,A,e.select),R=e.select(c.data),R=dt(u==null?void 0:u.data,R,e),n(this,x,R),n(this,g,null)}catch(b){n(this,g,b)}else R=c.data;if(typeof e.placeholderData<"u"&&typeof R>"u"&&C==="pending"){let b;if(u!=null&&u.isPlaceholderData&&e.placeholderData===(l==null?void 0:l.placeholderData))b=u.data;else if(b=typeof e.placeholderData=="function"?e.placeholderData((ut=i(this,P))==null?void 0:ut.state.data,i(this,P)):e.placeholderData,e.select&&typeof b<"u")try{b=e.select(b),n(this,g,null)}catch(G){n(this,g,G)}typeof b<"u"&&(C="success",R=dt(u==null?void 0:u.data,b,e),ht=!0)}i(this,g)&&(q=i(this,g),R=i(this,x),at=Date.now(),C="error");const z=D==="fetching",N=C==="pending",H=C==="error",ot=N&&z;return{status:C,fetchStatus:D,isPending:N,isSuccess:C==="success",isError:H,isInitialLoading:ot,isLoading:ot,data:R,dataUpdatedAt:c.dataUpdatedAt,error:q,errorUpdatedAt:at,failureCount:c.fetchFailureCount,failureReason:c.fetchFailureReason,errorUpdateCount:c.errorUpdateCount,isFetched:c.dataUpdateCount>0||c.errorUpdateCount>0,isFetchedAfterMount:c.dataUpdateCount>w.dataUpdateCount||c.errorUpdateCount>w.errorUpdateCount,isFetching:z,isRefetching:z&&!N,isLoadingError:H&&c.dataUpdatedAt===0,isPaused:D==="paused",isPlaceholderData:ht,isRefetchError:H&&c.dataUpdatedAt!==0,isStale:nt(t,e),refetch:this.refetch}}updateResult(t){const e=i(this,f),r=this.createResult(i(this,a),this.options);if(n(this,E,i(this,a).state),n(this,T,this.options),i(this,E).data!==void 0&&n(this,P,i(this,a)),X(r,e))return;n(this,f,r);const y={},u=()=>{if(!e)return!0;const{notifyOnChangeProps:o}=this.options,l=typeof o=="function"?o():o;if(l==="all"||!l&&!i(this,U).size)return!0;const v=new Set(l??i(this,U));return this.options.throwOnError&&v.add("error"),Object.keys(i(this,f)).some(w=>{const c=w;return i(this,f)[c]!==e[c]&&v.has(c)})};(t==null?void 0:t.listeners)!==!1&&u()&&(y.listeners=!0),d(this,_,Rt).call(this,{...y,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&d(this,j,tt).call(this)}},p=new WeakMap,a=new WeakMap,F=new WeakMap,f=new WeakMap,E=new WeakMap,T=new WeakMap,g=new WeakMap,A=new WeakMap,x=new WeakMap,P=new WeakMap,S=new WeakMap,Q=new WeakMap,O=new WeakMap,U=new WeakMap,I=new WeakSet,M=function(t){d(this,W,it).call(this);let e=i(this,a).fetch(this.options,t);return t!=null&&t.throwOnError||(e=e.catch(Ct)),e},L=new WeakSet,Y=function(){if(d(this,K,et).call(this),ct||i(this,f).isStale||!lt(this.options.staleTime))return;const e=Ot(i(this,f).dataUpdatedAt,this.options.staleTime)+1;n(this,S,setTimeout(()=>{i(this,f).isStale||this.updateResult()},e))},k=new WeakSet,Z=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(i(this,a)):this.options.refetchInterval)??!1},B=new WeakSet,$=function(t){d(this,V,st).call(this),n(this,O,t),!(ct||this.options.enabled===!1||!lt(i(this,O))||i(this,O)===0)&&n(this,Q,setInterval(()=>{(this.options.refetchIntervalInBackground||Et.isFocused())&&d(this,I,M).call(this)},i(this,O)))},j=new WeakSet,tt=function(){d(this,L,Y).call(this),d(this,B,$).call(this,d(this,k,Z).call(this))},K=new WeakSet,et=function(){i(this,S)&&(clearTimeout(i(this,S)),n(this,S,void 0))},V=new WeakSet,st=function(){i(this,Q)&&(clearInterval(i(this,Q)),n(this,Q,void 0))},W=new WeakSet,it=function(){const t=i(this,p).getQueryCache().build(i(this,p),this.options);if(t===i(this,a))return;const e=i(this,a);n(this,a,t),n(this,F,t.state),this.hasListeners()&&(e==null||e.removeObserver(this),t.addObserver(this))},_=new WeakSet,Rt=function(t){bt.batch(()=>{t.listeners&&this.listeners.forEach(e=>{e(i(this,f))}),i(this,p).getQueryCache().notify({query:i(this,a),type:"observerResultsUpdated"})})},yt);function It(s,t){return t.enabled!==!1&&!s.state.dataUpdatedAt&&!(s.state.status==="error"&&t.retryOnMount===!1)}function ft(s,t){return It(s,t)||s.state.dataUpdatedAt>0&&rt(s,t,t.refetchOnMount)}function rt(s,t,e){if(t.enabled!==!1){const r=typeof e=="function"?e(s):e;return r==="always"||r!==!1&&nt(s,t)}return!1}function pt(s,t,e,r){return e.enabled!==!1&&(s!==t||r.enabled===!1)&&(!e.suspense||s.state.status!=="error")&&nt(s,e)}function nt(s,t){return s.isStaleByTime(t.staleTime)}function wt(s,t){return!X(s.getCurrentResult(),t)}var gt=m.createContext(!1),Ft=()=>m.useContext(gt);gt.Provider;function Tt(){let s=!1;return{clearReset:()=>{s=!1},reset:()=>{s=!0},isReset:()=>s}}var xt=m.createContext(Tt()),Pt=()=>m.useContext(xt);function Dt(s,t){return typeof s=="function"?s(...t):!!s}var Mt=(s,t)=>{(s.suspense||s.throwOnError)&&(t.isReset()||(s.retryOnMount=!1))},At=s=>{m.useEffect(()=>{s.clearReset()},[s])},Lt=({result:s,errorResetBoundary:t,throwOnError:e,query:r})=>s.isError&&!t.isReset()&&!s.isFetching&&Dt(e,[s.error,r]),kt=s=>{s.suspense&&typeof s.staleTime!="number"&&(s.staleTime=1e3)},Bt=(s,t)=>(s==null?void 0:s.suspense)&&t.isPending,jt=(s,t,e)=>t.fetchOptimistic(s).catch(()=>{e.clearReset()});function Kt(s,t,e){const r=Qt(e),y=Ft(),u=Pt(),o=r.defaultQueryOptions(s);o._optimisticResults=y?"isRestoring":"optimistic",kt(o),Mt(o,u),At(u);const[l]=m.useState(()=>new t(r,o)),v=l.getOptimisticResult(o);if(m.useSyncExternalStore(m.useCallback(w=>{const c=y?()=>{}:l.subscribe(bt.batchCalls(w));return l.updateResult(),c},[l,y]),()=>l.getCurrentResult(),()=>l.getCurrentResult()),m.useEffect(()=>{l.setOptions(o,{listeners:!1})},[o,l]),Bt(o,v))throw l.setOptions(o,{listeners:!1}),jt(o,l,u);if(Lt({result:v,errorResetBoundary:u,throwOnError:o.throwOnError,query:l.getCurrentQuery()}))throw v.error;return o.notifyOnChangeProps?v:l.trackResult(v)}function qt(s,t){return Kt(s,Ut,t)}export{qt as u};