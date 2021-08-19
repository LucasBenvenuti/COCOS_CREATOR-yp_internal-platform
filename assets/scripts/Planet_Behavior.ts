
import { _decorator, Component, Node, Vec3, RigidBody, Quat, tween, SpriteFrame, AnimationComponent, MeshRenderer, Texture2D, Color, Sprite } from 'cc';
import { ImageBillboardBehavior } from './ImageBillboardBehavior';
const { ccclass, property } = _decorator;

@ccclass('Planet_Behavior')
export class Planet_Behavior extends Component {

    @property(Node)
    cameraPoint: Node = null!;

    @property(RigidBody)
    planetModel: RigidBody = null!;

    newRotationEuler = new Vec3(0,0,0);
    
    startPlanetRotation = new Quat();

    @property(Number)
    speedRotation: number = 1;

    @property(String)
    planetTitle: string = "";

    @property([String])
    planetDescription: string[] = [];

    @property(SpriteFrame)
    planetTitleImg: SpriteFrame = null!;

    @property(AnimationComponent)
    LogoAnim: AnimationComponent = null!;

    //IN CASE OF DIFFERENT TEXTURE 2D ON LOGO PLANE AND SPRITE ON UI
    // @property(Texture2D)
    // logoTexture: Texture2D = null!;

    @property(Sprite)
    logoSprite: Sprite = null!;

    @property([AnimationComponent])
    planetIcons_Anim: AnimationComponent[] = [];

    @property([Texture2D])
    iconsTexture: Texture2D[] = [];

    @property([String])
    webviewURLs: string[] = [];

    onLoad() {
        var self = this;
        self.startPlanetRotation = self.planetModel.node.getRotation();

        //ALWAYS MAINTAIN LOGO_CONT ON LAST CHILD
        let planetLogo = self.node.getChildByName("Logo_Cont");

        if(planetLogo)
            planetLogo.active = false;

        if(self.logoSprite)
            self.logoSprite.spriteFrame = self.planetTitleImg;
            //IN CASE OF DIFFERENT TEXTURE 2D ON LOGO PLANE AND SPRITE ON UI, COMMENT LINE ABOVE AND UNCOMMENT LINE BELOW
            // self.logoMesh.material.setProperty("mainTexture", self.planetTitleImg);

        if(self.planetIcons_Anim.length > 0)
        {
            for(let i = 0; i < self.planetIcons_Anim.length; i++)
            {
                console.log(self.planetIcons_Anim[i]);

                let curMeshRenderer = self.planetIcons_Anim[i].getComponentInChildren(MeshRenderer);
                curMeshRenderer?.material?.setProperty("mainTexture", self.iconsTexture[i]);
                curMeshRenderer?.material?.setProperty("mainColor", new Color(255,255,255,0));

                self.planetIcons_Anim[i].node.active = false;
            }
        }
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
        });
        tw.start();
    }

    // update (deltaTime: number) {
    //     var self = this;

    //     self.newRotationEuler = new Vec3(0, deltaTime + (self.speedRotation * 0.025) + self.newRotationEuler.y, 0);

    //     self.node.setRotationFromEuler(self.newRotationEuler);
    // }

    
}
