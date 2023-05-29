import { Knife } from './Knife';
import { _decorator, Collider2D, Component, Contact2DType, Input, input, instantiate, Node, Prefab, UITransform, sp, Vec3, Quat, math } from 'cc';
import { WoodView } from './WoodView';
import { KNIFE_STATUS } from '../Enum';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('GameController')
@requireComponent(Prefab)
export class GameController extends Component {
    @property({
        type: Node,
        tooltip: "Wood"
    })
    private wood: Node | null = null;

    @property({
        type: Node,
        tooltip: "Wood sprite"
    })
    private woodSpr: Node | null = null;

    @property({
        type: Prefab,
        tooltip: "Prefab knife"
    })
    private knifePrefab: Prefab | null = null;

    @property({
        type: Node,
        tooltip: "Pool knife"
    })
    private poolKnife: Node | null = null;

    private listKnife: Node[] = [];

    private widthWood: number;

    protected onLoad(): void {
        //Generate the first knife
        this.generateKnife();

        //Handle on click
        input.on(Input.EventType.MOUSE_DOWN, this.generateKnife, this);

        this.widthWood = this.woodSpr.getComponent(UITransform).width / 2 - 50;
    }

    protected update(dt: number): void {
        for (let i = 0; i < this.listKnife.length - 1; i++) {
            const knife = this.listKnife[i];
            let angle = knife.getComponent(Knife).getAngle();
            let position = new Vec3(this.widthWood * Math.cos(3.14 * (this.woodSpr.eulerAngles.z + angle) / 180), this.widthWood * Math.sin((this.woodSpr.eulerAngles.z + angle) * 3.14 / 180), 0);
            knife.setPosition(this.convert(this.wood, knife.parent, position));
            knife.setRotationFromEuler(new Vec3(0, 0, this.woodSpr.eulerAngles.z + angle + 90))
            const col = knife.getComponent(Collider2D).tag = 2;
        }
    }

    /**Convert @vector from @entry to @end  */
    private convert(entry: Node, end: Node, vector: Vec3): Vec3 {
        const entryUI = entry.getComponent(UITransform);
        const endUI = end.getComponent(UITransform);

        let worldPos = entryUI.convertToWorldSpaceAR(vector);
        return endUI.convertToNodeSpaceAR(worldPos);
    }

    /** Create the knife */
    private generateKnife(): void {
        //Push
        let pos = new Vec3(0, -this.wood.getComponent(UITransform).width / 2 + 50, 0);
        if (this.listKnife.length > 0) {
            this.listKnife[this.listKnife.length - 1].getComponent(Knife).move(this.convert(this.wood, this.poolKnife, pos));
            this.listKnife[this.listKnife.length - 1].getComponent(Knife).setAngle(-this.woodSpr.eulerAngles.z - 100);
        }
        //Init 
        let element = instantiate(this.knifePrefab);
        this.poolKnife.addChild(element);
        this.listKnife.push(element);
    }
}

