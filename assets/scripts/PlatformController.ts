
import { _decorator, Component, Node, Label, Sprite, AnimationComponent, WebView, UIOpacity, Color, tween, lerp, Button, director, TextureCube, find, SystemEventType } from 'cc';
import { AudioController } from './AudioController';
import { ButtonsHelper } from './ButtonsHelper';
import { DataStorage } from './DataStorage';
import { SceneChange_Behavior } from '../external/SceneChange_Behavior';
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

    menuContainer: UIOpacity = null!;
    closeBtn: UIOpacity = null!;
    descriptionContainer: UIOpacity = null!;

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
        self.menuContainer = find("Canvas/OpenMenuButton")?.getComponent(UIOpacity);
        self.closeBtn = find("Canvas/CloseBtnCont")?.getComponent(UIOpacity);
        self.descriptionContainer = find("Canvas/PlanetDescription")?.getComponent(UIOpacity);
        self.planetDescription = find("Canvas/PlanetDescription")?.getComponent(AnimationComponent);
        self.nextButton_description = find("Canvas/PlanetDescription/ContBttns/NextButton")?.getComponent(Button);
        self.prevButton_description = find("Canvas/PlanetDescription/ContBttns/PrevButton")?.getComponent(Button);

        // self.titleLabel.node.active = false;
        self.titleSpriteComponent.node.active = false;

        self.planetDescription.node.active = false;

        if(DataStorage.instance)
            DataStorage.instance.currentScene = "Platform_OPTIMIZED";
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

        this.menuContainer.node.active = false;
        this.menuContainer.opacity = 0;
    }
    
    showMenuContainer(show: boolean)
    {
        if(show)
        {
            tween(this.menuContainer).to(0.5, {opacity: 255}, {easing: 'cubicInOut', onStart: ()=>{ this.menuContainer.node.active = true; }}).start();
        }
        else
        {
            tween(this.menuContainer).to(0.5, {opacity: 0}, {easing: 'cubicInOut', onComplete: ()=>{ this.menuContainer.node.active = false; }}).start();
        }
    }

    showCloseBtn(show: boolean)
    {
        if(show)
        {
            tween(this.closeBtn).to(0.5, {opacity: 255}, {easing: 'cubicInOut', onStart: ()=>{ this.closeBtn.node.active = true; }}).start();
        }
        else
        {
            tween(this.closeBtn).to(0.5, {opacity: 0}, {easing: 'cubicInOut', onComplete: ()=>{ this.closeBtn.node.active = false; }}).start();
        }
    }

    showDescriptionContainer(show: boolean)
    {
        if(show)
        {
            tween(this.descriptionContainer).to(0.5, {opacity: 255}, {easing: 'cubicInOut', onStart: ()=>{ this.descriptionContainer.node.active = true; }}).start();
        }
        else
        {
            tween(this.descriptionContainer).to(0.5, {opacity: 0}, {easing: 'cubicInOut', onComplete: ()=>{ this.descriptionContainer.node.active = false; }}).start();
        }
    }

    goToWebview(url: string) {
        var self = this;

        if(url === undefined || url === "")
        {
            console.log("URL not setted...");
        }
        else
        {
            if(DataStorage.instance)
            {
                DataStorage.instance.setWebviewURL(url);

                //GO TO SCENE HERE
                if(SceneChange_Behavior.instance)
                    SceneChange_Behavior.instance.gameSceneLoad(url);
            }
        }
    }

    logoutFunction()
    {
        if(SceneChange_Behavior.instance)
            SceneChange_Behavior.instance.logout();
    }
}