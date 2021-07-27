
import { _decorator, Component, Node, SkeletalAnimationComponent, Vec3, RigidBody, Quat, tween, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Planet_Behavior')
export class Planet_Behavior extends Component {

    @property(Node)
    cameraPoint: Node = null!;

    @property(RigidBody)
    planetModel: RigidBody = null!;

    newRotationEuler = new Vec3(0,0,0);

    @property(Number)
    speedRotation: number = 1;

    @property(String)
    planetTitle: string = "";

    @property(SpriteFrame)
    planetTitleImg: SpriteFrame = null!;

    startPlanetRotation = new Quat();

    onLoad() {
        var self = this;
        self.startPlanetRotation = self.planetModel.node.getRotation();
    }

    addTorqueToPlanet(yValue: number)
    {
        var self = this;
        self.planetModel.applyTorque(new Vec3(0, 1 * (yValue * self.speedRotation), 0));
    }

    easeInOutCubic(t: number) {
        return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
    }

    returnToStartRotation() {
        var self = this;

        const tw = tween(self.planetModel.node);// Use tween animation
        const quat_start = new Quat();

        self.planetModel.node.getRotation(quat_start);// Get the starting quaternion
        var quat_end = new Quat(); // The final rotating quaternion assumes that it has been calculated
        const quat_now = new Quat();// Use an intermediate variable

        quat_end = self.startPlanetRotation;
        
        tw.to(2, {}, {
            easing: 'cubicInOut',
            onUpdate: (target, ratio: number) => {
                quat_now.set(quat_start).slerp(quat_end, self.easeInOutCubic(ratio));
                self.planetModel.node.setRotation(quat_now);
            },
        })
        tw.start();
    }

    // update (deltaTime: number) {
    //     var self = this;

    //     self.newRotationEuler = new Vec3(0, deltaTime + (self.speedRotation * 0.025) + self.newRotationEuler.y, 0);

    //     self.node.setRotationFromEuler(self.newRotationEuler);
    // }

    
}
