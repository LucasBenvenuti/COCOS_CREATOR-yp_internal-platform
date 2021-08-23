
import { _decorator, Component, Node, director, ProgressBarComponent, loader, assetManager, game, find, UIOpacity, tween } from 'cc';
import { AudioController } from '../scripts/AudioController';
import { ButtonsHelper } from '../scripts/ButtonsHelper';
import { DataStorage } from '../scripts/DataStorage';
import { LoginRegisterController } from '../scripts/LoginRegisterController';
import { PlatformController } from '../scripts/PlatformController';
import { WebviewBehavior } from '../scripts/Webview_Behavior';
const { ccclass, property } = _decorator;

@ccclass('SceneChange_Behavior')
export class SceneChange_Behavior extends Component {

    public static instance : SceneChange_Behavior =  null!;

    nextSceneName: string = "";

    progressBar: ProgressBarComponent = null!;

    fadeOpacity: UIOpacity = null!;
    screenChangerOpacity: UIOpacity = null!;
    loadingLayout: UIOpacity = null!;
    transitionSpeed: number = 1;

    alreadyLoaded: boolean = false;

    onLoad ()
    {
        var self = this;
        
        if(SceneChange_Behavior.instance != null && SceneChange_Behavior.instance != self){
            self.node.destroy();
        }else{
            SceneChange_Behavior.instance = self;
            game.addPersistRootNode(this.node);
        }

        self.progressBar = find("SceneController_Canvas/SceneController/Loading/ProgressBar")?.getComponent(ProgressBarComponent);
        self.fadeOpacity = find("SceneController_Canvas/SceneController/FadeImage")?.getComponent(UIOpacity);
        self.loadingLayout = find("SceneController_Canvas/SceneController/Loading")?.getComponent(UIOpacity);
        self.screenChangerOpacity = find("SceneController_Canvas/SceneController")?.getComponent(UIOpacity);
    }
    
    start ()
    {
        var self = this;
        
        self.nextSceneName = "LoginRegister";

        if(localStorage.getItem("userToken") && localStorage.getItem("userToken") !== "")
        {
            console.log("ALREADY LOGGED BY TOKEN");
            self.nextSceneName = "Platform_OPTIMIZED";
        }

        self.screenChangerOpacity.opacity = 255;
        // self.loadingLayoutOpacity.opacity = 255;
        self.loadingLayout.node.active = false;
        self.fadeOpacity.opacity = 255;
        self.progressBar.progress = 0;

        if(self.nextSceneName === "LoginRegister")
        {
            self.progressBar.node.active = false;
        //     self.normalLoad(self.nextSceneName);
        }
        else
        {
            self.progressBar.node.active = true;   
        }

        self.firstLoad(self.nextSceneName);
    }

    normalLoad (sceneName: string)
    {
        var self = this;

        director.loadScene(sceneName, ()=> {
            self.loadingLayout.node.active = false;

            tween(self.fadeOpacity).to(self.transitionSpeed, {
                opacity: 0
            }, {
                easing: 'cubicInOut',
                onComplete: ()=> {
                    self.screenChangerOpacity.node.active = false;

                    if(PlatformController.instance)
                        PlatformController.instance.showMenuContainer(true);

                    if(AudioController.instance)
                        AudioController.instance.findSoundButtonsNode();
                }
            } ).start();
        });
    }
    
    firstLoad (sceneName: string)
    {
        var self = this;
        var progress = 0;// a progress of scene loading,0 ~ 1;

        tween(self.fadeOpacity).to(self.transitionSpeed, {
            opacity: 0
        }, {
            easing: 'cubicInOut',
            onStart: ()=> {
                self.progressBar.progress = 0;
                self.screenChangerOpacity.node.active = true;
                self.loadingLayout.node.active = true;
            }
        } ).start();

        director.preloadScene(sceneName, (completedCount: number, totalCount: number, item: any)=> {
            progress = completedCount / totalCount;
            self.progressBar.progress = progress;
        }, ()=> {
                director.loadScene(sceneName, ()=> {
                    tween(self.fadeOpacity).to(self.transitionSpeed, {
                        opacity: 255
                    }, {
                        easing: 'cubicInOut',
                        onComplete: ()=> {
                            self.loadingLayout.node.active = false;

                            tween(self.fadeOpacity).to(self.transitionSpeed, {
                                opacity: 0
                            }, {
                                easing: 'cubicInOut',
                                onComplete: ()=> {

                                    self.progressBar.node.active = true;

                                    self.screenChangerOpacity.node.active = false;

                                    if(PlatformController.instance)
                                        PlatformController.instance.showMenuContainer(true);

                                    if(AudioController.instance)
                                        AudioController.instance.findSoundButtonsNode();
                                }
                            } ).start();
                        }
                    } ).start();
                });
            }
        );
    }

