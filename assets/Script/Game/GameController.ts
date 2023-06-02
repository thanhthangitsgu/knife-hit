import { Knife } from './Knife';
import { _decorator, Component, Input, input, instantiate, Node, Prefab, UITransform, Vec3, Label, director, find, RigidBody2D, Vec2, math, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { WoodView } from './WoodView';
import { AUDIO_TYPE, GAME_STATUS, SETTING_STATUS, WOOD_ANIMATION, WOOD_SPRITE, WOOD_TYPE } from '../Enum';
import { Global } from '../Global';
import { GAME_COLOR, GAME_DATA } from '../GameData';
import { Sprite } from 'cc';
import { AudioController } from '../Audio/AudioController';
import { StageView } from './StageView';
import { Parameters } from '../Parameters';
import { Apple } from './Apple';
import { BrokenController } from './BrokenController';
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
    private woodView: WoodView | null = null;

    @property({
        type: AudioController,
    })
    private audioController: AudioController;

    @property({
        type: StageView,
    })
    private stageView: StageView;

    @property({
        type: BrokenController,
        tooltip: "Broken"
    })
    private brokenController: BrokenController;


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

    protected update(dt: number): void {
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
                this.listKnife[this.listKnife.length - 2].getComponent(Knife).runAnim();
                this.hitKnife();
                break;
            }
            case GAME_STATUS.GAME_OVER: {
                this.listKnife[this.listKnife.length - 2].setPosition(this.listKnife[this.listKnife.length - 2].position.x, this.listKnife[this.listKnife.length - 2].position.y - 1000 * dt, 0);
                this.gameOver();
                break;
            }
        }

    }

    /**Load game data */
    private loadData(): void {
        //Turn off event on click
        input.off(Input.EventType.MOUSE_DOWN);

        //If current stage is maximal then return menu
        if (Global.gameStage > GAME_DATA.length) this.acquireMaxStage();

        /**Initialize values */
        //Amount container: 
        this.amount = GAME_DATA[Global.gameStage - 1].knife;

        //Label show stage
        this.lbStage.string = `STAGE ${Global.gameStage}`;

        //Set wood
        this.woodView.setSprite(Global.gameStage % 5 === 0 ? GAME_DATA[Global.gameStage - 1].sprite : WOOD_SPRITE.DEFAULT);
        this.woodView.setTypeSpeed(GAME_DATA[Global.gameStage - 1].speed);
        this.woodView.setTypeWood(GAME_DATA[Global.gameStage - 1].type);

        //Setting UI of dot
        this.settingStageDot();

        //Init knife container
        this.initializeKnifeContainer(this.amount);

        //Init apple
        this.generateApple();

        //Empty pool knife and create the first knife
        this.poolKnife.removeAllChildren();
        this.listKnife = new Array();
        this.generateKnife();

        //Set game status
        Global.status = GAME_STATUS.GAME_PLAYING;

        // //Handle on event after load
        setTimeout(() => {
            input.on(Input.EventType.MOUSE_DOWN, this.onClick, this);
        }, 500);

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

        setTimeout(() => {
            director.loadScene(Global.SCENE_NAME.End);
        }, 800);

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
        this.woodView.setStaticSpeed(0);
        this.audioController.playAudio(AUDIO_TYPE.Game_Over);
        Global.status = GAME_STATUS.GAME_OVER;
    }

    /**Control knife container */
    private initializeKnifeContainer(amount): void {
        this.knifeContainer.removeAllChildren();
        this.listAmount = [];

        for (let i = 0; i < amount; i++) {
            let element = instantiate(this.amountPrefab);
            this.knifeContainer.addChild(element);
            this.listAmount.push(element);
        }
    }

    /**Manager apple */
    private generateApple(): void {
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
            collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
                if (other.tag !== 1) return;
                else {
                    this.lbApple.string = `${++this.appleScore}`;
                    self.node.active = false;
                }
            }, this)
        })
    }

    //Handle on click
    private onClick() {
        //Push the last knife
        const lastKnife = this.listKnife[this.listKnife.length - 1].getComponent(Knife);
        lastKnife.setAngle(- this.woodSpr.eulerAngles.z - 95);
        lastKnife.speed = 9000;

        //Create new knife
        this.generateKnife();

        this.audioController.playAudio(AUDIO_TYPE.Hit);
        this.woodView.runAnimation(WOOD_ANIMATION.Hit);

        //Mark the passed 
        this.listAmount[this.amount - 1].getComponent(Sprite).color = GAME_COLOR.color_pass;
        this.amount--;

        setTimeout(() => {
            if (this.amount <= 0 && Global.status !== GAME_STATUS.GAME_HIT) this.passStage();
        }, 100);

        //Increase score
        Global.score++;
        this.lbScore.string = `${Global.score}`;
    }

    //Pass the stage
    private passStage(): void {

        this.brokenController.runAnim();
        this.audioController.playAudio(AUDIO_TYPE.LastHit);
        this.woodSpr.active = false;
        this.appleContainer.active = false;

        setTimeout(() => {
            this.woodSpr.active = true;
            this.woodView.runAnimation(WOOD_ANIMATION.Appear);
            this.audioController.playAudio(AUDIO_TYPE.Appear);
            this.appleContainer.active = true;
        }, 400);

        Global.gameStage++;
        Global.status = GAME_STATUS.GAME_READY;
    }

    //Acquire max stage
    private acquireMaxStage(): void {
        director.loadScene(Global.SCENE_NAME.Menu);
    }

    /** Create the knife */
    private generateKnife(): void {
        //Init 
        let element = instantiate(this.knifePrefab);
        element.getComponent(Sprite).spriteFrame = Global.sprKnife;
        element.getComponent(Knife).stop = this.wood.worldPosition.y - this.woodSpr.getComponent(UITransform).width / 2 - 70;
        this.listKnife.push(element);
        this.poolKnife.addChild(element);
    }

    /**Control transition of knife */
    private moveKnife(): void {
        this.listKnife.filter(knife => knife.getComponent(Knife).getStatus() === 1).map((knife) => {
            //set angle
            let angle = knife.getComponent(Knife).getAngle();
            this.woodView.moveObject(knife, 50, angle, 90);
        })
    }

    /**Control transition of apple */
    private moveApple(): void {
        this.listApple.map((apple) => {
            let angle = apple.getComponent(Apple).getAngle();
            this.woodView.moveObject(apple, 45, angle, -90);
        })
    }
}

