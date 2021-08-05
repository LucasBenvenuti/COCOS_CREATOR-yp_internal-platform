
import { _decorator, Component, Node, UIOpacity, tween, AnimationComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoginRegisterController')
export class LoginRegisterController extends Component {

    public static instance : LoginRegisterController =  null!;

    @property(UIOpacity)
    cookiesNode: UIOpacity = null!;

    @property(UIOpacity)
    loginNode: UIOpacity = null!;

    @property(UIOpacity)
    registerNode: UIOpacity = null!;

    @property(UIOpacity)
    recoveryPasswordNode: UIOpacity = null!;

    @property(UIOpacity)
    emailSentNode: UIOpacity = null!;

    @property(UIOpacity)
    NewPasswordNode: UIOpacity = null!;

    @property(UIOpacity)
    NewPasswordConfirmationNode: UIOpacity = null!;

    @property(UIOpacity)
    loadingNode: UIOpacity = null!;

    @property(AnimationComponent)
    loadingAnimation: AnimationComponent = null!;

    @property(Number)
    fadeDuration: number = 0.5;

    onLoad() {
        var self = this;
        
        if(LoginRegisterController.instance != null && LoginRegisterController.instance != self){
            self.destroy();
        }else{
            LoginRegisterController.instance = self;
        }
    }

    start() {
        var self = this;

        self.loginNode.opacity = 0;
        self.registerNode.opacity = 0;
        self.recoveryPasswordNode.opacity = 0;
        self.emailSentNode.opacity = 0;
        self.NewPasswordNode.opacity = 0;
        self.NewPasswordConfirmationNode.opacity = 0;
        self.loadingNode.opacity = 0;

        //START WITH LOGIN ENABLED
        self.loginAnim(true);

        //CHECK FIRST COOKIE HERE... IF IT EXISTS, ACTIVE = FALSE TO cookiesNode
    }

    //  START INDIVIDUAL FUNCTIONS

    //COOKIES
    disappearCookies(e: any, saveCookies: any)
    {
        var self = this;

        tween(self.cookiesNode).to(self.fadeDuration, {opacity: 0}, {
            easing: 'quadInOut',
            onComplete: () => {
                self.cookiesNode.node.active = false;
            }
        }).start();

        if(saveCookies === "true")
        {
            //SAVE FIRST COOKIE TO NOT SHOW THIS LAYOUT AGAIN
            console.log("SAVE HERE FIRST COOKIE");
        }
    }

    //LOGIN
    loginAnim(show: boolean)
    {
        var self = this;

        if(show)
        {   
            tween(self.loginNode).to(self.fadeDuration, {opacity: 255}, {
                easing: 'quadInOut',
                onStart: () => {
                    self.loginNode.node.active = true;
                }
            }).start();
        }
        else
        {
            tween(self.loginNode).to(self.fadeDuration, {opacity: 0}, {
                easing: 'quadInOut',
                onComplete: () => {
                    self.loginNode.node.active = false;
                }
            }).start();
        }
    }

    //REGISTER
    registerAnim(show: boolean)
    {
        var self = this;

        if(show)
        {   
            tween(self.registerNode).to(self.fadeDuration, {opacity: 255}, {
                easing: 'quadInOut',
                onStart: () => {
                    self.registerNode.node.active = true;
                }
            }).start();
        }
        else
        {
            tween(self.registerNode).to(self.fadeDuration, {opacity: 0}, {
                easing: 'quadInOut',
                onComplete: () => {
                    self.registerNode.node.active = false;
                }
            }).start();
        }
    }
    
    //EMAIL SENT
    emailSentAnim(show: boolean)
    {
        var self = this;

        if(show)
        {   
            tween(self.emailSentNode).to(self.fadeDuration, {opacity: 255}, {
                easing: 'quadInOut',
                onStart: () => {
                    self.emailSentNode.node.active = true;
                }
            }).start();
        }
        else
        {
            tween(self.emailSentNode).to(self.fadeDuration, {opacity: 0}, {
                easing: 'quadInOut',
                onComplete: () => {
                    self.emailSentNode.node.active = false;
                }
            }).start();
        }
    }

    //RECOVER PASSWORD
    recoverPasswordAnim(show: boolean)
    {
        var self = this;

        if(show)
        {   
            tween(self.recoveryPasswordNode).to(self.fadeDuration, {opacity: 255}, {
                easing: 'quadInOut',
                onStart: () => {
                    self.recoveryPasswordNode.node.active = true;
                }
            }).start();
        }
        else
        {
            tween(self.recoveryPasswordNode).to(self.fadeDuration, {opacity: 0}, {
                easing: 'quadInOut',
                onComplete: () => {
                    self.recoveryPasswordNode.node.active = false;
                }
            }).start();
        }
    }
    
    //NEW PASSWORD
    newPasswordAnim(show: boolean)
    {
        var self = this;

        if(show)
        {   
            tween(self.NewPasswordNode).to(self.fadeDuration, {opacity: 255}, {
                easing: 'quadInOut',
                onStart: () => {
                    self.NewPasswordNode.node.active = true;
                }
            }).start();
        }
        else
        {
            tween(self.NewPasswordNode).to(self.fadeDuration, {opacity: 0}, {
                easing: 'quadInOut',
                onComplete: () => {
                    self.NewPasswordNode.node.active = false;
                }
            }).start();
        }
    }

    //NEW PASSWORD CONFIRMATION
    newPasswordConfirmationAnim(show: boolean)
    {
        var self = this;

        if(show)
        {   
            tween(self.NewPasswordConfirmationNode).to(self.fadeDuration, {opacity: 255}, {
                easing: 'quadInOut',
                onStart: () => {
                    self.NewPasswordConfirmationNode.node.active = true;
                }
            }).start();
        }
        else
        {
            tween(self.NewPasswordConfirmationNode).to(self.fadeDuration, {opacity: 0}, {
                easing: 'quadInOut',
                onComplete: () => {
                    self.NewPasswordConfirmationNode.node.active = false;
                }
            }).start();
        }
    }

    //NEW PASSWORD CONFIRMATION
    loadingAnim(show: boolean)
    {
        var self = this;

        if(show)
        {   
            tween(self.loadingNode).to(self.fadeDuration, {opacity: 255}, {
                easing: 'quadInOut',
                onStart: () => {
                    self.loadingNode.node.active = true;
                    self.loadingAnimation.play();
                }
            }).start();
        }
        else
        {
            tween(self.loadingNode).to(self.fadeDuration, {opacity: 0}, {
                easing: 'quadInOut',
                onComplete: () => {
                    self.loadingAnimation.stop();
                    self.loadingNode.node.active = false;
                }
            }).start();
        }
    }

    //  END INDIVIDUAL FUNCTIONS

    //  START COMPLETE FUNCTIONS

    loginToRegister()
    {
        var self = this;
        
        self.loginAnim(false);

        self.scheduleOnce(()=> {
            self.registerAnim(true);
        }, 0.2);
    }

    loginToLoading()
    {
        var self = this;
        
        self.scheduleOnce(()=> {
            self.loadingAnim(true);
            
            self.scheduleOnce(()=> {
                self.loginAnim(false);
                console.log("DO LOADING STUFF");
                self.loadingAnim(false);
            }, 4);
        }, 0.2);
    }

    registerToLoading()
    {
        var self = this;
        
        self.scheduleOnce(()=> {
            self.loadingAnim(true);
            
            self.scheduleOnce(()=> {
                self.registerAnim(false);
                console.log("DO LOADING STUFF");
                self.loadingAnim(false);
            }, 4);
        }, 0.2);
    }

    registerToLogin()
    {
        var self = this;
        
        self.registerAnim(false);

        self.scheduleOnce(()=> {
            self.loginAnim(true);
        }, 0.2);
    }

    loginToRecoverPassword()
    {
        var self = this;
        
        self.loginAnim(false);

        self.scheduleOnce(()=> {
            self.recoverPasswordAnim(true);
        }, 0.2);
    }

    recoverPasswordToLogin()
    {
        var self = this;
        
        self.recoverPasswordAnim(false);

        self.scheduleOnce(()=> {
            self.loginAnim(true);
        }, 0.2);
    }

    recoverPasswordToEmailSent()
    {
        var self = this;
        
        self.recoverPasswordAnim(false);

        self.scheduleOnce(()=> {
            self.emailSentAnim(true);
        }, 0.2);
    }

    emailSentToLogin()
    {
        var self = this;
        
        self.emailSentAnim(false);

        self.scheduleOnce(()=> {
            self.loginAnim(true);
        }, 0.2);
    }

    loginToNewPassword()
    {
        var self = this;
        
        self.loginAnim(false);

        self.scheduleOnce(()=> {
            self.newPasswordAnim(true);
        }, 0.2);
    }

    newPasswordToLogin()
    {
        var self = this;
        
        self.newPasswordAnim(false);

        self.scheduleOnce(()=> {
            self.loginAnim(true);
        }, 0.2);
    }

    newPasswordToNewPasswordConfirmation()
    {
        var self = this;
        
        self.newPasswordAnim(false);

        self.scheduleOnce(()=> {
            self.newPasswordConfirmationAnim(true);
        }, 0.2);
    }

    newPasswordConfirmationToLogin()
    {
        var self = this;
        
        self.newPasswordConfirmationAnim(false);

        self.scheduleOnce(()=> {
            self.loginAnim(true);
        }, 0.2);
    }

}