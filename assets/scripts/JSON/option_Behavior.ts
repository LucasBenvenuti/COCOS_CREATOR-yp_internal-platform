
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OptionBehavior')
export class OptionBehavior extends Component {
    
    id: number = 0;
    optName: string = "";
    cities: string[] = [];
}