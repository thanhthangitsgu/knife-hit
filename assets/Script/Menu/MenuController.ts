import { Parameters } from './../Parameters';
import { _decorator, Button, Component, director, Node } from 'cc';
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

    protected onLoad(): void {
        //Turn of boardsetting
        this.boardSetting.active = false;

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
    }

    protected start(): void {

    }
}

