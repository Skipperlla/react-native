import*as e from"../../core/i18n/i18n.js";import*as t from"../../ui/legacy/legacy.js";import*as i from"../../core/sdk/sdk.js";import*as s from"../../third_party/react-devtools/react-devtools.js";import*as n from"../../models/react_native/react_native.js";class o extends i.SDKModel.SDKModel{static FUSEBOX_BINDING_NAMESPACE="react-devtools";rdtModel;constructor(e){super(e);const t=e.model(n.ReactDevToolsBindingsModel.ReactDevToolsBindingsModel);if(!t)throw new Error("Failed to construct ReactDevToolsModel: ReactDevToolsBindingsModel was null");this.rdtModel=t,t.addEventListener("Initialized",this.initialize,this)}initialize(){const e=this.rdtModel;if(!e)throw new Error("Failed to initialize ReactDevToolsModel: ReactDevToolsBindingsModel was null");e.subscribeToDomainMessages(o.FUSEBOX_BINDING_NAMESPACE,(e=>this.onMessage(e))),e.initializeDomain(o.FUSEBOX_BINDING_NAMESPACE).then((()=>this.onInitialization()))}onInitialization(){this.dispatchEventToListeners("Initialized")}async sendMessage(e){const t=this.rdtModel;if(!t)throw new Error("Failed to send message from ReactDevToolsModel: ReactDevToolsBindingsModel was null");await t.sendMessage(o.FUSEBOX_BINDING_NAMESPACE,e)}onMessage(e){this.dispatchEventToListeners("MessageReceived",e)}}i.SDKModel.SDKModel.register(o,{capabilities:4,autostart:!1});var a=Object.freeze({__proto__:null,ReactDevToolsModel:o});const r={title:"React DevTools"},d=e.i18n.registerUIStrings("panels/react_devtools/ReactDevToolsView.ts",r),l=e.i18n.getLocalizedString.bind(void 0,d),c="main";class h extends t.View.SimpleView{wall;bridge;store;listeners=new Set;constructor(){super(l(r.title)),this.wall={listen:e=>(this.listeners.add(e),()=>{this.listeners.delete(e)}),send:(e,t)=>this.sendMessage(e,t)},this.bridge=s.createBridge(this.wall),this.store=s.createStore(this.bridge),window.addEventListener("beforeunload",(()=>this.bridge.shutdown())),i.TargetManager.TargetManager.instance().addModelListener(o,"MessageReceived",this.onMessage,this),i.TargetManager.TargetManager.instance().addModelListener(o,"Initialized",this.initialize,this),i.TargetManager.TargetManager.instance().addModelListener(i.RuntimeModel.RuntimeModel,i.RuntimeModel.Events.ExecutionContextDestroyed,this.onExecutionContextDestroyed,this),i.TargetManager.TargetManager.instance().addModelListener(i.RuntimeModel.RuntimeModel,i.RuntimeModel.Events.ExecutionContextCreated,this.onExecutionContextCreated,this),this.renderLoader()}renderLoader(){const e=document.createElement("div");e.setAttribute("style","display: flex; flex: 1; justify-content: center; align-items: center");const t=document.createElement("span");t.classList.add("spinner"),e.appendChild(t),this.contentElement.appendChild(e)}clearLoader(){this.contentElement.removeChildren()}initialize(){this.clearLoader();const e=window.matchMedia("(prefers-color-scheme: dark)").matches;s.initialize(this.contentElement,{bridge:this.bridge,store:this.store,theme:e?"dark":"light"})}wasShown(){super.wasShown(),this.registerCSSFiles([s.CSS])}onMessage(e){if(e.data)for(const t of this.listeners)t(e.data)}sendMessage(e,t){for(const s of i.TargetManager.TargetManager.instance().models(o,{scoped:!0}))s.sendMessage({event:e,payload:t})}onExecutionContextDestroyed(e){e.data.name===c&&(this.contentElement.removeChildren(),this.bridge.shutdown(),this.listeners.clear(),this.renderLoader())}onExecutionContextCreated(e){e.data.name===c&&(this.bridge=s.createBridge(this.wall),this.store=s.createStore(this.bridge),this.initialize())}}var g=Object.freeze({__proto__:null,ReactDevToolsViewImpl:h});export{a as ReactDevToolsModel,g as ReactDevToolsView};
