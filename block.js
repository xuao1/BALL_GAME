cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    init(width){
        let collider = this.node.getComponent(cc.PhysicsBoxCollider);
        
        this.node.width = width;//隐式的长度（有效碰撞的长度）
        collider.size.width = width;//显现出来的长度
    },
});
