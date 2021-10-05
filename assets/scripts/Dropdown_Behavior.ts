
import { _decorator, Component, Node, tween, Vec3, Label, Color, instantiate, systemEvent, SystemEvent, SystemEventType, Button, Slider } from 'cc';
import { EstadosCidades } from './JSON/estadosCidades';
import { OptionBehavior } from './JSON/option_Behavior';
import { LoginRegisterController } from './LoginRegisterController';
const { ccclass, property } = _decorator;

@ccclass('DropdownBehavior')
export class DropdownBehavior extends Component {
    
    isOpened = false;

    @property(Boolean)
    isUsingValueLimits: boolean = false!;

    @property(Boolean)
    invertValues: boolean = false!;

    @property(Number)
    minimumValue: number = 0!;
    @property(Number)
    maximumValue: number = 0!;

    @property(EstadosCidades)
    stateCity: EstadosCidades = null!;

    @property([String])
    valueList: string[] = []!;

    @property(Boolean)
    useLogic_UF: boolean = false!;

    @property(Boolean)
    isUF: boolean = false!;

    @property(Button)
    unlockDropdown: Button = null!;

    @property(Node)
    dropBox: Node = null!;

    @property(Label)
    labelValue: Label = null!;

    insideDropBox: Node = null!;

    @property(Node)
    instanceArea: Node = null!;

    @property(Node)
    unlockInstanceArea: Node = null!;

    startString = "";
    currentValue = "";

    testLabel: Label = null!;
    testOption: OptionBehavior = null!;
    
    @property(Node)
    closeDropdownContainer = null!;

    alreadyCreated = false;


    onLoad () {
        var self = this;
        self.dropBox.active = self.isOpened;

        if(self.unlockDropdown)
            self.unlockDropdown.interactable = false;

        self.insideDropBox = self.dropBox.children[0];
        self.insideDropBox.setPosition(new Vec3(0,100,0));

        const instantiateBaseNode = self.instanceArea.children[0];

        self.startString = self.labelValue.string;

        // let useAsList = [''];

        if(self.useLogic_UF)
        {
            if(self.isUF)
            {
                if(self.stateCity)
                {
                    self.stateCity.completeObj.estados.forEach(estado => {
                        var newOption = instantiate(instantiateBaseNode);

                        if(newOption.getComponent(OptionBehavior))
                            self.testOption = newOption.getComponent(OptionBehavior);
        
                        self.testLabel = newOption.getComponentInChildren(Label);
            
                        if(self.testLabel)
                        {
                            self.testLabel.string = estado.nome;

                            if(newOption.getComponent(OptionBehavior))
                                self.testOption.id = estado.id;
                                self.testOption.optName = estado.nome;
                                self.testOption.cities = estado.cidades;
                        }
            
                        self.instanceArea.addChild(newOption);
                    });

                    // self.instanceArea.removeChild(self.instanceArea.children[0]);
                    self.instanceArea.children[0].destroy();
                }
            }
        }
        else
        {
            if(self.isUsingValueLimits)
            {
                self.valueList = [];

                for(let i = self.minimumValue; i <= self.maximumValue; i++)
                {
                    self.valueList[i - 1] = i.toString();
                }

                if(self.invertValues)
                {
                    self.valueList.reverse();
                }
            }

            self.valueList.forEach(newValue => {
                var newOption = instantiate(instantiateBaseNode);
    
                self.testLabel = newOption.getComponentInChildren(Label);
    
                if(self.testLabel)
                {
                    self.testLabel.string = newValue;
                }
    
                self.instanceArea.addChild(newOption);
            });
    
            // self.instanceArea.removeChild(self.instanceArea.children[0]);
            self.instanceArea.children[0].destroy();
        }
    }

    toggleBox()
    {

        console.log("OPEN");

        this.isOpened = !this.isOpened;

        console.log(this.isOpened);

        if(this.isOpened)
        {
            tween(this.insideDropBox).to(0.5, {
                position: new Vec3(0, -70, 0),
            }, {
                easing: 'cubicInOut',
                onStart: ()=> {
                    this.dropBox.active = this.isOpened;

                    console.log(this.dropBox);
                },
            }).start();
        }
        else
        {
            tween(this.insideDropBox).to(0.5, {
                position: new Vec3(0, 100, 0),
            }, {
                easing: 'cubicInOut',
                onComplete: ()=> {
                    this.dropBox.active = this.isOpened;

                    console.log("OFF - " + this.dropBox);
                },
            }).start();
        }

        console.log(this.dropBox);
    }

    forceCloseBox()
    {
        this.isOpened = false;

        tween(this.insideDropBox).to(0.5, {
            position: new Vec3(0, 100, 0),
        }, {
            easing: 'cubicInOut',
            onComplete: ()=> {
                this.dropBox.active = this.isOpened;
            },
        }).start();
    }

    clearValue()
    {
        var self = this;
        self.currentValue = "";

        self.labelValue.color = new Color(187, 187, 187, 255);
        self.labelValue.string = self.startString;

        if(self.useLogic_UF && self.unlockDropdown && self.isUF)
        {
            self.unlockDropdown.interactable = false;
        }
    }

    selectOption(e: TouchEvent)
    {
        var self = this;

        this.toggleBox();

        if(e.target.getComponentInChildren(Label))
        {
            let newLabel = e.target.getComponentInChildren(Label);

            console.log(e.target);

            let optionBehavior = e.target.getComponent(OptionBehavior);
            console.log(optionBehavior);
            this.labelValue.color = new Color(42, 42, 42, 255);
            this.labelValue.string = newLabel.string;

            this.currentValue = newLabel.string;

            if(self.useLogic_UF && self.unlockDropdown && self.isUF)
            {
                self.unlockDropdown.interactable = false;
                
                if(LoginRegisterController.instance)
                LoginRegisterController.instance.cityDropdown.clearValue();

                if(self.unlockInstanceArea.children.length == 1)
                {
                    console.log("Created all city options...");

                    self.createCityValues(optionBehavior.cities);
                }
                else
                {                    
                    for(let i = 1; i < self.unlockInstanceArea.children.length; i++)
                    {
                        console.log("Destroyed one child...");
                        
                        self.unlockInstanceArea.children[i].destroy();
                    }

                    self.createCityValues(optionBehavior.cities);

                    console.log("Creating all city options...");
                }

                self.unlockDropdown.interactable = true;
            }
        }
    }

    createCityValues(cities: string[])
    {
        var self = this;
        console.log(cities);

        const instantiateBaseNode = self.unlockInstanceArea.children[0];
        
        cities.forEach(city => {
            var newOption = instantiate(instantiateBaseNode);

            self.testLabel = newOption.getComponentInChildren(Label);

            if(self.testLabel)
            {
                self.testLabel.string = city;
            }

            self.unlockInstanceArea.addChild(newOption);
        });

        self.unlockInstanceArea.children[0].destroy();
    }
}