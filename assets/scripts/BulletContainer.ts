// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletContainer extends cc.Component {
    @property(cc.Prefab)
    playerBullet: cc.Prefab = null;

    @property(cc.Prefab)
    enemyBullet: cc.Prefab = null;

    playerBulletPool: cc.NodePool = null;
    enemyBulletPool: cc.NodePool = null;

    onLoad() {
        this.playerBulletPool = new cc.NodePool();
        this.enemyBulletPool = new cc.NodePool();
        for (let i = 0; i < 5; ++i) {
            let playerBullet: cc.Node = cc.instantiate(this.playerBullet);
            this.playerBulletPool.put(playerBullet);

            let enemyBullet: cc.Node = cc.instantiate(this.enemyBullet);
            this.enemyBulletPool.put(enemyBullet);
        }
    }

    PutPlayerBullet(bullet: cc.Node) {
        this.playerBulletPool.put(bullet);
    }

    GetPlayerBullet(): cc.Node {
        let bullet: cc.Node = null;
        if (this.playerBulletPool.size() > 0) {
            bullet = this.playerBulletPool.get();
        } else {
            bullet = cc.instantiate(this.playerBullet);
        }
        return bullet;
    }

    PutEnemyBullet(bullet: cc.Node) {
        this.enemyBulletPool.put(bullet);
    }

    GetEnemyBullet(): cc.Node {
        let bullet: cc.Node = null;
        if (this.enemyBulletPool.size() > 0) {
            bullet = this.enemyBulletPool.get();
        } else {
            bullet = cc.instantiate(this.enemyBullet);
        }
        return bullet;
    }
}
