// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BulletContainer from "./BulletContainer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property('number')
    speed = 300;

    @property('number')
    shootingRate: number = 0.5;

    @property(cc.Vec2)
    shootingOffset: cc.Vec2 = new cc.Vec2(0, 0);

    shootingCd: number = 0;
    horizontalMovement: number = 0;
    vertialMovement: number = 0;

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    update (dt) {
        let moveDirection: cc.Vec2 = new cc.Vec2(this.horizontalMovement, this.vertialMovement);
        moveDirection.normalizeSelf();
        this.node.setPosition(this.node.getPosition().add(moveDirection.mul(this.speed * dt)));
        this.shootingCd -= dt;
    }

    Shoot() {
        if (this.shootingCd <= 0) {
            let bulletContainer: cc.Node = cc.find('Canvas/BulletContainer');
            let bullet: cc.Node = bulletContainer.getComponent(BulletContainer).GetPlayerBullet();
            
            bullet.setPosition(this.node.getPosition().add(this.shootingOffset));
            bullet.parent = bulletContainer;

            this.shootingCd = this.shootingRate;
        }
        console.log(this.bulletPool.size())
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.horizontalMovement = -1;
                break;
            case cc.macro.KEY.right:
                this.horizontalMovement = 1;
                break;
            case cc.macro.KEY.up:
                this.vertialMovement = 1;
                break;
            case cc.macro.KEY.down:
                this.vertialMovement = -1;
                break;
            case cc.macro.KEY.space:
                this.Shoot();
                break;
            default:
                break;
        }
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                if (this.horizontalMovement == -1) {
                    this.horizontalMovement = 0;
                }
                break;
            case cc.macro.KEY.right:
                if (this.horizontalMovement == 1) {
                    this.horizontalMovement = 0;
                }
                break;
            case cc.macro.KEY.up:
                if (this.vertialMovement == 1) {
                    this.vertialMovement =0;
                }
                break;
            case cc.macro.KEY.down:
                if (this.vertialMovement == -1) {
                    this.vertialMovement = 0;
                }
                break;
            default:
                break;
        }
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.tag == 3) {
            this.node.dispatchEvent(new cc.Event.EventCustom('PlayerIsHitByEnemy', true));
        } else if (other.tag == 4) {
            this.node.dispatchEvent(new cc.Event.EventCustom('PlayerIsHitByBullet', true));
        }
    }
}