    nextSceneLoad (sceneName: string)
    {
        var self = this;
        var progress = 0;// a progress of scene loading,0 ~ 1;

        if(PlatformController.instance)
        {
            PlatformController.instance.showCloseBtn(false);
            PlatformController.instance.showMenuContainer(false);
            PlatformController.instance.showDescriptionContainer(false);
        }

        tween(self.fadeOpacity).to(self.transitionSpeed, {
            opacity: 255
        }, {
            easing: 'cubicInOut',
            onStart: ()=> {
                self.progressBar.progress = 0;
                self.screenChangerOpacity.node.active = true;
                self.loadingLayout.node.active = false;
            },
            onComplete: ()=> {

                self.loadingLayout.node.active = true;

                tween(self.fadeOpacity).to(self.transitionSpeed, {
                    opacity: 0
                }, {
                    easing: 'cubicInOut',
                    onStart: ()=> {
                        self.progressBar.progress = 0;
                        self.screenChangerOpacity.node.active = true;
                        self.loadingLayout.node.active = true;
                    }
                } ).start();
        
                director.preloadScene(sceneName, (completedCount: number, totalCount: number, item: any)=> {
                    progress = completedCount / totalCount;
                    self.progressBar.progress = progress;
                }, ()=> {

                    console.log("Scene Preloaded!");

                        director.loadScene(sceneName, ()=> {
                            tween(self.fadeOpacity).to(self.transitionSpeed, {
                                opacity: 255
                            }, {
                                easing: 'cubicInOut',
                                onComplete: ()=> {
                                    self.loadingLayout.node.active = false;

                                    tween(self.fadeOpacity).to(self.transitionSpeed, {
                                        opacity: 0
                                    }, {
                                        easing: 'cubicInOut',
                                        onComplete: ()=> {
                                            self.screenChangerOpacity.node.active = false;
        
                                            if(PlatformController.instance)
                                            {
                                                PlatformController.instance.showCloseBtn(true);
                                                PlatformController.instance.showMenuContainer(true);
                                                PlatformController.instance.showDescriptionContainer(true);
                                            }

                                            if(AudioController.instance)
                                                AudioController.instance.findSoundButtonsNode();

                                            if(localStorage.getItem("platform_muteUnmute") && localStorage.getItem("platform_muteUnmute") === "true")
                                            {
                                                // AudioController.instance.audioOnOff();
                                            }
                                        }
                                    } ).start();
                                }
                            } ).start();
                        });
                    }
                );
            }
        } ).start();
    }

    gameSceneLoad (sceneName: string)
    {
        var self = this;
        var progress = 0;// a progress of scene loading,0 ~ 1;

        if(PlatformController.instance)
        {
            PlatformController.instance.showCloseBtn(false);
            PlatformController.instance.showMenuContainer(false);
            PlatformController.instance.showDescriptionContainer(false);
        }

        tween(self.fadeOpacity).to(self.transitionSpeed, {
            opacity: 255
        }, {
            easing: 'cubicInOut',
            onStart: ()=> {
                self.progressBar.progress = 0;
                self.screenChangerOpacity.node.active = true;
                self.loadingLayout.node.active = false;
            },
            onComplete: ()=> {

                let sceneURL = sceneName;
                window.location.href = sceneURL;
            }
        } ).start();
    }

    logout ()
    {
        let goToScene = "LoginRegister";

        var self = this;
        var progress = 0;// a progress of scene loading,0 ~ 1;

        localStorage.setItem("userToken", "");

        if(PlatformController.instance)
        {
            PlatformController.instance.showCloseBtn(false);
            PlatformController.instance.showMenuContainer(false);
            PlatformController.instance.showDescriptionContainer(false);
        }

        tween(self.fadeOpacity).to(self.transitionSpeed, {
            opacity: 255
        }, {
            easing: 'cubicInOut',
            onStart: ()=> {
                self.progressBar.progress = 0;
                self.screenChangerOpacity.node.active = true;
                self.loadingLayout.node.active = false;
            },
            onComplete: ()=> {
                director.loadScene(goToScene, ()=> {

                    if(LoginRegisterController.instance)
                        LoginRegisterController.instance.initialDefinition();

                    AudioController.instance.audioOnOff();

                    // if(ButtonsHelper.instance)
                    //     ButtonsHelper.instance.node.destroy();

                    tween(self.fadeOpacity).to(self.transitionSpeed, {
                        opacity: 0
                    }, {
                        easing: 'cubicInOut',
                        onComplete: ()=> {
                            self.screenChangerOpacity.node.active = false;
                        }
                    } ).start();
                });
            }
        } ).start();
    }
}