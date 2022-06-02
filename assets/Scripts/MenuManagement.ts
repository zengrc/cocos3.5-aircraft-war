
import { _decorator, Component, Node, director, Label } from 'cc';
const { ccclass, property } = _decorator;
import { GameManagement } from './GameManagement';
import { RESOURCE_LOAD_EVENT } from './contant';

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
    @property({ type: Node })
    ProcessBar: Node | null = null;

    private _gm: GameManagement | null;

    start () {
        const gmNode = director.getScene().getChildByName('GameManagement');
        this._gm = gmNode?.getComponent(GameManagement);
        gmNode.on(RESOURCE_LOAD_EVENT.PRELOAD, (process) => {
            if (this.ProcessBar) {
                this.ProcessBar.getComponent(Label).string = `${process}%`;
                if (process >= 100) this.ProcessBar.destroy();
            }
        })
    }

    onResourceLoad (progress) {
        this.ProcessBar.getComponent(Label).string = `${progress}%`;
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
