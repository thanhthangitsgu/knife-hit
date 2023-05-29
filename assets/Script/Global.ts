import { _decorator, Component } from 'cc';
import { GAME_STATUS } from './Enum';
const { ccclass, property } = _decorator;

// Constant of project
@ccclass('Global')
export class Global extends Component {
    //Game status
    public static status: GAME_STATUS = GAME_STATUS.GAME_READY;
}