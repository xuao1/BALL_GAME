cc.Class({
    extends: cc.Component,

    properties: {
        //绑定小球节点
        ballNode:cc.Node,

        blockPrefab: cc.Prefab,

        blockAreaNode:cc.Node,

        scoreLabel: cc.Label,
    },

    onLoad () {
        this.initPhysics();

        this.node.on('touchstart',this.boost,this);

        this.gameStart = 0;
        this.score = 0;

        this.initBlock();

    },

    onDestroy(){
        this.node.off('touchstart',this.boost,this);
    },

    update(dt) {
        if(this.gameStart){
            let speed = -350*dt;
            for(let blockNode of this.blockNodeArr){
                blockNode.x +=speed;
                if(blockNode.x < -cc.winSize.width/2-blockNode.width/2){
                    this.incrScore(1);
                    blockNode.x = this.getLastBlockPosX()+200;
                }//循环block
            }
        }

        if(this.ballNode.y < -cc.winSize.height/2){
            console.log('游戏结束');
            cc.director.loadScene('BALL_GAME');
        }
    },

    //刷新得分
    incrScore(incr){
        this.score +=incr;
        this.scoreLabel.string = this.score;
    },

    //获取最后一块跳板的位置
    getLastBlockPosX(){
        let posX = 0;
        for(let blockNode of this.blockNodeArr){
            if(blockNode.x > posX){
                posX = blockNode.x;
            }
        }
        return posX;
    },

    //初始化跳板
    initBlock(){
        this.lastBlockPosX = this.ballNode.x;//最后一个方块x轴的位置
        this.blockNodeArr = [];//数组
        for(let i=0 ; i<10; i++){
            let blockNode = cc.instantiate(this.blockPrefab);//克隆
            blockNode.x = this.lastBlockPosX;
            blockNode.y = 0;

            //block的随机长度
            let width = 92+(Math.random()>.5?1:-1)*(42*Math.random());
            blockNode.getComponent('block').init(width);

            this.blockAreaNode.addChild(blockNode);
            this.blockNodeArr.push(blockNode);

            this.lastBlockPosX+=200;
        }
    },

    //初始化物理引擎
    initPhysics () {
        let manager = cc.director.getPhysicsManager();
        manager.enabled = true;//打开物理引擎
        manager.gravity = cc.v2(0,-2400);
    },

    //加速
    boost(){
        if(this.ballNode.getComponent('ball').initVel){
            let rigidbody = this.ballNode.getComponent(cc.RigidBody);
            rigidbody.linearVelocity = cc.v2(0,-1600);
            this.gameStart = 1;
        }
    },

});
