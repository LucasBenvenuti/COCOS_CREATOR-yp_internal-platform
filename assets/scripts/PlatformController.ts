
import { _decorator, Component, Node, Label, Sprite, AnimationComponent, WebView, UIOpacity, Color, tween, lerp } from 'cc';
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

    @property(Node)
    webviewParent: Node = null!;

    @property(AnimationComponent)
    webview_Animation: AnimationComponent = null!;

    webviewUI: WebView = null!;

    webviewParent_Sprite: Sprite = null!;
    webview_opacity: UIOpacity = null!;

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

        self.webviewParent_Sprite = self.webviewParent.getComponent(Sprite)?.material;
        self.webview_opacity = self.webview_Animation.getComponent(UIOpacity);

        if(self.webviewParent_Sprite)
        {
            self.webviewParent_Sprite.color = new Color(0,0,0,0);
        }
        
        if(self.webview_opacity)
        {
            self.webview_opacity.opacity = 0;
        }

        self.webviewUI = self.webview_Animation.getComponent(WebView);
        self.webviewParent.active = false;
        
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
            if(!self.webviewUI)
            {
                console.log("WEBVIEW NOT SETTED");
                return;
            }

            console.log("OPEN HERE WEBVIEWWITH LINK - " + url);

            self.webviewParent.active = true;

            tween(self.webviewParent_Sprite).to(5, { color: new Color(0,0,0,200) }, {
                easing: 'quadInOut',
                onUpdate: (ratio: number)=> {
                    // self.webviewParent_Sprite.color = new Color(0,0,0, lerp(0, 200, ratio));
                    // self.webviewParent.active = false;
                },
                onComplete: ()=> {
                    // self.webviewParent.active = false;
                }
            }).start();

            // self.webviewUI.

            self.scheduleOnce(()=>{
                // self.webview_Animation.play("Appear_UI");
            }, 1);
        }
    }

    closeWebview() {
        var self = this;

        if(!self.webviewUI)
        {
            console.log("WEBVIEW NOT SETTED");
            return;
        }

        tween(self.webviewParent_Sprite).to(1.5, { color: new Color(0,0,0,0) }, {
            easing: 'quadInOut',
            onComplete: ()=> {
                self.webviewParent.active = false;
            }
        }).start();

        self.webview_Animation.play("Disappear_UI");
    }
}