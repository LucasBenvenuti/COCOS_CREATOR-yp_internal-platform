
import { _decorator, Component, Node } from 'cc';
import { LoginRegisterController } from './LoginRegisterController';
const { ccclass, property } = _decorator;

@ccclass('SeparatedFunctionsLoginRegister')
export class SeparatedFunctionsLoginRegister extends Component {

    disappearCookies()
    {
        if(LoginRegisterController.instance)
            LoginRegisterController.instance.disappearCookies("", true);
    }

    openHyperLink(e, customEvent)
    {
        if(LoginRegisterController.instance)
            LoginRegisterController.instance.openHyperLink(e, customEvent);
    }

    loginLogic()
    {
        if(LoginRegisterController.instance)
            LoginRegisterController.instance.loginlogic();
    }

    loginToRecoveryPassword()
    {
        if(LoginRegisterController.instance)
            LoginRegisterController.instance.loginToRecoverPassword();
    }

    guestLogic()
    {
        if(LoginRegisterController.instance)
            LoginRegisterController.instance.guestlogic();
    }

    loginToRegister()
    {
        if(!LoginRegisterController.instance)
            return;
            
        LoginRegisterController.instance.loginToRegister();
        LoginRegisterController.instance.loginEmailField.string = "";
        LoginRegisterController.instance.loginPasswordField.string = "";
    }

    confirmRegister()
    {
        if(!LoginRegisterController.instance)
            return;

        LoginRegisterController.instance.registerSchoolKindDropdown.forceCloseBox();
        LoginRegisterController.instance.registerSchoolarPeriodDropdown.forceCloseBox();
        
        LoginRegisterController.instance.registerlogic();
    }

    returnRegister()
    {
        if(!LoginRegisterController.instance)
            return;

        LoginRegisterController.instance.registerNameField.string = "";
        LoginRegisterController.instance.registerCPFField.string = "";
        LoginRegisterController.instance.registerDateField.string = "";
        LoginRegisterController.instance.registerEmailField.string = "";
        LoginRegisterController.instance.registerPasswordField.string = "";
        LoginRegisterController.instance.registerSchoolKindDropdown.forceCloseBox();
        LoginRegisterController.instance.registerSchoolKindDropdown.clearValue();
        LoginRegisterController.instance.registerSchoolarPeriodDropdown.forceCloseBox();
        LoginRegisterController.instance.registerSchoolarPeriodDropdown.clearValue();

        LoginRegisterController.instance.registerDayDropdown.forceCloseBox();
        LoginRegisterController.instance.registerDayDropdown.clearValue();
        LoginRegisterController.instance.registerMonthDropdown.forceCloseBox();
        LoginRegisterController.instance.registerMonthDropdown.clearValue();
        LoginRegisterController.instance.registerYearDropdown.forceCloseBox();
        LoginRegisterController.instance.registerYearDropdown.clearValue();
        
        LoginRegisterController.instance.registerToLogin();
    }

    nextRegisterPageLogic() {
        LoginRegisterController.instance.nextRegisterPageLogic();

        LoginRegisterController.instance.registerDayDropdown.forceCloseBox();
        LoginRegisterController.instance.registerMonthDropdown.forceCloseBox();
        LoginRegisterController.instance.registerYearDropdown.forceCloseBox();
    }
    returnRegisterPageLogic() {
        LoginRegisterController.instance.returnRegisterPageLogic();
        
        LoginRegisterController.instance.registerSchoolKindDropdown.forceCloseBox();
        LoginRegisterController.instance.registerSchoolarPeriodDropdown.forceCloseBox();
    }

    dropboxCloseToggle_Day()
    {
        if(!LoginRegisterController.instance)
            return;

        LoginRegisterController.instance.registerDayDropdown.toggleBox();
        // LoginRegisterController.instance.registerDayDropdown.forceCloseBox();
    }

    dropboxCloseToggle_Month()
    {
        if(!LoginRegisterController.instance)
            return;

        LoginRegisterController.instance.registerMonthDropdown.toggleBox();
        // LoginRegisterController.instance.registerMonthDropdown.forceCloseBox();
    }

    dropboxCloseToggle_Year()
    {
        if(!LoginRegisterController.instance)
            return;

        LoginRegisterController.instance.registerYearDropdown.toggleBox();
        // LoginRegisterController.instance.registerYearDropdown.forceCloseBox();
    }        

    dropboxCloseToggle_Register_2()
    {
        if(!LoginRegisterController.instance)
            return;

        LoginRegisterController.instance.registerSchoolKindDropdown.toggleBox();
        LoginRegisterController.instance.registerSchoolarPeriodDropdown.forceCloseBox();
    }
    dropboxCloseToggle_Register_3()
    {
        if(!LoginRegisterController.instance)
            return;

        LoginRegisterController.instance.registerSchoolarPeriodDropdown.toggleBox();
        LoginRegisterController.instance.registerSchoolKindDropdown.forceCloseBox();
    }

    confirmRecoverPassword()
    {
        if(!LoginRegisterController.instance)
            return;

        LoginRegisterController.instance.recoverPasswordlogic();
        LoginRegisterController.instance.recoveryEmailField.string = "";
    }
    returnRecoverPassword()
    {
        if(!LoginRegisterController.instance)
            return;

            LoginRegisterController.instance.recoverPasswordToLogin();
            LoginRegisterController.instance.recoveryEmailField.string = "";
    }

    returnEmailSent()
    {
        if(!LoginRegisterController.instance)
            return;
        
        LoginRegisterController.instance.emailSentToLogin();
    }

    confirmNewPassword()
    {
        if(!LoginRegisterController.instance)
            return;
        
        LoginRegisterController.instance.newPasswordlogic();
        LoginRegisterController.instance.changePasswordField.string = "";
        LoginRegisterController.instance.changePasswordConfirmationField.string = "";
    }

    returnNewPasswordChanged()
    {
        if(!LoginRegisterController.instance)
            return;
        
        LoginRegisterController.instance.newPasswordConfirmationToLogin();
    }

    enterLastInputs()
    {
        if(!LoginRegisterController.instance)
            return;

        LoginRegisterController.instance.stateDropdown.forceCloseBox();
        LoginRegisterController.instance.cityDropdown.forceCloseBox();
        
        LoginRegisterController.instance.locationToGameLogic();
    }

    dropboxCloseToggle_LastInputs_2()
    {
        if(!LoginRegisterController.instance)
            return;

        LoginRegisterController.instance.cityDropdown.toggleBox();
        LoginRegisterController.instance.stateDropdown.forceCloseBox();
    }
    dropboxCloseToggle_LastInputs_3()
    {
        if(!LoginRegisterController.instance)
            return;

        LoginRegisterController.instance.stateDropdown.toggleBox();
        LoginRegisterController.instance.cityDropdown.forceCloseBox();
    }
    returnLastInputs()
    {
        if(!LoginRegisterController.instance)
            return;

        LoginRegisterController.instance.stateDropdown.forceCloseBox();
        LoginRegisterController.instance.stateDropdown.clearValue();
        LoginRegisterController.instance.cityDropdown.forceCloseBox();
        LoginRegisterController.instance.cityDropdown.clearValue();

        LoginRegisterController.instance.lastAcceptTerms.isChecked = false;
        
        LoginRegisterController.instance.locationAnim(false);
    }
}