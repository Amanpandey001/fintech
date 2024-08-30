import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        default: "anonymous"
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://www.shutterstock.com/image-vector/default-avatar-profile-vector-user-260nw-1705357234.jpg"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifyToken:{
        type: String
    }
},{
    timestamps:true
})

const User = mongoose.models.User || mongoose.model("User",userSchema);

export default User