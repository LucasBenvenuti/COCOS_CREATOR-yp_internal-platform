
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

        if(self.tipsList.length > 1)
        {
            console.log(self.tipsList.length);

            let randomIndex = randomRangeInt(0, self.tipsList.length);
            
            if(self.currentIndex === randomIndex)
            {
                self.randomText();
                return;
            }
            
            self.currentIndex = randomIndex;
        }
        else
        {
            self.currentIndex = 0;
        }

        let newText = self.tipsList[self.currentIndex].replaceAll("<br>", "\n")
        
        self.textLabel.string = newText;

        self.scheduleOnce(()=> {
            tween(self.textOpacity).to(0.5, {
                opacity: 255
            }, {
                easing: "cubicInOut",
                onComplete: ()=> {
                    if(self.tipsList.length > 1)
                    {   
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
                }
            }).start();
        }, 0.2);
    }
}