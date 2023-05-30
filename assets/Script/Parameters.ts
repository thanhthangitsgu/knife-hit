import { _decorator, Component, director, Node } from 'cc';
import { SETTING_STATUS } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('Parameters')
export class Parameters extends Component {
    private soundStatus: SETTING_STATUS = SETTING_STATUS.ON;

    protected onLoad(): void {
        director.addPersistRootNode(this.node);
    }

    public setSoundStatus(_soundStatus: SETTING_STATUS): void {
        this.soundStatus = _soundStatus;
    }

    public getSoundStatus(): SETTING_STATUS {
        return this.soundStatus;
    }
}

