import { _decorator, Animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BrokenController')
export class BrokenController extends Component {
    @property({
        type: Node,
        tooltip: "Broken woood"
    })
    private brokenWood: Node | null = null;

    protected onLoad(): void {
        this.brokenWood.active = false;
    }

    public runAnim(): void {
        this.brokenWood.active = true;
        const anim = this.brokenWood.getComponent(Animation);
        anim.play();
    }
}

