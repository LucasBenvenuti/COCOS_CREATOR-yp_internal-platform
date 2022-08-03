
import { _decorator, Component, Node, AnimationComponent, Button, Sprite, SpriteFrame, BlockInputEvents } from 'cc';
import { AudioController } from './AudioController';
import { ButtonsHelper } from './ButtonsHelper';
const { ccclass, property } = _decorator;

@ccclass('MenuToggleBehavior')
export class MenuToggleBehavior extends Component {

    static instance : MenuToggleBehavior =  null; 

    menuOpened = false;
    scheduleCount = 0;

    @property(Sprite)
    icon: Sprite = null!;

    @property(SpriteFrame)
    menuIcon: SpriteFrame = null!;
    @property(SpriteFrame)
    closeMenuIcon: SpriteFrame = null!;

    @property(Button)
    menuButton: Button = null!;

    @property(Node)
    menuDropdown: Node = null!;

    @property(BlockInputEvents)
    blockInput: BlockInputEvents = null!;
    
    anim: AnimationComponent = null!;

    onLoad () {
        var self = this;

        MenuToggleBehavior.instance = self;

        self.anim = self.menuDropdown.getComponent(AnimationComponent);

        self.blockInput.enabled = false;
        console.log(self.blockInput);
    }

    start(){
        if(ButtonsHelper.instance){
            ButtonsHelper.instance.setEventFunction(this.menuButton.node, () => {
                this.toggleMenu();
            }, this);
        }
    }
    
    
    toggleMenu() {
        var self = this;
        
        this.scheduleCount = 0;
        if(this.menuOpened)
        {
            this.menuButton.interactable = false;
            
            this.blockInput.enabled = true;
            console.log(this.blockInput);
            
            this.unschedule(this.menuCloseTime);
            this.menuOpened = false;
            this.anim.play('MenuClose');
            
            // this.icon.spriteFrame = this.menuIcon;
            
            this.scheduleOnce(()=>{
                this.menuDropdown.active = false;
                this.menuButton.interactable = true;
                
                this.blockInput.enabled = false;
                this.menuButton.node.resumeSystemEvents(true);
                console.log(this.blockInput);
            }, 0.5);
        }
        else {
            
            this.blockInput.enabled = true;
            console.log(this.blockInput);
            
            this.menuDropdown.active = true;
            this.menuButton.interactable = false;
            this.menuOpened = true;
            this.anim.play('MenuOpen');
            this.schedule(this.menuCloseTime, 1);
            
            // this.icon.spriteFrame = this.closeMenuIcon;
            
            this.scheduleOnce(()=>{
                this.menuButton.interactable = true;
                this.menuButton.node.resumeSystemEvents(true);
                
                this.blockInput.enabled = false;
                console.log(this.blockInput);
            }, 0.5);
        }
    }
    
    menuCloseTime()
    {
        var self = this;
        
        self.scheduleCount++;
        if(self.scheduleCount == 7)
        {
            self.blockInput.enabled = true;
            
            self.menuButton.interactable = false;
            self.menuOpened = false;
            self.anim.play('MenuClose');
            
            // self.icon.spriteFrame = this.menuIcon;
            
            self.scheduleOnce(()=>{
                self.menuButton.interactable = true;
                this.menuButton.node.resumeSystemEvents(true);
                self.menuDropdown.active = false;
                
                self.blockInput.enabled = false;
            }, 0.5);
            
            self.unschedule(self.menuCloseTime);
        }
    }
    
    forceMenuCloseTime()
    {
        var self = this;

        if(!self.menuOpened){
            return;
        }else{

            self.blockInput.enabled = true;
            
            self.menuButton.interactable = false;
            self.menuOpened = false;
            self.anim.play('MenuClose');
            
            // self.icon.spriteFrame = this.menuIcon;
            
            self.scheduleOnce(()=>{
                self.menuButton.interactable = true;
                this.menuButton.node.resumeSystemEvents(true);
                self.menuDropdown.active = false;
                
                self.blockInput.enabled = false;
            }, 0.5);
            
            self.unschedule(self.menuCloseTime);
        }
    }
    
    
}