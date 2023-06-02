import { _decorator, Animation, Collider2D, Component, Contact2DType, director, Input, input, IPhysics2DContact, RigidBody2D, Slider, Tween, tween, Vec2, Vec3 } from 'cc';
import { Global } from '../Global';
import { GAME_STATUS } from '../Enum';
const { ccclass, requireComponent, property } = _decorator;

@ccclass('Knife')
@requireComponent(Collider2D)
export class Knife extends Component {

    public speed = 0;

    public stop: number = 0;

    private angle: number = 0;

    /** value: 
     * 
     */
    private status = 0;

    private startPos: number;

    private anim: Animation;

    protected onLoad(): void {
        tween(this.node).to(1 / 10000, {
            position: new Vec3(0, this.node.position.y + 200, 0)
        }).call(() => {
            // input.on(Input.EventType.MOUSE_DOWN, () => {
            //     this.speed = 9000;
            // }, this)
        }).start();

        this.anim = this.node.getComponent(Animation);

        console.log(this.anim);
    }

    protected start(): void {
        //Get collider component
        const collider = this.node.getComponent(Collider2D);
        const anim = this.node.getComponent(Animation);
        // anim.play('animKnifeColide');

        //Hanlde collider
        collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
            if (other.tag === 1 && this.status === 1) {
                Global.status = GAME_STATUS.GAME_HIT;
                input.off(Input.EventType.MOUSE_DOWN);
                this.speed = 0;
                this.status = 2;
            }
        }, this)
    }

    protected update(dt: number): void {
        if (this.status === 0 && this.node.worldPosition.y >= this.stop) {
            this.speed = 0;
            this.status = 1;
        }
        this.node.setPosition(this.node.position.x, this.node.position.y + this.speed * dt, this.node.position.z);

    }

    private setPosAndRot(dt: number): void {
        this.node.setPosition(this.node.position.x, this.node.position.y - 1000 * dt, this.node.position.z);
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

    public runAnim(): void {
        this.anim.play('animKnifeColide');
    }

}

