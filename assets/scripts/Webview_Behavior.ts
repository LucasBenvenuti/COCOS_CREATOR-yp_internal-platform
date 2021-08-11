
import { _decorator, Component, UIOpacity, find, UITransform, WebView } from 'cc';
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

        self.currentCanvas = find("Canvas")?.getComponent(UITransform);
        self.webviewCont = find("Canvas/WebviewNode")?.getComponent(UIOpacity);
        self.webviewNode = find("Canvas/WebviewNode/WebView")?.getComponent(WebView);
    }
    
    start ()
    {
        var self = this;

        self.webviewNode.node.on(WebView.EventType.LOADING, (el)=> {
            console.log("LOADING...");
            console.log(el);
        }, self);
        
        self.webviewNode.node.on(WebView.EventType.LOADED, (el)=> {
            console.log("LOADED!!!");
            console.log(el);
            self.webviewCont.node.active = true;
        }, self);
        
        self.webviewCont.node.active = false;
    }

    onEventTypes (target: WebView, eventType: typeof WebView.EventType) {
        console.log("CURRENT TARGET - " + target);
        console.log("CURRENT EVENT - " + eventType);
    }

}
