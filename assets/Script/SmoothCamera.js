cc.Class({
	extends: cc.Component,

	properties: {
		target: {
			default: null,
			type: cc.Node
        },
        minX: -50,
        maxX: 50,
        minY: -50,
        maxY: 50,

	},

	// use this for initialization
	onLoad: function () {
		this.camera = this.getComponent(cc.Camera);
	},

	//onEnable: function () {
	//	cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
	//},
	//onDisable: function () {
	//	cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
	//},

	// called every frame, uncomment this function to activate update callback
	lateUpdate: function (dt) {
        let targetPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        targetPos = this.node.parent.convertToNodeSpaceAR(targetPos);
        var x = targetPos.x;
        if (x < this.minX)
            x = this.minX;
        if (x > this.maxX)
            x = this.maxX;
        var y = targetPos.y;
        if (y < this.minY)
            y = this.minY;
        if (y > this.maxY)
            y = this.maxY;
        var camPos = new cc.Vec2(x, y);
        //cc.log(targetPos);
        this.node.position = camPos;

		//let ratio = targetPos.y / cc.winSize.height;
		//this.camera.zoomRatio = 1 + (0.5 - ratio) * 0.5;
	},
});