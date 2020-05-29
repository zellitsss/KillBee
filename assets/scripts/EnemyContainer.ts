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

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
