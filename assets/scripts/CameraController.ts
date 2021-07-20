
import { _decorator, Component, math, systemEvent, SystemEvent, macro, game, cclegacy, Touch, EventKeyboard, EventMouse, Node, Vec3, tween, quat, Quat, AnimationComponent, clamp } from "cc";
import { Planet_Behavior } from "./Planet_Behavior";
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

	onLoad() {
        var self = this;

        if(CameraController.instance != null && CameraController.instance != self){
            self.destroy();
        }else{
            CameraController.instance = self;
        }

		math.Vec3.copy(self._euler, self.node.eulerAngles);

        self.startCameraWorldPosition = self.node.getWorldPosition();
        self.startCameraRotation = self.node.getRotation();

        self.closeBtnAnim.node.active = false;
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

        self.scheduleOnce(()=>{
            self.startCameraRotation = self.node.getRotation();
                
            self.currentPlanetBehavior = planet.getComponent('Planet_Behavior');
    
            if(!self.currentPlanetBehavior)
                return;
    
            self.translateCameraToCustomValue(self.currentPlanetBehavior.cameraPoint.getWorldPosition());
    
                self.scheduleOnce(()=> {
                self.rotateCameraToCustomValue(self.currentPlanetBehavior.cameraPoint.getRotation());
            }, 1);
    
            //TIME TO WAIT TO INTERACT WITH SELECTED PLANET
            self.scheduleOnce(()=> {
                self.canInteractWithPlanet = true;

                self.closeBtnAnim.node.active = true;
                self.closeBtnAnim.play('ReturnBTN_Appear');
            }, 2.2);
        }, 0.5);
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

        var self = this;

        // tween(self.node).to(1.6, {}, {
        //     easing: 'cubicInOut',
        //     'onUpdate': (currentValue: Quat) => {
        //         self.node.setRotation(currentValue);
        //     }
        // }).start();
    }

    returnToStartPosition() {
        var self = this;

        if(!self.hasSelectedPlanet || !self.currentPlanetBehavior)
            return;

            self.closeBtnAnim.play('ReturnBTN_Disappear');
            self.scheduleOnce(()=>{
                self.closeBtnAnim.node.active = false;
            }, 0.5);

        self.canInteractWithPlanet = false;

        self.currentPlanetBehavior.returnToStartRotation();

        self.translateCameraToCustomValue(self.startCameraWorldPosition);
        self.rotateCameraToCustomValue(self.startCameraRotation);

        self.scheduleOnce(()=>{
            self.hasSelectedPlanet = false;
            self.currentPlanetBehavior = null;
        }, 2.5);
    }
}