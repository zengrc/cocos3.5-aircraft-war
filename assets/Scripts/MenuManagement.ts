
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import { GameManagement } from './GameManagement';

/**
 * Predefined variables
 * Name = MenuManagement
 * DateTime = Fri May 13 2022 17:48:15 GMT+0800 (中国标准时间)
 * Author = zengrc
 * FileBasename = MenuManagement.ts
 * FileBasenameNoExtension = MenuManagement
 * URL = db://assets/Scripts/MenuManagement.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('MenuManagement')
export class MenuManagement extends Component {
    private _gm: GameManagement | null;

    start () {
        this._gm = director.getScene().getChildByName('GameManagement')?.getComponent(GameManagement);
    }

    startGame() {
        this._gm?.startGame()
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
