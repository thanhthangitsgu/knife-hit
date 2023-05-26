import { Knife } from './Knife';
import { _decorator, Collider2D, Component, Contact2DType, Input, input, instantiate, Node, Prefab, UITransform, sp, Vec3, Quat, math } from 'cc';
import { WoodView } from './WoodView';
import { KNIFE_STATUS } from '../Enum';
const { ccclass, property, requireComponent } = _decorator;
const { spine } = sp;
const { MathUtils } = spine;

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

    protected onLoad(): void {
        this.generateKnife();

        //Handle on click
        input.on(Input.EventType.MOUSE_DOWN, this.generateKnife, this);
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
        //Init 
        let element = instantiate(this.knifePrefab);
        this.poolKnife.addChild(element);
        this.listKnife.push(element);

        //Push
        let pos = new Vec3(0, -this.wood.getComponent(UITransform).width / 2 + 50, 0);
        if (this.listKnife.length > 1) {
            this.listKnife[this.listKnife.length - 1].getComponent(Knife).move(this.convert(this.wood, this.poolKnife, pos));
        }
    }
}

