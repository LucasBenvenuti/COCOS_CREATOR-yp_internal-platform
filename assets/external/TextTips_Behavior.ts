
import { _decorator, Component, Node, Label, tween, randomRangeInt, UIOpacity, random } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TextTipsBehavior')
export class TextTipsBehavior extends Component {
    
    @property([String])
    tipsList: string[] = [];

    textLabel: Label = null!;
    textOpacity: UIOpacity = null!;

    currentIndex = 0;

    textDuration = 5; //In seconds

    onEnable()
    {
        var self = this;
        self.textLabel = this.getComponent(Label);
        self.textOpacity = this.getComponent(UIOpacity);

        self.randomText();
    }

    randomText()
    {
        var self = this;
        
        let randomIndex = randomRangeInt(0, this.tipsList.length - 1);

        if(this.currentIndex === randomIndex)
        {
            self.randomText();
            return;
        }

        this.currentIndex = randomIndex;

        self.textLabel.string = self.tipsList[this.currentIndex];

        self.scheduleOnce(()=> {
            tween(self.textOpacity).to(0.5, {
                opacity: 255
            }, {
                easing: "cubicInOut",
                onComplete: ()=> {
                    self.scheduleOnce(()=>{
                        tween(self.textOpacity).to(0.5, {
                            opacity: 0
                        }, {
                            easing: "cubicInOut",
                            onComplete: ()=> {
                                self.randomText();
                            }
                        }).start();
                    }, self.textDuration);
                }
            }).start();
        }, 0.2);
    }
}