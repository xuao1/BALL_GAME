cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad(){
        this.initVel = 0;
    },

    onBeginContact(contact, selfCollider, otherCollider){
        let rigidbody = selfCollider.node.getComponent(cc.RigidBody);
        if (!this.initVel){
            this.initVel = rigidbody.linearVelocity.y;
        }else{
            rigidbody.linearVelocity = cc.v2(0,this.initVel);
        }
    }

});
