
import { _decorator, Component, Node, Collider, IPhysics2DContact, ITriggerEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CloudBehavior')
export class CloudBehavior extends Component {

    @property(Node)
    startPoint: Node = null!;

    onLoad () {
        var self = this;
        let collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    private onTriggerEnter (event: ITriggerEvent) {
        var self = this;
        self.node.position = self.startPoint.position;
    }
}