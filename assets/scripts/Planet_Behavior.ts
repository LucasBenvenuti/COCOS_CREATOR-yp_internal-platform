
import { _decorator, Component, Node, SkeletalAnimationComponent, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Typescript')
export class Typescript extends Component {

    newRotationEuler = new Vec3(0,0,0);
    speedRotation = 1;

    onLoad () {
        var self = this;
    }

    start () {

    }

    update (deltaTime: number) {
        var self = this;

        self.newRotationEuler = new Vec3(0, deltaTime + (self.speedRotation * 0.025) + self.newRotationEuler.y, 0);

        self.node.setRotationFromEuler(self.newRotationEuler);
    }
}
