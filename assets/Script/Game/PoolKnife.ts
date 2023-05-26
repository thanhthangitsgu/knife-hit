import { _decorator, Component, Input, input, instantiate, Node, Prefab } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('PoolKnife')
@requireComponent(Prefab)
export class PoolKnife extends Component {
    @property({
        type: Prefab,
        tooltip: "Knife prefab"
    })
    private knife: Prefab = null;

    protected start(): void {
        //init first create knife
        this.createKnife();

        //Handle on click
        input.on(Input.EventType.MOUSE_DOWN, this.createKnife, this);
    }

    private createKnife(): void {
        let element = instantiate(this.knife);
        this.node.addChild(element);
    }

}

