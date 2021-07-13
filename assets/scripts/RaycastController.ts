import { _decorator, Component, Node, Material, systemEvent, SystemEventType, EventTouch, CameraComponent, geometry, Touch, PhysicsSystem, ModelComponent, ToggleComponent, LabelComponent, EditBoxComponent, RigidBody } from "cc";
import { CameraController } from "./CameraController";
const { ccclass, property } = _decorator;

enum ERaycastType {
    ALL,
    CLOSEST
}

@ccclass('RaycastController')
export class RaycastController extends Component {

    @property({ type: CameraComponent })
    readonly camera: CameraComponent = null as any;

    @property({ type: PhysicsSystem.PhysicsGroup })
    ingnoreLayer: number = 0;

    @property(Number)
    _maxDistance: number = 1000;

    private _raycastType: ERaycastType = ERaycastType.CLOSEST;
    private _ray: geometry.Ray = new geometry.Ray();
    private _mask: number = 0xffffffff;

    start () {
        this._mask &= ~this.ingnoreLayer;
    }

    onEnable () {
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onDisable () {
        systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart (touch: Touch, event: EventTouch) {
        this.camera.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
        switch (this._raycastType) {
            case ERaycastType.ALL:
                if (PhysicsSystem.instance.raycast(this._ray, this._mask, this._maxDistance)) {
                    const r = PhysicsSystem.instance.raycastResults;

                    console.log(r);
                }
                break;
            case ERaycastType.CLOSEST:
                if (PhysicsSystem.instance.raycastClosest(this._ray, this._mask, this._maxDistance)) {
                    const r = PhysicsSystem.instance.raycastClosestResult;

                    var rigidBodyNode = r.collider.attachedRigidBody;

                    if(!r.collider.attachedRigidBody)
                        return;

                    if(r.collider.attachedRigidBody.group == 2){
                        if(!CameraController.instance.currentPlanetBehavior)
                            CameraController.instance.goToPlanet(r.collider.node);
                    }
                }
                break;
        }
    }
}