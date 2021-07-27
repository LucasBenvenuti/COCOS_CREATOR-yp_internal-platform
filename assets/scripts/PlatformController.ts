
import { _decorator, Component, Node, Label, Sprite, AnimationComponent } from 'cc';
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

    onLoad() {
        var self = this;
        
        if(PlatformController.instance != null && PlatformController.instance != self){
            self.destroy();
        }else{
            PlatformController.instance = self;
        }

        self.titleLabel.node.active = false;
        self.titleSpriteComponent.node.active = false;
        
        cocosAnalytics.enableDebug(true);
        console.log(cocosAnalytics.isInited());

        self.scheduleOnce(()=>{
            cocosAnalytics.CAAccount.loginStart({
                channel: '99999',
            });
        }, 2);
    }
    
    start() {
        
    }
}