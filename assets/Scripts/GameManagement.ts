
import { _decorator, Node, Component, director, game } from 'cc';
const { ccclass } = _decorator;

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

    start () {
        game.addPersistRootNode(this.node);
    }

    switchGameStatus (status: GM_Status) {
        switch (status) {
            case GM_Status.start:
                this.score = 0;
                director.loadScene(SCENE_MAP.Menu)
                break;
            case GM_Status.playing:
                this.score = 0;
                director.loadScene(SCENE_MAP.Game)
                break;
            case GM_Status.end:
                director.loadScene(SCENE_MAP.End)
                break;
            default:
                break;
        }
    }

    toMenu () {
        this.switchGameStatus(GM_Status.start);
    }

    startGame () {
        console.log(123123123123);
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
