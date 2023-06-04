import { KNIFE_APPLE } from '../GameData';
import { Global } from '../Global';
import { Knife } from '../Knife';
import { _decorator, Button, Color, Component, Label, Node, pingPong, Prefab, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('KnifeOptionsView')
export class KnifeOptionsView extends Component {
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
        type: SpriteFrame
    })
    private knifeEleventh: SpriteFrame

    @property({
        type: SpriteFrame,
    })
    private knifeTwelfth: SpriteFrame;

    @property({
        type: SpriteFrame
    })
    private knifeThirteenth: SpriteFrame;

    @property({
        type: SpriteFrame
    })
    private knifeFourteenth: SpriteFrame;

    @property({
        type: SpriteFrame
    })
    private knifeFifteenth: SpriteFrame;

    /**@______SHADOW */
    @property({
        type: SpriteFrame,
    })
    private knifeFirstSD: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeSecondSD: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeThirdSD: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeFourthSD: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeFifthSD: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeSixthSD: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeSeventhSD: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeEighthSD: SpriteFrame;
    @property({
        type: SpriteFrame,
    })
    private knifeNinthSD: SpriteFrame;

    @property({
        type: SpriteFrame,
    })
    private knifeTenthSD: SpriteFrame;

    @property({
        type: SpriteFrame
    })
    private knifeEleventhSD: SpriteFrame

    @property({
        type: SpriteFrame,
    })
    private knifeTwelfthSD: SpriteFrame;

    @property({
        type: SpriteFrame
    })
    private knifeThirteenthSD: SpriteFrame;

    @property({
        type: SpriteFrame
    })
    private knifeFourteenthSD: SpriteFrame;

    @property({
        type: SpriteFrame
    })
    private knifeFifteenthSD: SpriteFrame;


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

    @property({
        type: SpriteFrame
    })
    private sprBackground;

    @property({
        type: SpriteFrame
    })
    private sprLock: SpriteFrame;

    @property({
        type: Label
    })
    private labelApple: Label;

    @property({
        type: Button,
    })
    private buttonBuy: Button;

    @property({
        type: Label
    })
    private lbPrice: Label;

    @property({
        type: SpriteFrame,
    })
    private border: SpriteFrame;

    @property({
        type: SpriteFrame,
    })
    private borderUnlock: SpriteFrame;

    @property({
        type: SpriteFrame
    })
    private borderLock: SpriteFrame;

    private indexChoosed: number = 1;


    private listSpr: SpriteFrame[] = [];

    private listShadow: SpriteFrame[] = [];

    private listKnife: Knife[] = [];

    private listNode: Node[] = [];

    private statusKnife: number[] = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    private index: number = 1;

    private apple: number = 0;

    protected onLoad(): void {
        //Get status knife: 
        let jsArray = localStorage.getItem('status_knife');
        this.statusKnife = jsArray ? JSON.parse(localStorage.getItem('status_knife')) : this.statusKnife;

        this.index = localStorage.getItem('index_knife') ? Number(localStorage.getItem('index_knife')) : 1;
        this.apple = localStorage.getItem('knife_hit_hightapple') ? Number(localStorage.getItem('knife_hit_hightapple')) : 0;

        //Add knife skin 
        this.listSpr.push(this.knifeFirst, this.knifeSecond, this.knifeThird, this.knifeFourth, this.knifeFifth,
            this.knifeSixth, this.knifeSeventh, this.knifeEighth, this.knifeNinth, this.knifeTenth,
            this.knifeEleventh, this.knifeTwelfth, this.knifeThird, this.knifeFourteenth, this.knifeFifteenth);

        //Add knife shadow
        this.listShadow.push(this.knifeFirstSD, this.knifeSecondSD, this.knifeThirdSD, this.knifeFourthSD, this.knifeFifthSD,
            this.knifeSixthSD, this.knifeSeventhSD, this.knifeEighthSD, this.knifeNinthSD, this.knifeTenthSD,
            this.knifeEleventhSD, this.knifeTwelfthSD, this.knifeThirteenthSD, this.knifeFourteenthSD, this.knifeFifteenthSD);

        //Create knife object
        this.listSpr.map((element, index) => {
            let knife = new Knife(element.name, element, this.listShadow[index], KNIFE_APPLE[index], this.statusKnife[index]);
            this.listKnife.push(knife);
        })

        //Handle on click change skin
        this.btnHome.node.on(Button.EventType.CLICK, () => {
            this.knifeSetting.active = false;
        })

        //Set default status
        if (!Global.sprKnife) Global.sprKnife = this.knifeFirst;

        this.knifeChoose.getComponent(Sprite).spriteFrame = Global.sprKnife;
    }

    protected start(): void {
        this.createKnifeNode();

        this.listNode[this.index].getComponent(Sprite).spriteFrame = this.borderUnlock;
        this.listNode[this.index].getComponent(UITransform).width = 130;
        this.listNode[this.index].getComponent(UITransform).height = 150;

        this.knifeChoose.getComponent(Sprite).spriteFrame = this.listSpr[this.index];
    }

    private createKnifeNode(): void {
        this.listKnife.map((knife, index) => {
            let nodeParent = new Node(`container_${knife.getName()}`);
            nodeParent.addComponent(Sprite);
            nodeParent.getComponent(Sprite).spriteFrame = this.border;

            nodeParent.getComponent(UITransform).width = 130;
            nodeParent.getComponent(UITransform).height = 150;

            let node = new Node(knife.getName());
            node.addComponent(Sprite);
            node.getComponent(Sprite).spriteFrame = knife.getStatus() ? knife.getSprFrame() : knife.getSprShadow();

            node.getComponent(UITransform).width = 28;
            node.getComponent(UITransform).height = 130;
            node.setRotationFromEuler(0, 0, -45);

            nodeParent.addChild(node);
            this.knifeContainer.addChild(nodeParent);
            this.listNode.push(nodeParent);

            nodeParent.addComponent(Button);
            nodeParent.on(Button.EventType.CLICK, () => {
                this.onClickButtonSkin(index)
            }, this);
        })
    }

    private onClickButtonSkin(_index: number = 1): void {
        this.listNode[this.index].getComponent(Sprite).spriteFrame = this.border;
        this.listNode[this.index].getComponent(UITransform).width = 130;
        this.listNode[this.index].getComponent(UITransform).height = 150;

        this.index = _index;
        this.onChangeSkin();
    }

    private onChangeSkin(): void {
        this.listNode[this.index].getComponent(Sprite).spriteFrame = this.listKnife[this.index].getStatus() ? this.borderUnlock : this.borderLock;
        this.listNode[this.index].getComponent(UITransform).width = 130;
        this.listNode[this.index].getComponent(UITransform).height = 150;
    }

    private onClickEquip(): void {
        let price = Number(this.labelApple);

        if (price > this.apple) alert("Not enough apples");
        else {
            this.apple = this.apple - price;
            this.labelApple.string = this.apple.toString();
        }
    }
}

