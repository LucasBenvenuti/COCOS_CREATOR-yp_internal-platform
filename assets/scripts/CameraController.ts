
import { _decorator, Component, math, systemEvent, SystemEvent, macro, game, cclegacy, Touch, EventKeyboard, EventMouse, Node, Vec3, tween, quat, Quat, AnimationComponent, clamp, Collider, ITriggerEvent, find, SystemEventType, UIOpacity } from "cc";
import { AudioController } from "./AudioController";
import { DataStorage } from "./DataStorage";
import { Planet_Behavior } from "./Planet_Behavior";
import { PlatformController } from "./PlatformController";
const { ccclass, property } = _decorator;

const v2_1 = new math.Vec2();
const v2_2 = new math.Vec2();
const v3_1 = new math.Vec3();
const qt_1 = new math.Quat();
const id_forward = new math.Vec3(0, 0, 1);

@ccclass('CameraController')
export class CameraController extends Component {

    public static instance : CameraController = null!;

    @property(AnimationComponent)
    closeBtnAnim: AnimationComponent = null!;

	@property({ slide: true, range: [0.05, 0.5, 0.01] })
	damp = 0.2;

	@property
	rotateSpeed = 1;

    @property({ slide: true, range: [0, 70, 0.01] })
    limitUp_angle = 0;

    @property({ slide: true, range: [-70, 0, 0.01] })
    limitDown_angle = 0;

	_euler = new math.Vec3();
	_velocity = new math.Vec3();

    startCameraWorldPosition = new Vec3();
    startCameraRotation = new Quat();

    hasSelectedPlanet = false;
    canInteractWithPlanet = false;

    currentPlanetBehavior: Planet_Behavior = null!;

    collider: Collider = null!;

    descriptionIndex: number = 0;

	onLoad() {
        var self = this;

        // if(CameraController.instance != null && CameraController.instance != self){
        //     self.destroy();
        // }else{
            CameraController.instance = self;
        // }

        self.damp = 0.15;
        self.rotateSpeed = -0.08;
        self.limitUp_angle = 5;
        self.limitDown_angle = -10;

        self.closeBtnAnim = find("Canvas/CloseBtnCont/CloseBtn")?.getComponent(AnimationComponent);

		math.Vec3.copy(self._euler, self.node.eulerAngles);

        self.startCameraWorldPosition = self.node.getWorldPosition();
        self.startCameraRotation = self.node.getRotation();

        self.closeBtnAnim.node.active = false;

        self.collider = self.getComponentInChildren(Collider);

        self.collider?.on("onTriggerEnter", self.onTriggerEnter, self);
        self.collider?.on("onTriggerExit", self.onTriggerExit, self);
	}

	onDestroy() {
		this._removeEvents();
	}

	onEnable() {
		this._addEvents();
	}

	onDisable() {
		this._removeEvents();
	}

	update(dt: number) {
        var self = this;

        if(!self.hasSelectedPlanet)
        {
            // rotation
            // let clampedAngle = clamp(self._euler.x, self.limitDown_angle, self.limitUp_angle);

            math.Quat.fromEuler(qt_1, self._euler.x, self._euler.y, self._euler.z);
            math.Quat.slerp(qt_1, self.node.rotation, qt_1, dt / self.damp);
            
            // self.node.setRotationFromEuler

            self.node.setRotation(qt_1.x, qt_1.y, qt_1.z, qt_1.w);
        }
	}

	private _addEvents() {
		systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
	}

