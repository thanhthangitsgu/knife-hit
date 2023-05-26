import { _decorator, Collider2D, Component, input, Input, Node, tween, UITransform, Vec3 } from 'cc';
import { KNIFE_STATUS } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('Knife')
export class Knife extends Component {
    @property({
        type: Node,
        tooltip: "Wood"
    })
    private wood: Node | null = null;

    //speed of knife
    private speed: number = 0

    //Return state of knife
    private isClick: boolean = false;

    private status: KNIFE_STATUS = KNIFE_STATUS.INIT;

    protected onLoad(): void {
    }

    public move(pos: Vec3) {
        tween(this.node).to(0.3, {
            position: pos
        }).start();
        this.status = KNIFE_STATUS.DONE;
    }

    public setIsClick(_isClick: boolean = true): void {
        this.isClick = _isClick;
    }

    public getIsClick(): boolean {
        return this.isClick;
    }

    protected update(dt: number): void {

    }

    public setSpeed(_speed: number = 0): void {
        this.speed = _speed;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public setStatus(_status: KNIFE_STATUS) {
        this.status = _status;
    }

    public getStatus(): KNIFE_STATUS {
        return this.status;
    }
}

