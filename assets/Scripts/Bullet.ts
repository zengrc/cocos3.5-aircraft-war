
import { _decorator, Component, UITransform, Vec3, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
import { EnemyController } from './EnemyController'
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Tue May 10 2022 19:59:25 GMT+0800 (中国标准时间)
 * Author = zengrc
 * FileBasename = Bullet.ts
 * FileBasenameNoExtension = Bullet
 * URL = db://assets/Scripts/Bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('Bullet')
export class Bullet extends Component {
    private _pos = new Vec3();
    private _speed = 600;
    private _parentW: number = 0;
    private _parentH: number = 0;
    private _boxCollider: Collider2D | null = null;

    start () {
        this.node.getPosition(this._pos);
        const uiTransform = this.node.parent.getComponent(UITransform);
        const { width, height } = uiTransform.contentSize;
        this._parentH = height;
        this._parentW = width;
        this._boxCollider = this.node.getComponent(Collider2D);
        this._boxCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        otherCollider.node.destroy();
        this.node.destroy();
    }

    update (deltaTime: number) {
        const deltaY = deltaTime * this._speed;
        this._pos.y += deltaY;
        this.node.setPosition(this._pos);
        this.checkDestory();
    }

    checkDestory () {
        if (this._pos.x < -this._parentW / 2 || this._pos.x > this._parentW / 2
            || this._pos.y < -this._parentH / 2 || this._pos.y > this._parentH / 2) {
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
