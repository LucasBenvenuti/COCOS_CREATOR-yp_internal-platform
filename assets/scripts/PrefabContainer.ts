
import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PrefabContainer')
export class PrefabContainer extends Component {
    @property(Prefab)
    errorBox: Prefab = null!;

    @property(Prefab)
    correctBox: Prefab = null!;
}