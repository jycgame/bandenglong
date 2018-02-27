cc.Class({
    extends: cc.Component,

    properties: {
        GameManagerNode: {
            default: null,
            type: cc.Node,
        },
        PlayerInfoNode: {
            default: null,
            type: cc.Node,
        },

        jcwdNode: {
            default: null,
            type: cc.Node,
        },

        sysjNode:
        {
            default: null,
            type: cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        //cc.director.resume();
    },

    loadGameScene: function ()
    {
        this.PlayerInfoNode.active = true;
        this.jcwdNode.active = true;
        this.sysjNode.active = true;
        this.GameManagerNode.getComponent("GameManager").speed = 250;
        this.node.active = false;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
