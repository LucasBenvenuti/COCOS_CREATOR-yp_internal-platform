
import { _decorator, Component, UIOpacity, tween, AnimationComponent, EditBox, EditBoxComponent, Label, Vec3, lerp } from 'cc';
import { DataStorage } from './DataStorage';
import { SceneChange_Behavior } from '../external/SceneChange_Behavior';

const { ccclass, property } = _decorator;

@ccclass('LoginRegisterController')
export class LoginRegisterController extends Component {

    public static instance : LoginRegisterController =  null!;

    @property(UIOpacity)
    cookiesNode: UIOpacity = null!;

    @property(UIOpacity)
    errorNode: UIOpacity = null!;
    @property(Label)
    errorLabel: Label = null!;
    errorIsOpened = false;

    @property(UIOpacity)
    correctNode: UIOpacity = null!;
    @property(Label)
    correctLabel: Label = null!;
    correctIsOpened = false;
    
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

    @property(EditBoxComponent)
    loginEmailField: EditBoxComponent = null!;
    @property(EditBoxComponent)
    loginPasswordField: EditBoxComponent = null!;

    @property(EditBoxComponent)
    registerCompleteNameField: EditBoxComponent = null!;
    @property(EditBoxComponent)
    registerEmailField: EditBoxComponent = null!;
    @property(EditBoxComponent)
    registerPasswordField: EditBoxComponent = null!;
    @property(EditBoxComponent)
    registerPasswordConfirmationField: EditBoxComponent = null!;

    @property(EditBoxComponent)
    recoveryEmailField: EditBoxComponent = null!;

    @property(EditBoxComponent)
    changePasswordField: EditBoxComponent = null!;
    @property(EditBoxComponent)
    changePasswordConfirmationField: EditBoxComponent = null!;

    @property(Number)
    fadeDuration: number = 0.5;

    urlToken: string = "";

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

        //CHECK FIRST COOKIE HERE... IF IT EXISTS, ACTIVE = FALSE TO cookiesNode
        if(localStorage.getItem("platform_cookiesEnabled") && localStorage.getItem("platform_cookiesEnabled") === "true")
            self.cookiesNode.node.active = false;
        
        self.checkInitial();
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

