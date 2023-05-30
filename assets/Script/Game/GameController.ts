import { Knife } from './Knife';
import { _decorator, Component, Input, input, instantiate, Node, Prefab, UITransform, Vec3, Label, director, find, RigidBody2D, Vec2, math, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { WoodView } from './WoodView';
import { AUDIO_TYPE, GAME_STATUS, SETTING_STATUS, WOOD_ANIMATION } from '../Enum';
import { Global } from '../Global';
import { GAME_COLOR, GAME_DATA } from '../GameData';
import { Sprite } from 'cc';
import { AudioController } from '../Audio/AudioController';
import { StageView } from './StageView';
import { Parameters } from '../Parameters';
import { Apple } from './Apple';
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

    @property({
        type: Node,
    })
    private appleContainer: Node | null = null;

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

    @property({
        type: Prefab,
        tooltip: "Apple prefab"
    })
    private prefabApple: Prefab | null = null;

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

    @property({
        type: StageView,
    })
    private stageView: StageView;


    /** @_____VARIABLE_____ */
    private listKnife: Node[] = [];

    private listAmount: Node[] = [];

    private listApple: Node[] = [];

    private appleScore: number = 0;

    private amount: number = 0;

    protected onLoad(): void {

        this.appleScore = localStorage.getItem('knife_hit_highapple') ? Number(localStorage.getItem('knife_hit_highapple')) : 0;
        this.lbApple.string = `${this.appleScore}`;

        Global.score = 0;
        Global.gameStage = 1;

        //Setting sound
        this.settingSound();

        //Init game
        this.loadData();
    }

    protected update(): void {
        switch (Global.status) {
            case GAME_STATUS.GAME_READY: {
                this.loadData();
                break;
            }
            case GAME_STATUS.GAME_PLAYING: {
                this.moveKnife();
                this.moveApple();
                break;
            }
            case GAME_STATUS.GAME_HIT: {
                this.hitKnife();
                break;
            }
            case GAME_STATUS.GAME_OVER: {
                this.gameOver();
                break;
            }
        }

    }
    /**Game over */
    private gameOver(): void {
        let highApple: number | null = Number(localStorage.getItem('knife_hit_highapple')) ? Number(localStorage.getItem('knife_hit_highapple')) : 0;
        let highStage: number | null = Number(localStorage.getItem('knife_hit_highstage')) ? Number(localStorage.getItem('knife_hit_highstage')) : 0;
        if (highApple < this.appleScore) highApple = this.appleScore;
        localStorage.setItem('knife_hit_highapple', `${highApple}`);

        if (highStage < Global.gameStage) highStage = Global.gameStage;
        localStorage.setItem('knife_hit_highstage', `${highStage}`);

        const node = find('Parameters');
        const parameter = node ? node.getComponent(Parameters) : null;
        parameter.tempScore = Global.score;
        parameter.tempStage = Global.gameStage;

        director.loadScene(Global.SCENE_NAME.End);

    }
    /**Setting sound */
    private settingSound(): void {
        const node = find('Parameters');
        const parameter = node ? node.getComponent(Parameters) : null;
        if (parameter.getSoundStatus() === SETTING_STATUS.OFF) this.audioController.setVolume(0);
    }

    /**Setting view stage dot */
    private settingStageDot(): void {
        switch (Global.gameStage % 5) {
            case 0:
                this.stageView.activeStageBoss();
                break;
            case 1:
                this.stageView.resetStage();
                this.stageView.activeStage(Global.gameStage % 5);
                break;
            default:
                this.stageView.activeStage(Global.gameStage % 5);
        }
    }
    /**Setting animation hit */
    private hitKnife(): void {
        this.amount = 1;
        input.off(Input.EventType.MOUSE_DOWN);
        this.audioController.playAudio(AUDIO_TYPE.Game_Over);
        Global.status = GAME_STATUS.GAME_OVER;
    }

    /**Manager apple */
    private managerApple(): void {
        this.appleContainer.removeAllChildren();
        this.listApple = [];
        let number = math.randomRangeInt(0, 5);

        for (let i = 0; i < number; i++) {
            let apple = instantiate(this.prefabApple);
            this.appleContainer.addChild(apple);
            this.listApple.push(apple);
        }

        this.listApple.map((apple) => {
            //Get collider component
            const collider = apple.getComponent(Collider2D);

            //Hanlde collider
            collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D, contact: IPhysics2DContact) => {
                if (other.tag !== 1) return;
                else {
                    this.appleScore++;
                    this.lbApple.string = `${this.appleScore}`;
                    self.node.active = false;
                }
            }, this)
        })
    }

    /**Load game data */
    private loadData(): void {
        //If current stage is maximal then return menu
        if (Global.gameStage > GAME_DATA.length) this.acquireMaxStage();

        this.settingStageDot();

        //Initialize values
        this.amount = GAME_DATA[Global.gameStage - 1].knife;
        this.lbStage.string = `STAGE ${Global.gameStage}`;

        this.knifeContainer.removeAllChildren();
        this.listAmount = [];

        this.poolKnife.removeAllChildren();
        this.listKnife = [];

        this.generateKnife();
        this.managerApple();

        //Load knife container
        for (let i = 0; i < this.amount; i++) {
            let element = instantiate(this.amountPrefab);
            this.knifeContainer.addChild(element);
            this.listAmount.push(element);
        }
        Global.status = GAME_STATUS.GAME_PLAYING;

        //Handle on event after load
        setTimeout(() => {
            input.on(Input.EventType.MOUSE_DOWN, () => {
                if (Global.status === GAME_STATUS.GAME_HIT) {
                    return;
                } else {
                    this.onClick();
                }
            }, this);
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
        if (this.amount <= 0 && Global.status !== GAME_STATUS.GAME_HIT) {
            this.audioController.playAudio(AUDIO_TYPE.LastHit);
            input.off(Input.EventType.MOUSE_DOWN);
            setTimeout(() => {
                this.passStage();
            }, 500);
        }

        //Increase score
        Global.score++;
        this.lbScore.string = `${Global.score}`;
    }

    //Pass the stage
    private passStage(): void {
        this.audioController.playAudio(AUDIO_TYPE.Appear);
        this.woodView.runAnimation(WOOD_ANIMATION.Appear);
        Global.gameStage++;
        Global.status = GAME_STATUS.GAME_READY;
    }

    //Acquire max stage
    private acquireMaxStage(): void {
        director.loadScene(Global.SCENE_NAME.Menu);
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
            const lastKnife = this.listKnife[this.listKnife.length - 1].getComponent(Knife);
            lastKnife.move(this.convert(this.wood, this.poolKnife, new Vec3(lastKnife.node.position.x, pos.y, 0)));
            lastKnife.setAngle(-this.woodSpr.eulerAngles.z - 94.5);
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
            let widthWood = this.woodSpr.getComponent(UITransform).width / 2 - 50;
            let knifeAngle = 3.14 * (this.woodSpr.eulerAngles.z + angle) / 180;

            let position = new Vec3(widthWood * Math.cos(knifeAngle), widthWood * Math.sin(knifeAngle), 0);
            if (knife.getComponent(Knife).getStatus() === 1) {
                knife.setPosition(this.convert(this.wood, knife.parent, position));
                knife.setRotationFromEuler(new Vec3(0, 0, this.woodSpr.eulerAngles.z + angle + 90))
            }
        }
    }

    /**Control transition of apple */
    private moveApple(): void {
        this.listApple.map((apple) => {
            let angle = apple.getComponent(Apple).getAngle();
            let widthWood = this.woodSpr.getComponent(UITransform).width / 2 - 40;
            let appleAngle = 3.14 * (this.woodSpr.eulerAngles.z + angle) / 180;

            let position = new Vec3(widthWood * Math.cos(appleAngle), widthWood * Math.sin(appleAngle), 0);
            apple.setPosition(this.convert(this.wood, apple.parent, position));
            apple.setRotationFromEuler(new Vec3(0, 0, this.woodSpr.eulerAngles.z - 90 + angle))
        })
    }
}

