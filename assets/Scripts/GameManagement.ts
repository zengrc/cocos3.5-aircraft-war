
import { _decorator, Component, Node, UITransform, Prefab, instantiate, Label, director } from 'cc';
import { EnemyController, Enemy_Type, Enemy_Config, Enemy_Event } from './EnemyController';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManagement
 * DateTime = Tue May 10 2022 14:40:45 GMT+0800 (中国标准时间)
 * Author = zengrc
 * FileBasename = GameManagement.ts
 * FileBasenameNoExtension = GameManagement
 * URL = db://assets/Scripts/GameManagement.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

enum GM_Status {
    start,
    playing,
    pause,
    resume,
    end
}
 
@ccclass('GameManagement')
export class GameManagement extends Component {

    private _status: GM_Status;
    private _playW: number = 0;
    private _playH: number = 0;
    private _score: number = 0;
    private _scoreLabel: Label | null = null;

    @property({ type: Node })
    public menu: Node | null = null;

    @property({ type: Node })
    public mask: Node | null = null;

    @property({ type: Node })
    public playground: Node | null = null;

    @property({ type: Node })
    public enemyGroup: Node | null = null;

    @property({ type: Prefab })
    public enemy: Prefab | null = null;

    @property({ type: Node })
    public Score: Node | null = null;

    start () {
        this.switchGameStatus(GM_Status.start);
        const playgroundSize = this.playground?.getComponent(UITransform)?.contentSize;
        const { width, height } = playgroundSize || {};
        this._playH = height || 0;
        this._playW = width || 0;
    }

    switchGameStatus (status: GM_Status) {
        if (this._status === status) return;
        this._status = status;
        switch (status) {
            case GM_Status.start:
                if (this.mask) this.mask.active = false;
                if (this.menu) this.menu.active = true;
                if (this.playground) this.playground.active = false;
                this._score = 0;
                break;
            case GM_Status.playing:
                if (this.mask) this.mask.active = false;
                if (this.menu) this.menu.active = false;
                if (this.playground) this.playground.active = true;
                this.updateScoreLabel();
                this.schedule(this.generateEnemies, 2);
                break;
            case GM_Status.resume:
                if (this.mask) this.mask.active = false;
                director.resume();
                break;
            case GM_Status.pause:
                if (this.mask) this.mask.active = true;
                director.pause();
                break;
            case GM_Status.end:
                if (this.mask) this.mask.active = false;
                this.unschedule(this.generateEnemies);
                break;
            default:
                break;
        }
    }

    updateScoreLabel() {
        if (!this.Score) return
        if (!this._scoreLabel) this._scoreLabel = this.Score.getComponent(Label);
        if (!this._scoreLabel) return;
        this._scoreLabel.string = `${this._score}`;
    }

    onEnemyCrash(score) {
        this._score += score;
        this.updateScoreLabel()
    }

    generateEnemies () {
        if (this.enemy) {
            const randowmType = [Enemy_Type.UFO, Enemy_Type.plane, Enemy_Type.helicopter][Math.floor(Math.random() * 3)];
            const enemyConfig = Enemy_Config[randowmType];
            const posRange = this._playW - enemyConfig.width;
            const randomPos = Math.floor(Math.random() * posRange) - posRange / 2;
            const randomSpeed = Math.floor(Math.random() * enemyConfig.randomSpeedDiff * 2) - enemyConfig.randomSpeedDiff;
            const enemy = instantiate(this.enemy);
            enemy.on(Enemy_Event.crash, this.onEnemyCrash, this);
            const controller = enemy.getComponent(EnemyController);
            controller.setConfig({ type: randowmType, pos: randomPos, speed: randomSpeed + enemyConfig.speed });
            (this.enemyGroup || this.playground).addChild(enemy);
        }
    }

    startGame () {
        this.switchGameStatus(GM_Status.playing);
    }

    pauseGame () {
        this.switchGameStatus(GM_Status.pause);
    }

    resumeGame () {
        this.switchGameStatus(GM_Status.resume);
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
