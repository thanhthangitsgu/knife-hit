import { _decorator, Component, math, Node, Quat, UITransform, Vec2, sp, Vec3 } from 'cc';
const { ccclass, property, requireComponent } = _decorator;
const { spine } = sp;
const { MathUtils } = spine;

@ccclass('WoodView')
@requireComponent(UITransform)
export class WoodView extends Component {
    private speed: number = 200;

    @property({
        type: Node,
    })
    private knife: Node;

    protected onLoad(): void {
    }

    protected update(dt: number): void {
        let r = this.node.eulerAngles.z + this.speed * dt;
        this.node.setRotationFromEuler(new Vec3(0, 0, r));
    }

    public getRotation(): number {
        return this.node.eulerAngles.z
    }
}

