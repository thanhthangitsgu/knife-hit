import { _decorator, Button, Component, director, find, Label, Node } from 'cc';
import { Global } from '../Global';
import { GAME_STATUS } from '../Enum';
import { Parameters } from '../Parameters';
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

    @property({
        type: Label,
        tooltip: "Label show apple score"
    })
    private appleScore: Label | null = null;

    @property({
        type: Node,
    })
    private newBest: Node | null = null;

    protected onLoad(): void {
        this.newBest.active = false;
        this.buttonRestart.node.on(Button.EventType.CLICK, () => {
            director.loadScene(Global.SCENE_NAME.Game);
        })

        this.buttonHome.node.on(Button.EventType.CLICK, () => {
            director.loadScene(Global.SCENE_NAME.Menu);
        })

        this.labelScore.string = `${Global.score}`;
        this.labelState.string = `STAGE ${Global.gameStage}`

        Global.status = GAME_STATUS.GAME_READY;

        let _appleScore = localStorage.getItem('knife_hit_highapple') ? Number(localStorage.getItem('knife_hit_highapple')) : 0;
        this.appleScore.string = `${_appleScore}`;

        let highScore: number | null = Number(localStorage.getItem('knife_hit_highscore')) ? Number(localStorage.getItem('knife_hit_highscore')) : 0;
        if (highScore < Global.score) {
            highScore = Global.score;
            this.newBest.active = true;
        }
        localStorage.setItem('knife_hit_highscore', `${highScore}`);
    }

    protected start(): void {
        Global.score = 0;
        Global.gameStage = 1;
    }
}

