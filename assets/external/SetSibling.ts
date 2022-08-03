
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SetSibling')
export class SetSibling extends Component {
    
    @property(Number)
    siblingIndex: number = 0;

    start () {
        this.node.setSiblingIndex(this.siblingIndex);
    }
}