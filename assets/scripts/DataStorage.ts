
import { _decorator, Component, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataStorage')
export class DataStorage extends Component {

    public static instance : DataStorage =  null!;
    
    public token: string = null!;
    
    onLoad() {
        var self = this;
        
        if(DataStorage.instance != null && DataStorage.instance != self){
            self.destroy();
        }else{
            DataStorage.instance = self;
            game.addPersistRootNode(this.node);
        }
    }

}