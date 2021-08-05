
import { _decorator, Component, Node, Label, Sprite, AnimationComponent, WebView, UIOpacity, Color, tween, lerp, Button, director, TextureCube } from 'cc';
import { AudioController } from './AudioController';
import { ButtonsHelper } from './ButtonsHelper';
const { ccclass, property } = _decorator;

@ccclass('PlatformController')
export class PlatformController extends Component {

    public static instance : PlatformController =  null!;

    @property(Label)
    titleLabel: Label = null!;

    @property(Sprite)
    titleSpriteComponent: Sprite = null!;

    @property(AnimationComponent)
    titleAnimation: AnimationComponent = null!;

    @property(AnimationComponent)
    webviewParent_Anim: AnimationComponent = null!;

    @property(AnimationComponent)
    webview_Anim: AnimationComponent = null!;

    @property(WebView)
    webview: WebView = null!;

    @property(Node)
    closeWebviewButton:Node = null!;

    onLoad()
    {
        var self = this;
        
        if(PlatformController.instance != null && PlatformController.instance != self){
            self.destroy();
        }else{
            PlatformController.instance = self;
        }

        self.titleLabel.node.active = false;
        self.titleSpriteComponent.node.active = false;

        self.webview.node.active = false;

        self.webviewParent_Anim.node.active = false;
        let webviewParentOpacity = self.webviewParent_Anim.getComponent(UIOpacity)?.opacity;
        webviewParentOpacity = 0;

        self.webview.node.on(WebView.EventType.LOADED, self.webviewLoadedFunc, self);
        
        cocosAnalytics.enableDebug(true);
        console.log(cocosAnalytics.isInited());

        self.scheduleOnce(()=>{
            cocosAnalytics.CAAccount.loginStart({
                channel: '99999',
            });
        }, 2);
    }
    
    start()
    {
        if(AudioController.instance){
            AudioController.instance.startGameSound();
        }
        if(ButtonsHelper.instance){
            ButtonsHelper.instance.setButtonsScaleAnim(0.08, 0.75);
        }
    }

    openWebview(url: string) {
        var self = this;

        if(url === undefined || url === "")
        {
            console.log("URL not setted...");
        }
        else
        {
            if(!self.webviewParent_Anim || !self.webview_Anim || !self.webview)
            {
                console.log("WEBVIEW NOT SETTED");
                return;
            }

            self.webviewParent_Anim.node.active = true;

            self.webviewParent_Anim.play("Appear_UI");

            self.webview.node.active = true;
            self.webview.url = "http://localhost:7456/";
        }
    }

    closeWebview() {
        var self = this;

        if(!self.webviewParent_Anim || !self.webview_Anim || !self.webview)
        {
            console.log("WEBVIEW NOT SETTED");
            return;
        }

        self.webviewParent_Anim.play("Disappear_UI");
        self.webview_Anim.play("Disappear_UI");

        self.scheduleOnce(()=>{
            self.webview.url = "";
            self.webviewParent_Anim.node.active = false;
        }, 0.5);

    }

    webviewLoadedFunc(event: WebView ) {
        var self = this;
        console.log(event);

        self.webview_Anim.play("Appear_UI");
    }

    loadSceneFunc(event, customEventData)
    {
        director.loadScene(customEventData);
    }
}