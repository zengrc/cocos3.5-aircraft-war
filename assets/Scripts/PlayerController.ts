
import { _decorator, Animation, Component, Vec3, EventTouch, Contact2DType, Collider2D, Input, UITransform, Prefab, instantiate, Sprite, SpriteAtlas, Node } from 'cc';
import { BonusController, BONUS_TYPE } from './BonusController';
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

export enum Hero_Event {
    crash = 'crashed',
    bonus = 'getBonus'
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
    private _isCrash: Boolean = false;

    start () {
        this._pos.x = 0;
        this._pos.y = -300;
        this._pos.z = 0;
        this.node.setPosition(this._pos);
        this._uiTransform = this.node.parent.getComponent(UITransform);
        this._spriteAtlas = this.node.getComponent(Sprite)?.spriteAtlas;
        this._animation = this.node.getComponent(Animation);
        this._animation?.play('HeroFlying');
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this._boxCollider = this.node.getComponent(Collider2D);
        this._boxCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.startFire();
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        if (this._isCrash) return;
        if (otherCollider.node.name === 'Enemy') {
            this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.cancelFire();
            this._isCrash = true;
            if (this._animation) {
                this._animation.play('HeroCrash');
                this._animation.once(Animation.EventType.FINISHED, () => {
                    this.node.emit(Hero_Event.crash);
                });
            }
        } else if (otherCollider.node.name === 'Bonus') {
            const controller = otherCollider.node.getComponent(BonusController);
            if (controller.type === BONUS_TYPE.doubleShoot) this.switchToDoubleShoot();
            this.node.emit(Hero_Event.bonus, controller.type);
            otherCollider.node.destroy();
        }
    }

    onTouchMove(event: EventTouch) {
        if (this._isCrash && !this._uiTransform) return;
        const newPos = event.getUILocation();
        const newPosLocal = this._uiTransform.convertToNodeSpaceAR(new Vec3(newPos.x, newPos.y, 0));
        this._pos = newPosLocal;
        this.node.setPosition(this._pos);
    }

    switchToDoubleShoot() {
        this._bulletlLevel = Bullet_Level.double;
        this.unschedule(this.switchToNormalShoot);
        this.scheduleOnce(this.switchToNormalShoot, 10);
    }

    switchToNormalShoot() {
        this._bulletlLevel = Bullet_Level.normal;
    }

    fire() {
        if (this._bulletlLevel === Bullet_Level.normal) {
            const bullet = instantiate(this.bullet);
            const sprite = bullet.getComponent(Sprite);
            if (this._spriteAtlas) sprite.spriteFrame = this._spriteAtlas.spriteFrames['bullet1'];
            bullet.setPosition(this._pos.x, this._pos.y + 50, 0);
            (this.bulletGroup || this.node.parent).addChild(bullet);
        } else {
            const bullet1 = instantiate(this.bullet);
            const bullet2 = instantiate(this.bullet);
            const sprite1 = bullet1.getComponent(Sprite);
            const sprite2 = bullet2.getComponent(Sprite);
            if (this._spriteAtlas) {
                sprite1.spriteFrame = this._spriteAtlas.spriteFrames['bullet2'];
                sprite2.spriteFrame = this._spriteAtlas.spriteFrames['bullet2'];
            }
            bullet1.setPosition(this._pos.x - 15, this._pos.y + 50, 0);
            bullet2.setPosition(this._pos.x + 15, this._pos.y + 50, 0);
            (this.bulletGroup || this.node.parent).addChild(bullet1);
            (this.bulletGroup || this.node.parent).addChild(bullet2);
        }
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
