
import { _decorator, Component, Node, Vec3, UITransform, BoxCollider2D, Sprite, Size, Animation, director } from 'cc';
import { GameManagement } from './GameManagement';
import { GAME_MUSIC } from './contant';
import { AudioManagement } from './AudioManagement';
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
    readonly hitAnimateName: string,
    readonly crashHit: number,
    readonly score: number,
    readonly width: number,
    readonly height: number,
    readonly speed: number,
    readonly randomSpeedDiff: number,
    readonly crashSound: string,
}

export enum Enemy_Type {
    plane,
    helicopter,
    UFO
}

export enum Enemy_Event {
    crash= 'crash'
}

export const Enemy_Config: { readonly [key: number]: EnemyConfig } = {
    [Enemy_Type.plane]: {
        spriteFrameName: 'enemy1',
        crashAnimateName: 'PlaneCrash',
        hitAnimateName: '',
        crashSound: GAME_MUSIC.CRASH_1,
        score: 1,
        width: 25,
        height: 20,
        speed: 120,
        crashHit: 2,
        randomSpeedDiff: 50
    },
    [Enemy_Type.helicopter]: {
        spriteFrameName: 'enemy2',
        crashAnimateName: 'HelicopterCrash',
        hitAnimateName: 'HelicopterHit',
        crashSound: GAME_MUSIC.CRASH_2,
        width: 35,
        score: 8,
        height: 45,
        speed: 80,
        crashHit: 4,
        randomSpeedDiff: 20
    },
    [Enemy_Type.UFO]: {
        spriteFrameName: 'enemy3_n1',
        crashAnimateName: 'UFOCrash',
        hitAnimateName: 'UFOHit',
        crashSound: GAME_MUSIC.CRASH_3,
        score: 20,
        width: 80,
        height: 120,
        speed: 50,
        crashHit: 8,
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
    private _animation: Animation | null = null;
    private _boxCollider: BoxCollider2D | null = null;
    private _curHit: number = 0;
    private _gm: GameManagement | null;

    public isCrash: boolean = false;

    start () {
        this._gm = director.getScene().getChildByName('GameManagement')?.getComponent(GameManagement);
        this._sprite = this.node.getComponent(Sprite);
        this._uiTransform = this.node.getComponent(UITransform);
        this._animation = this.node.getComponent(Animation);
        this._boxCollider = this.node.getComponent(BoxCollider2D);
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

    onHit() {
        if (this.isCrash) return;
        this._curHit += 1;
        if (this._config.hitAnimateName && !this._animation.getState(this._config.hitAnimateName)?.isPlaying) {
            this._animation.play(this._config.hitAnimateName);
        }
        if (this._animation && this._curHit >= this._config.crashHit) {
            this.onCrash();
        }
    }

    onCrash() {
        if (this.isCrash) return;
        this.isCrash = true;
        this.node.emit(Enemy_Event.crash, this._config.score, this._type);
        this._animation.play(this._config.crashAnimateName);
        this._animation.once(Animation.EventType.FINISHED, this.onCrashAniFinish, this);
        this._gm?.getComponent(AudioManagement)?.playSound(this._config.crashSound);
    }

    onCrashAniFinish() {
        this.node.destroy();
    }

    setEnemy() {
        const config = Enemy_Config[this._type];
        this._config = { ...config, speed: this._speed || config.speed };
        if (this._uiTransform) this._uiTransform.setContentSize(new Size(this._config.width, this._config.height));
        if (this._boxCollider) this._boxCollider.size = new Size(this._config.width, this._config.height);
        if (this._sprite) this._sprite.spriteFrame = this._sprite.spriteAtlas.spriteFrames[this._config.spriteFrameName];
        this._pos.y = this._parentH / 2 + this._config.height / 2;
        this._pos.x = this._iniPos;
        this.node.setPosition(this._pos);
    }

    update (deltaTime: number) {
        if (this.isCrash) return;
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
