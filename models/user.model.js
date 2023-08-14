import mongoose from 'mongoose';

const {Schema} = mongoose;

const userSchema = new Schema ({
    username :{
        type:String,
        required:true,
        unique:true,
    }, 
email :{
        type:String,
        required:true,
        unique:true,
    },
password :{
        type:String,
        required:true,
     
    },
isSeller :{
        type:Boolean,
        default:false,
    },
userImage :{
        type:String,
        required:false,
      
    },
    featured: {
        type: Boolean,
        default: false,
      },
phoneNumber:{
    type:String,
    required:false,
},

description:{
    type:String,
    required:false,
},

},
{
    timestamps:true
})
export default mongoose.model("User",userSchema )