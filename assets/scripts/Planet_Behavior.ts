
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

    returnToStartRotation() {
        var self = this;

        tween(self.planetModel.node.getRotation()).to(1.5, new Quat(self.startPlanetRotation), {
            easing: 'cubicInOut',
            'onUpdate': (currentValue: Quat) => {
                self.planetModel.node.setRotation(currentValue);
            }
        }).start();
    }

    // update (deltaTime: number) {
    //     var self = this;

    //     self.newRotationEuler = new Vec3(0, deltaTime + (self.speedRotation * 0.025) + self.newRotationEuler.y, 0);

    //     self.node.setRotationFromEuler(self.newRotationEuler);
    // }

    
}
