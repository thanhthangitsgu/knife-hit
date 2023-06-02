import { WOOD_ANIMATION, WOOD_SPRITE, WOOD_TYPE } from './../Enum';
import { _decorator, Component, math, Node, Quat, UITransform, Asset, Vec2, sp, Vec3, Animation, AnimationClip, Sprite, SpriteFrame, resources, Graphics, Color, js } from 'cc';
const { ccclass, property, requireComponent } = _decorator;
const { spine } = sp;
const { MathUtils } = spine;

@ccclass('WoodView')
@requireComponent(UITransform)
export class WoodView extends Component {
    @property({
        type: Node,
    })
    private wood: Node;

    @property({
        type: Node
    })
    private woodContainer: Node; 

    private speed: number = 200;

    private typeSpeed: number[] = [];

    private animation: Animation = null;

    private type: WOOD_TYPE = WOOD_TYPE.ONE;

    private direction: number = -1;

    private sprite: WOOD_SPRITE = WOOD_SPRITE.DEFAULT;

    private listSprite = new Map<WOOD_SPRITE, SpriteFrame>();

    @property({
        type: SpriteFrame,
    })
    private sprDefault: SpriteFrame | null;


    @property({
        type: SpriteFrame,
    })
    private sprBossStage10: SpriteFrame | null;

    @property({
        type: SpriteFrame,
    })
    private sprBossStage5: SpriteFrame | null;

    @property({
        type: SpriteFrame,
    })
    private sprBossStage15: SpriteFrame | null;

    @property({
        type: SpriteFrame,
    })
    private sprBossStage20: SpriteFrame | null;

    protected onLoad(): void {
        this.animation = this.wood.getComponent(Animation);

        this.animation.play('animWood');
    }

    protected update(dt: number): void {
        switch (this.type) {
            case WOOD_TYPE.ONE:
                break;
            case WOOD_TYPE.TWO:
                this.speed += this.direction * 100 * dt;
                if (this.speed < this.typeSpeed[0]) {
                    this.direction = 1;
                }

                if (this.speed > this.typeSpeed[1]) {
                    this.direction = -1;
                }
        }
        let r = this.wood.eulerAngles.z + this.speed * dt;
        this.wood.setRotationFromEuler(new Vec3(0, 0, r));
    }

    public runAnimation(nameAnim: WOOD_ANIMATION): void {
        switch (nameAnim) {
            case WOOD_ANIMATION.Appear:
                this.animation.play('animWood');
                break;
            case WOOD_ANIMATION.Hit:
                this.animation.play('animColider');
                break;
        }
    }

    public setStaticSpeed(_speed): void {
        this.speed = _speed;
    }

    public setSpeed(): void {
        this.speed = this.typeSpeed[0];
    }

    public setTypeSpeed(_typeSpeed: number[]): void {
        this.typeSpeed = _typeSpeed;
    }

    public setTypeWood(_typeWood: WOOD_TYPE): void {
        this.type = _typeWood;
    }

    public setSprite(_sprite: WOOD_SPRITE): void {
        switch (_sprite) {
            case WOOD_SPRITE.ST10:
                this.wood.getComponent(Sprite).spriteFrame = this.sprBossStage10;
                break;
            case WOOD_SPRITE.ST5:
                this.wood.getComponent(Sprite).spriteFrame = this.sprBossStage5;
                break;
            case WOOD_SPRITE.ST15:
                this.wood.getComponent(Sprite).spriteFrame = this.sprBossStage15;
                break;
            case WOOD_SPRITE.ST20:
                this.wood.getComponent(Sprite).spriteFrame = this.sprBossStage20;
                break;
            case WOOD_SPRITE.DEFAULT:
                this.wood.getComponent(Sprite).spriteFrame = this.sprDefault;
                break;
        }
    }

    public moveObject(node: Node, delta: number = 0, angle: number = 0, dirAngle: number): void {
        let widthWood = this.wood.getComponent(UITransform).width / 2 - delta;
        let nodeAngle = 3.14 * (this.wood.eulerAngles.z + angle) / 180;

        let position = new Vec3(widthWood * Math.cos(nodeAngle), widthWood * Math.sin(nodeAngle), 0);
        node.setPosition(this.convert(this.woodContainer, node.parent, position));
        node.setRotationFromEuler(new Vec3(0, 0, this.wood.eulerAngles.z + dirAngle + angle))
    }

    private convert(entry: Node, end: Node, vector: Vec3): Vec3 {
        const entryUI = entry.getComponent(UITransform);
        const endUI = end.getComponent(UITransform);

        let worldPos = entryUI.convertToWorldSpaceAR(vector);
        return endUI.convertToNodeSpaceAR(worldPos);
    }


}



