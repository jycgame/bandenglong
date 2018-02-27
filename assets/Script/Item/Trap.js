cc.Class({
    extends: cc.Component,

    properties:
    {
        GameManagerNode: {
            default: null,
            type: cc.Node,
        },
        DataManagerNode: {
            default: null,
            type: cc.Node,
        },
    },

    t: null,

    onLoad: function () {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.DataManager = this.DataManagerNode.getComponent("DataManager");

        this.t = setTimeout(function () {
            this.GameManager.trapNum--;
            this.node.destroy();
            this.GameManager.spawnNode(this.node.position, this.node.parent);
        }.bind(this), this.DataManager.trapTime * 1000);
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {
            if (this.GameManager.invincibleSYSJ)
                this.GameManager.invincibleSYSJ = false;
            else if (!this.GameManager.invincible)
                this.GameManager.gameOver();

            this.GameManager.trapNum--;
            this.node.destroy();
            this.GameManager.spawnNode(self.node.position, self.node.parent);
        }
    },

    onDestroy: function () {
        if (this.t)
            clearTimeout(this.t);
    },
});
