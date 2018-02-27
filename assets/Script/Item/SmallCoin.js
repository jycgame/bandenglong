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

	start: function () {
		this.GameManager = this.GameManagerNode.getComponent("GameManager");
		this.DataManager = this.DataManagerNode.getComponent("DataManager");
	},
	onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {
            var n = Math.random();
            if(n <= 0.2)
                this.GameManager.coinAudio1.play();
            else
                this.GameManager.coinAudio2.play();

            this.GameManager.updateScore(this.DataManager.smallCoinValue);
            this.node.destroy();
            this.GameManager.spawnNode(self.node.position, self.node.parent);
		}
	},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
