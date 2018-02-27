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

    onLoad: function () {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.DataManager = this.DataManagerNode.getComponent("DataManager");
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {
            this.GameManager.crayfishAudio.play();

            this.GameManager.specialItemNum--;
            this.GameManager.setCrayfishBuff();
            this.node.destroy();
            this.GameManager.spawnNode(self.node.position, self.node.parent);
        }
    },

});


