import { _decorator, Button, Component, find, Label, Node } from 'cc';
import { SETTING_STATUS } from '../Enum';
import { Parameters } from '../Parameters';
const { ccclass, property } = _decorator;

@ccclass('SettingController')
export class SettingController extends Component {
    @property({
        type: Button
    })
    private buttonOnSound: Button | null = null;

    @property({
        type: Button,
    })
    private buttonOffSound: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button clear data"
    })
    
    private buttonClear: Button | null = null;

    @property({
        type: Label
    })
    private labelScore: Label;

    @property({
        type: Label,
    })
    private labelStage: Label

    private soundStatus: SETTING_STATUS = SETTING_STATUS.ON;

    protected onLoad(): void {
        //Setting parameter: 
        const node = find('Parameters');
        const parameter = node ? node.getComponent(Parameters) : null;
        this.soundStatus = parameter ? parameter.getSoundStatus() : SETTING_STATUS.ON;

        //Setting stauts of buttons
        if (this.soundStatus === SETTING_STATUS.ON) {
            this.controlButton(this.buttonOffSound, this.buttonOnSound);
        } else {
            this.controlButton(this.buttonOnSound, this.buttonOffSound);
        }

        //Handle on event of buttons
        this.buttonOnSound.node.on(Button.EventType.CLICK, () => {
            this.controlButton(this.buttonOnSound, this.buttonOffSound);
            parameter.setSoundStatus(SETTING_STATUS.OFF);
        }, this)

        this.buttonOffSound.node.on(Button.EventType.CLICK, () => {
            this.controlButton(this.buttonOffSound, this.buttonOnSound);
            parameter.setSoundStatus(SETTING_STATUS.ON);
        }, this)

        this.buttonClear.node.on(Button.EventType.CLICK, () => {
            localStorage.setItem('knife_hit_highscore', '0');
            localStorage.setItem('knife_hit_highapple', '0');
            this.labelScore.string = 'SCORE 0';
            this.labelStage.string = 'STAGE 0';
        })
    }

    //Turn on, turn off
    private controlButton(buttonOff: Button, buttonOn: Button): void {
        buttonOff.node.active = false;
        buttonOn.node.active = true;
    }


}

