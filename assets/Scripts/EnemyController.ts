
import { _decorator, Component, Node, Vec3, UITransform, Sprite, SpriteFrame, Size } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = enemy
 * DateTime = Wed May 11 2022 15:21:29 GMT+0800 (中国标准时间)
 * Author = zengrc
 * FileBasename = enemy.ts
 * FileBasenameNoExtension = enemy
 * URL = db://assets/Scripts/enemy.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

interface EnemyOpt {
    type: Enemy_Type,
    pos: number,
    speed?: number
}

interface EnemyConfig {
    readonly spriteFrameName: string,
    readonly crashAnimateName: string,
    readonly width: number,
    readonly height: number,
    readonly speed: number,
    readonly randomSpeedDiff: number
}

export enum Enemy_Type {
    plane,
    helicopter,
    UFO
}

export const Enemy_Config: { readonly [key: number]: EnemyConfig } = {
    [Enemy_Type.plane]: {
        spriteFrameName: 'enemy1',
        crashAnimateName: 'EnemyCrash1',
        width: 25,
        height: 20,
        speed: 120,
        randomSpeedDiff: 50
    },
    [Enemy_Type.helicopter]: {
        spriteFrameName: 'enemy2',
        crashAnimateName: 'EnemyCrash2',
        width: 35,
        height: 45,
        speed: 80,
        randomSpeedDiff: 20
    },
    [Enemy_Type.UFO]: {
        spriteFrameName: 'enemy3_n1',
        crashAnimateName: 'EnemyCrash3',
        width: 80,
        height: 120,
        speed: 50,
        randomSpeedDiff: 0
    },
}
 
@ccclass('EnemyController')
export class EnemyController extends Component {

    private _sprite: Sprite | null;
    private _uiTransform: UITransform | null;
    private _type: Enemy_Type | null = null;
    private _pos: Vec3 = new Vec3();
    private _iniPos: number = 0;
    private _parentW: number = 0;
    private _parentH: number = 0;
    private _speed: number = 0;
    private _config: EnemyConfig | null = null;

    start () {
        this._sprite = this.getComponent(Sprite);
        this._uiTransform = this.getComponent(UITransform);
        this.node.getPosition(this._pos);
        const uiTransform = this.node.parent.getComponent(UITransform);
        const { width, height } = uiTransform.contentSize;
        this._parentH = height;
        this._parentW = width;
        this.setEnemy();
    }

    setConfig(opt: EnemyOpt) {
        const { pos, type, speed } = opt;
        this._type = type;
        this._iniPos = pos;
        this._speed = speed || 0;
    }

    setEnemy() {
        const config = Enemy_Config[this._type];
        this._config = { ...config, speed: this._speed || config.speed };
        if (this._uiTransform) this._uiTransform.setContentSize(new Size(this._config.width, this._config.height));
        if (this._sprite) this._sprite.spriteFrame = this._sprite.spriteAtlas.spriteFrames[this._config.spriteFrameName];
        this._pos.y = this._parentH / 2 + this._config.height / 2;
        this._pos.x = this._iniPos;
        this.node.setPosition(this._pos);
    }

    update (deltaTime: number) {
        const deltaY = deltaTime * this._config.speed;
        this._pos.y -= deltaY;
        this.node.setPosition(this._pos);
        this.checkDestory();
    }

    checkDestory() {
        const left = -this._parentW / 2;
        const right = -left;
        const down = -(this._parentH / 2 + this._config.height / 2);
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
