import { Knife } from './Knife';
import { _decorator, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('KnifeOptions')
export class KnifeOptions extends Component {
    @property({
        type: SpriteFrame,
    })
    private knifeFirsth: SpriteFrame = null;

    @property({
        type: SpriteFrame,
    })
    private knifeSecond: SpriteFrame = null;

    @property({
        type: SpriteFrame,
    })
    private knifeThird: SpriteFrame = null;
    @property({
        type: SpriteFrame,
    })
    private knifeFourth: SpriteFrame = null;

    @property({
        type: SpriteFrame,
    })
    private knifeFifth: SpriteFrame = null;

    @property({
        type: SpriteFrame,
    })
    private knifeSixth: SpriteFrame = null;

    @property({
        type: SpriteFrame,
    })
    private knifeSeventh: SpriteFrame = null;

    @property({
        type: SpriteFrame,
    })
    private knifeEighth: SpriteFrame = null;

    @property({
        type: SpriteFrame
    })
    private knifeNinth: SpriteFrame = null;

    @property({
        type: SpriteFrame
    })
    private knifeTenth: SpriteFrame = null;

    private listKnife: SpriteFrame[] = [];

    protected onLoad(): void {
        this.listKnife.push(this.knifeFirsth, this.knifeSecond, this.knifeThird, this.knifeFourth, this.knifeFifth,
            this.knifeSixth, this.knifeSeventh, this.knifeEighth, this.knifeNinth, this.knifeTenth);
    }

}