            localStorage.setItem("platform_cookiesEnabled", "true");
        }
    }

    errorAnim(show: boolean, errorMessage: string)
    {
        var self = this;

        if(show)
        {
            self.errorNode.node.setPosition(new Vec3(0, 30, 0));

            tween(self.errorNode.node).to(self.fadeDuration, {position: new Vec3(0,0,0)}, {
                easing: 'quadInOut',
                onStart: () => {
                    self.errorNode.node.active = true;
                    self.errorLabel.string = errorMessage;
                },
                onUpdate: (target: object, ratio: number)=> {

                    let newOpacity = lerp(0, 255, ratio);
                    self.errorNode.opacity = newOpacity;
                },
            }).union().start();
        }
        else
        {
            tween(self.errorNode).to(self.fadeDuration, {opacity: 0}, {
                easing: 'quadInOut',
                onComplete: () => {
                    self.errorLabel.string = "";
                    self.errorNode.node.active = false;
                },
            }).start();
        }
    }

    correctAnim(show: boolean, correctMessage: string)
    {
        var self = this;

        if(show)
        {
            self.correctNode.node.setPosition(new Vec3(0, 30, 0));

            tween(self.correctNode.node).to(self.fadeDuration, {position: new Vec3(0,0,0)}, {
                easing: 'quadInOut',
                onStart: () => {
                    self.correctNode.node.active = true;
                    self.correctLabel.string = correctMessage;
                },
                onUpdate: (target: object, ratio: number)=> {

                    let newOpacity = lerp(0, 255, ratio);
                    self.correctNode.opacity = newOpacity;
                },
            }).union().start();
        }
        else
        {
            tween(self.correctNode).to(self.fadeDuration, {opacity: 0}, {
                easing: 'quadInOut',
                onComplete: () => {
                    self.correctLabel.string = "";
                    self.correctNode.node.active = false;
                },
            }).start();
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

    // loginToNewPassword()
    // {
    //     var self = this;
        
    //     self.loginAnim(false);

    //     self.scheduleOnce(()=> {
    //         self.newPasswordAnim(true);
    //     }, 0.2);
    // }

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
        let newURL = location.href.split('?')[0];

        window.location.href = newURL;

        // var self = this;
        
        // self.newPasswordConfirmationAnim(false);

        // self.scheduleOnce(()=> {
        //     self.loginAnim(true);
        // }, 0.2);
    }

    loginlogic() {
        var self = this;

        let url = "https://hfl5rlsrp5.execute-api.sa-east-1.amazonaws.com/user-login";

        let emailInputValue = self.loginEmailField.string;
        let passwordInputValue = self.loginPasswordField.string;

        if(emailInputValue == "" || emailInputValue == undefined)
        {
            console.log("ERRO: Campo de Email deve ser preenchido");

            self.errorAnim(true, "Campo de Email deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(passwordInputValue == "" || passwordInputValue == undefined)
        {
            console.log("ERRO: Campo de Senha deve ser preenchido");
            self.errorAnim(true, "Campo de Senha deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xmlhttp.onloadstart = function () {
            self.loadingAnim(true);
        };

        xmlhttp.onreadystatechange = function () {
            var response = xmlhttp.responseText;
            var responseObj = JSON.parse(response || "{}");

            if (xmlhttp.readyState == 4 && (xmlhttp.status >= 200 && xmlhttp.status < 400))
            {
                //Success
                self.loginAnim(false);
                self.loadingAnim(false);

                self.correctAnim(true, "Login sendo efetuado.");

                self.scheduleOnce(()=>{
                    localStorage.setItem("userToken", responseObj.token);
        
                    if(DataStorage.instance)
                        DataStorage.instance.token = responseObj.token;
        
                    if(SceneChange_Behavior.instance)
                        SceneChange_Behavior.instance.nextSceneLoad("Platform_OPTIMIZED");
                }, 0.5);

            }

            if(self.errorIsOpened)
                return;

            if(responseObj.error === undefined)
                return;

            self.errorIsOpened = true;

            let newString = responseObj.error + ".";
            self.errorAnim(true, newString);

            self.scheduleOnce(()=>{
                self.errorIsOpened = false;
            }, 0.2);
            
            self.loadingAnim(false);

        };

        xmlhttp.send(JSON.stringify({ "email": emailInputValue, "password": passwordInputValue }));
    }

    guestlogic() {
        var self = this;
        
        localStorage.setItem("userToken", "guest");

        if(DataStorage.instance)
            DataStorage.instance.token = "guest";

        if(SceneChange_Behavior.instance)
            SceneChange_Behavior.instance.nextSceneLoad("Platform_OPTIMIZED");
    }

    registerlogic() {
        var self = this;

        let url = "https://hfl5rlsrp5.execute-api.sa-east-1.amazonaws.com/user-register";

        let completeNameInputValue = self.registerCompleteNameField.string;
        let emailInputValue = self.registerEmailField.string;
        let passwordInputValue = self.registerPasswordField.string;
        let passwordConfirmationInputValue = self.registerPasswordConfirmationField.string;

        // if(completeNameInputValue == "" || completeNameInputValue == undefined)
        // {
        //     console.log("ERRO: Campo de Nome Completo deve ser preenchido");
        //     self.loadingAnim(false);
        //     return;
        // }

        if(emailInputValue == "" || emailInputValue == undefined)
        {
            console.log("ERRO: Campo de Email deve ser preenchido");
            self.errorAnim(true, "Campo de Email deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(passwordInputValue == "" || passwordInputValue == undefined)
        {
            console.log("ERRO: Campo de Senha deve ser preenchido");
            self.errorAnim(true, "Campo de Senha deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        // if(passwordConfirmationInputValue == "" || passwordConfirmationInputValue == undefined)
        // {
        //     console.log("ERRO: Campo de Confirmação de Senha deve ser preenchido");
        //     self.loadingAnim(false);
        //     return;
        // }

        // if(passwordInputValue !== passwordConfirmationInputValue)
        // {
        //     console.log("ERRO: Confirmação de Senha deve ser igual à senha");
        //     self.loadingAnim(false);
        //     return;
        // }

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xmlhttp.onloadstart = function () {
            self.loadingAnim(true);
        };

        xmlhttp.onreadystatechange = function () {
            var response = xmlhttp.responseText;
            var responseObj = JSON.parse(response || "{}");
            if (xmlhttp.readyState == 4 && (xmlhttp.status >= 200 && xmlhttp.status < 400))
            {
                //Success
                self.registerAnim(false);
                self.loadingAnim(false);

                self.correctAnim(true, "Cadastro efetuado.");

                self.scheduleOnce(()=>{
                    if(SceneChange_Behavior.instance)
                        SceneChange_Behavior.instance.nextSceneLoad("Platform_OPTIMIZED");
                }, 0.5);

                if(SceneChange_Behavior.instance)
                    SceneChange_Behavior.instance.nextSceneLoad("Platform_OPTIMIZED");
            }

            if(self.errorIsOpened)
                return;

            if(responseObj.error === undefined)
                return;

            self.errorIsOpened = true;

            let newString = responseObj.error + ".";
            self.errorAnim(true, newString);

            self.scheduleOnce(()=>{
                self.errorIsOpened = false;
            }, 0.2);
            
            self.loadingAnim(false);

        };

        xmlhttp.send(JSON.stringify({ "email": emailInputValue, "name": completeNameInputValue, "password": passwordInputValue }));
    }

    recoverPasswordlogic() {
        var self = this;

        let url = "https://hfl5rlsrp5.execute-api.sa-east-1.amazonaws.com/user-email-reset-password";

        let recoveryEmailInputValue = self.recoveryEmailField.string;

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        if(recoveryEmailInputValue == "" || recoveryEmailInputValue == undefined)
        {
            console.log("ERRO: Campo de Email deve ser preenchido");
            self.errorAnim(true, "Campo de Email deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        xmlhttp.onloadstart = function () {
            self.loadingAnim(true);
        };

        xmlhttp.onreadystatechange = function () {
            var response = xmlhttp.responseText;
            var responseObj = JSON.parse(response || "{}");
            console.log(response);
            if (xmlhttp.readyState == 4 && (xmlhttp.status >= 200 && xmlhttp.status < 400))
            {
                //Success
                self.loadingAnim(false);

                self.correctAnim(true, "Um email contendo informações sobre a troca de senha foi enviado.");

                self.recoverPasswordToLogin();
            }

            if(self.errorIsOpened)
                return;

            if(responseObj.error === undefined)
                return;

            self.errorIsOpened = true;

            let newString = responseObj.error + ".";
            self.errorAnim(true, newString);

            self.scheduleOnce(()=>{
                self.errorIsOpened = false;
            }, 0.2);
            
            self.loadingAnim(false);
        };

        xmlhttp.send(JSON.stringify({ "email": recoveryEmailInputValue }));
    }

    newPasswordlogic() {
        var self = this;

        let url = "https://hfl5rlsrp5.execute-api.sa-east-1.amazonaws.com/user-password-change";
        
        let passwordInputValue = self.changePasswordField.string;
        let passwordConfirmationInputValue = self.changePasswordConfirmationField.string;

        if(passwordInputValue == "" || passwordInputValue == undefined)
        {
            console.log("ERRO: Campo de Senha deve ser preenchido");
            self.errorAnim(true, "Campo de Senha deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(passwordConfirmationInputValue == "" || passwordConfirmationInputValue == undefined)
        {
            console.log("ERRO: Campo de Confirmação de Senha deve ser preenchido");
            self.errorAnim(true, "Campo de Confirmação de Senha deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(passwordInputValue !== passwordConfirmationInputValue)
        {
            console.log("ERRO: Confirmação de Senha deve ser igual à senha");
            self.loadingAnim(false);
            return;
        }

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xmlhttp.onloadstart = function () {
            self.loadingAnim(true);
        };

        xmlhttp.onreadystatechange = function () {
            var response = xmlhttp.responseText;
            var responseObj = JSON.parse(response || "{}");
            console.log(response);
            if (xmlhttp.readyState == 4 && (xmlhttp.status >= 200 && xmlhttp.status < 400))
            {
                //Success
                self.correctAnim(true, "Nova senha definida.");

                self.loadingAnim(false);
                self.newPasswordToLogin();
            }

            if(self.errorIsOpened)
                return;

            if(responseObj.error === undefined)
                return;

            self.errorIsOpened = true;

            let newString = responseObj.error + ".";
            self.errorAnim(true, newString);

            self.scheduleOnce(()=>{
                self.errorIsOpened = false;
            }, 0.2);
            
            self.loadingAnim(false);
        };

        console.log(self.urlToken);

        if(self.urlToken !== "")
            xmlhttp.send(JSON.stringify({ "password": passwordInputValue, "token": self.urlToken }));
    }

    checkInitial() {
        var self = this;
        var searchObject = self.parseURLParams(location.href);

        console.log(searchObject);

        if(searchObject == undefined || !('token' in searchObject))
        {
            self.loginAnim(true);
            return;
        }

        self.urlToken = searchObject['token'][0];
        self.newPasswordAnim(true);
    }

    parseURLParams(url: any) {
        var queryStart = url.indexOf("?") + 1,
            queryEnd   = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv;
    
        if (query === url || query === "") return;
    
        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);
    
            if (!parms.hasOwnProperty(n)) parms[n] = [];
            parms[n].push(nv.length === 2 ? v : null);
        }
        return parms;
    }

}