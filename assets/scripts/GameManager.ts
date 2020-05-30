// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Label)
    scoreText: cc.Label = null;

    @property(cc.Label)
    lifeText: cc.Label = null;

    score: number = 0;

    playerLives: number = 3;

    onLoad () {
        cc.director.getCollisionManager().enabled = true;

        this.node.on('EnemyIsDetroyedByBullet', () => {
            this.OnEnemyIsDetroyedByBullet();
        });
        this.node.on('PlayerIsHitByBullet', () => {
            this.OnDecreasePlayersLife();
        });
        this.node.on('PlayerIsHitByEnemy', () => {
            this.OnDecreasePlayersLife();
        });
        this.node.on('PlayerOutOfLife', () => {
            this.OnPlayerOutOfLife();
        });
        this.node.on('AllEnemiesAreDestroyed', () => {
            this.OnAllEnemiesAreDestroyed();
        })
    }

    start () {
    }

    update (dt) {
        this.scoreText.string = this.score.toString();
        this.lifeText.string = this.playerLives.toString();
    }

    OnEnemyIsDetroyedByBullet() {
        this.score = this.score + 100;
    }

    OnDecreasePlayersLife() {
        this.playerLives -= 1;
        if (this.playerLives <= 0) {
            this.node.dispatchEvent(new cc.Event.EventCustom('PlayerOutOfLife', true));
        }
    }

    OnPlayerOutOfLife() {
        this.GameOver();
    }

    OnAllEnemiesAreDestroyed() {
        this.GameOver();
    }

    GameOver() {
        cc.director.loadScene("GameOver");
    }
}
