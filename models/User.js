var mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name:{
      type:String,
      require:true
    },
    password:{
      type:String,
      require:true
    },
    username:{
        type:String,
        require:true
    },
    following:{
        type:[],
        require:false
    }, 
    followedPosts:{
        type:[],
        require:false
    }, 
    state:{
        type:String, 
        require:false
    },
    age:{
        type:Number,
        require:true
    },
    dateOfBirth:{
        type:String,
        require:true
    }
 });

 module.exports = User = mongoose.model('users',UserSchema);
