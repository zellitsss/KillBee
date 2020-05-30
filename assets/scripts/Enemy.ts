// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EnemyBullet from "./EnemyBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    explodePrefab: cc.Prefab = null;

    @property('number')
    force: number = 400;

    onLoad() {

    }

    Shoot(playerPosition: cc.Vec2) {
        let bullet: cc.Node = cc.instantiate(this.bulletPrefab);

        let bulletContainer: cc.Node = cc.find('Canvas/BulletContainer');

        let direction: cc.Vec2 = playerPosition.sub(this.node.parent.convertToWorldSpaceAR(this.node.getPosition()));
        direction.normalizeSelf();

        bullet.setPosition(bulletContainer.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.getPosition())));
        bullet.parent = bulletContainer;
        bullet.getComponent(cc.RigidBody).applyLinearImpulse(direction.mul(this.force), bullet.getPosition(), true);
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        if (other.tag == 2) {
            this.node.dispatchEvent(new cc.Event.EventCustom('EnemyIsDetroyedByBullet', true));
        } else if (other.tag == 1) {
            // hit by player    
        }
        let explode: cc.Node = cc.instantiate(this.explodePrefab);
        let canvas: cc.Node = cc.find('Canvas');
        explode.setPosition(canvas.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.getPosition())));
        explode.parent = canvas;
        this.node.destroy();
    }

}
