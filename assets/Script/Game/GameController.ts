import { Knife } from './Knife';
import { _decorator, Collider2D, Component, Contact2DType, Input, input, instantiate, Node, Prefab, UITransform, sp, Vec3, Quat, math, Label, director } from 'cc';
import { WoodView } from './WoodView';
import { AUDIO_TYPE, GAME_STATUS, KNIFE_STATUS, WOOD_ANIMATION } from '../Enum';
import { Global } from '../Global';
import { GAME_COLOR, GAME_DATA } from '../GameData';
import { Sprite } from 'cc';
import { Color } from 'cc';
import { AudioController } from '../Audio/AudioController';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('GameController')
@requireComponent(Prefab)
export class GameController extends Component {
    /** @_____PROPERTY______ */
    //Node
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
        type: Node,
        tooltip: "Pool knife"
    })
    private poolKnife: Node | null = null;

    @property({
        type: Node,
        tooltip: "Knife container"
    })
    private knifeContainer: Node | null = null;

    //Prefab
    @property({
        type: Prefab,
        tooltip: "Prefab knife"
    })
    private knifePrefab: Prefab | null = null;

    @property({
        type: Prefab,
        tooltip: "Number of prefab"
    })
    private amountPrefab: Prefab | null = null;

    //Label
    @property({
        type: Label,
        tooltip: "Label score"
    })
    private lbScore: Label | null = null;

    @property({
        type: Label,
        tooltip: "Label stage"
    })
    private lbStage: Label | null = null;

    @property({
        type: Label,
        tooltip: "Label apple"
    })
    private lbApple: Label | null = null;

    @property({
        type: WoodView
    })
    private woodView: WoodView;

    @property({
        type: AudioController,
    })
    private audioController: AudioController;

    /** @_____VARIABLE_____ */
    private listKnife: Node[] = [];

    private listAmount: Node[] = [];

    private widthWood: number;

    private amount: number = 0;

    protected onLoad(): void {
        //Init game
        this.loadData();
    }

    protected start(): void {
        this.widthWood = this.woodSpr.getComponent(UITransform).width / 2 - 50;
    }

    protected update(dt: number): void {
        switch (Global.status) {
            case GAME_STATUS.GAME_READY: {
                this.loadData();
                break;
            }
            case GAME_STATUS.GAME_PLAYING: {
                this.moveKnife();
                break;
            }
            case GAME_STATUS.GAME_OVER: {
                director.loadScene(Global.SCENE_NAME.End);
                break;
            }
        }

    }

    //**Load game data */
    private loadData(): void {
        if (Global.gameStage >= GAME_DATA.length) {
            director.loadScene(Global.SCENE_NAME.Menu);
            Global.gameStage = 1;
        }
        //Load game data
        this.amount = GAME_DATA[Global.gameStage - 1].knife;
        this.lbStage.string = `STAGE ${Global.gameStage}`;

        this.knifeContainer.removeAllChildren();
        this.listAmount = [];


        this.poolKnife.removeAllChildren();
        this.listKnife = [];

        this.generateKnife();

        //Load knife container
        for (let i = 0; i < this.amount; i++) {
            let element = instantiate(this.amountPrefab);
            this.knifeContainer.addChild(element);
            this.listAmount.push(element);
        }
        Global.status = GAME_STATUS.GAME_PLAYING;

        setTimeout(() => {
            input.on(Input.EventType.MOUSE_DOWN, this.onClick, this);
        }, 400);
    }

    //Handle on click
    private onClick() {
        //Create knife
        this.generateKnife();
        this.audioController.playAudio(AUDIO_TYPE.Hit);

        //Mark the passed 
        this.listAmount[this.amount - 1].getComponent(Sprite).color = GAME_COLOR.color_pass;
        this.amount--;
        if (this.amount <= 0) {
            this.audioController.playAudio(AUDIO_TYPE.LastHit);
            input.off(Input.EventType.MOUSE_DOWN);
            setTimeout(() => {
                this.passStage();
            }, 500);
        }

        //Increase score
        Global.score++;
        this.lbScore.string = Global.score.toString();
    }

    //Pass the stage
    private passStage(): void {
        this.audioController.playAudio(AUDIO_TYPE.Appear);
        this.woodView.runAnimation(WOOD_ANIMATION.Appear);
        Global.gameStage++;
        Global.status = GAME_STATUS.GAME_READY;
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
            this.listKnife[this.listKnife.length - 1].getComponent(Knife).move(this.convert(this.wood, this.poolKnife, new Vec3(this.listKnife[this.listKnife.length - 1].position.x, pos.y, 0)));
            this.listKnife[this.listKnife.length - 1].getComponent(Knife).setAngle(-this.woodSpr.eulerAngles.z - 100);
            this.woodView.runAnimation(WOOD_ANIMATION.Hit);
        }
        //Init 
        let element = instantiate(this.knifePrefab);
        this.poolKnife.addChild(element);
        this.listKnife.push(element);
    }

    /**Control transition of knife */
    private moveKnife(): void {
        for (let i = 0; i < this.listKnife.length - 1; i++) {
            const knife = this.listKnife[i];
            //set angle
            let angle = knife.getComponent(Knife).getAngle();

            //set position
            let position = new Vec3(this.widthWood * Math.cos(3.14 * (this.woodSpr.eulerAngles.z + angle) / 180), this.widthWood * Math.sin((this.woodSpr.eulerAngles.z + angle) * 3.14 / 180), 0);
            knife.setPosition(this.convert(this.wood, knife.parent, position));

            //set rotation
            knife.setRotationFromEuler(new Vec3(0, 0, this.woodSpr.eulerAngles.z + angle + 90))
        }
    }
}

