
import { _decorator, Component, Node, Label, Sprite, AnimationComponent, WebView, UIOpacity, Color, tween, lerp, Button, director, TextureCube, find, SystemEventType } from 'cc';
import { AudioController } from './AudioController';
import { ButtonsHelper } from './ButtonsHelper';
const { ccclass, property } = _decorator;

@ccclass('PlatformController')
export class PlatformController extends Component {

    public static instance : PlatformController =  null!;

    @property(Label)
    titleLabel: Label = null!;

    @property(Label)
    descriptionTxt: Label = null!;

    descriptionTxtOpacity: UIOpacity = null!;

    @property(Label)
    descriptionCount: Label = null!;

    @property(Sprite)
    titleSpriteComponent: Sprite = null!;

    @property(AnimationComponent)
    titleAnimation: AnimationComponent = null!;

    @property(AnimationComponent)
    planetDescription: AnimationComponent = null!;

    @property(Button)
    nextButton_description: Button = null!;

    @property(Button)
    prevButton_description: Button = null!;

    // @property(AnimationComponent)
    // webviewParent_Anim: AnimationComponent = null!;

    // @property(AnimationComponent)
    // webview_Anim: AnimationComponent = null!;

    // @property(WebView)
    // webview: WebView = null!;

    // @property(Node)
    // closeWebviewButton:Node = null!;

    @property(UIOpacity)
    soundContainer: UIOpacity = null!;

    onLoad()
    {
        var self = this;
        
        // if(PlatformController.instance != null && PlatformController.instance != self){
            // self.destroy();
        // }else{
            PlatformController.instance = self;
        // }

        self.titleLabel = find("Canvas/PlanetDescription/Planet_Title")?.getComponent(Label);
        self.descriptionTxt = find("Canvas/PlanetDescription/DescriptionTxt")?.getComponent(Label);
        self.descriptionTxtOpacity = self.descriptionTxt.getComponent(UIOpacity);
        self.descriptionCount = find("Canvas/PlanetDescription/ContBttns/PgQty")?.getComponent(Label);
        self.titleSpriteComponent = find("Canvas/Planet_Titles_Images/Title_Image")?.getComponent(Sprite);
        self.titleAnimation = find("Canvas/Planet_Titles_Images")?.getComponent(AnimationComponent);
        self.soundContainer = find("Canvas/SoundContainer")?.getComponent(UIOpacity);
        self.planetDescription = find("Canvas/PlanetDescription")?.getComponent(AnimationComponent);

        self.nextButton_description = find("Canvas/PlanetDescription/ContBttns/NextButton")?.getComponent(Button);
        self.prevButton_description = find("Canvas/PlanetDescription/ContBttns/PrevButton")?.getComponent(Button);

        // self.titleLabel.node.active = false;
        self.titleSpriteComponent.node.active = false;

        self.planetDescription.node.active = false;

        // self.webview.node.on(WebView.EventType.LOADED, self.webviewLoadedFunc, self);
        
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
        var self = this;
        if(AudioController.instance){
            AudioController.instance.startGameSound();
        }
        if(ButtonsHelper.instance){
            ButtonsHelper.instance.setButtonsScaleAnim(0.08, 0.75);
        }

        this.soundContainer.node.active = false;
        this.soundContainer.opacity = 0;
    }
    
    showSoundCointainer(show: boolean)
    {
        if(show)
        {
            tween(this.soundContainer).to(0.5, {opacity: 255}, {easing: 'cubicInOut', onStart: ()=>{ this.soundContainer.node.active = true; }}).start();
        }
        else
        {
            tween(this.soundContainer).to(0.5, {opacity: 0}, {easing: 'cubicInOut', onComplete: ()=>{ this.soundContainer.node.active = false; }}).start();
        }

    }

    // openWebview(url: string) {
    //     var self = this;

    //     if(url === undefined || url === "")
    //     {
    //         console.log("URL not setted...");
    //     }
    //     else
    //     {
    //         if(!self.webviewParent_Anim || !self.webview_Anim || !self.webview)
    //         {
    //             console.log("WEBVIEW NOT SETTED");
    //             return;
    //         }

    //         self.webviewParent_Anim.node.active = true;

    //         self.webviewParent_Anim.play("Appear_UI");

    //         self.webview.node.active = true;
    //         self.webview.url = "http://localhost:7456/";
    //     }
    // }

    // closeWebview() {
    //     var self = this;

    //     if(!self.webviewParent_Anim || !self.webview_Anim || !self.webview)
    //     {
    //         console.log("WEBVIEW NOT SETTED");
    //         return;
    //     }

    //     self.webviewParent_Anim.play("Disappear_UI");
    //     self.webview_Anim.play("Disappear_UI");

    //     self.scheduleOnce(()=>{
    //         self.webview.url = "";
    //         self.webviewParent_Anim.node.active = false;
    //     }, 0.5);

    // }

    // webviewLoadedFunc(event: WebView ) {
    //     var self = this;
    //     console.log(event);

    //     self.webview_Anim.play("Appear_UI");
    // }
}