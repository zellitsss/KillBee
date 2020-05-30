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
    speed: number = 200;

    onLoad () {
    }

    start () {
        
    }

    update (dt) {
        let speed: cc.Vec2 = new cc.Vec2(0, this.speed);
        this.node.setPosition(this.node.getPosition().add(speed.mul(dt)));
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) { 
        if (other.tag == 3) {
            cc.find('Canvas/BulletContainer').getComponent(BulletContainer).PutPlayerBullet(this.node);
        }
    }
}
