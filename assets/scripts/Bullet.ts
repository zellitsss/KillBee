// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property('number')
    force: number = 200;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {
        let force: cc.Vec2 = new cc.Vec2(0, this.force);
        this.node.getComponent(cc.RigidBody).applyLinearImpulse(force, this.node.getPosition(), true);
    }

    update (dt) {
        
    }
}
