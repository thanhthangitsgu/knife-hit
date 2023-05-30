import { _decorator, Animation, Component, Layout, Node, Sprite } from 'cc';
import { GAME_COLOR } from '../GameData';
const { ccclass, property } = _decorator;

@ccclass('StageView')
export class StageView extends Component {
    @property({
        type: Layout,
        tooltip: "Stage container"
    })
    private layoutStage: Layout = null;

    @property({
        type: Sprite,
        tooltip: "Sprite stage 1"
    })
    private spriteFirst: Sprite = null;

    @property({
        type: Sprite,
        tooltip: "Sprite stage 2"
    })
    private spriteSecond: Sprite = null;

    @property({
        type: Sprite,
        tooltip: "Sprite stage 3"
    })
    private spriteThird: Sprite = null;

    @property({
        type: Sprite,
        tooltip: "Sprite stage 4"
    })
    private spriteFourth: Sprite = null;

    @property({
        type: Sprite,
        tooltip: "Sprite boss"
    })
    private spriteBoss: Sprite = null;

    private listSprite: Sprite[] = [];

    private animStage: Animation;

    protected onLoad(): void {
        this.animStage = this.spriteBoss.node.getComponent(Animation);
        this.listSprite.push(this.spriteFirst, this.spriteSecond, this.spriteThird, this.spriteFourth, this.spriteBoss);
    }

    public activeStage(stage: number = 1): void {
        this.listSprite[stage - 1].color = GAME_COLOR.color_active_stage;
    }

    public activeStageBoss(): void {
        this.layoutStage.node.active = false;
        this.spriteBoss.color = GAME_COLOR.color_active_stage;
        this.animStage.play();
    }

    public resetStage(): void {
        this.layoutStage.node.active = true;
        this.listSprite.map((spr) => {
            spr.color = GAME_COLOR.color_default;
        })
        this.animStage.play('animReset');
    }
}

