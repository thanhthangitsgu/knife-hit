import { Global } from '../Global';
import { Knife } from './../Game/Knife';
import { _decorator, Button, Color, Component, Label, Node, Prefab, Sprite, SpriteFrame, UITransform } from 'cc';
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

    private listSpr: SpriteFrame[] = [];

    private index: number = 1;

    private apple: number = 1;

    protected onLoad(): void {

        const _index = localStorage.getItem("index_knife") ? localStorage.getItem("index_knife") : 3;
        this.index = Number(_index);

        const _apple = localStorage.getItem('knife_hit_highapple') ? localStorage.getItem("knife_hit_highapple") : '0';
        this.labelApple.string = _apple;
        this.apple = Number(_apple);

        this.listSpr.push(this.knifeFirst, this.knifeSecond, this.knifeThird, this.knifeFourth, this.knifeFifth,
            this.knifeSixth, this.knifeSeventh, this.knifeEighth, this.knifeNinth);

        this.btnHome.node.on(Button.EventType.CLICK, () => {
            this.knifeSetting.active = false;
        })

        Global.sprKnife = this.knifeFifth;
    }

    protected start(): void {
        this.createList();

        this.buttonBuy.node.on(Button.EventType.CLICK, () => {
            if (this.apple >= 10) {
                this.apple = this.apple - 10;
                this.labelApple.string = this.apple.toString();

                this.index++;
                localStorage.setItem('index_knife', this.index.toString());
                localStorage.setItem('knife_hit_highapple', this.apple.toString());

                this.createList();

            } else {
                alert("Not enough apples")
            }
        })
    }

    private createList(): void {
        this.knifeContainer.removeAllChildren();

        for (let i = 0; i < this.index; i++) {
            const spr = this.listSpr[i];

            let node = new Node(`Button${spr.name}`);
            node.addComponent(Button);
            node.addComponent(Sprite);
            node.getComponent(Sprite).spriteFrame = this.sprBackground;
            node.getComponent(UITransform).width = 180;
            node.getComponent(UITransform).height = 180;

            node.on(Button.EventType.CLICK, () => {
                Global.sprKnife = spr;
                this.knifeChoose.getComponent(Sprite).spriteFrame = spr;
            })

            let nodeSpr = new Node(spr.name);
            nodeSpr.addComponent(Sprite);
            nodeSpr.getComponent(Sprite).spriteFrame = spr;
            nodeSpr.getComponent(UITransform).width = 40;
            nodeSpr.getComponent(UITransform).height = 160;
            node.addChild(nodeSpr);

            this.knifeContainer.addChild(node);
        }

        for (let i = this.index; i < this.listSpr.length; i++) {
            let node = new Node(`lock`);
            node.addComponent(Button);
            node.addComponent(Sprite);
            node.getComponent(Sprite).spriteFrame = this.sprLock
            node.getComponent(UITransform).width = 180;
            node.getComponent(UITransform).height = 180;

            this.knifeContainer.addChild(node);
        }
    }
}

