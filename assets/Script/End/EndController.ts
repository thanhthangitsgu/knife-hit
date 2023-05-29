import { _decorator, Button, Component, director, Label, Node } from 'cc';
import { Global } from '../Global';
import { GAME_STATUS } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('EndController')
export class EndController extends Component {
    @property({
        type: Button,
        tooltip: "Button restart"
    })
    private buttonRestart: Button | null = null;

    @property({
        type: Button,
        tooltip: "Return home"
    })
    private buttonHome: Button | null = null;

    @property({
        type: Label,
        tooltip: "Label show score"
    })
    private labelScore: Label | null = null;

    @property({
        type: Label,
        tooltip: "Label show stage"
    })
    private labelState: Label | null = null;

    protected onLoad(): void {
        this.buttonRestart.node.on(Button.EventType.CLICK, () => {
            director.loadScene(Global.SCENE_NAME.Game);
        })

        this.buttonHome.node.on(Button.EventType.CLICK, () => {
            director.loadScene(Global.SCENE_NAME.Menu);
        })

        this.labelScore.string = `${Global.score}`;
        this.labelState.string = `STAGE ${Global.gameStage}`

        Global.status = GAME_STATUS.GAME_READY;
    }

    protected start(): void {
        Global.score = 0;
        Global.gameStage = 1;
    }
}

