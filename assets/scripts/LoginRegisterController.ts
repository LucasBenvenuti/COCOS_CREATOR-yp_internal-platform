
import { _decorator, Component, UIOpacity, tween, AnimationComponent, EditBoxComponent, Label, Vec3, lerp, Prefab, instantiate, Node, EventTouch, find, Button, SystemEventType, resources } from 'cc';
import { DataStorage } from './DataStorage';
import { SceneChange_Behavior } from '../external/SceneChange_Behavior';
import { DropdownBehavior } from './Dropdown_Behavior';
import { FeedbackBoxBehavior } from './FeedbackBox_Behavior';
import { SetSibling } from '../external/SetSibling';
import { PrefabContainer } from './PrefabContainer';

const { ccclass, property } = _decorator;

@ccclass('LoginRegisterController')
export class LoginRegisterController extends Component {

    public static instance : LoginRegisterController =  null!;

    @property(UIOpacity)
    cookiesNode: UIOpacity = null!;

    errorIsOpened = false;
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
    registerEmailField: EditBoxComponent = null!;
    @property(EditBoxComponent)
    registerPasswordField: EditBoxComponent = null!;

    @property(DropdownBehavior)
    registerSchoolarPeriodDropdown: DropdownBehavior = null!;
    @property(DropdownBehavior)
    registerSchoolKindDropdown: DropdownBehavior = null!;

    @property(EditBoxComponent)
    recoveryEmailField: EditBoxComponent = null!;

    @property(EditBoxComponent)
    changePasswordField: EditBoxComponent = null!;
    @property(EditBoxComponent)
    changePasswordConfirmationField: EditBoxComponent = null!;

    @property(Number)
    fadeDuration: number = 0.5;

    urlToken: string = "";

    @property(Prefab)
    errorBox: Prefab = null!;

    @property(Prefab)
    correctBox: Prefab = null!;

    @property(Node)
    instanceArea: Node = null!;

    @property(UIOpacity)
    locationAnimNode: UIOpacity = null!;

    tempToken: string = "";

    @property(DropdownBehavior)
    stateDropdown: DropdownBehavior = null!;
    @property(DropdownBehavior)
    cityDropdown: DropdownBehavior = null!;

    prefabContainer: PrefabContainer = null!;

    onLoad() {
        var self = this;
        
        if(LoginRegisterController.instance != null && LoginRegisterController.instance != self){
            self.destroy();
        }else{
            LoginRegisterController.instance = self;
        }
    }

    start() {
        this.initialDefinition();
    }

