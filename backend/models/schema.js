const mongoose=require("mongoose");
const { blogZodSchema } = require("./types");

const UserSchema= new mongoose.Schema({
    name:{type:String, required:true},
    gmail: { type: String, required: true, unique: true },
    username: {type:String, required:true,unique:true},
    password:{type:String,required:true},
    profilePic: { type: String, default: "" }
});

const BlogSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        snippet:{type:String},
        content:{type:String},
        userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
        slug:{type:String, required:true,unique:true}
    }
)

BlogSchema.index({userId:1,slug:1},{unique:true});

const User=mongoose.model("User",UserSchema);
const Blog=mongoose.model("Blog",BlogSchema);

module.exports={
    User,
    Blog
}

