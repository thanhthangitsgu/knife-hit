import { _decorator, Component, SpriteFrame } from 'cc';
import { GAME_STATUS } from './Enum';
const { ccclass, property } = _decorator;

// Constant of project
@ccclass('Global')
export class Global extends Component {
    //Game status
    public static status: GAME_STATUS = GAME_STATUS.GAME_READY;

    //Game score
    public static score: number = 0;

    //Game stage
    public static gameStage = 1;

    //Scene name
    public static readonly SCENE_NAME = {
        Entry: "Entry", 
        Menu: "Menu", 
        Game: "Game", 
        End: "End"
    }
    //Sprite knife
    public static sprKnife: SpriteFrame;
    

}