
import { _decorator, Component, Node, SystemEventType, EventTarget, Vec2, Vec3, RigidBody, PhysicsSystem, geometry, Camera } from 'cc';
const { Ray } = geometry;
const { ccclass, property } = _decorator;

@ccclass('TouchBehavior')
export class TouchBehavior extends Component {

    canRotateCamera = false;

    @property(Camera)
    cameraNode: Camera = null!;

    @property(RigidBody)
    cameraRigidbody: RigidBody = null!;

    @property(Node)
    touchPanel: Node = null!;

    onLoad () {
        var self = this;

        self.touchPanel.on(Node.EventType.TOUCH_START, self.onTouchStart, self, true);
        // self.touchPanel.on(Node.EventType.TOUCH_MOVE, self.onTouchMove, self, true);
        // self.touchPanel.on(Node.EventType.TOUCH_END, self.onTouchEnd, self, true);
        // self.touchPanel.on(Node.EventType.TOUCH_CANCEL, self.onTouchCancel, self, true);
    }

    onTouchStart (event: any) {
        var self = this;

        self.canRotateCamera = true;

        console.log(event);

        const outRay = new Ray();
        self.cameraNode.screenPointToRay(event.getTou, 0, outRay);

        console.log(PhysicsSystem.instance.raycastResults);
    }

    onTouchMove (event: any) {
        var self = this;

        if(self.canRotateCamera)
        {
            let delta = event.getUIDelta();

            console.log(delta);

            // let newVec3 = new Vec3(0, -delta.x, 0);
            let newVec3Local = new Vec3(-delta.y, 0, 0);

            // let currentRotation = new Vec3(self.cameraNode.eulerAngles);
            self.cameraRigidbody.applyLocalTorque(newVec3Local);
            // self.cameraRigidbody.applyLocalTorque(newVec3);
        }
    }

    onTouchEnd (event: any) {
        var self = this;
        
        self.canRotateCamera = false;

        console.log(event);
    }

    onTouchCancel (event: any) {
        var self = this;
        
        self.canRotateCamera = false;

        console.log(event);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}