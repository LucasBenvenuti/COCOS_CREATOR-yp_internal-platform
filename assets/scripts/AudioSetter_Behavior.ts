
import { _decorator, Component, Node, find, Button, EventHandler, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioSetterBehavior')
export class AudioSetterBehavior extends Component {

    @property(AudioSource)
    buttonAudio: AudioSource = null!;

    start()
    {
        var self = this;
        self.setButtonsSound();
    }

    public setButtonsSound(){
        find("Canvas")
            ?.getComponentsInChildren(Button)
            .forEach((btn) => {
                var clickEventHandler = new EventHandler();
                clickEventHandler.target = this.node; // This node is the node to which your event handler code component belongs
                clickEventHandler.component = "AudioSetterBehavior";// This is the code file name
                clickEventHandler.handler = "playButtonSound";
                clickEventHandler.customEventData = "";
                
                btn.clickEvents.push(clickEventHandler);
            });
    }

    public playButtonSound(){
        if(this.buttonAudio){
            this.buttonAudio.playOneShot(this.buttonAudio.clip);
        }else{
            console.log("Button Audio Source dont exist");
        }
    }

}