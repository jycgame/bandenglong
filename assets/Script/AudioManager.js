cc.Class({
    extends: cc.Component,

    properties: {
        loseAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

        cheerAudio:
        {
            default: null,
            type: cc.AudioSource,
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
