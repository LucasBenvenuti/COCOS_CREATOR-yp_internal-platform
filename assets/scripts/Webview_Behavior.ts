
import { _decorator, Component, UIOpacity, find, UITransform, WebView, director } from 'cc';
import { DataStorage } from './DataStorage';
const { ccclass, property } = _decorator;

@ccclass('WebviewBehavior')
export class WebviewBehavior extends Component {

    public static instance : WebviewBehavior =  null!;

    currentCanvas: UITransform = null!;
    webviewCont: UIOpacity = null!;
    webviewNode: WebView = null!;

    onLoad ()
    {
        var self = this;
        
        WebviewBehavior.instance = self;

        // self.currentCanvas = find("Canvas")?.getComponent(UITransform);
        // self.webviewCont = find("Canvas/WebviewNode")?.getComponent(UIOpacity);
        self.webviewNode = find("Canvas/WebviewNode/WebView")?.getComponent(WebView);
    }
    
    start ()
    {
        var self = this;

        if(DataStorage.instance)
            DataStorage.instance.currentScene = "WebviewScene";

        // self.webviewNode.node.on(WebView.EventType.LOADING, (el)=> {
        //     console.log("LOADING...");
        //     console.log(el);
        // }, self);
        
        // self.webviewNode.node.on(WebView.EventType.LOADED, (el)=> {
        //     console.log("LOADED!!!");
        //     console.log(el);
        //     // self.webviewCont.node.active = true;
        // }, self);
        
        // self.webviewCont.node.active = false;

        let scheme = "testkey";

        function jsCallback (target, url) {
            // The return value here is the URL value of the internal page, and it needs to parse the data it needs.
            let str = url.replace(scheme + '://', ''); // str === 'a=1&b=2'
            // webview target
            console.log(target);
        }

        self.webviewNode.setJavascriptInterfaceScheme(scheme);
        self.webviewNode.setOnJSCallback(jsCallback);
    }

    // onEventTypes (target: WebView, eventType: typeof WebView.EventType) {
    //     console.log("CURRENT TARGET - " + target);
    //     console.log("CURRENT EVENT - " + eventType);
    // }

    checkWebview ()
    {
        var self = this;

        console.log("CARREGAR WEBVIEW!!");
    }

}
