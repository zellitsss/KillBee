// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property('number')
    speed: number = 500;

    // onLoad () {}

    start () {

    }

    update (dt) {
        let direction: cc.Vec2 = new cc.Vec2(0, 1);
        this.node.setPosition(this.node.getPosition().add(direction.mul(dt * this.speed)));
    }
}
