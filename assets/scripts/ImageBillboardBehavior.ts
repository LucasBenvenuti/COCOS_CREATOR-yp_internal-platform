
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ImageBillboardBehavior')
export class ImageBillboardBehavior extends Component {

    @property(Node)
    nodeToLook: Node = null!;

    update (deltaTime: number) {
        this.node.lookAt(this.nodeToLook.position, Vec3.UP);
    }
}