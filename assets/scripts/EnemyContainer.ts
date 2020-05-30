// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Enemy from "./Enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyContainer extends cc.Component {

    @property('number')
    gridCollumn: number = 0;
    
    @property('number')
    gridRow: number = 0;

    @property('number')
    gridPadding: number = 0;
    
    @property(cc.Prefab)
    enemyPrefab: cc.Prefab = null;

    @property('number')
    swingDistance: number = 300;

    @property('number')
    swingSpeed: number = 100;

    @property(cc.Node)
    player: cc.Node = null;

    @property('number')
    shootingRate: number = 1;

    leftPoint: number;
    rightPoint: number;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.SpawnEnemies();
    }

    start () {
        this.leftPoint = this.node.x - this.swingDistance;
        this.rightPoint = this.node.x + this.swingDistance;

        this.schedule(this.ShootToPlayer, this.shootingRate);
    }

    update (dt) {
        if (this.node.childrenCount <= 0) {
            this.node.dispatchEvent(new cc.Event.EventCustom('AllEnemiesAreDestroyed', true));
        }

        let direction: cc.Vec2 = new cc.Vec2(this.swingSpeed * dt, 0);
        this.node.setPosition(this.node.getPosition().add(direction));
    }

    lateUpdate() {
        if ((this.node.x <= this.leftPoint && this.swingSpeed < 0)
            || (this.node.x >= this.rightPoint && this.swingSpeed > 0)) {
            this.swingSpeed *= -1;
        }
    }

    onDestroy() {
        this.unschedule(this.ShootToPlayer);
    }

    SpawnEnemies() {
        let originPoint: cc.Vec2 = this.node.getPosition();
        let r = originPoint.y - (this.gridRow - 1) * this.gridPadding / 2;
        while (r <= originPoint.y + (this.gridRow - 1) * this.gridPadding / 2) {
            let c = originPoint.x - (this.gridCollumn - 1) * this.gridPadding / 2;
            while (c <= originPoint.x + (this.gridCollumn - 1) * this.gridPadding / 2) {
                let enemy: cc.Node = cc.instantiate(this.enemyPrefab);
                enemy.setPosition(new cc.Vec2(c, r));
                enemy.parent = this.node;
                
                c += this.gridPadding;
            }
            r += this.gridPadding;
        }
    }

    ShootToPlayer() {
        let enemyCount: number = this.node.childrenCount;
        if (enemyCount >= 1) {
            let enemy = this.node.children[this.RandomRange(0, enemyCount -1)];
            enemy.getComponent(Enemy).Shoot(this.player.parent.convertToWorldSpaceAR(this.player.getPosition()));
        }
    }

    RandomRange(min: number, max: number) {
        return Math.round(Math.random() * (max - min)) + min;
    }
}
