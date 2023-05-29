import { WOOD_ANIMATION } from './../Enum';
import { _decorator, Component, math, Node, Quat, UITransform, Vec2, sp, Vec3, Animation, AnimationClip } from 'cc';
const { ccclass, property, requireComponent } = _decorator;
const { spine } = sp;
const { MathUtils } = spine;

@ccclass('WoodView')
@requireComponent(UITransform)
export class WoodView extends Component {
    @property({
        type: Node,
    })
    private wood: Node | null = null;

    private speed: number = 200;

    private animation: Animation = null;

    @property({
        type: AnimationClip
    })
    private animWood: AnimationClip;

    protected onLoad(): void {
        this.animation = this.wood.getComponent(Animation);
    }

    protected update(dt: number): void {
        let r = this.wood.eulerAngles.z + this.speed * dt;
        this.wood.setRotationFromEuler(new Vec3(0, 0, r));
    }

    public runAnimation(nameAnim: WOOD_ANIMATION): void {
        switch (nameAnim) {
            case WOOD_ANIMATION.Appear:
                this.animation.play('animWood');
                break;
            case WOOD_ANIMATION.Hit:
                this.animation.play('animColide');
                break;
        }
    }

}

