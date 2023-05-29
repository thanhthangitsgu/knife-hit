import { _decorator, Collider2D, Component, Contact2DType, director, input, Input, Node, Sprite, tween, UITransform, Vec3 } from 'cc';
const { ccclass, requireComponent } = _decorator;

@ccclass('Knife')
@requireComponent(Collider2D)
export class Knife extends Component {
    private angle: number = 0;

    protected onLoad(): void {
        tween(this.node).to(0.1, {
            position: new Vec3(this.node.position.x, this.node.position.y + 100, 0)
        }).start();
        //Get collider component
        const collider = this.node.getComponent(Collider2D);

        //Hanlde collider
        collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
            if (other.tag == 2) {
                console.log("Game over");
                director.pause();
            }
        }, this)
    }

    public move(pos: Vec3) {
        tween(this.node).to(0.05, {
            position: pos
        }).start();
    }

    public setAngle(_angle: number) {
        this.angle = _angle;
    }

    public getAngle(): number {
        return this.angle;
    }





}

