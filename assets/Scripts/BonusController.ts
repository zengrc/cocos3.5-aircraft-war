
import { _decorator, Component, Node, Vec3, BoxCollider2D, Sprite, UITransform, Size } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BonusController
 * DateTime = Fri May 13 2022 18:22:51 GMT+0800 (中国标准时间)
 * Author = zengrc
 * FileBasename = BonusController.ts
 * FileBasenameNoExtension = BonusController
 * URL = db://assets/Scripts/BonusController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

export enum BONUS_TYPE {
    bomb,
    doubleShoot
}

export interface BonusOptions {
    type: BONUS_TYPE,
    pos: number,
}

const SPRITE_MAP = {
    [BONUS_TYPE.bomb]: 'ufo2',
    [BONUS_TYPE.doubleShoot]: 'ufo1'
}

 
@ccclass('BonusController')
export class BonusController extends Component {
    public type: BONUS_TYPE;
    private _sprite: Sprite | null;
    private _pos: Vec3 = new Vec3();
    private _iniPos: number = 0;
    private _speed: number = 60;
    private _boxCollider: BoxCollider2D | null = null;
    public size: Size | null = null;
    private _parentW: number = 0;
    private _parentH: number = 0;

    setBonus(opt: BonusOptions) {
        const { pos, type } = opt;
        this.type = type;
        this._iniPos = pos;
    }

    start () {
        this._sprite = this.node.getComponent(Sprite);
        this._boxCollider = this.node.getComponent(BoxCollider2D);
        this.node.getPosition(this._pos);
        this.size = this.node.getComponent(UITransform).contentSize;
        const uiTransform = this.node.parent.getComponent(UITransform);
        const { width, height } = uiTransform.contentSize;
        this._parentH = height;
        this._parentW = width;
        if (this._sprite) this._sprite.spriteFrame = this._sprite.spriteAtlas.spriteFrames[SPRITE_MAP[this.type]];
        this._pos.y = this._parentH / 2 + this.size.height / 2;
        this._pos.x = this._iniPos;
        this.node.setPosition(this._pos);
    }

    update (deltaTime: number) {
        const deltaY = deltaTime * this._speed;
        this._pos.y -= deltaY;
        this.node.setPosition(this._pos);
        this.checkDestory();
    }

    checkDestory() {
        const left = -this._parentW / 2;
        const right = -left;
        const down = -(this._parentH / 2 + this.size.height / 2);
        if (this._pos.x < left || this._pos.x > right || this._pos.y < down) {
            this.node.parent.removeChild(this.node);
            this.node.destroy();
        }
    }
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
