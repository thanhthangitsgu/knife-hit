import { Global } from '../Global';
import { Knife } from './../Game/Knife';
import { _decorator, Button, Component, Node, Prefab, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('KnifeOptions')
export class KnifeOptions extends Component {
    @property({
        type: SpriteFrame,
    })
    private knifeFirst: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeSecond: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeThird: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeFourth: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeFifth: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeSixth: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeSeventh: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeEighth: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeNinth: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeTenth: SpriteFrame;

    @property({
        type: Node,
    })
    private knifeSetting: Node;

    @property({
        type: Node
    })
    private knifeContainer: Node;

    @property({
        type: Node,
    })
    private knifeChoose: Node;

    @property({
        type: Prefab
    })
    private prfKnife: Prefab;

    @property({
        type: Button
    })
    private btnHome: Button;

    private listSpr: SpriteFrame[] = [];

    protected onLoad(): void {
        this.listSpr.push(this.knifeFirst, this.knifeSecond, this.knifeThird, this.knifeFourth, this.knifeFifth,
            this.knifeSixth, this.knifeSeventh, this.knifeEighth, this.knifeNinth, this.knifeTenth);

        this.btnHome.node.on(Button.EventType.CLICK, () => {
            this.knifeSetting.active = false;
        })
    }

    protected start(): void {
        this.listSpr.map((spr) => {
            let node = new Node(spr.name);

            node.addComponent(Button);
            node.getComponent(Button).zoomScale = 1.1;
            node.getComponent(Button).transition = Button.Transition.SCALE;
            node.addComponent(Sprite);
            node.getComponent(Sprite).spriteFrame = spr;
            this.knifeContainer.addChild(node);

            node.on(Button.EventType.CLICK, () => {
                Global.sprKnife = spr;

                this.knifeChoose.getComponent(Sprite).spriteFrame = spr;
            })
        })
    }
}

