import { _decorator, Component, easing, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Logo')
export class Logo extends Component {
    @property({
        type: Node,
        tooltip: "Bottom part of logo"
    })
    private bottomLogo: Node | null = null;

    @property({
        type: Node,
        tooltip: "Top part of logo"
    })
    private topLogo: Node | null = null;


}

