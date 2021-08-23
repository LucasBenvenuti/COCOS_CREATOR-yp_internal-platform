import { _decorator, Component, Node, Material, systemEvent, SystemEventType, EventTouch, CameraComponent, geometry, Touch, PhysicsSystem, ModelComponent, ToggleComponent, LabelComponent, EditBoxComponent, RigidBody, AnimationComponent, Camera } from "cc";
import { CameraController } from "./CameraController";
import { PlatformController } from "./PlatformController";
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
        systemEvent.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
    }

    onDisable () {
        systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
        systemEvent.off(SystemEventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart (touch: Touch, event: EventTouch) {
        var self = this;

        self.camera.screenPointToRay(touch.getLocationX(), touch.getLocationY(), self._ray);
        switch (self._raycastType) {
            case ERaycastType.ALL:
                if (PhysicsSystem.instance.raycast(self._ray, self._mask, self._maxDistance)) {
                    const r = PhysicsSystem.instance.raycastResults;

                    console.log(r);
                }
                break;
            case ERaycastType.CLOSEST:
                if (PhysicsSystem.instance.raycastClosest(self._ray, self._mask, self._maxDistance)) {
                    const r = PhysicsSystem.instance.raycastClosestResult;

                    var rigidBodyNode = r.collider.attachedRigidBody;

                    console.log(r.collider.node.parent);

                    if(!rigidBodyNode)
                    {
                        // let colliderParent = r.collider.node.parent;

                        // if(colliderParent?.name.includes("Icon"))
                        // {
                        //     console.log("Is Icon!");
                        //     let finalURL = CameraController.instance.getCurrentURLFromSelectedIcon(colliderParent.getComponent(AnimationComponent));
                        //     PlatformController.instance.openWebview(finalURL);
                        // }
                    }
                    else
                    {   
                        if(rigidBodyNode.group == 2){
                            if(!CameraController.instance.currentPlanetBehavior)
                            CameraController.instance.goToPlanet(r.collider.node);
                        }
                    }
                }
                break;
        }
    }

    onTouchEnd (touch: Touch, event: EventTouch) {
        var self = this;

        self.camera.screenPointToRay(touch.getLocationX(), touch.getLocationY(), self._ray);
        switch (self._raycastType) {
            case ERaycastType.ALL:
                if (PhysicsSystem.instance.raycast(self._ray, self._mask, self._maxDistance)) {
                    const r = PhysicsSystem.instance.raycastResults;

                    console.log(r);
                }
                break;
            case ERaycastType.CLOSEST:
                if (PhysicsSystem.instance.raycastClosest(self._ray, self._mask, self._maxDistance)) {
                    const r = PhysicsSystem.instance.raycastClosestResult;

                    var rigidBodyNode = r.collider.attachedRigidBody;

                    console.log(r.collider.node.parent);

                    if(!rigidBodyNode)
                    {
                        let colliderParent = r.collider.node.parent;

                        if(colliderParent?.name.includes("Icon"))
                        {
                            console.log("Is Icon!");
                            let finalURL = CameraController.instance.getCurrentURLFromSelectedIcon(colliderParent.getComponent(AnimationComponent));
                            PlatformController.instance.goToWebview(finalURL);

                        }
                    }
                    else
                    {   
                        // if(rigidBodyNode.group == 2){
                        //     if(!CameraController.instance.currentPlanetBehavior)
                        //     CameraController.instance.goToPlanet(r.collider.node);
                        // }
                    }
                }
                break;
        }
    }
}