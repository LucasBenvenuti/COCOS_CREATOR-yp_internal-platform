
import { _decorator, Component, UIOpacity, tween, AnimationComponent, EditBoxComponent, Label, Vec3, lerp, Prefab, instantiate, Node, EventTouch, find, Button, SystemEventType, resources, Toggle, BlockInputEventsComponent } from 'cc';
import { DataStorage } from './DataStorage';
import { SceneChange_Behavior } from '../external/SceneChange_Behavior';
import { DropdownBehavior } from './Dropdown_Behavior';
import { FeedbackBoxBehavior } from './FeedbackBox_Behavior';
import { SetSibling } from '../external/SetSibling';
import { PrefabContainer } from './PrefabContainer';
import { AudioController } from './AudioController';

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

    @property(UIOpacity)
    registerPage_0_Node: UIOpacity = null!;
    @property(UIOpacity)
    registerPage_1_Node: UIOpacity = null!;

    @property(Node)
    registerPageCircle_0 = null!;
    @property(Node)
    registerPageCircle_1 = null!;

    @property(Node)
    blockEventInputRegister: Node = null!;

    @property(EditBoxComponent)
    registerNameField: EditBoxComponent = null!;
    @property(EditBoxComponent)
    registerCPFField: EditBoxComponent = null!;
    @property(EditBoxComponent)
    registerDateField: EditBoxComponent = null!;

    @property(EditBoxComponent)
    registerEmailField: EditBoxComponent = null!;
    @property(EditBoxComponent)
    registerPasswordField: EditBoxComponent = null!;

    @property(DropdownBehavior)
    registerDayDropdown: DropdownBehavior = null!;
    @property(DropdownBehavior)
    registerMonthDropdown: DropdownBehavior = null!;
    @property(DropdownBehavior)
    registerYearDropdown: DropdownBehavior = null!;

    @property(DropdownBehavior)
    registerSchoolarPeriodDropdown: DropdownBehavior = null!;
    @property(DropdownBehavior)
    registerSchoolKindDropdown: DropdownBehavior = null!;

    @property(Toggle)
    registerAcceptTerms: Toggle = null!;

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

    @property(Toggle)
    lastAcceptTerms: Toggle = null!;

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

        self.registerPage_0_Node = find("Canvas/FormsBG/Register/Page_0")?.getComponent(UIOpacity);
        self.registerPage_1_Node = find("Canvas/FormsBG/Register/Page_1")?.getComponent(UIOpacity);

        self.registerPageCircle_0 = find("Canvas/FormsBG/Register/PageCount/Circle_0");
        self.registerPageCircle_1 = find("Canvas/FormsBG/Register/PageCount/Circle_1");

        

        self.blockEventInputRegister = find("Canvas/FormsBG/Register/BlockEventInput");

        self.registerNameField = find("Canvas/FormsBG/Register/Page_0/Input_Box_0/EditBox_Name")?.getComponent(EditBoxComponent);
        self.registerCPFField = find("Canvas/FormsBG/Register/Page_0/Input_Box_1/EditBox_CPF")?.getComponent(EditBoxComponent);
        self.registerDateField = find("Canvas/FormsBG/Register/Page_0/Input_Box_2/EditBox_Date")?.getComponent(EditBoxComponent);
        self.registerEmailField = find("Canvas/FormsBG/Register/Page_1/Input_Box_0/EditBox_Email")?.getComponent(EditBoxComponent);
        self.registerPasswordField = find("Canvas/FormsBG/Register/Page_1/Input_Box_1/EditBox_Password")?.getComponent(EditBoxComponent);

        self.registerDayDropdown = find("Canvas/FormsBG/Register/Page_0/Input_Box_Day")?.getComponent(DropdownBehavior);
        self.registerMonthDropdown = find("Canvas/FormsBG/Register/Page_0/Input_Box_Month")?.getComponent(DropdownBehavior);
        self.registerYearDropdown = find("Canvas/FormsBG/Register/Page_0/Input_Box_Year")?.getComponent(DropdownBehavior);

        self.registerSchoolarPeriodDropdown = find("Canvas/FormsBG/Register/Page_1/Input_Box_3")?.getComponent(DropdownBehavior);
        self.registerSchoolKindDropdown = find("Canvas/FormsBG/Register/Page_1/Input_Box_2")?.getComponent(DropdownBehavior);
        self.registerAcceptTerms = find("Canvas/FormsBG/Register/CheckBox_Input/Toggle")?.getComponent(Toggle);

        self.lastAcceptTerms = find("Canvas/LastInputs/Box_Inicio/CheckBox_Input/ToggleBorder")?.getComponent(Toggle);

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

        self.registerPage_0_Node.opacity = 255;
        self.registerPage_1_Node.opacity = 0;

        self.registerPageCircle_0.setScale(1,1,1);
        self.registerPageCircle_1.setScale(0.7,0.7,0.7);

        self.registerNode.node.active = false;

        // self.registerNameField.enabled = false;
        // self.registerCPFField.enabled = false;

        self.recoveryPasswordNode.node.active = false;
        self.emailSentNode.node.active = false;
        self.NewPasswordNode.node.active = false;
        self.NewPasswordConfirmationNode.node.active = false;
        self.loadingNode.node.active = false;
        self.locationAnimNode.node.active = false;

        self.registerPage_0_Node.node.active = true;
        self.registerPage_1_Node.node.active = false;
        self.blockEventInputRegister.active = false;

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

                if(localStorage.getItem("platform_stateCityAlreadySetted") && localStorage.getItem("platform_stateCityAlreadySetted") === "true")
                {
                    self.correctAnim("Login sendo efetuado.");

                    localStorage.setItem("userToken", self.tempToken);

                    window.GASendUserType("Usu??rio");

                    if(DataStorage.instance)
                        DataStorage.instance.token = self.tempToken;

                    self.scheduleOnce(()=>{
                        if(SceneChange_Behavior.instance)
                            SceneChange_Behavior.instance.nextSceneLoad("Platform_OPTIMIZED");
                    }, 0.5);
                }
                else
                {
                    self.locationAnim(true);
                }
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
        
        // if(localStorage.getItem("platform_stateCityAlreadySetted") && localStorage.getItem("platform_stateCityAlreadySetted") === "true")
        // {
        //     window.GASendUserType("Convidado");
        //     localStorage.setItem("userToken", "guest");
    
        //     if(DataStorage.instance)
        //         DataStorage.instance.token = "guest";
    
        //     if(SceneChange_Behavior.instance)
        //         SceneChange_Behavior.instance.nextSceneLoad("Platform_OPTIMIZED");
        // }
        // else
        // {
        //     self.tempToken = "guest";
        //     self.locationAnim(true);
        // }
    }

    nextRegisterPageLogic() {
        var self = this;

        console.log("Next Page");

        self.registerPage_0_Node.node.active = true;
        // self.registerPage_1_Node.node.active = true;

        self.blockEventInputRegister.active = true;

        tween(self.registerPage_0_Node).to(self.fadeDuration, {opacity: 0}, {
            easing: 'quadInOut',
            onComplete: () => {
                self.registerPage_0_Node.node.active = false;
                // localStorage.setItem("platform_cookiesEnabled", "true");
            }
        }).start();

        self.scheduleOnce(()=> {

            self.registerPage_1_Node.node.active = true;

            tween(self.registerPageCircle_0).to(self.fadeDuration, {scale: new Vec3(0.7,0.7,0.7)}, {
                easing: 'quadInOut',
                onComplete: () => {
                }
            }).start();
            tween(self.registerPageCircle_1).to(self.fadeDuration, {scale: new Vec3(1,1,1)}, {
                easing: 'quadInOut',
                onComplete: () => {
                }
            }).start();

            tween(self.registerPage_1_Node).to(self.fadeDuration, {opacity: 255}, {
                easing: 'quadInOut',
                onComplete: () => {
                    self.blockEventInputRegister.active = false;

                    console.log(self.registerPage_1_Node);
                    // localStorage.setItem("platform_cookiesEnabled", "true");
                }
            }).start();
        }, 0.15);
    }

    returnRegisterPageLogic() {
        var self = this;

        console.log("Return Page");

        self.registerPage_1_Node.node.active = true;

        self.blockEventInputRegister.active = true;

        tween(self.registerPage_1_Node).to(self.fadeDuration, {opacity: 0}, {
            easing: 'quadInOut',
            onComplete: () => {
                self.registerPage_1_Node.node.active = false;
                // localStorage.setItem("platform_cookiesEnabled", "true");
            }
        }).start();

        self.scheduleOnce(()=> {

            self.registerPage_0_Node.node.active = true;

            tween(self.registerPageCircle_0).to(self.fadeDuration, {scale: new Vec3(1,1,1)}, {
                easing: 'quadInOut',
                onComplete: () => {
                }
            }).start();
            tween(self.registerPageCircle_1).to(self.fadeDuration, {scale: new Vec3(0.7,0.7,0.7)}, {
                easing: 'quadInOut',
                onComplete: () => {
                }
            }).start();

            tween(self.registerPage_0_Node).to(self.fadeDuration, {opacity: 255}, {
                easing: 'quadInOut',
                onComplete: () => {
                    self.blockEventInputRegister.active = false;
                    // localStorage.setItem("platform_cookiesEnabled", "true");
                }
            }).start();
        }, 0.15);
    }

    registerlogic() {
        var self = this;

        let url = "https://hfl5rlsrp5.execute-api.sa-east-1.amazonaws.com/user-register";

        let nameInputValue = self.registerNameField.string;
        let cpfInputValue = self.registerCPFField.string;
        let dateInputValue = self.registerDateField.string;

        let emailInputValue = self.registerEmailField.string;
        let passwordInputValue = self.registerPasswordField.string;

        let dayInputValue = self.registerDayDropdown.currentValue;
        let monthInputValue = self.registerMonthDropdown.currentValue;
        let yearInputValue = self.registerYearDropdown.currentValue;

        let registerSchoolarPeriodDropdownValue = self.registerSchoolarPeriodDropdown.currentValue;
        let registerSchoolKindDropdownValue = self.registerSchoolKindDropdown.currentValue;

        // let acceptTerms = self.registerAcceptTerms.isChecked;

        if(nameInputValue == "" || nameInputValue == undefined)
        {
            console.log("ERRO: Campo de Nome do respons??vel deve ser preenchido");
            self.errorAnim("Campo de Nome do respons??vel deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(cpfInputValue == "" || cpfInputValue == undefined || cpfInputValue.length !== 11)
        {
            console.log('ERRO: Campo de CPF deve ser preenchido corretamente sem "." e sem "-"');
            self.errorAnim('Campo de CPF deve ser preenchido corretamente sem "." e sem "-".');

            self.loadingAnim(false);
            return;
        }

        if(dayInputValue == "" || dayInputValue == undefined)
        {
            console.log("ERRO: Campo de Dia deve ser preenchido");
            self.errorAnim("Campo de Dia deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(monthInputValue == "" || monthInputValue == undefined)
        {
            console.log("ERRO: Campo de M??s deve ser preenchido");
            self.errorAnim("Campo de M??s deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(yearInputValue == "" || yearInputValue == undefined)
        {
            console.log("ERRO: Campo de Ano deve ser preenchido");
            self.errorAnim("Campo de Ano deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if((monthInputValue === "2" && parseInt(dayInputValue) > 29) || (monthInputValue === "4" && parseInt(dayInputValue) > 30) || (monthInputValue === "6" && parseInt(dayInputValue) > 30) || (monthInputValue === "9" && parseInt(dayInputValue) > 30) || (monthInputValue === "11" && parseInt(dayInputValue) > 30))
        {
            console.log('ERRO: Dia inv??lido, tente novamente');
            self.errorAnim('Dia inv??lido, tente novamente.');

            self.loadingAnim(false);
            return;
        }

        if(registerSchoolarPeriodDropdownValue === "Per??odo escolar")
        {
            registerSchoolarPeriodDropdownValue = "-";
        }

        if(registerSchoolKindDropdownValue === "Tipo de escola")
        {
            registerSchoolKindDropdownValue = "-";
        }

        // if(registerSchoolarPeriodDropdownValue == "" || registerSchoolarPeriodDropdownValue == undefined)
        // {
        //     console.log("ERRO: Per??odo escolar deve ser preenchido");
        //     self.errorAnim("Per??odo escolar deve ser preenchido.");

        //     self.loadingAnim(false);
        //     return;
        // }

        // if(registerSchoolKindDropdownValue == "" || registerSchoolKindDropdownValue == undefined)
        // {
        //     console.log("ERRO: Tipo de escola deve ser preenchido");
        //     self.errorAnim("Tipo de escola deve ser preenchido.");

        //     self.loadingAnim(false);
        //     return;
        // }

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

        // if(!acceptTerms)
        // {
        //     console.log("ERRO: ?? preciso aceitar os Termos e Pol??tica de Privacidade");
        //     self.errorAnim("?? preciso aceitar os Termos e Pol??tica de Privacidade.");

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
                self.loginAnim(true);
                self.loadingAnim(false);

                self.correctAnim("Cadastro efetuado.");

                self.tempToken = responseObj.token;

                let schoolType = "";

                if(self.registerSchoolKindDropdown.currentValue === "P??blica")
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

                self.locationAnim(true);
            }

            if(self.errorIsOpened)
                return;

            if(responseObj.error === undefined)
                return;

            self.errorIsOpened = true;

            let newString = responseObj.error;
            self.errorAnim(newString);

            self.scheduleOnce(()=>{
                self.errorIsOpened = false;
            }, 0.2);
            
            self.loadingAnim(false);

        };

        if(parseInt(dayInputValue) < 10)
        {
            dayInputValue = "0" + dayInputValue;
        }

        if(parseInt(monthInputValue) < 10)
        {
            monthInputValue = "0" + monthInputValue;
        }

        xmlhttp.send(JSON.stringify({ "name": nameInputValue, "school_year": registerSchoolarPeriodDropdownValue, "school_type": registerSchoolKindDropdownValue, "birth_date": dayInputValue + "/" + monthInputValue + "/" + yearInputValue, "email": emailInputValue, "password": passwordInputValue, "cpf": cpfInputValue }));
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
            // console.log(response);
            console.log(xmlhttp.status);
            if (xmlhttp.status === 200)
            {
                //Success
                self.loadingAnim(false);
                self.recoverPasswordToEmailSent();

                return;
            }

            if(responseObj.error === 500)
            {
                let newString = responseObj.error + ".";
                self.errorAnim(newString);

                self.loadingAnim(false);
                return;
            }

            if(self.errorIsOpened)
            {
                console.log("ERRO: Ocorreu um erro. Tente novamente.");
                self.errorAnim("Ocorreu um erro. Tente novamente.");

                self.loadingAnim(false);
                return;
            }

            if(responseObj.error === undefined)
            {
                console.log("ERRO: Ocorreu um erro desconhecido. Tente novamente.");
                self.errorAnim("Ocorreu um erro desconhecido. Tente novamente.");

                self.loadingAnim(false);
                return;
            }

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
            console.log("ERRO: Campo de Confirma????o de Senha deve ser preenchido");
            self.errorAnim("Campo de Confirma????o de Senha deve ser preenchido.");

            self.loadingAnim(false);
            return;
        }

        if(passwordInputValue !== passwordConfirmationInputValue)
        {
            console.log("ERRO: Confirma????o de Senha deve ser igual ?? senha");
            self.errorAnim("As senhas n??o coincidem");

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
            // console.log(response);
            console.log(xmlhttp);
            if (xmlhttp.status === 200)
            {
                //Success
                self.correctAnim("Senha alterada com sucesso.");

                window.history.replaceState(null, null, window.location.pathname);

                self.loadingAnim(false);
                self.newPasswordToLogin();

                return;
            }

            if(responseObj.error === 500)
            {
                let newString = responseObj.error + ".";
                self.errorAnim(newString);

                self.loadingAnim(false);
                return;
            }

            if(self.errorIsOpened)
            {
                console.log("ERRO: Ocorreu um erro. Tente novamente.");
                self.errorAnim("Ocorreu um erro. Tente novamente.");

                self.loadingAnim(false);
                return;
            }

            if(responseObj.error === undefined)
            {
                console.log("ERRO: Ocorreu um erro desconhecido. Tente novamente.");
                self.errorAnim("Ocorreu um erro desconhecido. Tente novamente.");

                self.loadingAnim(false);
                return;
            }

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

        let acceptTerms = self.lastAcceptTerms.isChecked;

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

        if(!acceptTerms)
        {
            console.log("ERRO: ?? preciso aceitar os Termos e Pol??tica de Privacidade");
            self.errorAnim("?? preciso aceitar os Termos e Pol??tica de Privacidade.");

            // self.loadingAnim(false);
            return;
        }

        self.loginAnim(false);
        self.locationAnim(false);

        //ANALYTICS
        window.GASendState(stateDropdownValue);
        window.GASendCity(cityDropdownValue);

        self.correctAnim("Login sendo efetuado.");

        localStorage.setItem("platform_stateCityAlreadySetted", "true");

        self.scheduleOnce(()=>{
            localStorage.setItem("userToken", self.tempToken);

            if(self.tempToken === "guest")
            {
                window.GASendUserType("Convidado");
            }
            else
            {
                window.GASendUserType("Usu??rio");
            }

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