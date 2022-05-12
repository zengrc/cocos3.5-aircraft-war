
import { _decorator, Animation, Component, Vec3, EventTouch, Contact2DType, Collider2D, Input, UITransform, Prefab, instantiate, Sprite, SpriteAtlas, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PlayerController
 * DateTime = Tue May 10 2022 15:25:03 GMT+0800 (中国标准时间)
 * Author = zengrc
 * FileBasename = PlayerController.ts
 * FileBasenameNoExtension = PlayerController
 * URL = db://assets/Scripts/PlayerController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

enum Bullet_Level {
    normal,
    double
}
 
@ccclass('PlayerController')
export class PlayerController extends Component {

    @property({ type: Prefab })
    public bullet: Prefab | null = null;

    @property({ type: Node })
    public bulletGroup: Node | null = null;

    private _pos = new Vec3();
    private _uiTransform: UITransform | null = null;
    private _bulletlLevel = Bullet_Level.normal;
    private _spriteAtlas: SpriteAtlas | null = null;
    private _boxCollider: Collider2D | null = null;
    private _animation: Animation | null = null;

    start () {
        this._pos.x = 0;
        this._pos.y = -300;
        this._pos.z = 0;
        this.node.setPosition(this._pos);
        this._uiTransform = this.node.parent.getComponent(UITransform);
        this._spriteAtlas = this.node.getComponent(Sprite)?.spriteAtlas;
        this._animation = this.node.getComponent(Animation);
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this._boxCollider = this.node.getComponent(Collider2D);
        this._boxCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.startFire();
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        if (otherCollider.node.name === 'Enemy') {
            this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.cancelFire();
            console.log(this._animation, 99999);
            if (this._animation) this._animation.play('HeroCrash');
        }
    }

    onTouchMove(event: EventTouch) {
        if (!this._uiTransform) return;
        const newPos = event.getUILocation();
        const newPosLocal = this._uiTransform.convertToNodeSpaceAR(new Vec3(newPos.x, newPos.y, 0));
        this._pos = newPosLocal;
        this.node.setPosition(this._pos);
    }

    fire() {
        const bulletMap = {
            [Bullet_Level.normal]: 'bullet1',
            [Bullet_Level.double]: 'bullet2'
        };
        const bullet = instantiate(this.bullet);
        const sprite = bullet.getComponent(Sprite);
        if (this._spriteAtlas) sprite.spriteFrame = this._spriteAtlas.spriteFrames[bulletMap[this._bulletlLevel]];
        bullet.setPosition(this._pos.x, this._pos.y + 50, 0);
        (this.bulletGroup || this.node.parent).addChild(bullet);
    }

    startFire() {
        this.schedule(this.fire, 0.2);
    }

    cancelFire() {
        this.unschedule(this.fire);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
