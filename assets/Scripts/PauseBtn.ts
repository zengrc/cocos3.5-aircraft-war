
import { _decorator, Component, Node, Sprite, Button, SpriteAtlas } from 'cc';
import { PLAY_EVENT } from './contant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PauseBtn
 * DateTime = Tue May 10 2022 15:52:51 GMT+0800 (中国标准时间)
 * Author = zengrc
 * FileBasename = PauseBtn.ts
 * FileBasenameNoExtension = PauseBtn
 * URL = db://assets/Scripts/PauseBtn.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

enum Btn_Status {
    playing,
    pause
}
 
@ccclass('PauseBtn')
export class PauseBtn extends Component {

    private _status: Btn_Status = Btn_Status.playing;
    private _btn: Button | null;
    private _spriteAtlas: SpriteAtlas | null;

    start () {
        this._btn = this.getComponent(Button);
        this._spriteAtlas = this.getComponent(Sprite)?.spriteAtlas;
        this.switchSpriteFrame();
    }

    switchSpriteFrame () {
        const resMap = {};
        resMap[Btn_Status.playing] = {
            normal: 'game_pause_nor',
            pressed: 'game_pause_pressed'
        };
        resMap[Btn_Status.pause] = {
            normal: 'game_resume_nor',
            pressed: 'game_resume_pressed'
        };
        if (this._btn && this._spriteAtlas) {
            const sFrameMap = resMap[this._status];
            this._btn.normalSprite = this._spriteAtlas.spriteFrames[sFrameMap.normal];
            this._btn.hoverSprite = this._spriteAtlas.spriteFrames[sFrameMap.pressed];
            this._btn.pressedSprite = this._spriteAtlas.spriteFrames[sFrameMap.pressed];
        }
    }

    onClick () {
        if (this._status === Btn_Status.playing) {
            this._status = Btn_Status.pause;
            this.switchSpriteFrame();
            this.node.emit(PLAY_EVENT.PAUSE);
        } else {
            this._status = Btn_Status.playing;
            this.switchSpriteFrame();
            this.node.emit(PLAY_EVENT.RESUME);
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
