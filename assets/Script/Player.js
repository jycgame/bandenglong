cc.Class({
    extends: cc.Component,

    properties: {
        infoLabel: {
            default: null,
            type: cc.Label
        },

        moveDir: 0, //0, left, 1, right, 2, up, 3, down
        speed: 1,
    },

    // use this for initialization
    onLoad: function () {

        this.setInputControl();
        this.infoLabel.string = "no collision";
    },

    update: function(dt) {

            if (this.moveDir === 0) {
                this.node.setPosition(this.node.x + this.speed, this.node.y);
            }
            else if (this.moveDir === 1) {
                this.node.setPosition(this.node.x - this.speed, this.node.y);
            }
            else if (this.moveDir === 2) {
                this.node.setPosition(this.node.x, this.node.y + this.speed);
            }
            else if (this.moveDir === 3) {
                this.node.setPosition(this.node.x, this.node.y - this.speed);
            }

    },

    onCollisionEnter: function (other, self) {
        console.log('play collide with something.');
        this.infoLabel.string = "yes";
    },

    speedChange: function () {
        this.speed += 1;
    },

    setInputControl: function() {
            var self = this;

            // keyboard input
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,

                onKeyPressed: function(keyCode, event) {
                    switch(keyCode) {
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
                onTouchesBegan: function(touches, event) {
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

                    console.log("已经检测到触摸！");
                },

                //触摸中
                onTouchesMoved: function(touches, event) {
                    var touch = touches[0];
                    var loc = touch.getLocation();
                    var start = this.touchStartPoint;



                    console.log("触摸中");
                },

                //触摸结束
                onTouchesEnded: function(touches, event) {
                    var touch = touches[0];
                    var loc = touch.getLocation();
                    var start = this.touchStartPoint;

                    var deltaX = Math.abs(start.x - loc.x);
                    var deltaY = Math.abs(start.y - loc.y);
                    
                    if (deltaX > deltaY && start.x > loc.x)
                        self.moveDir = 1;
                    if (deltaX > deltaY && start.x < loc.x)
                        self.moveDir = 0;
                    if (deltaX < deltaY && start.y > loc.y)
                        self.moveDir = 3;
                    if (deltaX < deltaY && start.y < loc.y)
                        self.moveDir = 2;


                    console.log("触摸结束");
                },

            }, self.node);
    }

});
