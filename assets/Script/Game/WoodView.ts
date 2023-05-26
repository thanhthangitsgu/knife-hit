import { _decorator, Component, math, Node, Quat, UITransform, Vec2, sp, Vec3 } from 'cc';
const { ccclass, property, requireComponent } = _decorator;
const { spine } = sp;
const { MathUtils } = spine;

@ccclass('WoodView')
@requireComponent(UITransform)
export class WoodView extends Component {
    private rotation: number = 180;
    private speed: number = 20;

    @property({
        type: Node,
    })
    private knife: Node;

    protected onLoad(): void {

    }

    protected update(dt: number): void {
        this.rotation -= this.speed * dt;
        if (this.rotation <= -180) this.rotation = 180;

          //Init quat
          let quat: Quat = new Quat;
          Quat.fromEuler(quat, 0, 0, this.rotation);
          this.node.setRotation(quat);
    }

    public getRotation(): number {
        return this.rotation;
    }
}

