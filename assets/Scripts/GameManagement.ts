
import { _decorator, Node, Component, director, game } from 'cc';
import { AudioManagement } from './AudioManagement';
import { GAME_MUSIC, RESOURCE_LOAD_EVENT } from './contant';
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
    end
}

const SCENE_MAP = {
    Game: 'Game',
    Menu: 'Menu',
    End: 'End'
}
 
@ccclass('GameManagement')
export class GameManagement extends Component {

    public score: number = 0;
    private _isPreloadFinish = false;
    private _loadingProcess = {
        audio: 0,
        'game_scene': 0
    };

    start () {
        game.addPersistRootNode(this.node);
        this.onResourceLoad('init');
        const audioMgt = this.node.getComponent(AudioManagement);
        if (audioMgt) {
            audioMgt?.loadAudioSource((cur, total) => {
                this.onResourceLoad('audio', cur, total);
            });
        }
        director.preloadScene('Game', (cur, total) => {
            this.onResourceLoad('game_scene', cur, total);
        }, (err) => {
            if (err) console.error(err);
        });
    }

    onResourceLoad(type, cur?, total?) {
        if (type === 'init') {
            this._loadingProcess['audio'] = 0;
            this._loadingProcess['game_scene'] = 0;
        } else {
            this._loadingProcess[type] = Math.round(cur / total * 50);
        }
        const process = this._loadingProcess.audio + this._loadingProcess.game_scene;
        if (process >= 100) {
            console.log('preload completed');
            this._isPreloadFinish = true;
        }
        this.node.emit(RESOURCE_LOAD_EVENT.PRELOAD, process);
    }

    switchGameStatus (status: GM_Status) {
        if (!this._isPreloadFinish) return;
        switch (status) {
            case GM_Status.start:
                this.score = 0;
                director.loadScene(SCENE_MAP.Menu)
                break;
            case GM_Status.playing:
                this.score = 0;
                director.loadScene(SCENE_MAP.Game);
                this.node.getComponent(AudioManagement)?.playMusic('bgm', GAME_MUSIC.BG);
                break;
            case GM_Status.end:
                director.loadScene(SCENE_MAP.End);
                this.node.getComponent(AudioManagement)?.stopAllMusic();
                this.node.getComponent(AudioManagement)?.playSound(GAME_MUSIC.GAME_OVER);
                break;
            default:
                break;
        }
    }

    toMenu () {
        this.switchGameStatus(GM_Status.start);
    }

    startGame () {
        this.switchGameStatus(GM_Status.playing);
    }

    gameOver () {
        this.switchGameStatus(GM_Status.end);
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
