import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, RigidBody2D, Slider, Tween, tween, Vec2, Vec3 } from 'cc';
import { Global } from '../Global';
import { AUDIO_TYPE, GAME_STATUS } from '../Enum';
import { AudioController } from '../Audio/AudioController';
const { ccclass, requireComponent, property } = _decorator;

@ccclass('Knife')
@requireComponent(Collider2D)
export class Knife extends Component {
    private angle: number = 0;

    private status = 0;

    private startPos: number;

    protected onLoad(): void {
        this.startPos = this.node.position.y;
        tween(this.node).to(0.1, {
            position: new Vec3(0, this.node.position.y + 100, 0)
        }).start();
        //Get collider component
        const collider = this.node.getComponent(Collider2D);

        //Hanlde collider
        collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D, contact: IPhysics2DContact) => {
            if (other.tag === 1 && this.status) Global.status = GAME_STATUS.GAME_HIT
        }, this)
    }

    public move(pos: Vec3) {
        tween(this.node).to(0.05, {
            position: pos
        }).start();

        setTimeout(() => {
            this.status = 1;
        }, 85);
    }

    public setAngle(_angle: number) {
        this.angle = _angle;
    }

    public getAngle(): number {
        return this.angle;
    }

    public setStatus(_status: number) {
        this.status = _status;
    }

    public getStatus(): number {
        return this.status;
    }




}

