const mongoose=require("mongoose");
const { blogZodSchema } = require("./types");

const UserSchema= new mongoose.Schema({
    name:{type:String, required:true},
    gmail: { type: String, required: true, unique: true },
    username: {type:String, required:true,unique:true},
    password:{type:String,required:true},
    profilePic: { type: String, default: "" },
    likedBlogs:[{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Blog"}]
});

const BlogSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        snippet:{type:String},
        content:{type:String},
        userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
        slug:{type:String, required:true},
        likes:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}]
    },
    {timestamps:true}
)

BlogSchema.index({userId:1,slug:1},{unique:true});

const CommentSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  deleted: { type: Boolean, default: false }
},{timestamps:true});

const User=mongoose.model("User",UserSchema);
const Blog=mongoose.model("Blog",BlogSchema);
const Comment=mongoose.model("Comment",CommentSchema);

module.exports={
    User,
    Blog,
    Comment
}

