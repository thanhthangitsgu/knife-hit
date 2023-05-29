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

    protected onLoad(): void {
        this.btPlay.node.on(Button.EventType.CLICK, () => {
            director.loadScene(Global.SCENE_NAME.Game);
        }, this)
    }
}

