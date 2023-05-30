import { _decorator, Button, Component, find, Node } from 'cc';
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
    }

    //Turn on, turn off
    private controlButton(buttonOff: Button, buttonOn: Button): void {
        buttonOff.node.active = false;
        buttonOn.node.active = true;
    }


}