	private _removeEvents() {
		systemEvent.off(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
	}

	onTouchMove(e: Touch) {
        var self = this;

        e.getDelta(v2_2);

        if(!self.hasSelectedPlanet)
        {
            this._euler.y -= v2_2.x * self.rotateSpeed;

            let clampedAngle = clamp(self._euler.x + (v2_2.y * self.rotateSpeed), self.limitDown_angle, self.limitUp_angle);
            this._euler.x = clampedAngle;
        }

        if(self.currentPlanetBehavior && self.canInteractWithPlanet)
        {
            self.currentPlanetBehavior.addTorqueToPlanet(e.getDelta().x);
        }
	}

    goToPlanet(planet: Node)
    {
        var self = this;
        
        if(self.hasSelectedPlanet)
            return;

        self.hasSelectedPlanet = true;
        self.collider.node.active = false;

        window.GASendEnteredWorld(self.currentPlanetBehavior.planetTitle);
        
        self.scheduleOnce(()=>{
            self.startCameraRotation = self.node.getRotation();
            
            self.currentPlanetBehavior = planet.getComponent('Planet_Behavior');
            
            if(!self.currentPlanetBehavior)
            return;

            AudioController.instance.playGoToPlanetSource();
    
            self.translateCameraToCustomValue(self.currentPlanetBehavior.cameraPoint.getWorldPosition());
    
            self.scheduleOnce(()=> {
                self.rotateCameraToCustomValue(self.currentPlanetBehavior.cameraPoint.getRotation());
            }, 1);

            self.scheduleOnce(()=>{
                for(let i = 0; i < self.currentPlanetBehavior.planetIcons_Anim.length; i++)
                {
                    self.scheduleOnce(()=>{
                        // console.log(self.currentPlanetBehavior.planetIcons_Anim[i]);
                        self.currentPlanetBehavior.planetIcons_Anim[i].node.active = true;
                        self.currentPlanetBehavior.planetIcons_Anim[i].play("AppearIcon");
                    }, i * 0.15 );
                }
            }, 1.2);
    
            //TIME TO WAIT TO INTERACT WITH SELECTED PLANET
            self.scheduleOnce(()=> {
                self.canInteractWithPlanet = true;

                self.closeBtnAnim.node.active = true;
                self.closeBtnAnim.play('Btn_Appear_UI');

                PlatformController.instance.titleSpriteComponent.spriteFrame = self.currentPlanetBehavior.planetTitleImg;
                PlatformController.instance.titleAnimation.play("Appear_TitleImages");

                if(self.currentPlanetBehavior.planetTitle === "Fruticultura, Floricultura e Olericultura")
                {
                    PlatformController.instance.titleLabel.string = "FRUTICULTURA";
                }
                else
                {   
                    PlatformController.instance.titleLabel.string = self.currentPlanetBehavior.planetTitle;
                }

                self.descriptionIndex = 0;

                PlatformController.instance.nextButton_description.node.on(SystemEventType.TOUCH_START, self.nextDescriptionLabel, self);
                PlatformController.instance.prevButton_description.node.on(SystemEventType.TOUCH_START, self.prevDescriptionLabel, self);

                PlatformController.instance.descriptionCount.string = (self.descriptionIndex + 1) + "/" + self.currentPlanetBehavior.planetDescription.length;

                let descriptionTextVar = self.currentPlanetBehavior.planetDescription[self.descriptionIndex];
                descriptionTextVar = descriptionTextVar.replaceAll("<br>", "\n");
                PlatformController.instance.descriptionTxt.string = descriptionTextVar;

                PlatformController.instance.planetDescription.node.active = true;
                PlatformController.instance.planetDescription.play("appear");
                // PlatformController.instance.titleLabel.getComponent(AnimationComponent)?.play("Appear_UI");

                DataStorage.instance.setPlanetSelected(self.currentPlanetBehavior);
            }, 2.2);
        }, 0.5);
    }

    nextDescriptionLabel ()
    {
        var self = this;

        if(self.descriptionIndex == (self.currentPlanetBehavior.planetDescription.length - 1))
        {
            self.descriptionIndex = 0;
        }
        else
        {
            self.descriptionIndex++;
        }

        tween(PlatformController.instance.descriptionTxt.getComponent(UIOpacity)).to(0.25, {
            opacity: 0
        }, {
            easing: "cubicInOut",
            onStart: ()=> {
                PlatformController.instance.nextButton_description.interactable = false;
                PlatformController.instance.prevButton_description.interactable = false;

                PlatformController.instance.nextButton_description.node.pauseSystemEvents(true);
                PlatformController.instance.prevButton_description.node.pauseSystemEvents(true);
            },
            onComplete: ()=> {
                let descriptionTextVar = self.currentPlanetBehavior.planetDescription[self.descriptionIndex];
                descriptionTextVar = descriptionTextVar.replaceAll("<br>", "\n");

                if(self.currentPlanetBehavior.planetTitle === "Fruticultura, Floricultura e Olericultura")
                {
                    if(self.descriptionIndex == 0 || self.descriptionIndex == 1)
                    {
                        PlatformController.instance.titleLabel.string = "FRUTICULTURA";
                    }
                    else if(self.descriptionIndex == 2 || self.descriptionIndex == 3)
                    {
                        PlatformController.instance.titleLabel.string = "FLORICULTURA";
                    }
                    else if(self.descriptionIndex == 4 || self.descriptionIndex == 5)
                    {
                        PlatformController.instance.titleLabel.string = "OLERICULTURA";
                    }
                }
                else
                {   
                    PlatformController.instance.titleLabel.string = self.currentPlanetBehavior.planetTitle;
                }

                PlatformController.instance.descriptionTxt.string = descriptionTextVar;
                PlatformController.instance.descriptionCount.string = (self.descriptionIndex + 1) + "/" + self.currentPlanetBehavior.planetDescription.length;

                tween(PlatformController.instance.descriptionTxt.getComponent(UIOpacity)).to(0.25, {
                    opacity: 255
                }, {
                    easing: "cubicInOut",
                    onComplete: ()=> {
                        PlatformController.instance.nextButton_description.interactable = true;
                        PlatformController.instance.prevButton_description.interactable = true;

                        PlatformController.instance.nextButton_description.node.resumeSystemEvents(true);
                        PlatformController.instance.prevButton_description.node.resumeSystemEvents(true);
                    }
                }).start();
            }
        }).start();
    }
    prevDescriptionLabel ()
    {
        var self = this;

        if(self.descriptionIndex == 0)
        {
            self.descriptionIndex = (self.currentPlanetBehavior.planetDescription.length - 1);
        }
        else
        {
            self.descriptionIndex--;
        }

        tween(PlatformController.instance.descriptionTxtOpacity).to(0.25, {
            opacity: 0
        }, {
            easing: "cubicInOut",
            onStart: ()=> {
                PlatformController.instance.nextButton_description.interactable = false;
                PlatformController.instance.prevButton_description.interactable = false;

                PlatformController.instance.nextButton_description.node.pauseSystemEvents(true);
                PlatformController.instance.prevButton_description.node.pauseSystemEvents(true);
            },
            onComplete: ()=> {
                let descriptionTextVar = self.currentPlanetBehavior.planetDescription[self.descriptionIndex];
                descriptionTextVar = descriptionTextVar.replaceAll("<br>", "\n");

                if(self.currentPlanetBehavior.planetTitle === "Fruticultura, Floricultura e Olericultura")
                {
                    if(self.descriptionIndex == 0 || self.descriptionIndex == 1)
                    {
                        PlatformController.instance.titleLabel.string = "FRUTICULTURA";
                    }
                    else if(self.descriptionIndex == 2 || self.descriptionIndex == 3)
                    {
                        PlatformController.instance.titleLabel.string = "FLORICULTURA";
                    }
                    else if(self.descriptionIndex == 4 || self.descriptionIndex == 5)
                    {
                        PlatformController.instance.titleLabel.string = "OLERICULTURA";
                    }
                }
                else
                {   
                    PlatformController.instance.titleLabel.string = self.currentPlanetBehavior.planetTitle;
                }
                
                PlatformController.instance.descriptionTxt.string = descriptionTextVar;
                PlatformController.instance.descriptionCount.string = (self.descriptionIndex + 1) + "/" + self.currentPlanetBehavior.planetDescription.length;

                tween(PlatformController.instance.descriptionTxtOpacity).to(0.25, {
                    opacity: 255
                }, {
                    easing: "cubicInOut",
                    onComplete: ()=> {
                        PlatformController.instance.nextButton_description.interactable = true;
                        PlatformController.instance.prevButton_description.interactable = true;

                        PlatformController.instance.nextButton_description.node.resumeSystemEvents(true);
                        PlatformController.instance.prevButton_description.node.resumeSystemEvents(true);
                    }
                }).start();
            }
        }).start();
    }

    translateCameraToCustomValue(newPosValue: Vec3)
    {
        var self = this;

        tween(self.node.getWorldPosition()).to(2.5, new Vec3(newPosValue), {
            easing: 'quadInOut',
            'onUpdate': (currentValue: Vec3) => {
                self.node.setWorldPosition(currentValue);
            }
        }).start();
    }

    easeInOutCubic(t: number) {
        return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
    }

    rotateCameraToCustomValue(newRotValue: Quat)
    {
        var self = this;

        const tw = tween(this.node);// Use tween animation
        const quat_start = new Quat();

        this.node.getRotation(quat_start);// Get the starting quaternion
        var quat_end = new Quat(); // The final rotating quaternion assumes that it has been calculated
        const quat_now = new Quat();// Use an intermediate variable

        quat_end = newRotValue;
        
        tw.to(1.6, {}, {
            easing: 'cubicInOut',
            onUpdate: (target, ratio: number) => {
                
                // console.log(ratio);
                // console.log();

                // ratio : 0~1
        // The spherical interpolation is used here, so there will be no deformation when rotating
                quat_now.set(quat_start).slerp(quat_end, self.easeInOutCubic(ratio));
                this.node.setRotation(quat_now);
            },
        })
        tw.start();
    }

    returnToStartPosition() {
        var self = this;

        if(!self.hasSelectedPlanet || !self.currentPlanetBehavior)
            return;

            PlatformController.instance.nextButton_description.node.off(SystemEventType.TOUCH_START, self.nextDescriptionLabel, self);
            PlatformController.instance.prevButton_description.node.off(SystemEventType.TOUCH_START, self.prevDescriptionLabel, self);

            DataStorage.instance.setPlanetSelected(null);

            self.scheduleOnce(()=>{
                AudioController.instance.playReturnFromPlanetSource();
            }, 0.2);

            for(let i = 0; i < self.currentPlanetBehavior.planetIcons_Anim.length; i++)
            {
                self.currentPlanetBehavior.planetIcons_Anim[i].play("DisappearIcon");
            }

            self.closeBtnAnim.play('Btn_Disappear_UI');
            // PlatformController.instance.titleLabel.getComponent(AnimationComponent)?.play("Disappear_UI");
            PlatformController.instance.titleAnimation.play("Disappear_TitleImages");
            self.scheduleOnce(()=>{
                self.closeBtnAnim.node.active = false;
                PlatformController.instance.titleSpriteComponent.spriteFrame = null;
                PlatformController.instance.planetDescription.play("disappear");
                self.scheduleOnce(()=> {
                    PlatformController.instance.titleLabel.string = "";
                    PlatformController.instance.planetDescription.node.active = false;
                }, 0.5);
                // PlatformController.instance.titleLabel.node.active = false;
            }, 0.5);

        self.canInteractWithPlanet = false;

        self.currentPlanetBehavior.returnToStartRotation();

        self.translateCameraToCustomValue(self.startCameraWorldPosition);
        self.rotateCameraToCustomValue(self.startCameraRotation);

        self.scheduleOnce(()=>{
            self.hasSelectedPlanet = false;
            self.currentPlanetBehavior = null;

            self.collider.node.active = true;
        }, 2.5);
    }

    onTriggerEnter(event: ITriggerEvent) {
        // console.log("Debug TriggerEvent Group number - " + event.selfCollider.attachedRigidBody?.group);
        
        // if(event.selfCollider.attachedRigidBody?.group !== 4)
        //     return;
    
        let planet = event.otherCollider.getComponent(Planet_Behavior);

        if(planet)
            planet?.LogoAnim.play("Logo_Appear");
    }

    onTriggerExit(event: ITriggerEvent) {
        // console.log("Debug TriggerEvent Group number - " + event.selfCollider.attachedRigidBody?.group);
        
        // if(event.selfCollider.attachedRigidBody?.group !== 4)
        //     return;

        let planet = event.otherCollider.getComponent(Planet_Behavior);

        if(planet)
            planet?.LogoAnim.play("Logo_Disappear");
    }

    public getCurrentURLFromSelectedIcon(nodeByAnimationComponent: AnimationComponent): string
    {
        var self = this;

        let index = self.currentPlanetBehavior.planetIcons_Anim.indexOf(nodeByAnimationComponent);
        let url = self.currentPlanetBehavior.webviewURLs[index];

        window.GASendEnteredGame(self.currentPlanetBehavior.gameNames[index]);

        return url;
    }
}