    initialDefinition()
    {
        var self = this;

        console.log("CALLED INITIAL DEFINITION");

        self.tempToken = "";

        self.prefabContainer = find("PrefabContainer")?.getComponent(PrefabContainer);

        self.cookiesNode = find("Canvas/Cookies_Accept")?.getComponent(UIOpacity);
        self.loginNode = find("Canvas/FormsBG/Login")?.getComponent(UIOpacity);
        self.registerNode = find("Canvas/FormsBG/Register")?.getComponent(UIOpacity);
        self.recoveryPasswordNode = find("Canvas/FormsBG/RecoveryPassword")?.getComponent(UIOpacity);
        self.emailSentNode = find("Canvas/FormsBG/EmailSent")?.getComponent(UIOpacity);
        self.NewPasswordNode = find("Canvas/FormsBG/NewPassword")?.getComponent(UIOpacity);
        self.NewPasswordConfirmationNode = find("Canvas/FormsBG/NewPasswordChanged")?.getComponent(UIOpacity);
        self.loadingNode = find("Canvas/Loading")?.getComponent(UIOpacity);
        self.loadingAnimation = find("Canvas/Loading/AnimatedSprite")?.getComponent(AnimationComponent);
        self.loginEmailField = find("Canvas/FormsBG/Login/Input_Box_0/EditBox_Email")?.getComponent(EditBoxComponent);
        self.loginPasswordField = find("Canvas/FormsBG/Login/Input_Box_1/EditBox_Password")?.getComponent(EditBoxComponent);
        self.registerEmailField = find("Canvas/FormsBG/Register/Input_Box_0/EditBox_Email")?.getComponent(EditBoxComponent);
        self.registerPasswordField = find("Canvas/FormsBG/Register/Input_Box_1/EditBox_Password")?.getComponent(EditBoxComponent);
        self.registerSchoolarPeriodDropdown = find("Canvas/FormsBG/Register/Input_Box_3")?.getComponent(DropdownBehavior);
        self.registerSchoolKindDropdown = find("Canvas/FormsBG/Register/Input_Box_2")?.getComponent(DropdownBehavior);
        self.recoveryEmailField = find("Canvas/FormsBG/RecoveryPassword/Input_Box_0/EditBox_RecoveryEmail")?.getComponent(EditBoxComponent);
        self.changePasswordField = find("Canvas/FormsBG/NewPassword/Input_Box_0/EditBox_NewPassword")?.getComponent(EditBoxComponent);
        self.changePasswordConfirmationField = find("Canvas/FormsBG/NewPassword/Input_Box_1/EditBox_ConfirmNewPassword")?.getComponent(EditBoxComponent);

        self.errorBox = self.prefabContainer.errorBox;
        self.correctBox = self.prefabContainer.correctBox;
        self.instanceArea = find("Canvas/FeedbackParent");
        self.locationAnimNode = find("Canvas/LastInputs")?.getComponent(UIOpacity);
        self.stateDropdown = find("Canvas/LastInputs/Box_Inicio/Input_Box_3")?.getComponent(DropdownBehavior);
        self.cityDropdown = find("Canvas/LastInputs/Box_Inicio/Input_Box_2")?.getComponent(DropdownBehavior);

        self.loginNode.opacity = 0;
        self.registerNode.opacity = 0;
        self.recoveryPasswordNode.opacity = 0;
        self.emailSentNode.opacity = 0;
        self.NewPasswordNode.opacity = 0;
        self.NewPasswordConfirmationNode.opacity = 0;
        self.loadingNode.opacity = 0;
        self.locationAnimNode.opacity = 0;

        self.registerNode.node.active = false;
        self.recoveryPasswordNode.node.active = false;
        self.emailSentNode.node.active = false;
        self.NewPasswordNode.node.active = false;
        self.NewPasswordConfirmationNode.node.active = false;
        self.loadingNode.node.active = false;
        self.locationAnimNode.node.active = false;

        //CHECK FIRST COOKIE HERE... IF IT EXISTS, ACTIVE = FALSE TO cookiesNode
        if(localStorage.getItem("platform_cookiesEnabled") && localStorage.getItem("platform_cookiesEnabled") === "true")
        {
            self.cookiesNode.node.active = false;
        }
        else
        {
            self.cookiesNode.node.active = true;
        }
        
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
                localStorage.setItem("platform_cookiesEnabled", "true");
            }
        }).start();

        if(saveCookies === "true")
        {
            //SAVE FIRST COOKIE TO NOT SHOW THIS LAYOUT AGAIN
            console.log("SAVE HERE FIRST COOKIE");

            localStorage.setItem("platform_cookiesEnabled", "true");
        }
    }

    errorAnim(errorMessage: string)
    {
        var self = this;

        let boxes = self.instanceArea.getComponentsInChildren(FeedbackBoxBehavior);

        boxes.forEach(box => {
            box.forceToDestroy(self.fadeDuration);
        });

        let currentError = instantiate(self.errorBox);
        self.instanceArea.addChild(currentError);

        currentError.getComponent(FeedbackBoxBehavior)?.callBox(errorMessage, self.fadeDuration);
    }

    correctAnim(correctMessage: string)
    {
        var self = this;

        let boxes = self.instanceArea.getComponentsInChildren(FeedbackBoxBehavior);

        boxes.forEach(box => {
            box.forceToDestroy(self.fadeDuration);
        });

        let currentCorrect = instantiate(self.correctBox);
        self.instanceArea.addChild(currentCorrect);

        currentCorrect.getComponent(FeedbackBoxBehavior)?.callBox(correctMessage, self.fadeDuration);
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

            self.errorAnim("Campo de Email deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(passwordInputValue == "" || passwordInputValue == undefined)
        {
            console.log("ERRO: Campo de Senha deve ser preenchido");
            self.errorAnim("Campo de Senha deve ser preenchido.");

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
                self.loadingAnim(false);

                self.tempToken = responseObj.token;
                self.locationAnim(true);

                // self.correctAnim("Login sendo efetuado.");

                // self.scheduleOnce(()=>{
                //     localStorage.setItem("userToken", responseObj.token);
        
                //     if(DataStorage.instance)
                //         DataStorage.instance.token = responseObj.token;
        
                //     if(SceneChange_Behavior.instance)
                //         SceneChange_Behavior.instance.nextSceneLoad("Platform_OPTIMIZED");
                // }, 0.5);

            }

            if(self.errorIsOpened)
                return;

            if(responseObj.error === undefined)
                return;

            self.errorIsOpened = true;

            let newString = responseObj.error + ".";
            self.errorAnim(newString);

            self.scheduleOnce(()=>{
                self.errorIsOpened = false;
            }, 0.2);
            
            self.loadingAnim(false);

        };

        xmlhttp.send(JSON.stringify({ "email": emailInputValue, "password": passwordInputValue }));
    }

    guestlogic() {
        var self = this;

        self.tempToken = "guest";
        self.locationAnim(true);
        
        // localStorage.setItem("userToken", "guest");

        // if(DataStorage.instance)
        //     DataStorage.instance.token = "guest";

        // if(SceneChange_Behavior.instance)
        //     SceneChange_Behavior.instance.nextSceneLoad("Platform_OPTIMIZED");
    }

    registerlogic() {
        var self = this;

        let url = "https://hfl5rlsrp5.execute-api.sa-east-1.amazonaws.com/user-register";

        let emailInputValue = self.registerEmailField.string;
        let passwordInputValue = self.registerPasswordField.string;

        let registerSchoolarPeriodDropdownValue = self.registerSchoolarPeriodDropdown.currentValue;
        let registerSchoolKindDropdownValue = self.registerSchoolKindDropdown.currentValue;

        if(emailInputValue == "" || emailInputValue == undefined)
        {
            console.log("ERRO: Campo de Email deve ser preenchido");
            self.errorAnim("Campo de Email deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(passwordInputValue == "" || passwordInputValue == undefined)
        {
            console.log("ERRO: Campo de Senha deve ser preenchido");
            self.errorAnim("Campo de Senha deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(registerSchoolarPeriodDropdownValue == "" || registerSchoolarPeriodDropdownValue == undefined)
        {
            console.log("ERRO: Período escolar deve ser preenchido");
            self.errorAnim("Período escolar deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(registerSchoolKindDropdownValue == "" || registerSchoolKindDropdownValue == undefined)
        {
            console.log("ERRO: Tipo de escola deve ser preenchido");
            self.errorAnim("Tipo de escola deve ser preenchido.");

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
                self.registerAnim(false);
                self.loadingAnim(false);

                self.correctAnim("Cadastro efetuado.");

                self.tempToken = responseObj.token;
                self.locationAnim(true);

                let schoolType = "";

                if(self.registerSchoolKindDropdown.currentValue === "Pública")
                {
                    schoolType = "public";
                }
                else if(self.registerSchoolKindDropdown.currentValue === "Particular")
                {
                    schoolType = "private";
                }

                //ANALYTICS
                window.GASendSchoolPeriod(self.registerSchoolarPeriodDropdown.currentValue);
                window.GASendSchoolType(schoolType);

                // self.scheduleOnce(()=>{
                //     if(SceneChange_Behavior.instance)
                //         SceneChange_Behavior.instance.nextSceneLoad("Platform_OPTIMIZED");
                // }, 0.5);
            }

            if(self.errorIsOpened)
                return;

            if(responseObj.error === undefined)
                return;

            self.errorIsOpened = true;

            let newString = responseObj.error + ".";
            self.errorAnim(newString);

            self.scheduleOnce(()=>{
                self.errorIsOpened = false;
            }, 0.2);
            
            self.loadingAnim(false);

        };

        xmlhttp.send(JSON.stringify({ "email": emailInputValue, "name": "", "password": passwordInputValue }));
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
            self.errorAnim("Campo de Email deve ser preenchido.");

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
                self.recoverPasswordToEmailSent();
            }

            if(self.errorIsOpened)
                return;

            if(responseObj.error === undefined)
                return;

            self.errorIsOpened = true;

            let newString = responseObj.error + ".";
            self.errorAnim(newString);

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
            self.errorAnim("Campo de Senha deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(passwordConfirmationInputValue == "" || passwordConfirmationInputValue == undefined)
        {
            console.log("ERRO: Campo de Confirmação de Senha deve ser preenchido");
            self.errorAnim("Campo de Confirmação de Senha deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(passwordInputValue !== passwordConfirmationInputValue)
        {
            console.log("ERRO: Confirmação de Senha deve ser igual à senha");
            self.errorAnim("As senhas não coincidem");

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
                self.correctAnim("Senha alterada com sucesso.");

                window.history.replaceState(null, null, window.location.pathname);

                self.loadingAnim(false);
                self.newPasswordToLogin();
            }

            if(self.errorIsOpened)
                return;

            if(responseObj.error === undefined)
                return;

            self.errorIsOpened = true;

            let newString = responseObj.error + ".";
            self.errorAnim(newString);

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

    //CONFIRM LOCATION
    locationAnim(show: boolean)
    {
        var self = this;

        if(show)
        {   
            tween(self.locationAnimNode).to(self.fadeDuration, {opacity: 255}, {
                easing: 'quadInOut',
                onStart: () => {
                    self.locationAnimNode.node.active = true;
                }
            }).start();
        }
        else
        {
            tween(self.locationAnimNode).to(self.fadeDuration, {opacity: 0}, {
                easing: 'quadInOut',
                onComplete: () => {
                    self.locationAnimNode.node.active = false;
                }
            }).start();
        }
    }

    locationToGameLogic ()
    {
        var self = this;

        let stateDropdownValue = self.stateDropdown.currentValue;
        let cityDropdownValue = self.cityDropdown.currentValue;
        
        if(stateDropdownValue == "" || stateDropdownValue == undefined)
        {
            console.log("ERRO: Estado deve ser preenchido");
            self.errorAnim("Estado deve ser preenchido.");

            // self.loadingAnim(false);
            return;
        }

        if(cityDropdownValue == "" || cityDropdownValue == undefined)
        {
            console.log("ERRO: Cidade deve ser preenchido");
            self.errorAnim("Cidade deve ser preenchido.");

            // self.loadingAnim(false);
            return;
        }

        self.loginAnim(false);
        self.locationAnim(false);

        //ANALYTICS
        window.GASendState(stateDropdownValue);
        window.GASendCity(cityDropdownValue);

        self.correctAnim("Login sendo efetuado.");

        self.scheduleOnce(()=>{
            localStorage.setItem("userToken", self.tempToken);

            if(DataStorage.instance)
                DataStorage.instance.token = self.tempToken;

            if(SceneChange_Behavior.instance)
                SceneChange_Behavior.instance.nextSceneLoad("Platform_OPTIMIZED");
        }, 0.5);
    }

    openHyperLink(e, customEvent)
    {
        window.open(customEvent, '_blank');
    }

}