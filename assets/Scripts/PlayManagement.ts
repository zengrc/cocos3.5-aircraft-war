
import { _decorator, Component, Node, UITransform, Prefab, instantiate, Label, director } from 'cc';
import { EnemyController, Enemy_Type, Enemy_Config, Enemy_Event } from './EnemyController';
import { Hero_Event } from './PlayerController';
import { PLAY_EVENT, GAME_EVENT } from './contant';
import { GameManagement } from './GameManagement';
const { ccclass, property } = _decorator;

enum Play_Status {
    start,
    pause,
    resume
}
 
@ccclass('PlayManagement')
export class PlayManagement extends Component {
    private _status: Play_Status;
    private _playW: number = 0;
    private _playH: number = 0;
    private _scoreLabel: Label | null = null;
    private _gm: GameManagement | null;

    set _score (val: number) {
        if (this._gm) this._gm.score = val;
    }

    get _score () {
        return this._gm?.score || 0;
    }

    @property({ type: Node })
    public Mask: Node | null = null;

    @property({ type: Node })
    public EnemyGroup: Node | null = null;

    @property({ type: Prefab })
    public Enemy: Prefab | null = null;

    @property({ type: Node })
    public Score: Node | null = null;

    @property({ type: Node })
    public Hero: Node | null = null;

    @property({ type: Node })
    public Playground: Node | null = null;

    @property({ type: Node })
    public PauseBtn: Node | null = null;

    start () {
        this._gm = director.getScene().getChildByName('GameManagement')?.getComponent(GameManagement);
        this._score = 0;
        this.switchPlayStatus(Play_Status.start);
        if (this.PauseBtn) {
            this.PauseBtn.on(PLAY_EVENT.PAUSE, this.pauseGame, this);
            this.PauseBtn.on(PLAY_EVENT.RESUME, this.resumeGame, this);
        }
        if (this.Hero) this.Hero.on(Hero_Event.crash, this.gameOver, this);
        const playgroundSize = this.Playground?.getComponent(UITransform)?.contentSize;
        const { width, height } = playgroundSize || {};
        this._playH = height || 0;
        this._playW = width || 0;
    }

    switchPlayStatus (status: Play_Status) {
        if (this._status === status) return;
        this._status = status;
        switch (status) {
            case Play_Status.start:
                if (this.Mask) this.Mask.active = false;
                this.updateScoreLabel();
                this.schedule(this.generateEnemies, 2);
                break;
            case Play_Status.pause:
                if (this.Mask) this.Mask.active = true;
                director.pause();
                break;
            case Play_Status.resume:
                if (this.Mask) this.Mask.active = false;
                director.resume();
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
        if (this.Enemy) {
            const randowmType = [Enemy_Type.UFO, Enemy_Type.plane, Enemy_Type.helicopter][Math.floor(Math.random() * 3)];
            const enemyConfig = Enemy_Config[randowmType];
            const posRange = this._playW - enemyConfig.width;
            const randomPos = Math.floor(Math.random() * posRange) - posRange / 2;
            const randomSpeed = Math.floor(Math.random() * enemyConfig.randomSpeedDiff * 2) - enemyConfig.randomSpeedDiff;
            const enemy = instantiate(this.Enemy);
            enemy.on(Enemy_Event.crash, this.onEnemyCrash, this);
            const controller = enemy.getComponent(EnemyController);
            controller.setConfig({ type: randowmType, pos: randomPos, speed: randomSpeed + enemyConfig.speed });
            (this.EnemyGroup || this.Playground).addChild(enemy);
        }
    }

    pauseGame () {
        this.switchPlayStatus(Play_Status.pause);
    }

    resumeGame () {
        this.switchPlayStatus(Play_Status.resume);
    }

    gameOver () {
        this._gm?.gameOver();
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
