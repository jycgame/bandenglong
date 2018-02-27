const DataManager = require('DataManager');
const GameManager = require('GameManager');
const SmallCoin = require('SmallCoin');

cc.Class({
    extends: cc.Component,
    properties: {
        dataManager: DataManager,
        gameManager: GameManager,
        smallCoin: SmallCoin
    },

    onLoad: function () {
        this.dataManager.init();
        this.gameManager.init();
        this.smallCoin.init();
    }
});