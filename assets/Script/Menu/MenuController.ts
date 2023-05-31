import { Parameters } from './../Parameters';
import { _decorator, Button, Component, director, Label, Node } from 'cc';
import { Global } from '../Global';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {
    @property({
        type: Button,
        tooltip: "Button play game"
    })
    private btPlay: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button setting"
    })
    private buttonSetting: Button | null = null;

    @property({
        type: Node,
        tooltip: "Board of setting"
    })
    private boardSetting: Node | null = null;

    @property({
        type: Button,
        tooltip: "Button home"
    })
    private buttonHome: Button | null = null;

    @property({
        type: Node,
        tooltip: "Parametes setting"
    })
    private parameters: Node | null = null;

    @property({
        type: Label,
    })
    private labelScore: Label | null = null;

    @property({
        type: Label
    })
    private labelStage: Label | null = null;

    @property({
        type: Node,
    })
    private knifeSetting: Node;

    @property({
        type: Button
    })
    private buttonKnife: Button;

    protected onLoad(): void {
        //Turn of boardsetting
        this.boardSetting.active = false;
        this.knifeSetting.active = false;

        //Add parameters
        this.btPlay.node.on(Button.EventType.CLICK, () => {
            director.loadScene(Global.SCENE_NAME.Game);
        }, this)

        this.buttonSetting.node.on(Button.EventType.CLICK, () => {
            this.boardSetting.active = true;
        })

        this.buttonHome.node.on(Button.EventType.CLICK, () => {
            this.boardSetting.active = false;
        })

        this.buttonHome.node.on(Button.EventType.CLICK, () => {
            this.knifeSetting.active = false;
        })

        this.buttonKnife.node.on(Button.EventType.CLICK, () => {
            this.knifeSetting.active = true;
        })

        this.labelScore.string = localStorage.getItem('knife_hit_highscore') ? `SCORE ${localStorage.getItem('knife_hit_highscore')}` : "";
        this.labelStage.string = localStorage.getItem('knife_hit_highstage') ? `STAGE ${localStorage.getItem('knife_hit_highstage')}` : "";
    }

    protected start(): void {

    }
}

