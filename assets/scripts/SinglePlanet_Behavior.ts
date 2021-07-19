
import { _decorator, Component, Node, SkeletalAnimationComponent, Vec3, RigidBody, Quat, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SinglePlanet_Behavior')
export class SinglePlanet_Behavior extends Component {

    newRotationEuler = new Vec3(0,0,0);

    @property(Number)
    speedRotation: number = 1;

    update (deltaTime: number) {
        var self = this;

        self.newRotationEuler = new Vec3(0, deltaTime + (self.speedRotation * 0.025) + self.newRotationEuler.y, 0);

        self.node.setRotationFromEuler(self.newRotationEuler);
    }
    
}
