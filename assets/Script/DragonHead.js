//var GameManager = require("GameManager");
cc.Class({
    extends: cc.Component,
    properties: {
        //public GameObject bodyPrefab;
        GameManagerNode: {
            default: null,
            type: cc.Node,
        },
        bodyPrefab: {
            default: null,
            type: cc.Prefab,
        },
        texUp:
        {
            default: null,
            type: cc.SpriteFrame,
        },
        texDown:
        {
            default: null,
            type: cc.SpriteFrame,
        },
        texLeft:
        {
            default: null,
            type: cc.SpriteFrame,
        },
        texRight:
        {
            default: null,
            type: cc.SpriteFrame,
        },
       

        //camera: {
        //    default: null,
        //    type: cc.Camera,
        //},
        //public static event Action<Vector2, Vector2> OnTurn;
    },

    sprite: null,
    // use this for initialization
    onLoad: function () {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.sprite = this.node.getComponent(cc.Sprite);
        this.setInputControl();
        this.dir = this.GameManager.initialDir;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var deltaPos = this.dir.mul(this.GameManager.speed * this.GameManager.speedFactor * dt);
        var newPos = this.node.position.add(deltaPos);
        this.node.setPosition(newPos);
    },

    tryTurn: function (newDir) {
        if (!this.dir.equals(newDir.neg()) && !this.dir.equals(newDir)) {
            this.dir = newDir;

            var children = this.node.parent.children;
            for (var i = 1; i < children.length; ++i) {
                var child = children[i];
                var body = child.getComponent("DragonBody");
                if (!body)//最后一个是Tail
                    body = child.getComponent("DragonTail");
                body.OnHeadTurn(this.node.position, newDir);
            }
            //if (OnTurn != null)
            //    OnTurn(rdBody.position, dir);
            return true;
        }
        return false;
    },

    grow: function () {
        var bodyCount = this.node.parent.childrenCount;
        var tailNode = this.node.parent.children[bodyCount - 1];
        var DragonTail = tailNode.getComponent("DragonTail");
        var secLastNode = this.node.parent.children[bodyCount - 2];

        var newBodyNode = cc.instantiate(this.bodyPrefab);
        //this.camera.addTarget(newBodyNode);
        newBodyNode.position = tailNode.position.add(DragonTail.dir.mul(32));

        var newDragonBody = newBodyNode.getComponent("DragonBody");
        newDragonBody.TargetDist = DragonTail.TargetDist;
        newDragonBody.targetDistQueue = this.cloneArray(DragonTail.targetDistQueue);
        newDragonBody.dirQueue = this.cloneArray(DragonTail.dirQueue);
        newDragonBody.dir = DragonTail.dir;
        newDragonBody.hasTarget = DragonTail.hasTarget;
        newDragonBody.bGrowthSpawn = true;
        newDragonBody.GameManagerNode = this.GameManagerNode;

        newBodyNode.parent = this.node.parent;
        newBodyNode.setSiblingIndex(bodyCount - 1);

        var growDir;
        if (!DragonTail.hasTarget)
            growDir = (tailNode.position.sub(secLastNode.position));
        else
            growDir = (tailNode.position.sub(DragonTail.TargetDist));
        tailNode.setPosition(newBodyNode.position.add(growDir.normalize().mul(this.GameManager.dragonBodyGap)));
    },

    cloneArray: function (array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++)
            newArray[i] = array[i];
        return newArray;
    },

    setInputControl: function () {
        var self = this;

        // keyboard input
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,

            onKeyPressed: function (keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.moveDir = 1;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.moveDir = 0;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        self.moveDir = 2;
                        break;
                    case cc.KEY.s:
                    case cc.KEY.down:
                        self.moveDir = 3;
                        break;
                }
            },
        }, self.node);

        //touch input
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,

            //触摸开始
            onTouchesBegan: function (touches, event) {
                var touch = touches[0];
                var loc = touch.getLocation();

                this.touchStartPoint = {
                    x: loc.x,
                    y: loc.y
                };

                this.touchLastPoint = {
                    x: loc.x,
                    y: loc.y
                };

                this.touchThreshold = 1;

                //console.log("touch start");
            },

            //触摸中
            onTouchesMoved: function (touches, event) {
                var touch = touches[0];
                var loc = touch.getLocation();
                var start = this.touchStartPoint;

                //console.log("touching");
            },

            //触摸结束
            onTouchesEnded: function (touches, event) {
                var touch = touches[0];
                var loc = touch.getLocation();
                var start = this.touchStartPoint;

                var deltaX = Math.abs(start.x - loc.x);
                var deltaY = Math.abs(start.y - loc.y);

                if (deltaX > deltaY && start.x > loc.x) {
                    if (self.tryTurn(new cc.Vec2(-1, 0)))
                        self.sprite.spriteFrame = self.texLeft;
                }
                if (deltaX > deltaY && start.x < loc.x) {
                    if (self.tryTurn(new cc.Vec2(1, 0)))
                        self.sprite.spriteFrame = self.texRight;
                }
                if (deltaX < deltaY && start.y > loc.y) {
                    if (self.tryTurn(new cc.Vec2(0, -1)))
                        self.sprite.spriteFrame = self.texDown;
                }
                if (deltaX < deltaY && start.y < loc.y) {
                    if (self.tryTurn(new cc.Vec2(0, 1)))
                        self.sprite.spriteFrame = self.texUp;
                }

                //console.log("touch end");
            },

        }, self.node);
    }
});


