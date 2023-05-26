import { _decorator, Component, Node } from 'cc';
const { ccclass } = _decorator;

@ccclass('GameModal')
export class GameModal extends Component {
    public static currentStage: number = 0;
    public static dataStage = [];
}

