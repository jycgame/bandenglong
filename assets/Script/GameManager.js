//cc.Class({
//    extends: cc.Component,

//    properties: {
//        // foo: {
//        //    default: null,      // The default value will be used only when the component attaching
//        //                           to a node for the first time
//        //    url: cc.Texture2D,  // optional, default is typeof default
//        //    serializable: true, // optional, default is true
//        //    visible: true,      // optional, default is true
//        //    displayName: 'Foo', // optional
//        //    readonly: false,    // optional, default is false
//        // },
//        // ...
//    },

//    // use this for initialization
//    onLoad: function () {

//    },

//    // called every frame, uncomment this function to activate update callback
//    // update: function (dt) {

//    // },
//});

var GameManager = cc.Class({
    extends: cc.Component,
    //statics: {
    //    instance: null
    //},
    properties: {
        speedFactor: 1,
        speed: 100,
        initialDir: new cc.Vec2(0, 1),
        dragonBodyGap: 100,
        cheerThrehold: 50,
        headNode: {
            default: null,
            type: cc.Node,
        },

        PlayerInfoNode: {
            default: null,
            type: cc.Node,
        },

        GameResNode: {
            default: null,
            type: cc.Node,
        },

        DataManagerNode:
        {
            default: null,
            type: cc.Node,
        },

        AudioManagerNode:
        {
            default: null,
            type: cc.Node,
        },

        smallCoin:
        {
            default: null,
            type: cc.Prefab,
        },

        trap:
        {
            default: null,
            type: cc.Prefab,
        },
        crayfish:
        {
            default: null,
            type: cc.Prefab,
        },
        crab:
        {
            default: null,
            type: cc.Prefab,
        },
        bun:
        {
            default: null,
            type: cc.Prefab,
        },
        sysj:
        {
            default: null,
            type: cc.Prefab,
        },
        jcwd:
        {
            default: null,
            type: cc.Prefab,
        },
        bgAudio1:
        {
            default: null,
            type: cc.AudioSource,
        },

        bgAudio2:
        {
            default: null,
            type: cc.AudioSource,
        },

        coinAudio1:
        {
            default: null,
            type: cc.AudioSource,
        },

        coinAudio2:
        {
            default: null,
            type: cc.AudioSource,
        },

        bunAudio1:
        {
            default: null,
            type: cc.AudioSource,
        },

        bunAudio2:
        {
            default: null,
            type: cc.AudioSource,
        },

        wordAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

        phraseAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

        crabAudio1:
        {
            default: null,
            type: cc.AudioSource,
        },

        crabAudio2:
        {
            default: null,
            type: cc.AudioSource,
        },

        crayfishAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

        crayfishAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

        crayfishAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

        jcwdUINode:
        {
            default: null,
            type: cc.Node,
        },

        sysjUINode:
        {
            default: null,
            type: cc.Node,
        },

        jcwdGray: {
            default: [],
            type: [cc.SpriteFrame]
        },

        jcwdColor: {
            default: [],
            type: [cc.SpriteFrame]
        },

        sysjGray: {
            default: [],
            type: [cc.SpriteFrame]
        },

        sysjColor: {
            default: [],
            type: [cc.SpriteFrame]
        },

        cheerImg: {
            default: null,
            type: cc.SpriteFrame
        },

        dragonNode: {
            default: null,
            type: cc.Node,
        }

    },

    invincible: null,
    invincibleSYSJ: null,
    scoreLabel: null,
    score: null,
    scoreFactor: null,
    highscore: null,
    highscoreLabel: null,
    levelLabel: null,
    level: null,
    DataManager: null,
    AudioManager:null,
    dragonHead: null,
    bunTimeout: null,
    crabTimeout: null,
    spawnNodeTimeoutList: null,
    crayfishTimeout: null,
    bgAudioTimeout: null,

    titleResSprite: null,
    scoreResLabel: null,
    levelResLabel: null,
    highscoreResLabel: null,
    trapNum: null,
    specialItemNum: null,

    sysjIndex: null,
    jcwdIndex: null,

    NextSysjIndex: null,
    NextJcwdIndex: null,

    JCWDwords: null,
    SYSJwords: null,

    curBodyLength: null,
    newSpriteNode: null,
    curSpeedUpDataIndex: null,
    cheerScore: null,
    onLoad: function () {
        cc.director.resume();

        this.bgAudio1.play();

        this.bgAudioTimeout = setTimeout(function () {
            this.bgAudio1.stop();
            this.bgAudio2.play();
        }.bind(this), this.bgAudio1.getDuration() * 1000);

        this.invincible = false;
        this.invincibleSYSJ = false;

        this.socre = 0;
        this.level = 1;
        this.scoreFactor = 1;
        this.scoreLabel = this.PlayerInfoNode.children[1].getComponent(cc.Label);
        this.levelLabel = this.PlayerInfoNode.children[0].getComponent(cc.Label);
        this.highscoreLabel = this.PlayerInfoNode.children[2].getComponent(cc.Label);
        this.DataManager = this.DataManagerNode.getComponent("DataManager");
        this.AudioManager = this.AudioManagerNode.getComponent("AudioManager");
        this.dragonHead = this.headNode.getComponent("DragonHead")
        this.dragon = this.dragonNode.getComponent("Dragon");

        this.titleResSprite = this.GameResNode.children[0].children[0].getComponent(cc.Sprite);
        this.scoreResLabel = this.GameResNode.children[0].children[2].getComponent(cc.Label);
        this.levelResLabel = this.GameResNode.children[0].children[1].getComponent(cc.Label);
        this.highscoreResLabel = this.GameResNode.children[0].children[3].getComponent(cc.Label);

        this.trapNum = 0;
        this.specialItemNum = 0;

        this.sysjIndex = 3;
        this.jcwdIndex = 3;

        this.NextSysjIndex = 3;
        this.NextJcwdIndex = 3;

        this.JCWDwords = [];
        this.SYSJwords = [];

        this.spawnNodeTimeoutList = [];
        this.curBodyLength = 1;
        this.curSpeedUpDataIndex = 0;
        var sceneName = cc.director.getScene().name;
        //cc.sys.localStorage.removeItem('highscore' + sceneName.split('_')[1])
        this.highscore = cc.sys.localStorage.getItem('highscore' + sceneName.split('_')[1]);
        if (this.highscore)
            this.highscoreLabel.string = this.highscore;
        this.cheerScore = 0;

    },

    backToMain: function () {
        cc.director.loadScene("Main");
    },

    gameOver: function () {

        if (this.score > this.highscore) {
            //titleResText.text = "胜利";
            var sceneName = cc.director.getScene().name;
            cc.sys.localStorage.setItem('highscore' + sceneName.split('_')[1], this.score);
            this.highscoreResLabel.string = this.score;
        }
        else {
            this.highscoreResLabel.string = this.highscore;
            this.titleResSprite.spriteFrame = this.cheerImg;
        }

        this.bgAudio1.stop();
        this.bgAudio2.stop();
        //cc.director.pause();
        this.speed = 0;

        this.PlayerInfoNode.active = false;
        this.scoreResLabel.string = this.score;
        this.levelResLabel.string = this.level;
        this.clearAllTimeout();
        this.dragon.die();
        setTimeout(function () {
            this.GameResNode.active = true;
        }.bind(this), this.dragon.dieTime * 1000);
    },

    restart: function () {
        cc.director.loadScene("Level_1");
    },

    updateScore: function (socreGet) {
        this.score += socreGet * this.scoreFactor;
        this.scoreLabel.string = this.score;
        this.checkLevelUp();
        this.checkBodyLength();
        this.checkSpeedUp();

        this.cheerScore += socreGet * this.scoreFactor;
        if (this.cheerScore >= this.cheerThrehold)
        {
            this.AudioManager.cheerAudio.play();
            this.cheerScore = 0;
        }
    },

    checkLevelUp: function () {
        for (var i = this.level - 1; i < this.DataManager.levelScores.length - 1; i++) {
            var nextLevelScore = this.DataManager.levelScores[i + 1];
            if (this.score < nextLevelScore) {
                this.level = i + 1;
                this.levelLabel.string = this.level;
                break;
            }
        }
    },

    checkSpeedUp: function () {
        for (var i = this.curSpeedUpDataIndex; i < this.DataManager.speedUpData.length; i++) {
            var speedUpScore = parseFloat(this.DataManager.speedUpData[i][0]);
            var speedUpVal = parseFloat(this.DataManager.speedUpData[i][1]);
            if (this.score >= speedUpScore) {
                this.speed += speedUpVal;
                this.curSpeedUpDataIndex++;
            }
            else
                break;
        }
    },

    checkBodyLength: function () {
        for (var i = this.curBodyLength - 1; i < this.DataManager.bodyLengthScores.length; i++) {
            if (this.score >= this.DataManager.bodyLengthScores[i]) {
                this.dragonHead.grow();
                this.curBodyLength++;
            }
            else
                break;
        }
    },

    spawnNode: function (pos, parent) {
        var spawnTime = (this.DataManager.maxSpawnTime - this.DataManager.minSpawnTime) * Math.random() + this.DataManager.minSpawnTime;
        var spawnNodeTimeout = setTimeout(function () {
            var prefabAndName = this.getItemToSpawn();
            var newItem = cc.instantiate(prefabAndName[0]);
            var itemComp = newItem.getComponent(prefabAndName[1]);
            itemComp.GameManagerNode = this.node;
            itemComp.DataManagerNode = this.DataManagerNode;
            newItem.parent = parent;
            newItem.setPosition(pos);
            if (prefabAndName[1] === "SYSJ")
                this.SYSJwords.push(newItem);
            if (prefabAndName[1] === "JCWD")
                this.JCWDwords.push(newItem);
        }.bind(this), spawnTime * 1000);

        this.spawnNodeTimeoutList.push(spawnNodeTimeout);
    },

    setBunBuff: function () {
        if (this.bunTimeout) {
            clearTimeout(this.bunTimeout)
            this.scoreFactor = 1;
        }

        this.scoreFactor *= this.DataManager.bunBuffRate;
        this.bunTimeout = setTimeout(function () {
            this.scoreFactor = 1;
            this.bunTimeout = null;
        }.bind(this), this.DataManager.bunTime * 1000);
    },

    setCrabBuff: function () {
        if (this.crabTimeout) {
            clearTimeout(this.crabTimeout);
            this.speedFactor = 1;
        }

        this.speedFactor = this.speedFactor * (100 - this.DataManager.crabBuffRate) / 100;
        this.crabTimeout = setTimeout(function () {
            this.speedFactor = 1;
            this.crabTimeout = null;
        }.bind(this), this.DataManager.crabTime * 1000);
    },

    setCrayfishBuff: function () {
        this.invincible = true;
        if (this.crayfishTime)
            clearTimeout(this.crayfishTime);

        this.crayfishTime = setTimeout(function () {
            this.invincible = false;
            this.crayfishTime = null;
        }.bind(this), this.DataManager.crayfishTime * 1000);
    },

    clearAllTimeout: function () {
        clearTimeout(this.bunTimeout);
        clearTimeout(this.crabTimeout);
        clearTimeout(this.bgAudioTimeout);
        for (var i = 0; i < this.spawnNodeTimeoutList.length; i++) {
            clearTimeout(this.spawnNodeTimeoutList[i]);
        }
    },

    getProbabilityGroupIndex: function (probabilityGroup) {
        var random = Math.random();
        var propSum = 0;
        for (var i = 0; i < probabilityGroup.length; i++) {
            propSum += probabilityGroup[i];
            if (random < propSum) {
                return i;
            }
        }
        cc.error("getProbabilityGroupIndex failed!!");
        return -1;
    },

    getItemToSpawn: function () {
        if (this.specialItemNum >= this.DataManager.itemNumLimit)//小金币
        {
            return [this.smallCoin, "SmallCoin"];
        }
        else if (this.score >= this.DataManager.trapThrehold) {
            var groupIndex = this.getProbabilityGroupIndex(this.DataManager.probabilityGroup0);
            switch (groupIndex) {
                case 0:
                    return [this.smallCoin, "SmallCoin"];
                case 1: //group1
                    var groupIndex1 = this.getProbabilityGroupIndex(this.DataManager.probabilityGroup1);
                    switch (groupIndex1) {
                        case 0:
                            this.specialItemNum++;
                            return [this.crayfish, "Crayfish"];
                        case 1:
                            this.specialItemNum++;
                            return [this.crab, "Crab"];
                        case 2:
                            this.specialItemNum++;
                            return [this.bun, "Bun"];
                    }
                    break;
                case 2:// gourp2
                    var groupIndex2 = this.getProbabilityGroupIndex(this.DataManager.probabilityGroup2);
                    switch (groupIndex2) {
                        case 0:
                            this.specialItemNum++;
                            return [this.sysj, "SYSJ"];
                        case 1:
                            this.specialItemNum++;
                            return [this.jcwd, "JCWD"];
                    }
                    break;
                case 3:
                    if (this.trapNum < 10) {
                        this.trapNum++;
                        return [this.trap, "Trap"];
                    }
                    else
                        return [this.smallCoin, "SmallCoin"];
            }
        }
        else //group3
        {
            var groupIndex = this.getProbabilityGroupIndex(this.DataManager.probabilityGroup3);
            switch (groupIndex) {
                case 0:
                    return [this.smallCoin, "SmallCoin"];
                //case 1: 大闸蟹概率为0,不会出现
                //    break;
                case 2:
                    this.specialItemNum++;
                    return [this.bun, "Bun"];
                case 3:// gourp2
                    var groupIndex2 = this.getProbabilityGroupIndex(this.DataManager.probabilityGroup2);
                    switch (groupIndex2) {
                        case 0:
                            this.specialItemNum++;
                            return [this.sysj, "SYSJ"];
                        case 1:
                            this.specialItemNum++;
                            return [this.jcwd, "JCWD"];
                    }
                    break;
            }
        }
        cc.error("getItemToSpawn failed!!!");
        return null;
    },

    setPhraseBuff: function (phraseType, wordIndex, node) {
        switch (phraseType) {
            case "JCWD":
                if (this.NextJcwdIndex == wordIndex - 1 || (this.NextJcwdIndex == 3 && wordIndex == 0)) {
                    this.NextJcwdIndex = wordIndex;
                    if (this.NextJcwdIndex == 3) {
                        this.updateScore(this.DataManager.JCWDValue);
                        for (var i = 0; i < 4; i++) {
                            this.jcwdUINode.children[i].getComponent(cc.Sprite).spriteFrame = this.jcwdGray[i];
                        }
                        this.phraseAudio.play();
                    }
                    else {
                        this.jcwdUINode.children[this.NextJcwdIndex].getComponent(cc.Sprite).spriteFrame = this.jcwdColor[this.NextJcwdIndex];
                        this.wordAudio.play();
                    }

                    this.JCWDwords.remove(node);
                }
                else {
                    this.NextJcwdIndex = 3;
                    this.jcwdIndex = 3;
                    for (var i = 0; i < 4; i++) {
                        this.jcwdUINode.children[i].getComponent(cc.Sprite).spriteFrame = this.jcwdGray[i];
                    }

                    for (var i = 0; i < this.JCWDwords.length; i++) {
                        var word = this.JCWDwords[i];
                        if (word != node) {
                            this.spawnNode(word.position, word.parent);
                            this.specialItemNum--;
                            word.destroy();
                        }
                    }
                    this.JCWDwords = [];
                    this.wordAudio.play();
                }
                break;
            case "SYSJ":
                if (this.NextSysjIndex == wordIndex - 1 || (this.NextSysjIndex == 3 && wordIndex == 0)) {
                    this.NextSysjIndex = wordIndex;
                    if (this.NextSysjIndex == 3) {
                        this.invincibleSYSJ = true;
                        for (var i = 0; i < 4; i++) {
                            this.sysjUINode.children[i].getComponent(cc.Sprite).spriteFrame = this.sysjGray[i];
                        }

                        this.phraseAudio.play();
                    }
                    else {
                        this.wordAudio.play();
                        this.sysjUINode.children[this.NextSysjIndex].getComponent(cc.Sprite).spriteFrame = this.sysjColor[this.NextSysjIndex];
                    }

                    this.SYSJwords.remove(node);
                }
                else {
                    this.NextSysjIndex = 3;
                    this.sysjIndex = 3;
                    for (var i = 0; i < 4; i++) {
                        this.sysjUINode.children[i].getComponent(cc.Sprite).spriteFrame = this.sysjGray[i];
                    }

                    for (var i = 0; i < this.SYSJwords.length; i++) {
                        var word = this.SYSJwords[i];
                        if (word != node) {
                            this.spawnNode(word.position, word.parent);
                            this.specialItemNum--;
                            word.destroy();
                        }
                    }
                    this.SYSJwords = [];
                    this.wordAudio.play();
                }
                break;
        }
    },
});

Array.prototype.remove = function (b) {
    var a = this.indexOf(b);
    if (a >= 0) {
        this.splice(a, 1);
        return true;
    }
    return false;
};



