var mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    title:{
      type:String,
      require:true
    },
    description:{
      type:String,
      require:true
    },
    imageUrl:{
        type:String,
        require:false
    },
    createdBy:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        require:true
    }
 });

 module.exports = User = mongoose.model('posts',PostSchema);
