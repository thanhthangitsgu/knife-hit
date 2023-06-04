import { _decorator, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Knife')
export class Knife {
    private name: string = "";

    private sprFrame: SpriteFrame;

    private sprShadow: SpriteFrame;

    private status: number = 0;

    private apple: number = 0;

    constructor(_name: string, _sprFrame: SpriteFrame, _sprShadow: SpriteFrame, _apple: number, _status: number) {
        this.name = _name;
        this.sprFrame = _sprFrame;
        this.sprShadow = _sprShadow;
        this.apple = _apple;
        this.status = _status;
    }

    public getName(): string {
        return this.name;
    }

    public getSprFrame(): SpriteFrame {
        return this.sprFrame;
    }

    public getSprShadow(): SpriteFrame {
        return this.sprShadow;
    }

    public getApple(): number {
        return this.apple;
    }

    public setName(_name): void {
        this.name = _name;
    }

    public setSprFrame(_sprFrame): void {
        this.sprFrame = _sprFrame;
    }

    public setSprShadow(_sprShadow): void {
        this.sprShadow = _sprShadow;
    }

    public setApple(_apple): void {
        this.apple = _apple;
    }

    public getStatus(): number {
        return this.status;
    }
}

