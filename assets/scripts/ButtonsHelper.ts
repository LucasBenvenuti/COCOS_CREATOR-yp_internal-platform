
import { _decorator, Component, Node, find, Button, SystemEventType, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonsHelper')
export class ButtonsHelper extends Component {

    public static instance : ButtonsHelper =  null;

  onLoad(){
        if(ButtonsHelper.instance != null && ButtonsHelper.instance != this){
            this.destroy();
        }else{
            ButtonsHelper.instance = this;
            game.addPersistRootNode(this.node);
        }
    }

   public setEventFunction(eventNode: Node, eventFunction: Function, eventThis: any){
        eventNode.on(SystemEventType.TOUCH_START, () =>{
            setTimeout(() => {
                if(eventNode.getComponent(Button) != null){
                    eventNode.getComponent(Button).interactable = false;
                }
                eventNode.pauseSystemEvents(true);
                eventFunction();
            }, 80);
            if(eventNode.getComponent(Button) != null){
                eventNode.getComponent(Button).interactable = true;
            }   
        }, eventThis);
    }


    //transitionType 0->NONE 1->COLOR 2->SPRITE 3->SCALE
     public setButtonsScaleAnim(transitionDuration: number, transitionZoomScale: number,) {
        find("Canvas")
            ?.getComponentsInChildren(Button)
            .forEach((btn) => {
                btn.transition = 3;
                btn.duration = transitionDuration;
                btn.zoomScale = transitionZoomScale;
            });
    }

     public setInputActive(eventNode: Node, active: boolean) {
        if (active) {
            eventNode.resumeSystemEvents(true);
        } else {
            eventNode.pauseSystemEvents(true);
        }
    }

}


/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
