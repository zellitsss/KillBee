// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyBullet extends cc.Component {
    speed: number = 400;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.scheduleOnce(() => {
            this.node.destroy();
        }, 10);
    }

    update (dt) {
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        this.node.destroy();
    }
}
