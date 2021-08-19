
import { _decorator, Component, game } from 'cc';
import { Planet_Behavior } from './Planet_Behavior';
const { ccclass, property } = _decorator;

@ccclass('DataStorage')
export class DataStorage extends Component {

    public static instance : DataStorage =  null!;
    
    public token: string = null!;
    public hasPlanetSelected: Planet_Behavior = null!;
    public webviewURL: string = null!;

    public currentScene: string = null!;
    
    onLoad() {
        var self = this;
        
        if(DataStorage.instance != null && DataStorage.instance != self){
            self.destroy();
        }else{
            DataStorage.instance = self;
            game.addPersistRootNode(this.node);
        }
    }

    getWebviewURL() {
        var self = this;

        return self.webviewURL;
    }

    setWebviewURL (url: string) {
        var self = this;

        console.log(url);

        self.webviewURL = url;
    }

    getPlanetSelected() {
        var self = this;

        return self.hasPlanetSelected;
    }

    setPlanetSelected (planet : Planet_Behavior) {
        var self = this;

        console.log(planet);

        self.hasPlanetSelected = planet;
    }

}