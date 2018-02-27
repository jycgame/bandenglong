cc.Class({
    extends: cc.Component,

    properties: {
        spriteFrames: {
            default: [],
            type: [cc.SpriteFrame]   
        },

        GameManagerNode: {
            default: null,
            type: cc.Node,
        },
        DataManagerNode: {
            default: null,
            type: cc.Node,
        },
    },
    sprite: null,
    wordIndex:null,

    // use this for initialization
    onLoad: function () {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.DataManager = this.DataManagerNode.getComponent("DataManager");

        this.sprite = this.node.getComponent(cc.Sprite);
        if (this.GameManager.sysjIndex < 3)
            this.GameManager.sysjIndex++;
        else
            this.GameManager.sysjIndex = 0;
        this.wordIndex = this.GameManager.sysjIndex;

        this.sprite.spriteFrame = this.spriteFrames[this.wordIndex];
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {
            this.GameManager.setPhraseBuff("SYSJ", this.wordIndex, this.node);
            this.GameManager.specialItemNum--;
            this.node.destroy();
            this.GameManager.spawnNode(self.node.position, self.node.parent);
        }
    },

});
