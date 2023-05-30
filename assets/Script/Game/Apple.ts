import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, math, Node, RigidBody2D, Vec2 } from 'cc';
import { Global } from '../Global';
import { GAME_STATUS } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('Apple')
export class Apple extends Component {

    private angle: number = 0;


    protected onLoad(): void {
        this.angle = math.randomRangeInt(0, 360);
    }

    public setAngle(_angle: number) {
        this.angle = _angle;
    }

    public getAngle(): number {
        return this.angle;
    }
}

