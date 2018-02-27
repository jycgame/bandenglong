cc.Class({
    extends: cc.Component,

    properties: {
        AudioManagerNode:
        {
            default: null,
            type: cc.Node
        },
        dieTime:3,
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },
    dieAnim: null,
    // use this for initialization
    onLoad: function () {
        this.AudioManager = this.AudioManagerNode.getComponent("AudioManager");
        this.dieAnim = this.node.getComponent(cc.Animation);
    },

    die: function () {
        this.dieAnim.play();
        this.AudioManager.loseAudio.play();
        setTimeout(function () {
            //this.node.destroy();
            this.node.active = false;
        }.bind(this), this.dieTime * 1000);
    },

});
