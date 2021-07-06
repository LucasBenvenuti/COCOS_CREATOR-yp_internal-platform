
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneController')
export class SceneController extends Component {

    @property(Node)
    cloud_0: Node = null!;

    @property(Node)
    cloud_1: Node = null!;

    start () {

    }

    update (deltaTime: number) {
        var self = this;

        // console.log(self.cloud_0.position);
        // console.log(self.cloud_1.position);

        // -0.007
        // 0.02

        self.cloud_0.position = new Vec3(self.cloud_0.position.x + 0.01, self.cloud_0.position.y, self.cloud_0.position.z);
        self.cloud_1.position = new Vec3(self.cloud_1.position.x + 0.01, self.cloud_1.position.y, self.cloud_1.position.z);
    }
}