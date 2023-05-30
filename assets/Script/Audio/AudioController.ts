import { AUDIO_TYPE } from './../Enum';
import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    private audioSource: AudioSource | null = null;

    @property(AudioClip)
    private audioHit: AudioClip | null = null;

    @property(AudioClip)
    private audioHitLast: AudioClip | null = null;

    @property(AudioClip)
    private audioAppear: AudioClip | null = null;

    private listAudio: Record<string, AudioClip> = {};

    private volume: number = 1;

    protected onLoad(): void {
        this.audioSource = this.node.getComponent(AudioSource);
    }

    protected start(): void {
        //Set key audio
        this.listAudio[AUDIO_TYPE.Appear] = this.audioAppear;
        this.listAudio[AUDIO_TYPE.Hit] = this.audioHit;
        this.listAudio[AUDIO_TYPE.LastHit] = this.audioHitLast;
    }

    public playAudio(AUDIO_TYPE) {
        this.audioSource.playOneShot(this.listAudio[AUDIO_TYPE], this.volume);
    }

    public setVolume(_volume: number): void {
        this.volume = _volume
    }


}

