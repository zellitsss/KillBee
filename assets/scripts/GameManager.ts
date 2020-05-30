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

    @property(cc.Label)
    timer: cc.Label = null;

    // timeout in second, 0 for unlimited time
    @property('number')
    timeOut: number = 0;

    score: number = 0;
    countDown: number = 0;
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
        this.node.on('TimeOut', () => {
            this.GameOver();
        });

        if (this.timeOut != 0) {
            this.countDown = this.timeOut;
        }
    }

    start () {
        if (this.timeOut > 0) {
            this.schedule(() => {
                this.countDown--;
            }, 1);
        }
    }

    update (dt) {
        if (this.timeOut > 0 && this.countDown < 0) {
            this.node.dispatchEvent(new cc.Event.EventCustom('TimeOut', false));
        }

        if (this.timeOut > 0) {
            if (this.countDown >= 0) {
                this.timer.string = this.countDown.toString();
            } else {
                this.timer.string = '0';
            }
        } else {
            this.timer.string = '';
        }
        this.scoreText.string = this.score.toString();
        this.lifeText.string = this.playerLives.toString();
    }

    lateUpdate() {
        
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
