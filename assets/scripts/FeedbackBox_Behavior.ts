
import { _decorator, Component, Node, UIOpacity, Label, tween, Vec3, lerp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FeedbackBoxBehavior')
export class FeedbackBoxBehavior extends Component {

    @property(UIOpacity)
    errorNode: UIOpacity = null!;
    @property(Label)
    errorLabel: Label = null!;

    forcedToDestroy = false;
    alreadyDestroying = false;

    onLoad () {
        var self = this;
        self.errorNode.opacity = 0;

        self.node.setPosition(new Vec3(0, 30, 0));
    }

    callBox(text: string, duration: number) {
        var self = this;
        tween(self.node).to(duration, {position: new Vec3(0,0,0)}, {
            easing: 'quadInOut',
            onStart: () => {
                self.errorNode.node.active = true;
                self.errorLabel.string = text;
            },
            onUpdate: (target: object, ratio: number)=> {

                let newOpacity = lerp(0, 255, ratio);
                self.errorNode.opacity = newOpacity;
            },
            onComplete: ()=>{
                self.scheduleOnce(()=> {

                    if(!self.forcedToDestroy)
                    {
                        self.alreadyDestroying = true;

                        tween(self.errorNode).to(duration, {opacity: 0}, {
                            easing: 'quadInOut',
                            onComplete: () => {
                                self.errorLabel.string = "";
                                self.errorNode.node.active = false;
                                
                                self.node.destroy();
                            },
                        }).start();
                    }
                }, 5);
            }
        }).union().start();
    }

    forceToDestroy(duration: number) {
        var self = this;
        if(self.alreadyDestroying)
            return;

        tween(self.errorNode).to(duration, {opacity: 0}, {
            easing: 'quadInOut',
            onComplete: () => {
                self.errorLabel.string = "";
                self.errorNode.node.active = false;
                    
                self.node.destroy();
            },
        }).start();
    }
}