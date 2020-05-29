// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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

    leftPoint: number;
    rightPoint: number;

    onLoad () {
        this.SpawnEnemies();
    }

    start () {

        this.leftPoint = this.node.x - this.swingDistance;
        this.rightPoint = this.node.x + this.swingDistance;
    }

    update (dt) {
        let direction: cc.Vec2 = new cc.Vec2(this.swingSpeed * dt, 0);
        this.node.setPosition(this.node.getPosition().add(direction));
    }

    lateUpdate() {
        if ((this.node.x <= this.leftPoint && this.swingSpeed < 0)
            || (this.node.x >= this.rightPoint && this.swingSpeed > 0)) {
            this.swingSpeed *= -1;
        }
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
}
