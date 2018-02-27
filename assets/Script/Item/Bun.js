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

            var n = Math.random();
            if (n <= 0.5)
                this.GameManager.bunAudio1.play();
            else
                this.GameManager.bunAudio2.play();

            this.GameManager.specialItemNum--;
            this.GameManager.setBunBuff();
            this.node.destroy();
            this.GameManager.spawnNode(self.node.position, self.node.parent);
        }
    },

});
